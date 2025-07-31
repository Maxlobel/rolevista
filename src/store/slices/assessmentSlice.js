import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const startAssessmentSession = createAsyncThunk(
  'assessment/startSession',
  async (totalQuestions, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('http://localhost:5000/api/assessments/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ totalQuestions }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to start assessment');
      }
      
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

export const saveAssessmentAnswer = createAsyncThunk(
  'assessment/saveAnswer',
  async (answerData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('http://localhost:5000/api/assessments/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(answerData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to save answer');
      }
      
      return { answerData, progress: data.data };
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

export const submitAssessment = createAsyncThunk(
  'assessment/submitAssessment',  
  async (assessmentData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://localhost:5000/api/assessments/complete/${assessmentData.sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(assessmentData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.message || 'Assessment submission failed');
      }
      
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

export const getAssessmentResults = createAsyncThunk(
  'assessment/getResults',
  async (sessionId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://localhost:5000/api/assessments/progress/${sessionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch results');
      }
      
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

const initialState = {
  // Current assessment progress
  currentQuestionIndex: 0,
  answers: {},
  isSubmitting: false,
  error: null,
  
  // Assessment metadata
  sessionId: null,
  startTime: null,
  duration: 0,
  totalQuestions: 0,
  
  // Results
  results: null,
  resultsLoading: false,
  
  // Progress tracking
  completionPercentage: 0,
  
  // Assessment history
  previousAssessments: [],
  
  // Temporary state for unsaved progress
  hasUnsavedChanges: false,
  
  // Exit confirmation
  showExitModal: false,
};

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    // Progress management
    startAssessment: (state, action) => {
      state.startTime = new Date().toISOString();
      state.totalQuestions = action.payload.totalQuestions || 0;
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.completionPercentage = 0;
      state.hasUnsavedChanges = false;
    },
    
    setCurrentQuestion: (state, action) => {
      state.currentQuestionIndex = action.payload;
      state.completionPercentage = Math.round(
        ((action.payload) / state.totalQuestions) * 100
      );
    },
    
    answerQuestion: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
      state.hasUnsavedChanges = true;
      
      // Update completion percentage based on answered questions
      const answeredCount = Object.keys(state.answers).length;
      state.completionPercentage = Math.round(
        (answeredCount / state.totalQuestions) * 100
      );
    },
    
    // Navigation
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex < state.totalQuestions - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    
    goToPreviousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    
    jumpToQuestion: (state, action) => {
      const questionIndex = action.payload;
      if (questionIndex >= 0 && questionIndex < state.totalQuestions) {
        state.currentQuestionIndex = questionIndex;
      }
    },
    
    // Save/Load progress
    saveProgress: (state) => {
      const progressData = {
        currentQuestionIndex: state.currentQuestionIndex,
        answers: state.answers,
        startTime: state.startTime,
        totalQuestions: state.totalQuestions,
        timestamp: new Date().toISOString(),
      };
      
      localStorage.setItem('assessment_progress', JSON.stringify(progressData));
      state.hasUnsavedChanges = false;
    },
    
    loadProgress: (state) => {
      const savedProgress = localStorage.getItem('assessment_progress');
      if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        state.currentQuestionIndex = progressData.currentQuestionIndex;
        state.answers = progressData.answers;
        state.startTime = progressData.startTime;
        state.totalQuestions = progressData.totalQuestions;
        
        const answeredCount = Object.keys(state.answers).length;
        state.completionPercentage = Math.round(
          (answeredCount / state.totalQuestions) * 100
        );
      }
    },
    
    clearProgress: (state) => {
      localStorage.removeItem('assessment_progress');
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.startTime = null;
      state.completionPercentage = 0;
      state.hasUnsavedChanges = false;
    },
    
    // Results management
    setResults: (state, action) => {
      state.results = action.payload;
    },
    
    clearResults: (state) => {
      state.results = null;
    },
    
    // Modal management
    setShowExitModal: (state, action) => {
      state.showExitModal = action.payload;
    },
    
    // Error handling
    clearError: (state) => {
      state.error = null;
    },
    
    // Assessment history
    addToHistory: (state, action) => {
      state.previousAssessments.unshift(action.payload);
    },
  },
  
  extraReducers: (builder) => {
    builder
      // Start assessment session
      .addCase(startAssessmentSession.pending, (state) => {
        state.error = null;
      })
      .addCase(startAssessmentSession.fulfilled, (state, action) => {
        state.startTime = action.payload.startedAt;
        state.totalQuestions = action.payload.totalQuestions;
        state.sessionId = action.payload.sessionId;
        state.currentQuestionIndex = 0;
        state.answers = {};
        state.completionPercentage = 0;
        state.hasUnsavedChanges = false;
      })
      .addCase(startAssessmentSession.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Save assessment answer  
      .addCase(saveAssessmentAnswer.pending, (state) => {
        state.error = null;
      })
      .addCase(saveAssessmentAnswer.fulfilled, (state, action) => {
        const { answerData, progress } = action.payload;
        state.answers[answerData.questionId] = answerData.selectedOption;
        state.completionPercentage = progress.completionPercentage;
        state.hasUnsavedChanges = false;
      })
      .addCase(saveAssessmentAnswer.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Submit assessment
      .addCase(submitAssessment.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(submitAssessment.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.results = action.payload;
        state.hasUnsavedChanges = false;
        
        // Add to history
        const assessmentRecord = {
          id: action.payload.id,
          completedAt: new Date().toISOString(),
          duration: state.duration,
          score: action.payload.score,
        };
        state.previousAssessments.unshift(assessmentRecord);
        
        // Clear progress
        localStorage.removeItem('assessment_progress');
      })
      .addCase(submitAssessment.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload;
      })
      
      // Get results
      .addCase(getAssessmentResults.pending, (state) => {
        state.resultsLoading = true;
        state.error = null;
      })
      .addCase(getAssessmentResults.fulfilled, (state, action) => {
        state.resultsLoading = false;
        state.results = action.payload;
      })
      .addCase(getAssessmentResults.rejected, (state, action) => {
        state.resultsLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  startAssessment,
  setCurrentQuestion,
  answerQuestion,
  goToNextQuestion,
  goToPreviousQuestion,
  jumpToQuestion,
  saveProgress,
  loadProgress,
  clearProgress,
  setResults,
  clearResults,
  setShowExitModal,
  clearError,
  addToHistory,
} = assessmentSlice.actions;

// Export async thunks
export { startAssessmentSession, saveAssessmentAnswer };

// Selectors
export const selectCurrentQuestionIndex = (state) => state.assessment.currentQuestionIndex;
export const selectAnswers = (state) => state.assessment.answers;
export const selectIsSubmitting = (state) => state.assessment.isSubmitting;
export const selectAssessmentError = (state) => state.assessment.error;
export const selectCompletionPercentage = (state) => state.assessment.completionPercentage;
export const selectResults = (state) => state.assessment.results;
export const selectResultsLoading = (state) => state.assessment.resultsLoading;
export const selectHasUnsavedChanges = (state) => state.assessment.hasUnsavedChanges;
export const selectShowExitModal = (state) => state.assessment.showExitModal;
export const selectPreviousAssessments = (state) => state.assessment.previousAssessments;

// Derived selectors
export const selectCurrentAnswer = (questionId) => (state) => 
  state.assessment.answers[questionId];

export const selectCanGoNext = (state) => 
  state.assessment.currentQuestionIndex < state.assessment.totalQuestions - 1;

export const selectCanGoBack = (state) => 
  state.assessment.currentQuestionIndex > 0;

export const selectIsLastQuestion = (state) => 
  state.assessment.currentQuestionIndex === state.assessment.totalQuestions - 1;

export default assessmentSlice.reducer; 
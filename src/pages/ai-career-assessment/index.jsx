import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ProgressBar from './components/ProgressBar';
import QuestionCard from './components/QuestionCard';
import MultipleChoiceQuestion from './components/MultipleChoiceQuestion';
import NavigationButtons from './components/NavigationButtons';
import LoadingSpinner from './components/LoadingSpinner';
import ExitConfirmationModal from './components/ExitConfirmationModal';
import AssessmentHeader from './components/AssessmentHeader';
import UserProfileSetup from './components/UserProfileSetup';
import AdaptiveAssessmentEngine from './components/AdaptiveAssessmentEngine';

const AICareerAssessment = () => {
  const navigate = useNavigate();
  const [profileComplete, setProfileComplete] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [assessmentStartTime] = useState(new Date());
  const [assessmentEngine] = useState(new AdaptiveAssessmentEngine());
  const [questionHistory, setQuestionHistory] = useState([]);
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false);

  // Initialize the first question when profile is complete
  useEffect(() => {
    if (profileComplete && !currentQuestion) {
      const firstQuestion = assessmentEngine.getNextQuestion(answers);
      setCurrentQuestion(firstQuestion);
    }
  }, [profileComplete, currentQuestion, answers, assessmentEngine]);

  // Check if assessment is complete
  useEffect(() => {
    if (profileComplete && assessmentEngine.isAssessmentComplete(answers)) {
      setIsAssessmentComplete(true);
    }
  }, [answers, profileComplete, assessmentEngine]);

  // Auto-submit when assessment is complete
  useEffect(() => {
    if (isAssessmentComplete && !isLoading) {
      handleSubmitAssessment();
    }
  }, [isAssessmentComplete, isLoading]);

  const handleProfileComplete = (profile) => {
    setUserProfile(profile);
    setProfileComplete(true);
    
    // Store profile in localStorage
    localStorage.setItem('userProfile', JSON.stringify(profile));
  };

  const handleAnswer = (answer) => {
    if (!currentQuestion) return;

    const newAnswers = {
      ...answers,
      [currentQuestion.id]: answer
    };
    
    setAnswers(newAnswers);
    assessmentEngine.markQuestionAnswered(currentQuestion.id);
    
    // Store progress in localStorage
    localStorage.setItem('assessment_progress', JSON.stringify({
      answers: newAnswers,
      completedQuestions: Array.from(assessmentEngine.answeredQuestions),
      timestamp: new Date().toISOString()
    }));

    // Add to history
    setQuestionHistory(prev => [...prev, {
      question: currentQuestion,
      answer: answer,
      timestamp: new Date()
    }]);
  };

  const handleNext = async () => {
    if (!currentQuestion || !answers[currentQuestion.id]) return;

    setIsLoading(true);
    
    // Small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const nextQuestion = assessmentEngine.getNextQuestion(answers);
    
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
    } else {
      setIsAssessmentComplete(true);
    }
    
    setIsLoading(false);
  };

  const handlePrevious = () => {
    if (questionHistory.length === 0) return;

    const previousEntry = questionHistory[questionHistory.length - 1];
    setCurrentQuestion(previousEntry.question);
    
    // Remove the last question from history
    setQuestionHistory(prev => prev.slice(0, -1));
    
    // Remove from answered questions set
    assessmentEngine.answeredQuestions.delete(currentQuestion.id);
    
    // Remove answer
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion.id];
    setAnswers(newAnswers);
  };

  const handleSubmitAssessment = async () => {
    setIsLoading(true);
    
    try {
      const assessmentData = {
        userProfile,
        answers,
        insights: assessmentEngine.generateInsights(answers),
        completionTime: new Date() - assessmentStartTime,
        totalQuestions: assessmentEngine.answeredQuestions.size,
        questionHistory: questionHistory.map(entry => ({
          questionId: entry.question.id,
          questionText: entry.question.text,
          answer: entry.answer,
          timestamp: entry.timestamp
        }))
      };

      // Store results
      localStorage.setItem('assessment_results', JSON.stringify(assessmentData));
      
      // Clear progress since we're complete
      localStorage.removeItem('assessment_progress');
      
      navigate('/assessment-results');
    } catch (error) {
      console.error('Assessment submission error:', error);
      // Still navigate to results with current data
      navigate('/assessment-results');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExit = () => {
    setShowExitModal(true);
  };

  const confirmExit = () => {
    // Store current progress before leaving
    localStorage.setItem('assessment_progress', JSON.stringify({
      answers,
      completedQuestions: Array.from(assessmentEngine.answeredQuestions),
      userProfile,
      timestamp: new Date().toISOString()
    }));
    
    navigate('/');
  };

  const cancelExit = () => {
    setShowExitModal(false);
  };

  // Loading state
  if (!profileComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>RoleVista - AI Career Assessment</title>
          <meta name="description" content="Discover your ideal career path with our AI-powered assessment based on your skills, interests, and values." />
        </Helmet>
        
        <AssessmentHeader 
          onExit={handleExit}
          userProfile={userProfile}
        />
        
        <main className="pt-20">
          <UserProfileSetup onComplete={handleProfileComplete} />
        </main>
        
        <ExitConfirmationModal
          isOpen={showExitModal}
          onConfirm={confirmExit}
          onCancel={cancelExit}
        />
      </div>
    );
  }

  // Assessment completed
  if (isAssessmentComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl">✨</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Assessment Complete!
          </h2>
          <p className="text-muted-foreground mb-6">
            Analyzing your responses and generating personalized career recommendations...
          </p>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Main assessment interface
  const progress = assessmentEngine.getProgress(answers);
  const canGoNext = currentQuestion && answers[currentQuestion.id] && 
    (currentQuestion.type !== 'multiple-choice' || 
     (Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].length > 0));
  const canGoPrevious = questionHistory.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>RoleVista - AI Career Assessment</title>
        <meta name="description" content="Discover your ideal career path with our AI-powered assessment." />
      </Helmet>
      
      <AssessmentHeader 
        onExit={handleExit}
        userProfile={userProfile}
      />
      
      <main className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProgressBar 
            current={assessmentEngine.answeredQuestions.size + 1} 
            total={assessmentEngine.getTotalExpectedQuestions(answers)}
            percentage={progress}
          />
          
          <div className="mt-8">
            {currentQuestion && (
              <>
                {currentQuestion.type === 'multiple-choice' ? (
                  <MultipleChoiceQuestion
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    selectedAnswers={answers[currentQuestion.id] || []}
                  />
                ) : (
                  <QuestionCard
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    selectedAnswer={answers[currentQuestion.id]}
                  />
                )}
                
                <NavigationButtons
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  canGoNext={canGoNext}
                  canGoPrevious={canGoPrevious}
                  isLoading={isLoading}
                  nextButtonText={
                    assessmentEngine.getNextQuestion(answers) ? 'Continue' : 'Complete Assessment'
                  }
                />
              </>
            )}
          </div>
        </div>
      </main>
      
      <ExitConfirmationModal
        isOpen={showExitModal}
        onConfirm={confirmExit}
        onCancel={cancelExit}
      />
    </div>
  );
};

export default AICareerAssessment;
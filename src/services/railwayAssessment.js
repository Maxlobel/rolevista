// Railway Backend Assessment Service
import { matchCareersToAnswers, generateSkillsAnalysis } from '../utils/careerMatcher'

const API_BASE_URL = import.meta.env.VITE_RAILWAY_API_URL || 'http://localhost:5000'

export const railwayAssessmentService = {

  // Start a new assessment session
  async startAssessment(totalQuestions = 15) {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) throw new Error('User not authenticated')

      const response = await fetch(`${API_BASE_URL}/api/assessments/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ totalQuestions }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start assessment')
      }

      return { session: data.data, error: null }
    } catch (error) {
      console.error('Start assessment error:', error)
      return { session: null, error: error.message }
    }
  },

  // Get current assessment session
  async getCurrentSession(userId) {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) throw new Error('User not authenticated')

      const response = await fetch(`${API_BASE_URL}/api/assessments/current`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 404) {
          return { session: null, error: null } // No current session
        }
        throw new Error('Failed to get current session')
      }

      const data = await response.json()
      return { session: data.data, error: null }
    } catch (error) {
      console.error('Get current session error:', error)
      return { session: null, error: error.message }
    }
  },

  // Save an assessment answer
  async saveAnswer(sessionId, questionData, answerData, timeSpent = 0) {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) throw new Error('User not authenticated')

      const response = await fetch(`${API_BASE_URL}/api/assessments/${sessionId}/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          questionId: questionData.id,
          questionText: questionData.text,
          questionType: questionData.type,
          selectedOption: answerData.value,
          optionLabel: answerData.label,
          optionDescription: answerData.description || '',
          timeSpentSeconds: timeSpent,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save answer')
      }

      return { 
        answer: data.data.answer, 
        progress: data.data.progress, 
        error: null 
      }
    } catch (error) {
      console.error('Save answer error:', error)
      return { answer: null, progress: null, error: error.message }
    }
  },

  // Complete assessment and generate results
  async completeAssessment(sessionId) {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) throw new Error('User not authenticated')

      const response = await fetch(`${API_BASE_URL}/api/assessments/${sessionId}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete assessment')
      }

      // Generate career recommendations using our matching engine
      const careerMatches = matchCareersToAnswers(data.data.answers)
      const skillsAnalysis = generateSkillsAnalysis(data.data.answers)

      return { 
        results: data.data.results, 
        careerMatches, 
        skillsAnalysis, 
        error: null 
      }
    } catch (error) {
      console.error('Complete assessment error:', error)
      return { results: null, careerMatches: [], skillsAnalysis: null, error: error.message }
    }
  },

  // Get assessment results for a user
  async getAssessmentResults(userId, sessionId = null) {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) throw new Error('User not authenticated')

      let url = `${API_BASE_URL}/api/assessments/results`
      if (sessionId) {
        url += `?sessionId=${sessionId}`
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get assessment results')
      }

      return { 
        results: sessionId ? data.data : data.data.results, 
        error: null 
      }
    } catch (error) {
      console.error('Get assessment results error:', error)
      return { results: null, error: error.message }
    }
  },

  // Get user's assessment history
  async getAssessmentHistory(userId) {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) throw new Error('User not authenticated')

      const response = await fetch(`${API_BASE_URL}/api/assessments/history`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get assessment history')
      }

      return { history: data.data, error: null }
    } catch (error) {
      console.error('Get assessment history error:', error)
      return { history: [], error: error.message }
    }
  },

  // Get session answers
  async getSessionAnswers(sessionId) {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) throw new Error('User not authenticated')

      const response = await fetch(`${API_BASE_URL}/api/assessments/${sessionId}/answers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get session answers')
      }

      return { answers: data.data, error: null }
    } catch (error) {
      console.error('Get session answers error:', error)
      return { answers: [], error: error.message }
    }
  },

  // Generate recommended actions based on results
  generateRecommendedActions(careerMatches, skillsAnalysis) {
    const actions = []

    if (careerMatches.length > 0) {
      const topMatch = careerMatches[0]
      actions.push({
        type: 'career_exploration',
        title: `Explore ${topMatch.title} Opportunities`,
        description: `Research job openings and requirements for ${topMatch.title} roles`,
        priority: 'high'
      })

      actions.push({
        type: 'networking',
        title: 'Connect with Industry Professionals',
        description: `Reach out to ${topMatch.title} professionals on LinkedIn`,
        priority: 'medium'
      })
    }

    if (skillsAnalysis?.developing?.length > 0) {
      const topSkillGap = skillsAnalysis.developing[0]
      actions.push({
        type: 'skill_development',
        title: `Improve ${topSkillGap.name}`,
        description: `Focus on developing your ${topSkillGap.name} skills through courses or practice`,
        priority: 'high'
      })
    }

    actions.push({
      type: 'profile_optimization',
      title: 'Complete Your Profile',
      description: 'Add more details to your profile for better job matching',
      priority: 'medium'
    })

    return actions
  },

  // Delete assessment session and related data
  async deleteAssessmentSession(sessionId) {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) throw new Error('User not authenticated')

      const response = await fetch(`${API_BASE_URL}/api/assessments/${sessionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete assessment session')
      }

      return { error: null }
    } catch (error) {
      console.error('Delete assessment session error:', error)
      return { error: error.message }
    }
  },

  // Check if Railway backend is configured
  isConfigured() {
    // Railway backend is always "configured" since it's our own API
    return true
  }
}

export default railwayAssessmentService 
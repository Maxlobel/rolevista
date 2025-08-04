import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { matchCareersToAnswers, generateSkillsAnalysis } from '../utils/careerMatcher'
import { authService } from './auth'

// Assessment Service for Supabase
export const assessmentService = {

  // Start a new assessment session
  async startAssessment(totalQuestions = 15) {
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        return { session: null, error: 'Supabase not configured. Using demo mode.' }
      }

      const { user } = await authService.getCurrentUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('assessment_sessions')
        .insert([{
          user_id: user.id,
          total_questions: totalQuestions,
          session_status: 'in_progress',
          user_agent: navigator.userAgent,
          started_at: new Date().toISOString()
        }])
        .select()

      if (error) throw error

      // Track assessment start activity
      await authService.trackActivity(user.id, 'assessment_start', 'User started career assessment', {
        session_id: data[0].id,
        total_questions: totalQuestions
      })

      return { session: data[0], error: null }
    } catch (error) {
      console.error('Start assessment error:', error)
      return { session: null, error: error.message }
    }
  },

  // Get current assessment session
  async getCurrentSession(userId) {
    try {
      const { data, error } = await supabase
        .from('assessment_sessions')
        .select('*')
        .eq('user_id', userId)
        .eq('session_status', 'in_progress')
        .order('started_at', { ascending: false })
        .limit(1)

      if (error) throw error
      return { session: data[0] || null, error: null }
    } catch (error) {
      console.error('Get current session error:', error)
      return { session: null, error: error.message }
    }
  },

  // Save an assessment answer
  async saveAnswer(sessionId, questionData, answerData, timeSpent = 0) {
    try {
      const { user } = await authService.getCurrentUser()
      if (!user) throw new Error('User not authenticated')

      // Save the answer
      const { data: answerResult, error: answerError } = await supabase
        .from('assessment_answers')
        .insert([{
          session_id: sessionId,
          user_id: user.id,
          question_id: questionData.id,
          question_text: questionData.text,
          question_type: questionData.type,
          selected_option: answerData.value,
          option_label: answerData.label,
          option_description: answerData.description || '',
          time_spent_seconds: timeSpent,
          answered_at: new Date().toISOString()
        }])
        .select()

      if (answerError) throw answerError

      // Update session progress
      const { data: sessionData, error: sessionError } = await supabase
        .from('assessment_sessions')
        .select('answered_questions, total_questions')
        .eq('id', sessionId)
        .single()

      if (sessionError) throw sessionError

      const newAnsweredCount = (sessionData.answered_questions || 0) + 1
      const completionPercentage = Math.round((newAnsweredCount / sessionData.total_questions) * 100)

      const { error: updateError } = await supabase
        .from('assessment_sessions')
        .update({
          answered_questions: newAnsweredCount,
          completion_percentage: completionPercentage
        })
        .eq('id', sessionId)

      if (updateError) throw updateError

      return { 
        answer: answerResult[0], 
        progress: { 
          answered: newAnsweredCount, 
          total: sessionData.total_questions,
          completion_percentage: completionPercentage 
        }, 
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
      const { user } = await authService.getCurrentUser()
      if (!user) throw new Error('User not authenticated')

      // Get all answers for this session
      const { data: answers, error: answersError } = await supabase
        .from('assessment_answers')
        .select('question_id, selected_option, option_label, option_description')
        .eq('session_id', sessionId)
        .order('answered_at')

      if (answersError) throw answersError

      // Convert answers to format expected by career matcher
      const answersMap = {}
      answers.forEach(answer => {
        answersMap[answer.question_id] = answer.selected_option
      })

      // Generate career recommendations using our matching engine
      const careerMatches = matchCareersToAnswers(answersMap)
      const skillsAnalysis = generateSkillsAnalysis(answersMap)

      // Calculate overall score (average of top 3 career matches)
      const overallScore = careerMatches.length > 0 
        ? Math.round(careerMatches.slice(0, 3).reduce((sum, match) => sum + match.fitScore, 0) / Math.min(3, careerMatches.length))
        : 0

      // Determine career archetype based on top match
      const careerArchetype = careerMatches.length > 0 ? careerMatches[0].title : 'Exploring'

      // Save assessment results
      const { data: results, error: resultsError } = await supabase
        .from('assessment_results')
        .insert([{
          session_id: sessionId,
          user_id: user.id,
          overall_score: overallScore,
          career_archetype: careerArchetype,
          top_career_matches: careerMatches,
          skills_analysis: skillsAnalysis,
          career_recommendations: {
            primary_matches: careerMatches.slice(0, 3),
            skills_to_develop: skillsAnalysis.developing,
            recommended_actions: this.generateRecommendedActions(careerMatches, skillsAnalysis)
          },
          generated_at: new Date().toISOString()
        }])
        .select()

      if (resultsError) throw resultsError

      // Update session as completed
      const startTime = await this.getSessionStartTime(sessionId)
      const durationMinutes = startTime ? Math.round((new Date() - new Date(startTime)) / 60000) : 0

      const { error: sessionUpdateError } = await supabase
        .from('assessment_sessions')
        .update({
          session_status: 'completed',
          completed_at: new Date().toISOString(),
          duration_minutes: durationMinutes,
          completion_percentage: 100
        })
        .eq('id', sessionId)

      if (sessionUpdateError) throw sessionUpdateError

      // Track assessment completion activity
      await authService.trackActivity(user.id, 'assessment_complete', 'User completed career assessment', {
        session_id: sessionId,
        overall_score: overallScore,
        career_archetype: careerArchetype,
        duration_minutes: durationMinutes,
        top_matches: careerMatches.slice(0, 3).map(match => match.title)
      })

      return { 
        results: results[0], 
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
      let query = supabase
        .from('assessment_results')
        .select(`
          *,
          assessment_sessions (
            started_at,
            completed_at,
            duration_minutes,
            completion_percentage
          )
        `)
        .eq('user_id', userId)

      if (sessionId) {
        query = query.eq('session_id', sessionId)
      }

      const { data, error } = await query
        .order('generated_at', { ascending: false })
        .limit(sessionId ? 1 : 10)

      if (error) throw error

      return { 
        results: sessionId ? (data[0] || null) : data, 
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
      const { data, error } = await supabase
        .from('assessment_sessions')
        .select(`
          *,
          assessment_results (
            overall_score,
            career_archetype,
            generated_at
          )
        `)
        .eq('user_id', userId)
        .order('started_at', { ascending: false })

      if (error) throw error
      return { history: data, error: null }
    } catch (error) {
      console.error('Get assessment history error:', error)
      return { history: [], error: error.message }
    }
  },

  // Get session answers
  async getSessionAnswers(sessionId) {
    try {
      const { data, error } = await supabase
        .from('assessment_answers')
        .select('*')
        .eq('session_id', sessionId)
        .order('answered_at')

      if (error) throw error
      return { answers: data, error: null }
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

  // Helper function to get session start time
  async getSessionStartTime(sessionId) {
    try {
      const { data, error } = await supabase
        .from('assessment_sessions')
        .select('started_at')
        .eq('id', sessionId)
        .single()

      if (error) throw error
      return data.started_at
    } catch (error) {
      console.error('Get session start time error:', error)
      return null
    }
  },

  // Delete assessment session and related data
  async deleteAssessmentSession(sessionId) {
    try {
      const { user } = await authService.getCurrentUser()
      if (!user) throw new Error('User not authenticated')

      // Delete in order due to foreign key constraints
      await supabase.from('assessment_results').delete().eq('session_id', sessionId)
      await supabase.from('assessment_answers').delete().eq('session_id', sessionId)
      const { error } = await supabase.from('assessment_sessions').delete().eq('id', sessionId).eq('user_id', user.id)

      if (error) throw error

      // Track deletion activity
      await authService.trackActivity(user.id, 'assessment_delete', 'User deleted assessment session', {
        deleted_session_id: sessionId
      })

      return { error: null }
    } catch (error) {
      console.error('Delete assessment session error:', error)
      return { error: error.message }
    }
  }
}

export default assessmentService 
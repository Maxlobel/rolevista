import { supabase, handleSupabaseError, getCurrentUser } from '../lib/supabase'

/**
 * Assessment service using Supabase database
 * Replaces the previous Express.js backend assessment functionality
 */
class AssessmentService {
  /**
   * Start a new assessment session
   */
  async startAssessment({ totalQuestions = 15 }) {
    try {
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User must be authenticated to start assessment')
      }

      // Create assessment session
      const { data, error } = await supabase
        .from('assessment_sessions')
        .insert({
          user_id: user.id,
          total_questions: totalQuestions,
          session_status: 'in_progress',
          user_agent: navigator.userAgent
        })
        .select()
        .single()

      if (error) throw error

      // Log activity
      await this.logActivity({
        userId: user.id,
        activityType: 'assessment_started',
        description: 'Started new career assessment',
        metadata: { sessionId: data.id, totalQuestions }
      })

      return {
        success: true,
        data: {
          sessionId: data.id,
          totalQuestions,
          startedAt: data.started_at
        }
      }
    } catch (error) {
      console.error('Start assessment error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Save an assessment answer
   */
  async saveAnswer({
    sessionId,
    questionId,
    questionText,
    questionType,
    selectedOption,
    optionLabel,
    optionDescription = null,
    answerOrder = null,
    timeSpentSeconds = null
  }) {
    try {
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User must be authenticated to save answers')
      }

      // Verify session belongs to user and get session details
      const { data: session, error: sessionError } = await supabase
        .from('assessment_sessions')
        .select('*')
        .eq('id', sessionId)
        .eq('user_id', user.id)
        .single()

      if (sessionError || !session) {
        throw new Error('Assessment session not found or access denied')
      }

      // Save the answer
      const { error: answerError } = await supabase
        .from('assessment_answers')
        .insert({
          session_id: sessionId,
          user_id: user.id,
          question_id: questionId,
          question_text: questionText,
          question_type: questionType,
          selected_option: selectedOption,
          option_label: optionLabel,
          option_description: optionDescription,
          answer_order: answerOrder,
          time_spent_seconds: timeSpentSeconds
        })

      if (answerError) throw answerError

      // Get current answer count to update progress
      const { data: answers, error: answersError } = await supabase
        .from('assessment_answers')
        .select('id')
        .eq('session_id', sessionId)

      if (answersError) throw answersError

      const answeredQuestions = answers.length
      const completionPercentage = Math.round((answeredQuestions / session.total_questions) * 100)

      // Update session progress
      const { error: updateError } = await supabase
        .from('assessment_sessions')
        .update({
          answered_questions: answeredQuestions,
          completion_percentage: completionPercentage
        })
        .eq('id', sessionId)

      if (updateError) throw updateError

      // Log activity
      await this.logActivity({
        userId: user.id,
        activityType: 'assessment_answer_saved',
        description: `Answered question ${questionId}`,
        metadata: {
          sessionId,
          questionId,
          questionType,
          completionPercentage
        }
      })

      return {
        success: true,
        data: {
          answeredQuestions,
          totalQuestions: session.total_questions,
          completionPercentage,
          isComplete: completionPercentage === 100
        }
      }
    } catch (error) {
      console.error('Save answer error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Get assessment progress
   */
  async getProgress(sessionId) {
    try {
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User must be authenticated to get progress')
      }

      // Get session details
      const { data: session, error: sessionError } = await supabase
        .from('assessment_sessions')
        .select('*')
        .eq('id', sessionId)
        .eq('user_id', user.id)
        .single()

      if (sessionError || !session) {
        throw new Error('Assessment session not found or access denied')
      }

      // Get all answers for this session
      const { data: answers, error: answersError } = await supabase
        .from('assessment_answers')
        .select('*')
        .eq('session_id', sessionId)
        .order('answered_at', { ascending: true })

      if (answersError) throw answersError

      return {
        success: true,
        data: {
          session: {
            id: session.id,
            status: session.session_status,
            startedAt: session.started_at,
            totalQuestions: session.total_questions,
            answeredQuestions: session.answered_questions || 0,
            completionPercentage: session.completion_percentage || 0
          },
          answers: answers.map(answer => ({
            questionId: answer.question_id,
            questionText: answer.question_text,
            questionType: answer.question_type,
            selectedOption: answer.selected_option,
            optionLabel: answer.option_label,
            optionDescription: answer.option_description,
            answeredAt: answer.answered_at,
            timeSpentSeconds: answer.time_spent_seconds
          }))
        }
      }
    } catch (error) {
      console.error('Get progress error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Complete assessment and generate results
   */
  async completeAssessment(sessionId, additionalData = {}) {
    try {
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User must be authenticated to complete assessment')
      }

      // Get session and answers
      const { data: session, error: sessionError } = await supabase
        .from('assessment_sessions')
        .select('*')
        .eq('id', sessionId)
        .eq('user_id', user.id)
        .single()

      if (sessionError || !session) {
        throw new Error('Assessment session not found or access denied')
      }

      const { data: answers, error: answersError } = await supabase
        .from('assessment_answers')
        .select('*')
        .eq('session_id', sessionId)
        .order('answered_at', { ascending: true })

      if (answersError) throw answersError

      // Generate assessment results
      const results = this.generateResults(answers)

      // Calculate session duration
      const startTime = new Date(session.started_at).getTime()
      const endTime = Date.now()
      const durationMinutes = Math.round((endTime - startTime) / (1000 * 60))

      // Update session as completed
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

      // Save assessment results
      const { data: savedResults, error: resultsError } = await supabase
        .from('assessment_results')
        .insert({
          session_id: sessionId,
          user_id: user.id,
          overall_score: results.overallScore,
          career_archetype: results.careerArchetype,
          top_career_matches: results.recommendedRoles,
          skills_analysis: results.topSkills,
          personality_traits: results.personalityProfile,
          career_recommendations: results.recommendedRoles,
          strengths_analysis: results.strengthsAnalysis,
          improvement_areas: results.improvementAreas || [],
          detailed_analysis: results.detailedInsights || {}
        })
        .select()
        .single()

      if (resultsError) throw resultsError

      // Log completion
      await this.logActivity({
        userId: user.id,
        activityType: 'assessment_completed',
        description: 'Completed career assessment',
        metadata: {
          sessionId,
          totalAnswers: answers.length,
          overallScore: results.overallScore,
          durationMinutes
        }
      })

      return {
        success: true,
        data: {
          sessionId,
          completedAt: new Date().toISOString(),
          durationMinutes,
          results: {
            ...results,
            id: savedResults.id
          }
        }
      }
    } catch (error) {
      console.error('Complete assessment error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Get user's assessment history
   */
  async getAssessmentHistory() {
    try {
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User must be authenticated to get history')
      }

      const { data: sessions, error } = await supabase
        .from('assessment_sessions')
        .select(`
          *,
          assessment_results (*)
        `)
        .eq('user_id', user.id)
        .order('started_at', { ascending: false })

      if (error) throw error

      const assessments = sessions.map(session => ({
        id: session.id,
        status: session.session_status,
        startedAt: session.started_at,
        completedAt: session.completed_at,
        totalQuestions: session.total_questions,
        answeredQuestions: session.answered_questions,
        completionPercentage: session.completion_percentage,
        durationMinutes: session.duration_minutes,
        results: session.assessment_results?.[0] ? {
          overallScore: session.assessment_results[0].overall_score,
          careerArchetype: session.assessment_results[0].career_archetype,
          topCareerMatches: session.assessment_results[0].top_career_matches
        } : null
      }))

      return {
        success: true,
        data: {
          assessments,
          totalAssessments: assessments.length,
          lastAssessment: assessments[0] || null,
          completedAssessments: assessments.filter(a => a.status === 'completed').length
        }
      }
    } catch (error) {
      console.error('Get assessment history error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Get specific assessment results
   */
  async getAssessmentResults(sessionId) {
    try {
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User must be authenticated to get results')
      }

      const { data, error } = await supabase
        .from('assessment_results')
        .select(`
          *,
          assessment_sessions (
            started_at,
            completed_at,
            duration_minutes,
            total_questions,
            answered_questions
          )
        `)
        .eq('session_id', sessionId)
        .eq('user_id', user.id)
        .single()

      if (error) throw error

      return {
        success: true,
        data: {
          id: data.id,
          sessionId: data.session_id,
          overallScore: data.overall_score,
          careerArchetype: data.career_archetype,
          topCareerMatches: data.top_career_matches,
          skillsAnalysis: data.skills_analysis,
          personalityTraits: data.personality_traits,
          careerRecommendations: data.career_recommendations,
          strengthsAnalysis: data.strengths_analysis,
          improvementAreas: data.improvement_areas,
          detailedAnalysis: data.detailed_analysis,
          generatedAt: data.generated_at,
          session: {
            startedAt: data.assessment_sessions.started_at,
            completedAt: data.assessment_sessions.completed_at,
            durationMinutes: data.assessment_sessions.duration_minutes,
            totalQuestions: data.assessment_sessions.total_questions,
            answeredQuestions: data.assessment_sessions.answered_questions
          }
        }
      }
    } catch (error) {
      console.error('Get assessment results error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Generate assessment results from answers
   * This replicates the logic from the backend
   */
  generateResults(answers) {
    // Basic scoring logic - this would be much more sophisticated in a real app
    const skillCategories = {
      technical: 0,
      communication: 0,
      leadership: 0,
      creativity: 0,
      analytical: 0
    }

    const personalityTraits = {
      extroversion: 0,
      openness: 0,
      conscientiousness: 0,
      agreeableness: 0,
      neuroticism: 0
    }

    // Analyze answers to determine scores
    answers.forEach(answer => {
      // Simple scoring based on question types and answers
      switch (answer.question_type) {
        case 'rating':
          if (answer.selected_option === 'advanced' || answer.selected_option === 'expert') {
            skillCategories.technical += 2
          }
          break
        case 'preference':
          if (answer.selected_option === 'collaborative') {
            personalityTraits.extroversion += 1
            skillCategories.communication += 1
          }
          break
        case 'behavioral':
          if (answer.selected_option.includes('lead')) {
            skillCategories.leadership += 2
          }
          break
        case 'values':
          if (answer.selected_option.includes('creative')) {
            skillCategories.creativity += 1
          }
          break
        case 'goals':
          if (answer.selected_option.includes('analyze')) {
            skillCategories.analytical += 1
          }
          break
      }
    })

    // Calculate overall score
    const totalSkillPoints = Object.values(skillCategories).reduce((sum, val) => sum + val, 0)
    const overallScore = Math.min(100, Math.max(0, Math.round((totalSkillPoints / answers.length) * 20)))

    // Determine career archetype based on highest skills
    const topSkill = Object.entries(skillCategories).reduce((a, b) => 
      skillCategories[a[0]] > skillCategories[b[0]] ? a : b
    )[0]

    const archetypes = {
      technical: 'The Innovator',
      communication: 'The Connector',
      leadership: 'The Visionary',
      creativity: 'The Creator',
      analytical: 'The Strategist'
    }

    const rolesByArchetype = {
      technical: ['Software Engineer', 'Data Scientist', 'DevOps Engineer', 'Technical Architect'],
      communication: ['Product Manager', 'Marketing Manager', 'Sales Director', 'HR Business Partner'],
      leadership: ['Team Lead', 'VP of Engineering', 'Director of Operations', 'Chief Technology Officer'],
      creativity: ['UX Designer', 'Creative Director', 'Content Strategist', 'Brand Manager'],
      analytical: ['Data Analyst', 'Business Analyst', 'Strategy Consultant', 'Financial Analyst']
    }

    return {
      overallScore,
      careerArchetype: archetypes[topSkill] || 'The Explorer',
      topSkills: Object.entries(skillCategories)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([skill]) => skill),
      recommendedRoles: rolesByArchetype[topSkill] || [
        'Software Engineer',
        'Product Manager',
        'Data Analyst',
        'UX Designer',
        'Marketing Specialist'
      ],
      strengthsAnalysis: {
        primary: topSkill,
        secondary: Object.entries(skillCategories).sort(([,a], [,b]) => b - a)[1][0],
        skillScores: skillCategories
      },
      personalityProfile: personalityTraits,
      detailedInsights: {
        workStyle: 'Collaborative and detail-oriented',
        idealEnvironment: 'Dynamic team with growth opportunities',
        developmentAreas: ['Public speaking', 'Strategic thinking']
      },
      improvementAreas: Object.entries(skillCategories)
        .sort(([,a], [,b]) => a - b)
        .slice(0, 2)
        .map(([skill]) => skill)
    }
  }

  /**
   * Log user activity (helper method)
   */
  async logActivity({ userId, activityType, description, metadata = {} }) {
    try {
      const { error } = await supabase
        .from('user_activities')
        .insert({
          user_id: userId,
          activity_type: activityType,
          activity_description: description,
          metadata,
          user_agent: navigator.userAgent
        })

      if (error) throw error
    } catch (error) {
      // Don't throw error for activity logging failures
      console.error('Log activity error:', error)
    }
  }
}

// Create and export singleton instance
export const assessmentService = new AssessmentService()
export default assessmentService 
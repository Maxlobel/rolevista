import { supabase, handleSupabaseError, getCurrentUser } from '../lib/supabase'

/**
 * User service using Supabase database
 * Handles user profile management, preferences, and data
 */
class UserService {
  /**
   * Get user profile information
   */
  async getUserProfile() {
    try {
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User must be authenticated to get profile')
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') { // Ignore "not found" errors
        throw error
      }

      // If no profile exists, create a basic one
      if (!data) {
        const newProfile = await this.createUserProfile({
          first_name: user.user_metadata?.first_name || '',
          last_name: user.user_metadata?.last_name || '',
          email: user.email
        })
        return {
          success: true,
          data: newProfile
        }
      }

      return {
        success: true,
        data: {
          id: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          phone: data.phone,
          location: data.location,
          dateOfBirth: data.date_of_birth,
          educationLevel: data.education_level,
          yearsOfExperience: data.years_of_experience,
          jobTitle: data.job_title,
          industry: data.industry,
          linkedinUrl: data.linkedin_url,
          profileCompletion: data.profile_completion_percentage,
          isPremium: data.is_premium,
          marketingConsent: data.marketing_consent,
          profileData: data.profile_data || {},
          preferences: data.preferences || {},
          createdAt: data.created_at,
          updatedAt: data.updated_at
        }
      }
    } catch (error) {
      console.error('Get user profile error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(updates) {
    try {
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User must be authenticated to update profile')
      }

      // Calculate profile completion percentage
      const profileCompletion = this.calculateProfileCompletion({
        ...updates,
        email: user.email // email is always present
      })

      // Prepare update data
      const updateData = {
        ...updates,
        profile_completion_percentage: profileCompletion,
        updated_at: new Date().toISOString()
      }

      // Convert camelCase to snake_case for database
      const dbUpdateData = this.convertToSnakeCase(updateData)

      const { data, error } = await supabase
        .from('user_profiles')
        .update(dbUpdateData)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error

      // Log activity
      await this.logActivity({
        userId: user.id,
        activityType: 'profile_updated',
        description: 'User updated profile information',
        metadata: { updatedFields: Object.keys(updates) }
      })

      return {
        success: true,
        data: {
          id: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          phone: data.phone,
          location: data.location,
          dateOfBirth: data.date_of_birth,
          educationLevel: data.education_level,
          yearsOfExperience: data.years_of_experience,
          jobTitle: data.job_title,
          industry: data.industry,
          linkedinUrl: data.linkedin_url,
          profileCompletion: data.profile_completion_percentage,
          isPremium: data.is_premium,
          marketingConsent: data.marketing_consent,
          profileData: data.profile_data || {},
          preferences: data.preferences || {},
          createdAt: data.created_at,
          updatedAt: data.updated_at
        }
      }
    } catch (error) {
      console.error('Update user profile error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Create user profile (usually called automatically on signup)
   */
  async createUserProfile(profileData) {
    try {
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User must be authenticated to create profile')
      }

      const profileCompletion = this.calculateProfileCompletion(profileData)

      const { data, error } = await supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          first_name: profileData.first_name || '',
          last_name: profileData.last_name || '',
          email: profileData.email || user.email,
          phone: profileData.phone || null,
          location: profileData.location || null,
          date_of_birth: profileData.date_of_birth || null,
          education_level: profileData.education_level || null,
          years_of_experience: profileData.years_of_experience || null,
          job_title: profileData.job_title || null,
          industry: profileData.industry || null,
          linkedin_url: profileData.linkedin_url || null,
          profile_completion_percentage: profileCompletion,
          is_premium: false,
          marketing_consent: profileData.marketing_consent || false,
          profile_data: profileData.profile_data || {},
          preferences: profileData.preferences || {}
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        phone: data.phone,
        location: data.location,
        dateOfBirth: data.date_of_birth,
        educationLevel: data.education_level,
        yearsOfExperience: data.years_of_experience,
        jobTitle: data.job_title,
        industry: data.industry,
        linkedinUrl: data.linkedin_url,
        profileCompletion: data.profile_completion_percentage,
        isPremium: data.is_premium,
        marketingConsent: data.marketing_consent,
        profileData: data.profile_data || {},
        preferences: data.preferences || {},
        createdAt: data.created_at,
        updatedAt: data.updated_at
      }
    } catch (error) {
      console.error('Create user profile error:', error)
      throw error
    }
  }

  /**
   * Update user preferences
   */
  async updatePreferences(preferences) {
    try {
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User must be authenticated to update preferences')
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          preferences,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select('preferences')
        .single()

      if (error) throw error

      // Log activity
      await this.logActivity({
        userId: user.id,
        activityType: 'preferences_updated',
        description: 'User updated preferences',
        metadata: { preferenceKeys: Object.keys(preferences) }
      })

      return {
        success: true,
        data: data.preferences
      }
    } catch (error) {
      console.error('Update preferences error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Get user activity history
   */
  async getUserActivity(limit = 50, offset = 0) {
    try {
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User must be authenticated to get activity')
      }

      const { data, error } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) throw error

      const activities = data.map(activity => ({
        id: activity.id,
        activityType: activity.activity_type,
        description: activity.activity_description,
        metadata: activity.metadata || {},
        createdAt: activity.created_at,
        ipAddress: activity.ip_address,
        userAgent: activity.user_agent
      }))

      return {
        success: true,
        data: {
          activities,
          totalActivities: data.length
        }
      }
    } catch (error) {
      console.error('Get user activity error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Update premium status
   */
  async updatePremiumStatus(isPremium) {
    try {
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User must be authenticated to update premium status')
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          is_premium: isPremium,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select('is_premium')
        .single()

      if (error) throw error

      // Log activity
      await this.logActivity({
        userId: user.id,
        activityType: isPremium ? 'premium_upgrade' : 'premium_downgrade',
        description: `User ${isPremium ? 'upgraded to' : 'downgraded from'} premium`,
        metadata: { newStatus: isPremium }
      })

      return {
        success: true,
        data: { isPremium: data.is_premium }
      }
    } catch (error) {
      console.error('Update premium status error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Delete user account and all associated data
   */
  async deleteUserAccount() {
    try {
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User must be authenticated to delete account')
      }

      // Log the deletion attempt
      await this.logActivity({
        userId: user.id,
        activityType: 'account_deletion_requested',
        description: 'User requested account deletion',
        metadata: { timestamp: new Date().toISOString() }
      })

      // Delete user data in order (due to foreign key constraints)
      await supabase.from('assessment_results').delete().eq('user_id', user.id)
      await supabase.from('assessment_answers').delete().eq('user_id', user.id)
      await supabase.from('assessment_sessions').delete().eq('user_id', user.id)
      await supabase.from('user_activities').delete().eq('user_id', user.id)
      await supabase.from('user_profiles').delete().eq('id', user.id)

      // Delete the auth user (this will cascade to other data if configured)
      const { error } = await supabase.auth.admin.deleteUser(user.id)
      if (error) throw error

      return {
        success: true,
        message: 'Account deleted successfully'
      }
    } catch (error) {
      console.error('Delete user account error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Calculate profile completion percentage
   */
  calculateProfileCompletion(profileData) {
    const requiredFields = [
      'first_name', 'last_name', 'email', 'phone', 'location',
      'years_of_experience', 'job_title', 'industry', 'education_level'
    ]

    const completedFields = requiredFields.filter(field => {
      const value = profileData[field] || profileData[this.convertToCamelCase(field)]
      return value && value.toString().trim().length > 0
    })

    return Math.round((completedFields.length / requiredFields.length) * 100)
  }

  /**
   * Convert camelCase object keys to snake_case
   */
  convertToSnakeCase(obj) {
    const result = {}
    for (const [key, value] of Object.entries(obj)) {
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
      result[snakeKey] = value
    }
    return result
  }

  /**
   * Convert snake_case object keys to camelCase
   */
  convertToCamelCase(str) {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase())
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

  /**
   * Search users (admin function - would need proper permissions)
   */
  async searchUsers(query, filters = {}) {
    try {
      let queryBuilder = supabase
        .from('user_profiles')
        .select('id, first_name, last_name, email, created_at, is_premium')

      if (query) {
        queryBuilder = queryBuilder.or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%`)
      }

      if (filters.isPremium !== undefined) {
        queryBuilder = queryBuilder.eq('is_premium', filters.isPremium)
      }

      if (filters.industry) {
        queryBuilder = queryBuilder.eq('industry', filters.industry)
      }

      const { data, error } = await queryBuilder
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error

      return {
        success: true,
        data: data.map(user => ({
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          createdAt: user.created_at,
          isPremium: user.is_premium
        }))
      }
    } catch (error) {
      console.error('Search users error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Get user statistics
   */
  async getUserStats() {
    try {
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('User must be authenticated to get stats')
      }

      // Get assessment count
      const { data: assessments, error: assessmentError } = await supabase
        .from('assessment_sessions')
        .select('id, session_status')
        .eq('user_id', user.id)

      if (assessmentError) throw assessmentError

      // Get activity count for last 30 days
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const { data: recentActivities, error: activityError } = await supabase
        .from('user_activities')
        .select('id')
        .eq('user_id', user.id)
        .gte('created_at', thirtyDaysAgo.toISOString())

      if (activityError) throw activityError

      const stats = {
        totalAssessments: assessments.length,
        completedAssessments: assessments.filter(a => a.session_status === 'completed').length,
        inProgressAssessments: assessments.filter(a => a.session_status === 'in_progress').length,
        recentActivityCount: recentActivities.length,
        accountAge: Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24))
      }

      return {
        success: true,
        data: stats
      }
    } catch (error) {
      console.error('Get user stats error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }
}

// Create and export singleton instance
export const userService = new UserService()
export default userService 
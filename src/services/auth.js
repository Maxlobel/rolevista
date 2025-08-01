import { supabase } from '../lib/supabase'

// Authentication Service for Supabase
export const authService = {
  
  // Sign up new user with email and password
  async signUp(email, password, userData = {}) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName || '',
            last_name: userData.lastName || '',
            phone: userData.phone || '',
          }
        }
      })

      if (error) throw error

      // If user is created, also create profile
      if (data.user) {
        await this.createUserProfile(data.user.id, {
          email,
          first_name: userData.firstName || '',
          last_name: userData.lastName || '',
          phone: userData.phone || '',
          location: userData.location || '',
          years_of_experience: userData.experience || '',
          current_role: userData.currentRole || '',
          industry: userData.industry || '',
          education_level: userData.education || '',
          marketing_consent: userData.marketingConsent || false
        })

        // Track user registration activity
        await this.trackActivity(data.user.id, 'user_registration', 'User created account', {
          registration_method: 'email',
          initial_profile_data: userData
        })
      }

      return { user: data.user, session: data.session, error: null }
    } catch (error) {
      console.error('Sign up error:', error)
      return { user: null, session: null, error: error.message }
    }
  },

  // Sign in existing user
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      // Track login activity
      if (data.user) {
        await this.trackActivity(data.user.id, 'login', 'User signed in', {
          login_method: 'email'
        })
      }

      return { user: data.user, session: data.session, error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { user: null, session: null, error: error.message }
    }
  },

  // Sign out current user
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Sign out error:', error)
      return { error: error.message }
    }
  },

  // Get current user session
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return { user, error: null }
    } catch (error) {
      console.error('Get current user error:', error)
      return { user: null, error: error.message }
    }
  },

  // Get current session
  async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return { session, error: null }
    } catch (error) {
      console.error('Get current session error:', error)
      return { session: null, error: error.message }
    }
  },

  // Reset password
  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Reset password error:', error)
      return { error: error.message }
    }
  },

  // Update user password
  async updatePassword(newPassword) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Update password error:', error)
      return { error: error.message }
    }
  },

  // Create user profile in database
  async createUserProfile(userId, profileData) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert([{
          id: userId,
          ...profileData,
          profile_completion_percentage: this.calculateProfileCompletion(profileData)
        }])
        .select()

      if (error) throw error
      return { profile: data[0], error: null }
    } catch (error) {
      console.error('Create user profile error:', error)
      return { profile: null, error: error.message }
    }
  },

  // Get user profile
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      return { profile: data, error: null }
    } catch (error) {
      console.error('Get user profile error:', error)
      return { profile: null, error: error.message }
    }
  },

  // Update user profile
  async updateUserProfile(userId, updates) {
    try {
      const updatedData = {
        ...updates,
        profile_completion_percentage: this.calculateProfileCompletion(updates),
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .update(updatedData)
        .eq('id', userId)
        .select()

      if (error) throw error

      // Track profile update activity
      await this.trackActivity(userId, 'profile_update', 'User updated profile', {
        updated_fields: Object.keys(updates)
      })

      return { profile: data[0], error: null }
    } catch (error) {
      console.error('Update user profile error:', error)
      return { profile: null, error: error.message }
    }
  },

  // Calculate profile completion percentage
  calculateProfileCompletion(profileData) {
    const requiredFields = [
      'first_name', 'last_name', 'email', 'phone', 'location', 
      'years_of_experience', 'current_role', 'industry'
    ]
    
    const completedFields = requiredFields.filter(field => 
      profileData[field] && profileData[field].toString().trim().length > 0
    )
    
    return Math.round((completedFields.length / requiredFields.length) * 100)
  },

  // Track user activity
  async trackActivity(userId, activityType, description, metadata = {}) {
    try {
      const { error } = await supabase
        .from('user_activities')
        .insert([{
          user_id: userId,
          activity_type: activityType,
          activity_description: description,
          metadata,
          user_agent: navigator.userAgent,
          created_at: new Date().toISOString()
        }])

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Track activity error:', error)
      return { error: error.message }
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session)
    })
  },

  // Check if user email is verified
  async isEmailVerified() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      return user?.email_confirmed_at ? true : false
    } catch (error) {
      console.error('Check email verified error:', error)
      return false
    }
  },

  // Resend email verification
  async resendEmailVerification() {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: (await this.getCurrentUser()).user?.email
      })
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Resend email verification error:', error)
      return { error: error.message }
    }
  }
}

export default authService 
import { supabase, handleSupabaseError } from '../lib/supabase'

/**
 * Authentication service using Supabase Auth
 * Replaces the previous Express.js/JWT backend authentication
 */
class AuthService {
  /**
   * Register a new user with email and password
   */
  async register({ firstName, lastName, email, password, acceptTerms }) {
    try {
      if (!acceptTerms) {
        throw new Error('You must accept the terms and conditions')
      }

      // Validate password strength
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long')
      }

      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        throw new Error('Password must contain at least one uppercase letter, one lowercase letter, and one number')
      }

      // Create user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
          }
        }
      })

      if (error) {
        // Handle specific Supabase auth errors
        if (error.message.includes('User already registered')) {
          throw new Error('An account with this email already exists')
        }
        throw error
      }

      // Log user activity
      if (data.user) {
        await this.logActivity({
          userId: data.user.id,
          activityType: 'user_registered',
          description: 'User registered successfully'
        })
      }

      return {
        success: true,
        data: {
          user: {
            id: data.user?.id,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.toLowerCase(),
            isVerified: data.user?.email_confirmed_at ? true : false,
            isPremium: false,
            needsEmailVerification: !data.user?.email_confirmed_at
          },
          session: data.session
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Sign in user with email and password
   */
  async login({ email, password }) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password
      })

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password')
        }
        throw error
      }

      // Get user profile
      const userProfile = await this.getUserProfile(data.user.id)

      // Log user activity
      await this.logActivity({
        userId: data.user.id,
        activityType: 'user_login',
        description: 'User logged in successfully'
      })

      return {
        success: true,
        data: {
          user: {
            id: data.user.id,
            firstName: userProfile?.first_name || '',
            lastName: userProfile?.last_name || '',
            email: data.user.email,
            isVerified: data.user.email_confirmed_at ? true : false,
            isPremium: userProfile?.is_premium || false,
            profileCompletion: userProfile?.profile_completion_percentage || 0,
            joinedAt: data.user.created_at
          },
          session: data.session
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Sign out current user
   */
  async logout() {
    try {
      // Log activity before logout
      const user = await supabase.auth.getUser()
      if (user.data.user) {
        await this.logActivity({
          userId: user.data.user.id,
          activityType: 'user_logout',
          description: 'User logged out'
        })
      }

      const { error } = await supabase.auth.signOut()
      if (error) throw error

      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      // Return success even if logging fails - user should still be logged out
      return { success: true }
    }
  }

  /**
   * Get current user session and profile
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      
      if (!user) {
        return { success: true, data: { user: null, session: null } }
      }

      const userProfile = await this.getUserProfile(user.id)
      const { data: { session } } = await supabase.auth.getSession()

      return {
        success: true,
        data: {
          user: {
            id: user.id,
            firstName: userProfile?.first_name || '',
            lastName: userProfile?.last_name || '',
            email: user.email,
            isVerified: user.email_confirmed_at ? true : false,
            isPremium: userProfile?.is_premium || false,
            profileCompletion: userProfile?.profile_completion_percentage || 0,
            joinedAt: user.created_at,
            lastLoginAt: user.last_sign_in_at,
            profileData: userProfile?.profile_data || {},
            preferences: userProfile?.preferences || {}
          },
          session
        }
      }
    } catch (error) {
      console.error('Get current user error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Send password reset email
   */
  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) throw error

      return {
        success: true,
        message: 'Password reset email sent successfully'
      }
    } catch (error) {
      console.error('Password reset error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Update user password
   */
  async updatePassword(newPassword) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) throw error

      return {
        success: true,
        message: 'Password updated successfully'
      }
    } catch (error) {
      console.error('Update password error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Sign in with social provider (Google, GitHub, etc.)
   */
  async signInWithProvider(provider) {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })

      if (error) throw error

      return {
        success: true,
        data
      }
    } catch (error) {
      console.error('Social sign in error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Resend email verification
   */
  async resendVerification(email) {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email
      })

      if (error) throw error

      return {
        success: true,
        message: 'Verification email sent successfully'
      }
    } catch (error) {
      console.error('Resend verification error:', error)
      return {
        success: false,
        error: handleSupabaseError(error)
      }
    }
  }

  /**
   * Get user profile from database
   */
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') { // Ignore "not found" errors
        throw error
      }

      return data
    } catch (error) {
      console.error('Get user profile error:', error)
      return null
    }
  }

  /**
   * Log user activity
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
          user_agent: navigator.userAgent,
          // Note: IP address will be handled server-side by Supabase
        })

      if (error) throw error
    } catch (error) {
      // Don't throw error for activity logging failures
      console.error('Log activity error:', error)
    }
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session)
    })
  }
}

// Create and export singleton instance
export const authService = new AuthService()
export default authService 
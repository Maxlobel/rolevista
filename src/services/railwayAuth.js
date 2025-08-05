// Railway Backend Authentication Service
const API_BASE_URL = import.meta.env.VITE_RAILWAY_API_URL || 'http://localhost:5000'

export const railwayAuthService = {
  
  // Sign up new user
  async signUp(email, password, userData = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          phone: userData.phone || '',
          location: userData.location || '',
          experience: userData.experience || '',
          currentRole: userData.currentRole || '',
          industry: userData.industry || '',
          education: userData.education || '',
          marketingConsent: userData.marketingConsent || false,
          acceptTerms: userData.acceptTerms || false
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Registration failed')
      }

      // Store token and user data
      localStorage.setItem('authToken', data.data.token)
      localStorage.setItem('user', JSON.stringify(data.data.user))

      return { 
        user: data.data.user, 
        session: { access_token: data.data.token }, 
        error: null 
      }
    } catch (error) {
      console.error('Sign up error:', error)
      return { user: null, session: null, error: error.message }
    }
  },

  // Sign in existing user
  async signIn(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Login failed')
      }

      // Store token and user data
      localStorage.setItem('authToken', data.data.token)
      localStorage.setItem('user', JSON.stringify(data.data.user))

      return { 
        user: data.data.user, 
        session: { access_token: data.data.token }, 
        error: null 
      }
    } catch (error) {
      console.error('Sign in error:', error)
      return { user: null, session: null, error: error.message }
    }
  },

  // Sign out current user
  async signOut() {
    try {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      return { error: null }
    } catch (error) {
      console.error('Sign out error:', error)
      return { error: error.message }
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const token = localStorage.getItem('authToken')
      const userStr = localStorage.getItem('user')
      
      if (!token || !userStr) {
        return { user: null, error: null }
      }

      // Verify token is still valid
      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        // Token is invalid, clear local storage
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        return { user: null, error: null }
      }

      const data = await response.json()
      return { user: data.data, error: null }
    } catch (error) {
      console.error('Get current user error:', error)
      return { user: null, error: error.message }
    }
  },

  // Get current session (for compatibility)
  async getCurrentSession() {
    try {
      const token = localStorage.getItem('authToken')
      return { 
        session: token ? { access_token: token } : null, 
        error: null 
      }
    } catch (error) {
      console.error('Get current session error:', error)
      return { session: null, error: error.message }
    }
  },

  // Reset password (TODO: implement on backend)
  async resetPassword(email) {
    try {
      // TODO: Implement password reset endpoint on Railway backend
      console.log('Password reset requested for:', email)
      return { error: 'Password reset feature coming soon!' }
    } catch (error) {
      console.error('Reset password error:', error)
      return { error: error.message }
    }
  },

  // Update user password (TODO: implement on backend)
  async updatePassword(newPassword) {
    try {
      // TODO: Implement password update endpoint
      console.log('Password update requested')
      return { error: 'Password update feature coming soon!' }
    } catch (error) {
      console.error('Update password error:', error)
      return { error: error.message }
    }
  },

  // Update user profile
  async updateUserProfile(userId, updates) {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) throw new Error('No authentication token')

      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Profile update failed')
      }

      // Update local storage
      localStorage.setItem('user', JSON.stringify(data.data))

      return { profile: data.data, error: null }
    } catch (error) {
      console.error('Update user profile error:', error)
      return { profile: null, error: error.message }
    }
  },

  // Track user activity (simple logging for now)
  async trackActivity(userId, activityType, description, metadata = {}) {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) return { error: null } // Don't fail if not authenticated

      const response = await fetch(`${API_BASE_URL}/api/users/activity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          activityType,
          description,
          metadata,
        }),
      })

      if (!response.ok) {
        console.warn('Activity tracking failed:', response.statusText)
      }

      return { error: null }
    } catch (error) {
      console.error('Track activity error:', error)
      return { error: error.message }
    }
  },

  // Check if Railway backend is configured
  isConfigured() {
    // Railway backend is always "configured" since it's our own API
    return true
  },

  // Auth state change listener (simplified)
  onAuthStateChange(callback) {
    // Simple polling for auth state changes
    const checkAuth = async () => {
      const { user } = await this.getCurrentUser()
      callback(user ? 'SIGNED_IN' : 'SIGNED_OUT', user)
    }
    
    // Check immediately
    checkAuth()
    
    // Return a cleanup function
    return () => {
      // No cleanup needed for this simple implementation
    }
  },

  // Check if user email is verified (Railway doesn't require email verification yet)
  async isEmailVerified() {
    return true // Simplified for now
  },

  // Resend email verification (not implemented yet)
  async resendEmailVerification() {
    return { error: 'Email verification not implemented yet' }
  }
}

export default railwayAuthService 
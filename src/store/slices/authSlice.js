import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../services/auth'
import { supabase } from '../../lib/supabase'

// Async thunks for authentication actions
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const result = await authService.register(userData)
      if (!result.success) {
        return rejectWithValue(result.error)
      }
      return result.data
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed')
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const result = await authService.login(credentials)
      if (!result.success) {
        return rejectWithValue(result.error)
      }
      return result.data
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed')
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const result = await authService.logout()
      if (!result.success) {
        return rejectWithValue(result.error)
      }
      return true
    } catch (error) {
      return rejectWithValue(error.message || 'Logout failed')
    }
  }
)

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const result = await authService.getCurrentUser()
      if (!result.success) {
        return rejectWithValue(result.error)
      }
      return result.data
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get current user')
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (email, { rejectWithValue }) => {
    try {
      const result = await authService.resetPassword(email)
      if (!result.success) {
        return rejectWithValue(result.error)
      }
      return result.message
    } catch (error) {
      return rejectWithValue(error.message || 'Password reset failed')
    }
  }
)

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (newPassword, { rejectWithValue }) => {
    try {
      const result = await authService.updatePassword(newPassword)
      if (!result.success) {
        return rejectWithValue(result.error)
      }
      return result.message
    } catch (error) {
      return rejectWithValue(error.message || 'Password update failed')
    }
  }
)

export const signInWithProvider = createAsyncThunk(
  'auth/signInWithProvider',
  async (provider, { rejectWithValue }) => {
    try {
      const result = await authService.signInWithProvider(provider)
      if (!result.success) {
        return rejectWithValue(result.error)
      }
      return result.data
    } catch (error) {
      return rejectWithValue(error.message || 'Social login failed')
    }
  }
)

export const resendVerification = createAsyncThunk(
  'auth/resendVerification',
  async (email, { rejectWithValue }) => {
    try {
      const result = await authService.resendVerification(email)
      if (!result.success) {
        return rejectWithValue(result.error)
      }
      return result.message
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to resend verification')
    }
  }
)

const initialState = {
  // User data
  user: null,
  session: null,
  isAuthenticated: false,
  
  // Loading states
  isLoading: false,
  isRegisterLoading: false,
  isLoginLoading: false,
  isLogoutLoading: false,
  isPasswordResetLoading: false,
  
  // Error states
  error: null,
  registerError: null,
  loginError: null,
  passwordResetError: null,
  
  // Success states
  passwordResetSuccess: false,
  registrationSuccess: false,
  
  // Email verification
  needsEmailVerification: false,
  emailVerificationSent: false,
  
  // Social login
  socialLoginProvider: null,
  
  // Remember user preferences
  rememberMe: false,
  
  // Last login attempt for rate limiting
  lastLoginAttempt: null,
  loginAttempts: 0,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Clear error states
    clearError: (state) => {
      state.error = null
      state.registerError = null
      state.loginError = null
      state.passwordResetError = null
    },
    
    // Clear success states
    clearSuccess: (state) => {
      state.passwordResetSuccess = false
      state.registrationSuccess = false
      state.emailVerificationSent = false
    },
    
    // Set remember me preference
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload
    },
    
    // Clear user session (for logout)
    clearSession: (state) => {
      state.user = null
      state.session = null
      state.isAuthenticated = false
      state.needsEmailVerification = false
    },
    
    // Update user data (for profile updates)
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    
    // Set authentication state from session
    setAuthState: (state, action) => {
      const { user, session } = action.payload
      state.user = user
      state.session = session
      state.isAuthenticated = !!user
      state.needsEmailVerification = user ? !user.isVerified : false
    },
    
    // Track login attempts for rate limiting
    incrementLoginAttempts: (state) => {
      state.loginAttempts += 1
      state.lastLoginAttempt = new Date().toISOString()
    },
    
    // Reset login attempts
    resetLoginAttempts: (state) => {
      state.loginAttempts = 0
      state.lastLoginAttempt = null
    },
    
    // Set social login provider
    setSocialLoginProvider: (state, action) => {
      state.socialLoginProvider = action.payload
    }
  },
  
  extraReducers: (builder) => {
    // Register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.isRegisterLoading = true
        state.registerError = null
        state.registrationSuccess = false
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRegisterLoading = false
        state.registrationSuccess = true
        state.user = action.payload.user
        state.session = action.payload.session
        state.isAuthenticated = !!action.payload.user
        state.needsEmailVerification = action.payload.user?.needsEmailVerification || false
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isRegisterLoading = false
        state.registerError = action.payload
        state.registrationSuccess = false
      })
    
    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoginLoading = true
        state.loginError = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoginLoading = false
        state.user = action.payload.user
        state.session = action.payload.session
        state.isAuthenticated = true
        state.needsEmailVerification = !action.payload.user.isVerified
        state.loginAttempts = 0
        state.lastLoginAttempt = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoginLoading = false
        state.loginError = action.payload
        state.loginAttempts += 1
        state.lastLoginAttempt = new Date().toISOString()
      })
    
    // Logout user
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLogoutLoading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLogoutLoading = false
        state.user = null
        state.session = null
        state.isAuthenticated = false
        state.needsEmailVerification = false
        state.socialLoginProvider = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLogoutLoading = false
        // Still clear session even if logout API fails
        state.user = null
        state.session = null
        state.isAuthenticated = false
        state.needsEmailVerification = false
      })
    
    // Get current user
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload.user) {
          state.user = action.payload.user
          state.session = action.payload.session
          state.isAuthenticated = true
          state.needsEmailVerification = !action.payload.user.isVerified
        } else {
          state.user = null
          state.session = null
          state.isAuthenticated = false
          state.needsEmailVerification = false
        }
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.session = null
        state.isAuthenticated = false
        state.error = action.payload
      })
    
    // Reset password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isPasswordResetLoading = true
        state.passwordResetError = null
        state.passwordResetSuccess = false
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isPasswordResetLoading = false
        state.passwordResetSuccess = true
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isPasswordResetLoading = false
        state.passwordResetError = action.payload
      })
    
    // Update password
    builder
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
    
    // Social login
    builder
      .addCase(signInWithProvider.pending, (state, action) => {
        state.isLoginLoading = true
        state.loginError = null
        state.socialLoginProvider = action.meta.arg // The provider name
      })
      .addCase(signInWithProvider.fulfilled, (state, action) => {
        state.isLoginLoading = false
        // Note: For OAuth, the actual user data will come from auth state change
        // This just indicates the OAuth flow was initiated successfully
      })
      .addCase(signInWithProvider.rejected, (state, action) => {
        state.isLoginLoading = false
        state.loginError = action.payload
        state.socialLoginProvider = null
      })
    
    // Resend verification
    builder
      .addCase(resendVerification.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(resendVerification.fulfilled, (state) => {
        state.isLoading = false
        state.emailVerificationSent = true
      })
      .addCase(resendVerification.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

// Export actions
export const {
  clearError,
  clearSuccess,
  setRememberMe,
  clearSession,
  updateUser,
  setAuthState,
  incrementLoginAttempts,
  resetLoginAttempts,
  setSocialLoginProvider
} = authSlice.actions

// Selectors
export const selectAuth = (state) => state.auth
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectUser = (state) => state.auth.user
export const selectSession = (state) => state.auth.session
export const selectIsLoading = (state) => state.auth.isLoading
export const selectIsLoginLoading = (state) => state.auth.isLoginLoading
export const selectIsRegisterLoading = (state) => state.auth.isRegisterLoading
export const selectAuthError = (state) => state.auth.error
export const selectLoginError = (state) => state.auth.loginError
export const selectRegisterError = (state) => state.auth.registerError
export const selectNeedsEmailVerification = (state) => state.auth.needsEmailVerification
export const selectPasswordResetSuccess = (state) => state.auth.passwordResetSuccess
export const selectLoginAttempts = (state) => state.auth.loginAttempts

// Auth state change listener middleware
export const authStateChangeMiddleware = (store) => (next) => (action) => {
  // Set up Supabase auth state listener when store is initialized
  if (action.type === '@@INIT' || action.type === '@reduxjs/toolkit/store/fulfilled') {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id)
        
        if (event === 'SIGNED_IN' && session) {
          // User signed in
          const result = await authService.getCurrentUser()
          if (result.success) {
            store.dispatch(setAuthState(result.data))
          }
        } else if (event === 'SIGNED_OUT') {
          // User signed out
          store.dispatch(clearSession())
        } else if (event === 'TOKEN_REFRESHED' && session) {
          // Token refreshed, update session
          const result = await authService.getCurrentUser()
          if (result.success) {
            store.dispatch(setAuthState(result.data))
          }
        }
      }
    )
    
    // Store the unsubscribe function for cleanup
    store.authListener = authListener
  }
  
  return next(action)
}

export default authSlice.reducer 
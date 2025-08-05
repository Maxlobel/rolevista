import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LoginBackground from './components/LoginBackground'
import LoginForm from './components/LoginForm'
import TrustSignals from './components/TrustSignals'
import { 
  signInWithProvider, 
  resetPassword,
  selectIsAuthenticated,
  selectIsLoginLoading 
} from '../../store/slices/authSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  // Redux state
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const isLoading = useSelector(selectIsLoginLoading)
  
  // Local state for forgot password modal
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false)
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false)
  const [forgotPasswordError, setForgotPasswordError] = useState('')

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleSocialLogin = async (provider) => {
    try {
      const result = await dispatch(signInWithProvider(provider))
      if (signInWithProvider.fulfilled.match(result)) {
        // OAuth redirect will handle the rest
        console.log('OAuth flow initiated for', provider)
      }
    } catch (error) {
      console.error('Social login error:', error)
    }
  }

  const handleForgotPassword = () => {
    setShowForgotPassword(true)
    setForgotPasswordSuccess(false)
    setForgotPasswordError('')
  }

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault()
    
    if (!forgotPasswordEmail.trim()) {
      setForgotPasswordError('Email is required')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotPasswordEmail)) {
      setForgotPasswordError('Please enter a valid email address')
      return
    }

    setForgotPasswordLoading(true)
    setForgotPasswordError('')

    try {
      const result = await dispatch(resetPassword(forgotPasswordEmail))
      if (resetPassword.fulfilled.match(result)) {
        setForgotPasswordSuccess(true)
        setTimeout(() => {
          setShowForgotPassword(false)
          setForgotPasswordSuccess(false)
          setForgotPasswordEmail('')
        }, 3000)
      } else {
        setForgotPasswordError(result.payload || 'Failed to send reset email')
      }
    } catch (error) {
      setForgotPasswordError('Failed to send reset email')
    } finally {
      setForgotPasswordLoading(false)
    }
  }

  const closeForgotPasswordModal = () => {
    setShowForgotPassword(false)
    setForgotPasswordEmail('')
    setForgotPasswordError('')
    setForgotPasswordSuccess(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Background/Hero Section - Left Side */}
        <LoginBackground />

        {/* Login Form Section - Right Side */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <LoginForm 
              onSocialLogin={handleSocialLogin}
              onForgotPassword={handleForgotPassword}
            />
            
            {/* Trust Signals */}
            <div className="mt-8">
              <TrustSignals />
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Reset Password</h3>
              <button
                onClick={closeForgotPasswordModal}
                className="text-gray-400 hover:text-gray-600"
                disabled={forgotPasswordLoading}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {forgotPasswordSuccess ? (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Email Sent!</h4>
                <p className="text-sm text-gray-600">
                  We've sent a password reset link to <strong>{forgotPasswordEmail}</strong>. 
                  Please check your email and follow the instructions to reset your password.
                </p>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit}>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                  
                  <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="forgot-email"
                    type="email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your email"
                    disabled={forgotPasswordLoading}
                  />
                  
                  {forgotPasswordError && (
                    <p className="mt-2 text-sm text-red-600">{forgotPasswordError}</p>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={closeForgotPasswordModal}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed"
                    disabled={forgotPasswordLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center"
                    disabled={forgotPasswordLoading}
                  >
                    {forgotPasswordLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
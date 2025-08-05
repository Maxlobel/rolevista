import { configureStore } from '@reduxjs/toolkit'
import authReducer, { authStateChangeMiddleware } from './slices/authSlice'
import assessmentReducer from './slices/assessmentSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    assessment: assessmentReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['auth/setAuthState'],
        // Ignore these field paths in all actions
        ignoredActionsPaths: ['meta.arg', 'payload.session'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.session'],
      },
    }).concat(authStateChangeMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store 
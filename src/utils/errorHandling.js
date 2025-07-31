import { useState } from 'react';

// Error types
export const ErrorTypes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  API_ERROR: 'API_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

// Custom error class
export class AppError extends Error {
  constructor(message, type = ErrorTypes.UNKNOWN_ERROR, statusCode = null, details = null) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

// Error handling utilities
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    const message = data?.message || data?.error || 'Server error occurred';
    
    switch (status) {
      case 400:
        return new AppError(message, ErrorTypes.VALIDATION_ERROR, status, data);
      case 401:
        return new AppError('Authentication required', ErrorTypes.AUTH_ERROR, status);
      case 403:
        return new AppError('Access forbidden', ErrorTypes.AUTH_ERROR, status);
      case 404:
        return new AppError('Resource not found', ErrorTypes.API_ERROR, status);
      case 429:
        return new AppError('Too many requests. Please try again later.', ErrorTypes.API_ERROR, status);
      case 500:
        return new AppError('Internal server error', ErrorTypes.API_ERROR, status);
      default:
        return new AppError(message, ErrorTypes.API_ERROR, status);
    }
  } else if (error.request) {
    // Network error
    return new AppError(
      'Network error. Please check your connection and try again.', 
      ErrorTypes.NETWORK_ERROR
    );
  } else {
    // Other error
    return new AppError(error.message || 'An unexpected error occurred', ErrorTypes.UNKNOWN_ERROR);
  }
};

// Async error wrapper
export const asyncErrorHandler = (asyncFn) => {
  return async (...args) => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      const appError = error instanceof AppError ? error : handleApiError(error);
      throw appError;
    }
  };
};

// Error logging utility
export const logError = (error, context = {}) => {
  const errorData = {
    message: error.message,
    type: error.type || ErrorTypes.UNKNOWN_ERROR,
    statusCode: error.statusCode,
    details: error.details,
    timestamp: error.timestamp || new Date().toISOString(),
    context,
    stack: error.stack,
  };

  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.error('Application Error:', errorData);
  }

  // In production, send to error monitoring service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to error monitoring service (e.g., Sentry)
    window.__ERROR_LOGGER__?.(errorData);
  }
};

// User-friendly error messages
export const getErrorMessage = (error) => {
  if (error instanceof AppError) {
    switch (error.type) {
      case ErrorTypes.VALIDATION_ERROR:
        return error.message;
      case ErrorTypes.NETWORK_ERROR:
        return 'Connection issue. Please check your internet and try again.';
      case ErrorTypes.AUTH_ERROR:
        return 'Please log in to continue.';
      case ErrorTypes.API_ERROR:
        return error.message || 'Something went wrong. Please try again.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
  
  return 'An unexpected error occurred. Please try again.';
};

// React hook for error state management
export const useErrorHandler = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (error, context = {}) => {
    const appError = error instanceof AppError ? error : handleApiError(error);
    logError(appError, context);
    setError(appError);
    setIsLoading(false);
  };

  const clearError = () => {
    setError(null);
  };

  const executeAsync = async (asyncFn, context = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await asyncFn();
      setIsLoading(false);
      return result;
    } catch (error) {
      handleError(error, context);
      throw error;
    }
  };

  return {
    error,
    isLoading,
    handleError,
    clearError,
    executeAsync,
    errorMessage: error ? getErrorMessage(error) : null,
  };
}; 
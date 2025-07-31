// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API utility class
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem('auth_token');
  }

  // Create headers with auth token
  getHeaders(includeAuth = false) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...this.getHeaders(options.includeAuth),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, includeAuth = false) {
    return this.request(endpoint, {
      method: 'GET',
      includeAuth,
    });
  }

  // POST request
  async post(endpoint, data, includeAuth = false) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      includeAuth,
    });
  }

  // PUT request
  async put(endpoint, data, includeAuth = false) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      includeAuth,
    });
  }

  // DELETE request
  async delete(endpoint, includeAuth = false) {
    return this.request(endpoint, {
      method: 'DELETE',
      includeAuth,
    });
  }

  // Auth API methods
  auth = {
    register: (userData) => this.post('/auth/register', userData),
    login: (credentials) => this.post('/auth/login', credentials),
    logout: () => this.post('/auth/logout', {}, true),
    verify: () => this.get('/auth/verify', true),
  };

  // User API methods
  users = {
    getProfile: () => this.get('/users/profile', true),
    updateProfile: (data) => this.put('/users/profile', data, true),
    getActivity: () => this.get('/users/activity', true),
  };

  // Assessment API methods
  assessments = {
    start: (totalQuestions) => this.post('/assessments/start', { totalQuestions }, true),
    saveAnswer: (answerData) => this.post('/assessments/answer', answerData, true),
    getProgress: (sessionId) => this.get(`/assessments/progress/${sessionId}`, true),
    complete: (sessionId, data = {}) => this.post(`/assessments/complete/${sessionId}`, data, true),
    getHistory: () => this.get('/assessments/history', true),
  };
}

// Create and export a singleton instance
export const apiService = new ApiService();

// Export individual services for convenience
export const authAPI = apiService.auth;
export const userAPI = apiService.users;
export const assessmentAPI = apiService.assessments; 
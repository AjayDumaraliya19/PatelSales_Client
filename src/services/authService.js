import apiClient from '../lib/apiClient';

// Types

// Authentication Service
class AuthService {
  /**
   * Register a new user
   */
  async register(data) {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  }

  /**
   * Login user
   */
  async login(credentials) {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  }

  /**
   * Logout user
   */
  async logout() {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  }

  /**
   * Get current user profile
   */
  async getMe() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  }

  /**
   * Update user profile
   */
  async updateProfile(data) {
    const response = await apiClient.put('/auth/profile', data);
    return response.data;
  }

  /**
   * Change password
   */
  async changePassword(data) {
    const response = await apiClient.put('/auth/password', data);
    return response.data;
  }

  /**
   * Forgot password - sends reset email
   */
  async forgotPassword(data) {
    const response = await apiClient.post('/auth/forgot-password', data);
    return response.data;
  }

  /**
   * Reset password with token
   */
  async resetPassword(token, data) {
    const response = await apiClient.put(`/auth/reset-password/${token}`, data);
    return response.data;
  }
}

export default new AuthService();

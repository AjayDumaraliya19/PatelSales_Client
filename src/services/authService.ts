import apiClient from '../lib/apiClient';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  addresses?: Address[];
  isEmailVerified: boolean;
}

export interface Address {
  _id?: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export interface ProfileUpdateData {
  name?: string;
  phone?: string;
  addresses?: Address[];
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

// Authentication Service
class AuthService {
  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  }

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  }

  /**
   * Get current user profile
   */
  async getMe(): Promise<{ success: boolean; user: User }> {
    const response = await apiClient.get('/auth/me');
    return response.data;
  }

  /**
   * Update user profile
   */
  async updateProfile(data: ProfileUpdateData): Promise<{ success: boolean; message: string; user: User }> {
    const response = await apiClient.put('/auth/profile', data);
    return response.data;
  }

  /**
   * Change password
   */
  async changePassword(data: PasswordChangeData): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.put('/auth/password', data);
    return response.data;
  }

  /**
   * Forgot password - sends reset email
   */
  async forgotPassword(data: ForgotPasswordData): Promise<ForgotPasswordResponse> {
    const response = await apiClient.post<ForgotPasswordResponse>('/auth/forgot-password', data);
    return response.data;
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, data: ResetPasswordData): Promise<ResetPasswordResponse> {
    const response = await apiClient.put<ResetPasswordResponse>(`/auth/reset-password/${token}`, data);
    return response.data;
  }
}

export default new AuthService();

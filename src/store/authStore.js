import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '../services/authService';

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      /**
       * Register new user
       */
      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(data);
          
          // Save token and user
          localStorage.setItem('auth_token', response.token);
          
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message || 'Registration failed',
          });
          throw error;
        }
      },

      /**
       * Login user
       */
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(credentials);
          
          // Save token and user
          localStorage.setItem('auth_token', response.token);
          
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message || 'Login failed',
          });
          throw error;
        }
      },

      /**
       * Logout user
       */
      logout: async () => {
        set({ isLoading: true });
        try {
          // Call backend logout (removes active token)
          await authService.logout();
        } catch (error) {
          console.error('Logout error:', error);
          // Continue with local logout even if backend fails
        } finally {
          // Clear local state
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      /**
       * Fetch current user profile
       */
      fetchUser: async () => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return;
        }

        set({ isLoading: true });
        try {
          const response = await authService.getMe();
          set({
            user: response.user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          // Token is invalid or expired
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message || 'Session expired',
          });
        }
      },

      /**
       * Update user profile
       */
      updateProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.updateProfile(data);
          set({
            user: response.user,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Profile update failed',
          });
          throw error;
        }
      },

      /**
       * Change password
       */
      changePassword: async (data) => {
        set({ isLoading: true, error: null });
        try {
          await authService.changePassword(data);
          set({
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Password change failed',
          });
          throw error;
        }
      },

      /**
       * Forgot password - sends reset email
       */
      forgotPassword: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.forgotPassword(data);
          set({ isLoading: false });
          return { success: response.success, message: response.message };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Failed to send reset email',
          });
          throw error;
        }
      },

      /**
       * Reset password with token
       */
      resetPassword: async (token, data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.resetPassword(token, data);
          set({ isLoading: false });
          return { success: response.success, message: response.message };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Failed to reset password',
          });
          throw error;
        }
      },

      /**
       * Clear error message
       */
      clearError: () => {
        set({ error: null });
      },

      /**
       * Check authentication status
       */
      checkAuth: () => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // Always verify token on app mount — persist may have stale data
          if (!get().isLoading) {
            get().fetchUser();
          }
        } else {
          // No token — clear any stale persisted auth state
          set({ user: null, token: null, isAuthenticated: false });
        }
      },

    }),
    {
      name: 'patelsales-auth',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

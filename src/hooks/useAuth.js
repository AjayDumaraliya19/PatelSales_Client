import { useState, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    register,
    login,
    logout,
    fetchUser,
    updateProfile,
    changePassword,
    forgotPassword,
    clearError,
  } = useAuthStore();

  const [isFetching, setIsFetching] = useState(false);

  const checkAuthStatus = useCallback(async () => {
    if (isAuthenticated) {
      await fetchUser();
    }
  }, [isAuthenticated, fetchUser]);

  const handleLogin = useCallback(
    async (credentials: { email; password }) => {
      setIsFetching(true);
      try {
        await login(credentials);
        return { success: true };
      } catch (error) {
        return { success: false, error };
      } finally {
        setIsFetching(false);
      }
    },
    [login]
  );

  const handleRegister = useCallback(
    async (data: { name; email; password; phone? }) => {
      setIsFetching(true);
      try {
        await register(data);
        return { success: true };
      } catch (error) {
        return { success: false, error };
      } finally {
        setIsFetching(false);
      }
    },
    [register]
  );

  const handleLogout = useCallback(async () => {
    setIsFetching(true);
    try {
      await logout();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setIsFetching(false);
    }
  }, [logout]);

  const handleForgotPassword = useCallback(
    async (email) => {
      try {
        const result = await forgotPassword({ email });
        return { success: true, message: result.message };
      } catch (error) {
        return { success: false, error };
      }
    },
    [forgotPassword]
  );

  return {
    user,
    token,
    isAuthenticated,
    isLoading: isLoading || isFetching,
    error,
    isAuthenticating: isFetching,
    checkAuthStatus,
    handleLogin,
    handleRegister,
    handleLogout,
    handleForgotPassword,
    updateProfile,
    changePassword,
    clearError,
  };
};

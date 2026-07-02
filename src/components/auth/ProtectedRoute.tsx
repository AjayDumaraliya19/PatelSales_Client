import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, token, checkAuth } = useAuthStore();
  const location = useLocation();

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // If no token, redirect to login
  if (!token && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

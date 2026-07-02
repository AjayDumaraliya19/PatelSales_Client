import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from '../ui/AppIcon';
import { useAuthStore } from '../../store/authStore';

const inputClass = 'input-field w-full min-h-[44px]';

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();
  
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await login({ email, password });
      setIsLoggedIn(true);
      
      // Redirect to intended page or products page after 1 second
      setTimeout(() => {
        const from = (location.state as any)?.from?.pathname || '/products';
        navigate(from, { replace: true });
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
      setIsSubmitting(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="app-card p-8 sm:p-12 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircleIcon" size={32} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
        <p className="text-sm text-gray-600 mb-6">
          You are now signed in to your Patel Sales wholesale account.
        </p>
        <Link to="/products" className="btn-primary inline-flex min-h-[44px]">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="app-card overflow-hidden">
      {error && (
        <div className="p-4 sm:p-6 md:p-8 pb-0">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
            <Icon name="ExclamationTriangleIcon" size={18} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        </div>
      )}
      <div className="p-4 sm:p-6 md:p-8 space-y-5">
        <div>
          <label htmlFor="login-email" className="app-label mb-1">
            Email Address <span className="text-[var(--primary)]">*</span>
          </label>
          <input
            id="login-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="app-label mb-1">
            Password <span className="text-[var(--primary)]">*</span>
          </label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              autoComplete="current-password"
              className={`${inputClass} pr-11`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-[var(--secondary)] rounded"
            />
            <span className="text-sm text-gray-700">Remember me</span>
          </label>
          <button type="button" className="text-sm font-semibold text-[var(--secondary)] hover:underline text-left">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full min-h-[44px] justify-center disabled:opacity-70"
        >
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </button>
      </div>

      <div className="px-4 sm:px-6 md:px-8 py-6 border-t border-gray-200 bg-gray-50 text-center">
        <p className="text-sm text-gray-600 mb-3">Don&apos;t have an account?</p>
        <Link to="/register" className="btn-outline min-h-[44px] inline-flex">
          Create Account
        </Link>
      </div>
    </form>
  );
}

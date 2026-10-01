import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from '../ui/AppIcon';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();
  const syncCart = useCartStore((s) => s.syncCart);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await login({ email, password });
      // Merge guest cart into backend cart after login
      await syncCart();
      setIsLoggedIn(true);
      setTimeout(() => {
        const from = (location.state as any)?.from?.pathname || '/products';
        navigate(from, { replace: true });
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
      setIsSubmitting(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="text-center py-10 animate-fade-in">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-green-100">
          <Icon name="CheckCircleIcon" size={32} className="text-green-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome Back!</h2>
        <p className="text-sm text-gray-500 mb-5">Redirecting you to your account...</p>
        <div className="w-40 h-1 bg-gray-100 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-green-500 rounded-full animate-pulse w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {error && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2.5">
          <Icon name="ExclamationTriangleIcon" size={16} className="flex-shrink-0 mt-0.5 text-red-500" />
          <span className="leading-relaxed">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="login-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Icon name="EnvelopeIcon" size={16} className={`transition-colors ${focusedField === 'email' ? 'text-[#003087]' : 'text-gray-400'}`} />
            </div>
            <input
              id="login-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#003087] focus:ring-2 focus:ring-[#003087]/10 transition-all"
              placeholder="you@company.com"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="login-password" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Icon name="LockClosedIcon" size={16} className={`transition-colors ${focusedField === 'password' ? 'text-[#003087]' : 'text-gray-400'}`} />
            </div>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              autoComplete="current-password"
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-10 pr-12 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#003087] focus:ring-2 focus:ring-[#003087]/10 transition-all"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-0 inset-y-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={16} />
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#003087] focus:ring-[#003087]/20 cursor-pointer accent-[#003087]"
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-[#003087] hover:text-[#002266] transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-[#e8471e] hover:bg-[#c73a17] active:bg-[#b03010] text-white font-bold text-sm rounded-lg transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 shadow-sm hover:shadow"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-gray-400 font-medium">New to Patel Sales?</span>
        </div>
      </div>

      {/* Register Link */}
      <Link
        to="/register"
        className="w-full py-3 px-4 bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-semibold text-sm rounded-lg transition-all duration-150 flex items-center justify-center gap-2"
      >
        <Icon name="UserPlusIcon" size={16} className="text-gray-400" />
        Create a wholesale account
      </Link>
    </div>
  );
}

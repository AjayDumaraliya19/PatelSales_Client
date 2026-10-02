import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Icon from '../components/ui/AppIcon';
import { useAuthStore } from '../store/authStore';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = useParams();
  const { resetPassword } = useAuthStore();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token. Please request a new password reset link.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setIsSubmitting(false);
      return;
    }

    try {
      if (token) {
        const result = await resetPassword(token, { password });
        setMessage(result.message);
        setIsSuccess(true);
      }
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100 pt-8 pb-12 sm:pt-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="wss-breadcrumb mb-6 text-sm">
            <Link to="/" className="text-gray-600 hover:text-[#003087] transition-colors">Patel Sales</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">Reset Password</span>
          </nav>

          <div className="bg-gradient-to-r from-[#003087] to-[#0040a0] rounded-2xl p-6 lg:p-8 shadow-lg mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">Password Reset Successful</h1>
            <p className="text-base sm:text-lg text-white/90 max-w-2xl">
              Your password has been successfully updated. You can now login with your new password.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircleIcon" size={32} className="text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Password Updated!</h2>
                <p className="text-sm text-gray-600 mb-6">
                  {message}
                </p>
                <Link to="/login" className="btn-primary inline-flex min-h-[44px]">
                  Go to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100 pt-8 pb-12 sm:pt-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="wss-breadcrumb mb-6 text-sm">
          <Link to="/" className="text-gray-600 hover:text-[#003087] transition-colors">Patel Sales</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 font-semibold">Reset Password</span>
        </nav>

        <div className="bg-gradient-to-r from-[#003087] to-[#0040a0] rounded-2xl p-6 lg:p-8 shadow-lg mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">Reset Password</h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl">
            Enter your new password below.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {message && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-600">{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="app-label mb-1">
                  New Password <span className="text-[var(--primary)]">*</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    className="input-field w-full min-h-[44px] pr-11"
                    placeholder="Minimum 8 characters"
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

              <div>
                <label htmlFor="confirmPassword" className="app-label mb-1">
                  Confirm New Password <span className="text-[var(--primary)]">*</span>
                </label>
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field w-full min-h-[44px]"
                  placeholder="Confirm your new password"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !token}
                className="btn-primary w-full min-h-[44px] justify-center disabled:opacity-70"
              >
                {isSubmitting ? 'Updating Password...' : 'Update Password'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm text-[var(--secondary)] hover:text-[var(--primary)] font-semibold hover:underline">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

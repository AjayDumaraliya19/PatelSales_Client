import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../ui/AppIcon';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';

export default function RegisterForm({ initialEmail = '' }: RegisterFormProps) {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const syncCart = useCartStore((s) => s.syncCart);

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [passwordValue, setPasswordValue] = useState('');

  const passwordStrength = getPasswordStrength(passwordValue);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const phone = formData.get('phone');

    try {
      await register({ name, email, password, phone: phone || undefined });
      // Merge guest cart into backend cart after registration
      await syncCart();
      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-10 animate-fade-in">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-green-100">
          <Icon name="CheckCircleIcon" size={32} className="text-green-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Account Created!</h2>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed max-w-xs mx-auto">
          Welcome to Patel Sales Redirecting you to our product catalog...
        </p>
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
        {/* Name */}
        <div>
          <label htmlFor="register-name" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Full name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Icon name="UserIcon" size={16} className={`transition-colors ${focusedField === 'name' ? 'text-[#003087]' : 'text-gray-400'}`} />
            </div>
            <input
              id="register-name"
              type="text"
              name="name"
              required
              autoComplete="name"
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#003087] focus:ring-2 focus:ring-[#003087]/10 transition-all"
              placeholder="John Smith"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="register-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Email address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Icon name="EnvelopeIcon" size={16} className={`transition-colors ${focusedField === 'email' ? 'text-[#003087]' : 'text-gray-400'}`} />
            </div>
            <input
              id="register-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              defaultValue={initialEmail}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#003087] focus:ring-2 focus:ring-[#003087]/10 transition-all"
              placeholder="you@company.com"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="register-phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Phone number <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Icon name="PhoneIcon" size={16} className={`transition-colors ${focusedField === 'phone' ? 'text-[#003087]' : 'text-gray-400'}`} />
            </div>
            <input
              id="register-phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#003087] focus:ring-2 focus:ring-[#003087]/10 transition-all"
              placeholder="(732) 000-0000"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="register-password" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Icon name="LockClosedIcon" size={16} className={`transition-colors ${focusedField === 'password' ? 'text-[#003087]' : 'text-gray-400'}`} />
            </div>
            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-10 pr-12 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#003087] focus:ring-2 focus:ring-[#003087]/10 transition-all"
              placeholder="Minimum 8 characters"
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
          {/* Password Strength */}
          {passwordValue.length > 0 && (
            <div className="mt-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      i <= passwordStrength.score
                        ? passwordStrength.score <= 1
                          ? 'bg-red-400'
                          : passwordStrength.score === 2
                          ? 'bg-orange-400'
                          : passwordStrength.score === 3
                          ? 'bg-yellow-400'
                          : 'bg-green-500'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className={`text-xs mt-1 font-medium ${
                passwordStrength.score <= 1 ? 'text-red-500' :
                passwordStrength.score === 2 ? 'text-orange-500' :
                passwordStrength.score === 3 ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {passwordStrength.label}
              </p>
            </div>
          )}
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
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-gray-400 font-medium">Already have an account?</span>
        </div>
      </div>

      {/* Login Link */}
      <Link
        to="/login"
        className="w-full py-3 px-4 bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-semibold text-sm rounded-lg transition-all duration-150 flex items-center justify-center gap-2"
      >
        <Icon name="ArrowRightOnRectangleIcon" size={16} className="text-gray-400" />
        Sign in to existing account
      </Link>
    </div>
  );
}

function getPasswordStrength(password): { score; label } {
  if (!password) return { score: 0, label: '' };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  score = Math.min(score, 4);
  if (password.length < 8) score = Math.max(score, 1);

  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  return { score, label: labels[score] || 'Weak' };
}

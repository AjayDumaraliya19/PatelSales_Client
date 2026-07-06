import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../ui/AppIcon';
import { useAuthStore } from '../../store/authStore';

interface FieldLabelProps {
  label: string;
  required?: boolean;
  htmlFor: string;
}

function FieldLabel({ label, required = false, htmlFor }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className="app-label mb-1.5 block">
      {label}
      {required && <span className="text-[var(--primary)] ml-0.5">*</span>}
    </label>
  );
}

const inputClass = 'input-field w-full min-h-[44px]';

interface RegisterFormProps {
  initialEmail?: string;
}

export default function RegisterForm({ initialEmail = '' }: RegisterFormProps) {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  
  const [showPassword, setShowPassword] = useState(false);
  const [receiveCoupons, setReceiveCoupons] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const phone = formData.get('phone') as string;

    try {
      await register({ name, email, password, phone });
      setIsSubmitted(true);
      
      // Redirect to products after 1.5 seconds
      setTimeout(() => {
        navigate('/products');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="app-card p-8 sm:p-12 text-center max-w-lg mx-auto animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircleIcon" size={32} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Account Created!</h2>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Welcome to Patel Sales. You can now shop wholesale food service supplies at bulk pricing.
        </p>
        <Link to="/products" className="btn-primary inline-flex min-h-[44px]">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="app-card overflow-hidden animate-fade-in">
      {error && (
        <div className="px-4 sm:px-6 md:px-8 pt-6 pb-0">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
            <Icon name="ExclamationTriangleIcon" size={18} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        </div>
      )}
      
      <div className="p-4 sm:p-6 md:px-8 space-y-5">
        <div>
          <FieldLabel label="Email Address" required htmlFor="register-email" />
          <input
            id="register-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            defaultValue={initialEmail}
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>

        <div>
          <FieldLabel label="Full Name" required htmlFor="register-name" />
          <input id="register-name" type="text" name="name" required autoComplete="name" className={inputClass} placeholder="Full name" />
        </div>

        <div>
          <FieldLabel label="Phone" required htmlFor="register-phone" />
          <input
            id="register-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            className={inputClass}
            placeholder="(732) 000-0000"
          />
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-8 py-6 border-t border-gray-200 bg-gray-50">
        <div className="mb-4">
          <label className="flex items-center gap-2.5 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={receiveCoupons}
              onChange={(e) => setReceiveCoupons(e.target.checked)}
              className="w-4 h-4 accent-[var(--secondary)] rounded shrink-0"
            />
            <span className="text-sm text-gray-700">Receive coupons & promotional offers</span>
          </label>
        </div>

        <div>
          <FieldLabel label="Password" required htmlFor="register-password" />
          <div className="relative">
            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              minLength={8}
              autoComplete="new-password"
              className={`${inputClass} pr-11`}
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full min-h-[44px] justify-center disabled:opacity-70 mt-6"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </div>

      <div className="px-4 sm:px-6 md:px-8 py-6 border-t border-gray-200 bg-gray-50 text-center">
        <p className="text-xs text-gray-500 mb-3 leading-relaxed">
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>

        <div className="pt-5 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Already have an account?</p>
          <Link to="/login" className="btn-outline min-h-[44px] inline-flex">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
}

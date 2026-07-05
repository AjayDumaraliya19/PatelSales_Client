import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../ui/AppIcon';
import { companyTypes, countries, usStates } from '../../data/registerPageData';
import { useAuthStore } from '../../store/authStore';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <section className="border-b border-gray-200 last:border-b-0">
      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 bg-gray-50 border-b border-gray-100">
        <h2 className="text-sm font-bold text-gray-900">{title}</h2>
        {description && <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">{description}</p>}
      </div>
      <div className="px-4 sm:px-6 md:px-8 py-5 sm:py-6 space-y-5">{children}</div>
    </section>
  );
}

function FieldLabel({ label, required = false, htmlFor }: { label: string; required?: boolean; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="app-label mb-1.5 block">
      {label}
      {required && <span className="text-[var(--primary)] ml-0.5">*</span>}
    </label>
  );
}

const inputClass = 'input-field w-full min-h-[44px]';
const selectClass = 'input-field w-full min-h-[44px] appearance-none';

interface RegisterFormProps {
  initialEmail?: string;
}

export default function RegisterForm({ initialEmail = '' }: RegisterFormProps) {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  
  const [showPassword, setShowPassword] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [receiveCoupons, setReceiveCoupons] = useState(true);
  const [showAltPhone, setShowAltPhone] = useState(false);
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
      <FormSection title="Email Address" description="Order updates and invoices will be sent here.">
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
        <label className="flex items-center gap-2.5 cursor-pointer min-h-[44px]">
          <input
            type="checkbox"
            checked={receiveCoupons}
            onChange={(e) => setReceiveCoupons(e.target.checked)}
            className="w-4 h-4 accent-[var(--secondary)] rounded shrink-0"
          />
          <span className="text-sm text-gray-700">Receive coupons &amp; promotional offers</span>
        </label>
      </FormSection>

      <FormSection title="Shipping Address" description="Where we deliver your wholesale orders.">
        <div>
          <FieldLabel label="Full Name" required htmlFor="register-name" />
          <input id="register-name" type="text" name="name" required autoComplete="name" className={inputClass} placeholder="Full name" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel label="Company Type" required htmlFor="register-company-type" />
            <select id="register-company-type" name="companyType" required className={selectClass} defaultValue="">
              <option value="" disabled>
                Select type
              </option>
              {companyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel label="Company Name" required htmlFor="register-company-name" />
            <input
              id="register-company-name"
              type="text"
              name="companyName"
              required
              autoComplete="organization"
              className={inputClass}
              placeholder="Business name"
            />
          </div>
        </div>

        <div>
          <FieldLabel label="Country" required htmlFor="register-country" />
          <select id="register-country" name="country" required className={selectClass} defaultValue="United States">
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel label="Street Address" required htmlFor="register-street" />
          <input
            id="register-street"
            type="text"
            name="streetAddress"
            required
            autoComplete="street-address"
            className={inputClass}
            placeholder="Street address"
          />
          <p className="text-xs text-gray-500 mt-1.5">We don&apos;t ship to PO/APO addresses</p>
        </div>

        <div>
          <FieldLabel label="Street Address Line 2" htmlFor="register-street-2" />
          <input
            id="register-street-2"
            type="text"
            name="streetAddress2"
            autoComplete="address-line2"
            className={inputClass}
            placeholder="Apt, suite, unit (optional)"
          />
        </div>

        <div>
          <FieldLabel label="City" required htmlFor="register-city" />
          <input id="register-city" type="text" name="city" required autoComplete="address-level2" className={inputClass} placeholder="City" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel label="State / Region" required htmlFor="register-state" />
            <select id="register-state" name="state" required className={selectClass} defaultValue="">
              <option value="" disabled>
                Select state
              </option>
              {usStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel label="Zip / Postal Code" required htmlFor="register-zip" />
            <input
              id="register-zip"
              type="text"
              name="zipCode"
              required
              autoComplete="postal-code"
              className={inputClass}
              placeholder="08902"
            />
          </div>
        </div>

        <div>
          <FieldLabel label="Phone" required htmlFor="register-phone" />
          <input
            id="register-phone"
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            className={inputClass}
            placeholder="(732) 000-0000"
          />
          {!showAltPhone ? (
            <button
              type="button"
              onClick={() => setShowAltPhone(true)}
              className="text-sm text-[var(--secondary)] hover:text-[var(--primary)] font-semibold mt-2 transition-colors min-h-[44px]"
            >
              + Add alternative phone
            </button>
          ) : (
            <div className="mt-3">
              <FieldLabel label="Alternative Phone" htmlFor="register-alt-phone" />
              <input id="register-alt-phone" type="tel" name="altPhone" autoComplete="tel" className={inputClass} placeholder="(732) 000-0000" />
            </div>
          )}
        </div>
      </FormSection>

      <FormSection title="Billing Address" description="Must match the credit card used for purchase.">
        <label className="flex items-center gap-2.5 cursor-pointer min-h-[44px]">
          <input
            type="checkbox"
            checked={sameAsShipping}
            onChange={(e) => setSameAsShipping(e.target.checked)}
            className="w-4 h-4 accent-[var(--secondary)] rounded shrink-0"
          />
          <span className="text-sm text-gray-700 font-medium">Same as shipping address</span>
        </label>
      </FormSection>

      <FormSection title="Create Password" description="Use at least 8 characters with letters and numbers.">
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
      </FormSection>

      <div className="px-4 sm:px-6 md:px-8 py-6 border-t border-gray-200 bg-gray-50">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full min-h-[44px] justify-center disabled:opacity-70"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>

        <p className="text-xs text-gray-500 mt-4 leading-relaxed text-center">
          This site is protected by reCAPTCHA and the Google{' '}
          <Link to="/privacy-policy" className="text-[var(--secondary)] hover:underline font-medium">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link to="/terms-of-service" className="text-[var(--secondary)] hover:underline font-medium">
            Terms of Service
          </Link>{' '}
          apply.
        </p>

        <div className="mt-5 pt-5 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-3">Already have an account?</p>
          <Link to="/login" className="btn-outline min-h-[44px] inline-flex">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
}

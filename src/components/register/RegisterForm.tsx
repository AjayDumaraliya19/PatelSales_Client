import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/AppIcon';
import { companyTypes, countries, usStates } from '../../data/registerPageData';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 border-b border-gray-200 last:border-b-0">
      <div className="md:col-span-4">
        <h2 className="text-base font-bold text-gray-900 mb-1">{title}</h2>
        {description && <p className="text-sm text-gray-500 leading-relaxed">{description}</p>}
      </div>
      <div className="md:col-span-8 space-y-4">{children}</div>
    </div>
  );
}

function FieldLabel({ label, required = false }: { label: string; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {label}
      {required && <span className="text-[#e8471e] ml-0.5">*</span>}
    </label>
  );
}

const inputClass =
  'w-full px-3 py-2.5 text-sm border border-gray-300 rounded outline-none focus:border-[#003087] focus:ring-2 focus:ring-[#003087]/15 bg-white';

const selectClass =
  'w-full px-3 py-2.5 text-sm border border-gray-300 rounded outline-none focus:border-[#003087] focus:ring-2 focus:ring-[#003087]/15 bg-white appearance-none';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [receiveCoupons, setReceiveCoupons] = useState(true);
  const [showAltPhone, setShowAltPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 sm:p-12 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircleIcon" size={32} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Account Created!</h2>
        <p className="text-sm text-gray-600 mb-6">
          Welcome to Patel Sales. You can now shop wholesale food service supplies at bulk pricing.
        </p>
        <Link to="/products" className="btn-primary inline-flex">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg">
      <FormSection title="Email Address" description="Order updates will be sent here.">
        <div>
          <FieldLabel label="Email Address" required />
          <input type="email" name="email" required className={inputClass} placeholder="you@company.com" />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={receiveCoupons}
            onChange={(e) => setReceiveCoupons(e.target.checked)}
            className="w-4 h-4 accent-[#003087] rounded"
          />
          <span className="text-sm text-gray-700">Receive coupons &amp; more</span>
        </label>
      </FormSection>

      <FormSection title="Shipping Address">
        <div>
          <FieldLabel label="Name" required />
          <input type="text" name="name" required className={inputClass} placeholder="Full name" />
        </div>
        <div>
          <FieldLabel label="Company Type" required />
          <select name="companyType" required className={selectClass} defaultValue="">
            <option value="" disabled>
              Select company type
            </option>
            {companyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel label="Company Name" required />
          <input type="text" name="companyName" required className={inputClass} placeholder="Business name" />
        </div>
        <div>
          <FieldLabel label="Country" required />
          <select name="country" required className={selectClass} defaultValue="United States">
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel label="Street Address" required />
          <input type="text" name="streetAddress" required className={inputClass} placeholder="Street address" />
          <p className="text-xs text-gray-500 mt-1">We don&apos;t ship to PO/APO addresses</p>
        </div>
        <div>
          <FieldLabel label="Street Address Line 2 (optional)" />
          <input type="text" name="streetAddress2" className={inputClass} placeholder="Apt, suite, unit, etc." />
        </div>
        <div>
          <FieldLabel label="City" required />
          <input type="text" name="city" required className={inputClass} placeholder="City" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel label="State/Region" required />
            <select name="state" required className={selectClass} defaultValue="">
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
            <FieldLabel label="Zip/Postal Code" required />
            <input type="text" name="zipCode" required className={inputClass} placeholder="08902" />
          </div>
        </div>
        <div>
          <FieldLabel label="Phone" required />
          <input type="tel" name="phone" required className={inputClass} placeholder="(732) 000-0000" />
          {!showAltPhone ? (
            <button
              type="button"
              onClick={() => setShowAltPhone(true)}
              className="text-sm text-[#003087] hover:text-[#e8471e] font-semibold mt-2 transition-colors"
            >
              + Add an Alternative Phone
            </button>
          ) : (
            <div className="mt-3">
              <FieldLabel label="Alternative Phone" />
              <input type="tel" name="altPhone" className={inputClass} placeholder="(732) 000-0000" />
            </div>
          )}
        </div>
      </FormSection>

      <FormSection
        title="Billing Address"
        description="Info must match the credit card making the purchase."
      >
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={sameAsShipping}
            onChange={(e) => setSameAsShipping(e.target.checked)}
            className="w-4 h-4 accent-[#003087] rounded"
          />
          <span className="text-sm text-gray-700 font-medium">Same as shipping address</span>
        </label>
      </FormSection>

      <FormSection title="Create Password" description="Set a strong password to protect your account.">
        <div>
          <FieldLabel label="Password" required />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              minLength={8}
              className={`${inputClass} pr-10`}
              placeholder="Minimum 8 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
            </button>
          </div>
        </div>
      </FormSection>

      <div className="px-4 sm:px-8 py-8 border-t border-gray-200 text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#003087] hover:bg-[#002266] disabled:opacity-70 text-white font-bold text-base px-12 py-3.5 rounded transition-colors min-w-[220px]"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
        <p className="text-xs text-gray-500 mt-4 max-w-md mx-auto leading-relaxed">
          This site is protected by reCAPTCHA and the Google{' '}
          <Link to="/products" className="text-[#003087] hover:underline">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link to="/products" className="text-[#003087] hover:underline">
            Terms of Service
          </Link>{' '}
          apply.
        </p>
        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/products" className="text-[#003087] hover:text-[#e8471e] font-semibold transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
}

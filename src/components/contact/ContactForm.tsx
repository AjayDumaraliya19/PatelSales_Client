import React, { useState } from 'react';
import Icon from '../ui/AppIcon';
import { inquiryTypes } from '../../data/contactPageData';

const inputClass = 'input-field w-full min-h-[44px]';
const selectClass = 'input-field w-full min-h-[44px] appearance-none';

interface ContactFormProps {
  defaultInquiryType?: string;
}

export default function ContactForm({ defaultInquiryType = '' }: ContactFormProps) {
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
      <div className="app-card p-8 sm:p-10 text-center animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircleIcon" size={32} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h2>
        <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
          Thank you for contacting Patel Sales. Our team will get back to you within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="app-card overflow-hidden animate-fade-in">
      <div className="px-4 sm:px-6 md:px-8 py-5 border-b border-gray-100 bg-gray-50">
        <h2 className="text-sm font-bold text-gray-900">Send Us a Message</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Fill out the form below and we&apos;ll respond as soon as possible.
        </p>
      </div>

      <div className="px-4 sm:px-6 md:px-8 py-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-name" className="app-label mb-1.5 block">
              Full Name <span className="text-[var(--primary)]">*</span>
            </label>
            <input id="contact-name" name="name" type="text" required autoComplete="name" className={inputClass} placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="contact-company" className="app-label mb-1.5 block">
              Company Name
            </label>
            <input id="contact-company" name="company" type="text" autoComplete="organization" className={inputClass} placeholder="Business name (optional)" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-email" className="app-label mb-1.5 block">
              Email <span className="text-[var(--primary)]">*</span>
            </label>
            <input id="contact-email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@company.com" />
          </div>
          <div>
            <label htmlFor="contact-phone" className="app-label mb-1.5 block">
              Phone <span className="text-[var(--primary)]">*</span>
            </label>
            <input id="contact-phone" name="phone" type="tel" required autoComplete="tel" className={inputClass} placeholder="(732) 000-0000" />
          </div>
        </div>

        <div>
          <label htmlFor="contact-inquiry" className="app-label mb-1.5 block">
            Inquiry Type <span className="text-[var(--primary)]">*</span>
          </label>
          <select id="contact-inquiry" name="inquiryType" required className={selectClass} defaultValue={defaultInquiryType || ''}>
            <option value="" disabled>
              Select inquiry type
            </option>
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contact-message" className="app-label mb-1.5 block">
            Message <span className="text-[var(--primary)]">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            className={`${inputClass} resize-y min-h-[120px]`}
            placeholder="Tell us how we can help — bulk orders, product questions, delivery, etc."
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full min-h-[44px] justify-center disabled:opacity-70">
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}

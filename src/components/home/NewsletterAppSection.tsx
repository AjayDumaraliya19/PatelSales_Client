import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/AppIcon';

export default function NewsletterAppSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="bg-transparent py-10 md:py-12">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {/* Email signup */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg flex flex-col justify-center">
            <p className="text-gray-800 font-semibold text-base md:text-lg mb-4 leading-tight">
              Get exclusive deals &amp; updates!
            </p>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscribed}
                className="flex-1 px-4 py-3 text-sm border border-gray-300 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-500 outline-none focus:border-[#003087] focus:ring-2 focus:ring-[#003087]/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={isSubmitting || isSubscribed || !email}
                className="bg-gradient-to-r from-[#e8471e] to-[#ff5722] hover:from-[#c73a17] hover:to-[#e64a19] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Icon name="ArrowPathIcon" size={16} className="animate-spin" />
                    <span>Signing...</span>
                  </>
                ) : isSubscribed ? (
                  <>
                    <Icon name="CheckIcon" size={16} />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>
            {isSubscribed && (
              <p className="text-green-600 text-xs mt-3 flex items-center gap-1">
                <Icon name="CheckCircleIcon" size={12} />
                Successfully subscribed!
              </p>
            )}
          </div>

          {/* Plus info */}
          <div className="flex flex-col items-center justify-center gap-4 bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <span className="bg-gradient-to-r from-[#e8471e] to-[#ff5722] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300">
              Plus
            </span>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium text-center">
              Members save on shipping &amp; get exclusive discounts
            </p>
          </div>

          {/* App promo */}
          <Link
            to="/get-the-app"
            className="flex flex-col items-center justify-center gap-4 bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-[#003087] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Icon name="DevicePhoneMobileIcon" size={28} className="text-white" />
            </div>
            <div className="text-center">
              <p className="text-gray-800 font-semibold text-base md:text-lg mb-1">Patel Sales App</p>
              <span className="text-[#003087] hover:text-[#e8471e] text-sm font-medium transition-colors flex items-center justify-center gap-1 group-hover:gap-2">
                Download now
                <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

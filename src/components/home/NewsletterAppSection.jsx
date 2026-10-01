import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/AppIcon';

export default function NewsletterAppSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
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
    <section className="bg-gradient-to-br from-[#f0f4f8] to-[#e8f0f8] py-12 md:py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#27B8F4] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1098E3] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="w-full px-3 sm:px-4 md:px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Stay Connected</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Join our community for exclusive deals, updates, and more</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {/* Email signup */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-center group hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#003087] to-[#0040a0] rounded-xl flex items-center justify-center shadow-lg">
                <Icon name="EnvelopeIcon" size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Newsletter</h3>
                <p className="text-gray-500 text-sm">Get exclusive deals</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Subscribe to receive special offers, new product alerts, and insider tips.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
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
                className="bg-gradient-to-r from-[#003087] to-[#0040a0] hover:from-[#002244] hover:to-[#003087] text-white font-bold text-sm px-4 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Icon name="ArrowPathIcon" size={16} className="animate-spin" />
                  </>
                ) : isSubscribed ? (
                  <Icon name="CheckIcon" size={16} />
                ) : (
                  <Icon name="PaperAirplaneIcon" size={16} />
                )}
              </button>
            </form>
            {isSubscribed && (
              <p className="text-green-600 text-xs mt-3 flex items-center gap-1 font-medium">
                <Icon name="CheckCircleIcon" size={12} />
                Successfully subscribed
              </p>
            )}
          </div>

          {/* Plus info */}
          <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#27B8F4]/10 to-[#1098E3]/10 rounded-2xl p-6 md:p-8 border border-[#27B8F4]/30 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <div className="group-hover:scale-105 transition-transform duration-300">
              <svg width="84" height="56" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="bg-newsletter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#27B8F4"/>
                    <stop offset="100%" stop-color="#1098E3"/>
                  </linearGradient>
                </defs>
                <path
                  d="M18 18 H108 L96 62 H8 Z"
                  fill="url(#bg-newsletter)"
                  rx="6"
                />
                <text
                  x="60"
                  y="48"
                  text-anchor="middle"
                  font-family="Arial, Helvetica, sans-serif"
                  font-size="28"
                  font-weight="700"
                  font-style="italic"
                  fill="#ffffff"
                  letter-spacing="0.5">
                  plus
                </text>
              </svg>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-gray-800 text-lg mb-2">Plus Membership</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Members save on shipping &amp; get exclusive discounts
              </p>
            </div>
          </div>

          {/* App promo */}
          <Link
            to="/get-the-app"
            className="flex flex-col items-center justify-center gap-4 bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
          >
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden relative bg-gray-100">
              <img src="/images/home/app-promo.png" alt="Patel Sales App" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-gray-800 text-lg mb-1">Patel Sales App</h3>
              <p className="text-gray-500 text-sm mb-2">Shop from anywhere</p>
              <span className="text-[#003087] hover:text-[#e8471e] text-sm font-bold transition-colors flex items-center justify-center gap-1 group-hover:gap-2">
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

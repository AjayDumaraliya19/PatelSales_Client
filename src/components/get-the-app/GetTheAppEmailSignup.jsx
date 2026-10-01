import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../ui/AppIcon';

export default function GetTheAppEmailSignup() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (email) {
      navigate('/register', { state: { email } });
    } else {
      navigate('/register');
    }
  };

  return (
    <section className="bg-white border-t border-gray-200 py-12 lg:py-16">
      <div className="w-full px-3 sm:px-4 md:px-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="w-14 h-14 bg-[#003087]/10 rounded-full flex items-center justify-center shrink-0">
            <Icon name="EnvelopeIcon" size={28} className="text-[#003087]" />
          </div>
          <div>
            <h3 className="text-gray-900 font-extrabold text-2xl mb-2">Stay Updated</h3>
            <p className="text-gray-600 text-base font-medium">
              Get exclusive deals & app updates delivered to your inbox
            </p>
          </div>
          <div className="flex w-full gap-3 sm:flex-row flex-col">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl text-base outline-none focus:ring-2 focus:ring-[#003087]/30 transition-all text-gray-800 font-medium text-center sm:text-left"
            />
            <button
              onClick={handleSignUp}
              className="bg-gradient-to-r from-[#003087] to-[#0040a0] hover:from-[#002266] hover:to-[#003087] text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

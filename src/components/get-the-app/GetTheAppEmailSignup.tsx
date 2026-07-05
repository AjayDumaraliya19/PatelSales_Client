import React from 'react';
import Icon from '../ui/AppIcon';

export default function GetTheAppEmailSignup() {
  return (
    <section className="bg-gradient-to-r from-[#003087] to-[#0040a0] py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0">
              <Icon name="EnvelopeIcon" size={28} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-xl mb-1">Stay Updated</h3>
              <p className="text-white/80 text-base">
                Get exclusive deals & app updates delivered to your inbox
              </p>
            </div>
          </div>
          <div className="flex w-full max-w-lg gap-3 flex-1">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 border-0 rounded-xl text-base outline-none focus:ring-2 focus:ring-white/30 shadow-lg"
            />
            <button className="bg-gradient-to-r from-[#e8471e] to-[#ff5722] hover:from-[#c73a17] hover:to-[#e8471e] text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

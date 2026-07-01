import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/AppIcon';

export default function NewsletterAppSection() {
  return (
    <section className="bg-gray-100 border-t border-gray-200 py-6">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* Email signup */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Enter your email to get latest deals &amp; more!
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l outline-none focus:border-[#003087]"
              />
              <button className="bg-[#003087] hover:bg-[#002266] text-white font-bold text-sm px-4 py-2 rounded-r transition-colors">
                Sign Up
              </button>
            </div>
          </div>

          {/* Plus info */}
          <div className="flex items-center gap-3 justify-center">
            <span className="bg-[#003087] text-white text-xs font-bold px-2 py-1 rounded">Plus</span>
            <p className="text-sm text-gray-600">
              Members save on shipping &amp; get exclusive discounts on every order.
            </p>
          </div>

          {/* App promo */}
          <div className="flex items-center gap-4 justify-center md:justify-end">
            <div className="w-10 h-10 bg-[#003087] rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="DevicePhoneMobileIcon" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Patel Sales App</p>
              <Link
                to="/get-the-app"
                className="text-sm text-[#003087] hover:text-[#e8471e] font-medium transition-colors"
              >
                Learn more about our app →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

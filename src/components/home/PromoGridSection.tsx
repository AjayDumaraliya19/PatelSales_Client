import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../ui/AppImage';
import Icon from '../ui/AppIcon';
import { promoGridItems } from '../../data/homePageData';

export default function PromoGridSection() {
  return (
    <section className="bg-white py-4">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {promoGridItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="group border border-gray-200 hover:border-[#003087]/30 hover:shadow-md transition-all bg-white overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                <div className="absolute inset-0">
                  <AppImage
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute top-2 left-2">
                  <svg width="60" height="40" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#27B8F4"/>
                        <stop offset="100%" stop-color="#1098E3"/>
                      </linearGradient>
                    </defs>
                    <path
                      d="M18 18 H108 L96 62 H8 Z"
                      fill="url(#bg)"
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
                <span
                  className={`absolute top-2 right-2 ${item.badgeColor} text-white text-[9px] font-bold w-12 h-12 rounded-full flex items-center justify-center text-center leading-tight shadow-md`}
                >
                  {item.badge}
                </span>
              </div>

              <div className="bg-gray-100 px-3 py-1.5 text-center border-y border-gray-200">
                <span className="text-[11px] text-gray-600">
                  Use Code: <span className="font-bold text-gray-800">{item.promoCode}</span>
                </span>
              </div>

              <div className="p-3 text-center">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#003087] transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlusBannerSection() {
  return (
    <section className="py-6 md:py-8">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="bg-gradient-to-r from-[#003087] via-[#0040a0] to-[#003087] rounded-2xl py-6 md:py-8 relative overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')]"></div>
          </div>

          <div className="relative z-10 px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              {/* Left side - Badge and Text */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex-shrink-0">
                  <svg width="84" height="56" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="bg-banner" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#27B8F4"/>
                        <stop offset="100%" stop-color="#1098E3"/>
                      </linearGradient>
                    </defs>
                    <path
                      d="M18 18 H108 L96 62 H8 Z"
                      fill="url(#bg-banner)"
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
                <div className="text-center md:text-left">
                  <h3 className="text-white font-bold text-lg md:text-xl leading-tight mb-1">
                    Unlock FREE &amp; Priority Shipping
                  </h3>
                  <p className="text-white/90 text-sm md:text-base">
                    Join Plus and save on every order
                  </p>
                </div>
              </div>

              {/* Right side - CTA Button */}
              <div className="flex-shrink-0">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-white text-[#003087] hover:bg-gray-100 font-bold text-sm md:text-base px-6 md:px-8 py-3 md:py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Try it for FREE — 30-DAY TRIAL
                  <Icon name="ArrowRightIcon" size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

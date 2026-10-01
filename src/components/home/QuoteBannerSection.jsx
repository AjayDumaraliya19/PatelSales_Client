import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/AppIcon';

export default function QuoteBannerSection() {
  return (
    <section className="py-6 md:py-8">
      <div className="w-full px-3 sm:px-4 md:px-6">
        <div className="bg-gradient-to-r from-[#e8471e] via-[#ff5722] to-[#e8471e] rounded-2xl py-6 md:py-8 relative overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')]"></div>
          </div>

          <div className="relative z-10 px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              {/* Left side - Icon and Text */}
              <div className="flex items-center gap-4 md:gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <Icon name="ClipboardDocumentListIcon" size={28} className="text-white" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-white font-bold text-lg md:text-xl leading-tight mb-1">
                    Need a Custom Quote?
                  </h3>
                  <p className="text-white/95 text-sm md:text-base">
                    Have a large list of items? Get a personalized quote just for you.
                  </p>
                </div>
              </div>

              {/* Right side - CTA Button */}
              <div className="flex-shrink-0">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-white text-[#e8471e] hover:bg-gray-100 font-bold text-sm md:text-base px-6 md:px-8 py-3 md:py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Request a Quote
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

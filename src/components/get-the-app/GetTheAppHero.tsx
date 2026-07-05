import React from 'react';
import PWAInstallButton from '../pwa/PWAInstallButton';
import Icon from '../ui/AppIcon';

export default function GetTheAppHero() {
  return (
    <section className="bg-gradient-to-br from-[#003087] via-[#0040a0] to-[#0050b8] overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl md:max-w-5xl lg:max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 lg:py-10 sm:py-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/20">
              <Icon name="SparklesIcon" size={16} className="text-yellow-400" />
              <span className="text-white/90 text-sm font-semibold">New Features Available</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Stock up from anywhere, anytime!
              </h1>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-xl font-normal">
                Order wholesale food service supplies on the go. Browse our full catalog, track deliveries,
                reorder favorites, and get exclusive app-only deals — all from your phone.
              </p>
              <p className="text-white/80 text-base leading-relaxed max-w-xl">
                Add to your home screen for faster ordering and an app-like experience.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <PWAInstallButton label="Install App" variant="white" />
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            {/* Main hero image */}
            <div className="relative z-20">
              <img
                src="/images/get-the-app/hero.png"
                alt="Patel Sales Mobile App"
                className="w-full max-w-[450px] h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

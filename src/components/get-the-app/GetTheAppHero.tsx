import React from 'react';
import PhoneMockup, { AppScreenContent } from './PhoneMockup';
import PWAInstallButton from '../pwa/PWAInstallButton';

export default function GetTheAppHero() {
  return (
    <section className="bg-gradient-to-r from-[#003087] to-[#0040a0] overflow-hidden pt-0">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-5">
              Stock up from anywhere, anytime!
            </h1>
            <p className="text-white/85 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Order wholesale food service supplies on the go. Browse our full catalog, track deliveries,
              reorder favorites, and get exclusive app-only deals — all from your phone.
            </p>
            <PWAInstallButton label="Install App" variant="white" />
          </div>

          <div className="relative flex justify-center lg:justify-end min-h-[420px]">
            <div className="absolute left-0 lg:left-8 top-8 -rotate-6 z-10 w-[180px] h-[340px] bg-gray-900 rounded-[2rem] p-2 shadow-xl">
              <div className="w-full h-full bg-black rounded-[1.6rem]" />
            </div>
            <div className="relative z-20 rotate-3 w-[180px] h-[340px] bg-gray-900 rounded-[2rem] p-2 shadow-xl">
              <div className="w-full h-full bg-black rounded-[1.6rem]" />
            </div>

            <div className="absolute top-4 right-4 lg:right-12 bg-white rounded-lg shadow-lg px-3 py-2 z-30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#003087] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-800">Order Delivered</div>
                  <div className="text-[9px] text-gray-500">Track in real time</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-16 left-0 bg-white rounded-lg shadow-lg px-3 py-2 z-30 hidden sm:block">
              <div className="text-[10px] font-bold text-[#003087]">Daily Delivery Notifications</div>
              <div className="text-[9px] text-gray-500">Stay in the loop</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import Icon from '../ui/AppIcon';
import PWAInstallGuide from '../pwa/PWAInstallGuide';

function StarRating() {
  return (
    <div className="flex items-center justify-center gap-1 mb-3">
      <span className="text-lg font-bold text-gray-800">4.9</span>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Icon key={i} name="StarIcon" size={16} className="text-yellow-400 fill-yellow-400" />
        ))}
      </div>
    </div>
  );
}

function PhoneDevice({ type }: { type: 'ios' | 'android' }) {
  const isIos = type === 'ios';

  return (
    <div className="flex justify-center mb-6">
      <div
        className={`w-[160px] h-[320px] rounded-[2rem] p-2 shadow-xl ${
          isIos ? 'bg-gray-900' : 'bg-gray-800'
        }`}
      >
        <div className="w-full h-full bg-black rounded-[1.6rem] overflow-hidden relative">
          {isIos && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-900 rounded-b-lg z-10" />
          )}
          <div className="pt-6 h-full bg-black p-2">
            <div className="h-8 bg-[#003087] rounded mb-2" />
            <div className="grid grid-cols-2 gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 bg-gray-800 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlatformInstallSection({
  type,
  badgeTitle,
  badgeSub,
  caption,
}: {
  type: 'ios' | 'android';
  badgeTitle: string;
  badgeSub: string;
  caption: string;
}) {
  return (
    <div className="text-center">
      <PhoneDevice type={type} />
      <StarRating />
      <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg mb-4">
        <Icon name="DevicePhoneMobileIcon" size={20} />
        <div className="text-left">
          <div className="text-[9px] opacity-80">{badgeSub}</div>
          <div className="text-sm font-bold leading-tight">{badgeTitle}</div>
        </div>
      </div>
      <p className="text-gray-700 font-semibold mb-4">{caption}</p>
    </div>
  );
}

export default function GetTheAppDownload() {
  return (
    <section className="bg-[#eef5f0] py-14 lg:py-16 border-t border-[#d4e8da]">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 mb-10">
          <PlatformInstallSection
            type="ios"
            badgeSub="Works on"
            badgeTitle="iPhone & iPad"
            caption="Add to Home Screen via Safari"
          />
          <PlatformInstallSection
            type="android"
            badgeSub="Works on"
            badgeTitle="Android & Desktop"
            caption="Install directly from Chrome"
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <PWAInstallGuide />
        </div>
      </div>
    </section>
  );
}

export function GetTheAppEmailSignup() {
  return (
    <section className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-gray-700 font-semibold text-base whitespace-nowrap">
            Enter your email to get latest deals &amp; more!
          </p>
          <div className="flex w-full max-w-md gap-0">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-l-md text-sm outline-none focus:border-[#003087]"
            />
            <button className="bg-[#003087] hover:bg-[#002266] text-white font-bold text-sm px-6 py-2.5 rounded-r-md transition-colors">
              Sign Up
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-[#e8471e] text-white text-xs font-bold px-2 py-1 rounded">Plus</span>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                <Icon name="DevicePhoneMobileIcon" size={16} className="text-white" />
              </div>
              <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                <Icon name="DevicePhoneMobileIcon" size={16} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

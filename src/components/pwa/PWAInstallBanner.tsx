import React, { useState } from 'react';
import Icon from '../ui/AppIcon';
import { usePWA } from '../../hooks/usePWA';

interface PWAInstallBannerProps {
  variant?: 'bar' | 'card';
}

export default function PWAInstallBanner({ variant = 'bar' }: PWAInstallBannerProps) {
  const { canInstall, installApp, dismissInstall, isInstalled } = usePWA();
  const [isInstalling, setIsInstalling] = useState(false);

  if (!canInstall || isInstalled) return null;

  const handleInstall = async () => {
    setIsInstalling(true);
    await installApp();
    setIsInstalling(false);
  };

  if (variant === 'card') {
    return (
      <div className="bg-gradient-to-br from-[#003087] to-[#0040a0] rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-md">
            <img src="/icons/icon-72x72.png" alt="" className="w-10 h-10 rounded-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base mb-1">Install Patel Sales App</h3>
            <p className="text-white/80 text-sm mb-4 leading-relaxed">
              Add to your home screen for faster ordering, offline access, and app-like experience.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleInstall}
                disabled={isInstalling}
                className="bg-[#e8471e] hover:bg-[#c73a17] disabled:opacity-70 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
              >
                {isInstalling ? 'Installing...' : 'Install App'}
              </button>
              <button
                onClick={dismissInstall}
                className="text-white/70 hover:text-white text-sm font-medium px-3 py-2.5"
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pwa-install-bar fixed left-0 right-0 z-40 top-[8.25rem] md:top-[6.5rem] lg:top-[7.25rem] border-b border-white/10 shadow-md">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <img src="/icons/icon-72x72.png" alt="" className="w-8 h-8 rounded-lg shrink-0 hidden sm:block" />
          <Icon name="DevicePhoneMobileIcon" size={18} className="text-white shrink-0 sm:hidden" />
          <span className="text-white text-xs sm:text-sm font-medium truncate">
            Install Patel Sales for quick wholesale ordering
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleInstall}
            disabled={isInstalling}
            className="bg-[#e8471e] hover:bg-[#c73a17] disabled:opacity-70 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
          >
            {isInstalling ? '...' : 'Install'}
          </button>
          <button
            onClick={dismissInstall}
            className="text-white/60 hover:text-white p-1.5 transition-colors"
            aria-label="Dismiss install prompt"
          >
            <Icon name="XMarkIcon" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

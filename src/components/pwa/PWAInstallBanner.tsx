import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/AppIcon';
import { usePWA } from '../../hooks/usePWA';

interface PWAInstallBannerProps {
  variant?: 'bar' | 'card';
}

export default function PWAInstallBanner({ variant = 'bar' }: PWAInstallBannerProps) {
  const { canInstall, installApp, dismissInstallBanner, isInstalled, shouldShowInstallPromo } = usePWA();
  const [isInstalling, setIsInstalling] = useState(false);

  if (isInstalled || !shouldShowInstallPromo) return null;

  const handleInstall = async () => {
    setIsInstalling(true);
    await installApp();
    setIsInstalling(false);
  };

  if (variant === 'card') {
    return (
      <div className="bg-gradient-to-br from-[#003087] to-[#0040a0] rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-md p-1">
            <img src="/icons/icon-72x72.png" alt="" className="w-full h-full rounded-lg object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base mb-1">Get the Patel Sales App</h3>
            <p className="text-white/80 text-sm mb-4 leading-relaxed">
              Install on your phone for quick wholesale ordering — works like a native app.
            </p>
            <div className="flex flex-wrap gap-2">
              {canInstall ? (
                <button
                  type="button"
                  onClick={handleInstall}
                  disabled={isInstalling}
                  className="bg-[#e8471e] hover:bg-[#c73a17] disabled:opacity-70 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors min-h-[44px]"
                >
                  {isInstalling ? 'Installing...' : 'Install Now'}
                </button>
              ) : (
                <Link
                  to="/get-the-app"
                  className="bg-[#e8471e] hover:bg-[#c73a17] text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors min-h-[44px] inline-flex items-center"
                >
                  How to Install
                </Link>
              )}
              <button
                type="button"
                onClick={dismissInstallBanner}
                className="text-white/70 hover:text-white text-sm font-medium px-3 py-2.5 min-h-[44px]"
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
    <div className="pwa-install-bar fixed left-0 right-0 z-40 border-b border-white/10 shadow-md">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <img src="/icons/icon-72x72.png" alt="" className="w-8 h-8 rounded-lg shrink-0 hidden sm:block" />
          <Icon name="DevicePhoneMobileIcon" size={18} className="text-white shrink-0 sm:hidden" />
          <span className="text-white text-xs sm:text-sm font-medium truncate">
            {canInstall ? 'Install Patel Sales app on your device' : 'Get the Patel Sales app on your phone'}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {canInstall ? (
            <button
              type="button"
              onClick={handleInstall}
              disabled={isInstalling}
              className="bg-[#e8471e] hover:bg-[#c73a17] disabled:opacity-70 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors min-h-[36px]"
            >
              {isInstalling ? '...' : 'Install'}
            </button>
          ) : (
            <Link
              to="/get-the-app"
              className="bg-[#e8471e] hover:bg-[#c73a17] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors min-h-[36px] inline-flex items-center"
            >
              Get App
            </Link>
          )}
          <button
            type="button"
            onClick={dismissInstallBanner}
            className="text-white/60 hover:text-white p-1.5 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Dismiss install prompt"
          >
            <Icon name="XMarkIcon" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

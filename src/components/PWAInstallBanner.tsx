import React, { useState, useEffect } from 'react';
import Icon from './ui/AppIcon';

export default function PWAInstallBanner() {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    const prompt = deferredPrompt as any;
    prompt.prompt();
    const result = await prompt.userChoice;
    if (result.outcome === 'accepted') setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed top-[108px] lg:top-[140px] left-0 right-0 z-40 bg-[#003087] border-b border-white/20">
      <div className="w-full px-4 py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon name="DevicePhoneMobileIcon" size={16} className="text-white flex-shrink-0" />
          <span className="text-white text-xs font-medium">
            Install Patel Sales app for quick access to wholesale supplies
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleInstall}
            className="bg-[#e8471e] hover:bg-[#c73a17] text-white text-xs font-bold px-3 py-1.5 rounded-sm transition-colors"
          >
            Install
          </button>
          <button
            onClick={() => setShow(false)}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <Icon name="XMarkIcon" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

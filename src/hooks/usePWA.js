import { useCallback, useEffect, useState } from 'react';
import { detectPwaPlatform, isStandaloneMode } from '../utils/pwaPlatform';

const INSTALL_DISMISS_KEY = 'pwa-install-dismissed';
const INSTALL_DISMISS_DAYS = 7;

function isInstallBannerDismissed() {
  const dismissedAt = localStorage.getItem(INSTALL_DISMISS_KEY);
  if (!dismissedAt) return false;
  const elapsed = Date.now() - Number(dismissedAt);
  return elapsed < INSTALL_DISMISS_DAYS * 24 * 60 * 60 * 1000;
}

let globalDeferredPrompt = null;
const promptSubscribers = new Set();

const notifyPromptSubscribers = () => {
  promptSubscribers.forEach((callback) => callback(globalDeferredPrompt));
};

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (event) => {
    // Intercept default prompt so we can trigger it from our custom install UI
    event.preventDefault();
    if (isStandaloneMode()) return;
    globalDeferredPrompt = event;
    notifyPromptSubscribers();
  });

  window.addEventListener('appinstalled', () => {
    globalDeferredPrompt = null;
    notifyPromptSubscribers();
  });
}

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(globalDeferredPrompt);
  const [isInstallable, setIsInstallable] = useState(Boolean(globalDeferredPrompt));
  const [isInstalled, setIsInstalled] = useState(isStandaloneMode);
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [platform, setPlatform] = useState('desktop');
  const [isBannerDismissed, setIsBannerDismissed] = useState(isInstallBannerDismissed);

  useEffect(() => {
    setPlatform(detectPwaPlatform());
    setIsBannerDismissed(isInstallBannerDismissed());
    setIsInstalled(isStandaloneMode());
    setIsInstallable(Boolean(globalDeferredPrompt));
    setDeferredPrompt(globalDeferredPrompt);

    const handlePromptUpdate = (prompt) => {
      setDeferredPrompt(prompt);
      setIsInstallable(Boolean(prompt));
    };

    promptSubscribers.add(handlePromptUpdate);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleDisplayMode = () => setIsInstalled(isStandaloneMode());

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    const mql = window.matchMedia('(display-mode: standalone)');
    mql.addEventListener('change', handleDisplayMode);

    return () => {
      promptSubscribers.delete(handlePromptUpdate);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      mql.removeEventListener('change', handleDisplayMode);
    };
  }, []);

  const installApp = useCallback(async () => {
    const promptEvent = globalDeferredPrompt || deferredPrompt;
    if (!promptEvent) return false;

    try {
      await promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      globalDeferredPrompt = null;
      setDeferredPrompt(null);
      setIsInstallable(false);
      notifyPromptSubscribers();

      if (outcome === 'accepted') {
        setIsInstalled(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error invoking PWA install prompt:', err);
      return false;
    }
  }, [deferredPrompt]);

  const dismissInstallBanner = useCallback(() => {
    localStorage.setItem(INSTALL_DISMISS_KEY, String(Date.now()));
    setIsBannerDismissed(true);
  }, []);

  const canInstall = isInstallable && !isInstalled;
  const shouldShowInstallPromo = !isInstalled && !isBannerDismissed;

  return {
    platform,
    isInstallable,
    isInstalled,
    isOnline,
    isBannerDismissed,
    installApp,
    dismissInstallBanner,
    canInstall,
    shouldShowInstallPromo,
  };
}

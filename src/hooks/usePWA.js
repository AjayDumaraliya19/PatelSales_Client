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

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(isStandaloneMode);
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [platform, setPlatform] = useState('desktop');
  const [isBannerDismissed, setIsBannerDismissed] = useState(isInstallBannerDismissed);

  useEffect(() => {
    setPlatform(detectPwaPlatform());
    setIsBannerDismissed(isInstallBannerDismissed());

    const handleBeforeInstall = (event) => {
      event.preventDefault();
      if (isStandaloneMode()) return;
      setDeferredPrompt(event);
      setIsInstallable(true);
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleDisplayMode = () => setIsInstalled(isStandaloneMode());

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.matchMedia('(display-mode: standalone)').addEventListener('change', handleDisplayMode);

    setIsInstalled(isStandaloneMode());

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.matchMedia('(display-mode: standalone)').removeEventListener('change', handleDisplayMode);
    };
  }, []);

  const installApp = useCallback(async () => {
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setIsInstallable(false);
    if (outcome === 'accepted') {
      setIsInstalled(true);
      return true;
    }
    return false;
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

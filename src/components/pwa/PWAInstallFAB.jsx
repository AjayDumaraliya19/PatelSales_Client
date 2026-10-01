import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/AppIcon';
import { usePWA } from '../../hooks/usePWA';

export default function PWAInstallFAB() {
  const { isInstalled, canInstall, installApp } = usePWA();
  const [isInstalling, setIsInstalling] = React.useState(false);

  if (isInstalled) return null;

  const handleInstall = async () => {
    setIsInstalling(true);
    await installApp();
    setIsInstalling(false);
  };

  if (canInstall) {
    return (
      <button
        type="button"
        onClick={handleInstall}
        disabled={isInstalling}
        className="pwa-install-fab lg:hidden"
        aria-label="Install Patel Sales app"
      >
        <Icon name="ArrowDownTrayIcon" size={20} />
        <span>{isInstalling ? 'Installing...' : 'Install App'}</span>
      </button>
    );
  }

  return (
    <Link to="/get-the-app" className="pwa-install-fab lg:hidden" aria-label="Get the Patel Sales app">
      <Icon name="DevicePhoneMobileIcon" size={20} />
      <span>Get App</span>
    </Link>
  );
}

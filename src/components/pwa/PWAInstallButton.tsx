import React from 'react';
import Icon from '../ui/AppIcon';
import { usePWA } from '../../hooks/usePWA';

interface PWAInstallButtonProps {
  className?: string;
  label?: string;
  variant?: 'green' | 'white';
}

const variantClasses = {
  green: 'bg-[#369550] hover:bg-[#2d8044] text-white',
  white: 'bg-white hover:bg-gray-100 text-[#004d2c] shadow-lg',
};

export default function PWAInstallButton({
  className = '',
  label = 'Install App',
  variant = 'green',
}: PWAInstallButtonProps) {
  const { canInstall, isInstalled, installApp } = usePWA();
  const [isInstalling, setIsInstalling] = React.useState(false);

  if (isInstalled) {
    return (
      <div className={`inline-flex items-center gap-2 text-[#369550] font-semibold text-sm ${className}`}>
        <Icon name="CheckCircleIcon" size={18} />
        App Installed
      </div>
    );
  }

  if (!canInstall) {
    return (
      <p className={`text-sm text-gray-500 ${className}`}>
        Open in Chrome or Edge on mobile/desktop to install this app.
      </p>
    );
  }

  const handleInstall = async () => {
    setIsInstalling(true);
    await installApp();
    setIsInstalling(false);
  };

  return (
    <button
      onClick={handleInstall}
      disabled={isInstalling}
      className={`${variantClasses[variant]} disabled:opacity-70 font-bold text-sm px-8 py-3 rounded-md transition-colors inline-flex items-center gap-2 ${className}`}
    >
      <Icon name="ArrowDownTrayIcon" size={18} />
      {isInstalling ? 'Installing...' : label}
    </button>
  );
}

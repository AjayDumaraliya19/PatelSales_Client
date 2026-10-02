import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/AppIcon';
import { usePWA } from '../../hooks/usePWA';

export default function PWAInstallButton({
  className = '',
  label = 'Install App',
  variant = 'primary',
}) {
  const { canInstall, isInstalled, installApp } = usePWA();
  const [isInstalling, setIsInstalling] = React.useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);
    await installApp();
    setIsInstalling(false);
  };

  if (isInstalled) {
    return (
      <div className={`flex items-center gap-2 text-green-600 font-semibold ${className}`}>
        <Icon name="CheckCircleIcon" size={18} />
        App Installed
      </div>
    );
  }

  if (canInstall) {
    const buttonClass = variant === 'white'
      ? 'bg-white hover:bg-gray-100 text-[#003087] font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl'
      : 'bg-gradient-to-r from-[#e8471e] to-[#ff5722] hover:from-[#c73a17] hover:to-[#e8471e] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl';

    return (
      <button
        type="button"
        onClick={handleInstall}
        disabled={isInstalling}
        className={`inline-flex items-center justify-center gap-2 min-h-[52px] disabled:opacity-70 ${buttonClass} ${className}`}
      >
        <Icon name="ArrowDownTrayIcon" size={20} />
        {isInstalling ? 'Installing...' : label}
      </button>
    );
  }

  // If can't install directly, link to full install guide
  const buttonClass = variant === 'white'
    ? 'bg-white hover:bg-gray-100 text-[#003087] font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl'
    : 'bg-gradient-to-r from-[#e8471e] to-[#ff5722] hover:from-[#c73a17] hover:to-[#e8471e] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl';

  return (
    <Link
      to="/get-the-app"
      className={`inline-flex items-center justify-center gap-2 min-h-[52px] ${buttonClass} ${className}`}
    >
      <Icon name="DevicePhoneMobileIcon" size={20} />
      {label}
    </Link>
  );
}

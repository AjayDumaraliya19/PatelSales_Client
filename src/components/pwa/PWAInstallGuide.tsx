import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/AppIcon';
import { usePWA } from '../../hooks/usePWA';
import type { PwaPlatform } from '../../utils/pwaPlatform';

interface PWAInstallGuideProps {
  variant?: 'card' | 'compact' | 'inline';
  showTitle?: boolean;
}

const installSteps: Record<PwaPlatform, { title: string; steps: string[] }> = {
  ios: {
    title: 'Install on iPhone / iPad',
    steps: [
      'Open this site in Safari browser',
      'Tap the Share button at the bottom',
      'Scroll and tap "Add to Home Screen"',
      'Tap "Add" — Patel Sales icon will appear on your home screen',
    ],
  },
  android: {
    title: 'Install on Android',
    steps: [
      'Open this site in Chrome browser',
      'Tap the menu (⋮) at the top-right corner',
      'Tap "Install app" or "Add to Home screen"',
      'Confirm install — app icon will appear on your home screen',
    ],
  },
  desktop: {
    title: 'Install on Desktop',
    steps: [
      'Open this site in Google Chrome or Microsoft Edge',
      'Look for the install icon in the address bar (right side)',
      'Click "Install" in the popup',
      'Patel Sales will open as a desktop app',
    ],
  },
};

export default function PWAInstallGuide({ variant = 'card', showTitle = true }: PWAInstallGuideProps) {
  const { platform, canInstall, isInstalled, installApp } = usePWA();
  const [isInstalling, setIsInstalling] = React.useState(false);

  if (isInstalled) {
    return (
      <div className="flex items-center gap-2 text-[var(--secondary)] font-semibold text-sm">
        <Icon name="CheckCircleIcon" size={18} />
        App installed on your device
      </div>
    );
  }

  const handleInstall = async () => {
    setIsInstalling(true);
    await installApp();
    setIsInstalling(false);
  };

  const guide = installSteps[platform];

  if (canInstall) {
    return (
      <div className={variant === 'compact' ? 'space-y-3' : 'space-y-4'}>
        {showTitle && (
          <h3 className="text-sm font-bold text-gray-900">Install Patel Sales App</h3>
        )}
        <p className="text-sm text-gray-600 leading-relaxed">
          Add to your home screen for faster ordering and an app-like experience.
        </p>
        <button
          type="button"
          onClick={handleInstall}
          disabled={isInstalling}
          className="btn-primary min-h-[44px] inline-flex disabled:opacity-70"
        >
          <Icon name="ArrowDownTrayIcon" size={18} />
          {isInstalling ? 'Installing...' : 'Install App Now'}
        </button>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <Link to="/get-the-app" className="btn-primary min-h-[44px] inline-flex text-sm">
        <Icon name="DevicePhoneMobileIcon" size={18} />
        Get the App
      </Link>
    );
  }

  return (
    <div
      className={
        variant === 'compact'
          ? 'space-y-3'
          : 'app-card p-4 sm:p-5 space-y-4'
      }
    >
      {showTitle && (
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
            <Icon name="DevicePhoneMobileIcon" size={20} className="text-[var(--secondary)]" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">{guide.title}</h3>
        </div>
      )}
      <ol className="space-y-2.5">
        {guide.steps.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
            <span className="w-6 h-6 rounded-full bg-[var(--secondary)] text-white text-xs font-bold flex items-center justify-center shrink-0">
              {index + 1}
            </span>
            <span className="pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
      <Link to="/get-the-app" className="btn-outline min-h-[44px] inline-flex text-sm w-full sm:w-auto justify-center">
        View full install guide
      </Link>
    </div>
  );
}

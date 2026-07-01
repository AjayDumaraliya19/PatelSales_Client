import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';
import OfflineBanner from './pwa/OfflineBanner';
import PWAUpdatePrompt from './pwa/PWAUpdatePrompt';
import PWAInstallBanner from './pwa/PWAInstallBanner';
import { usePWA } from '../hooks/usePWA';

export default function AppShell() {
  const { isInstalled, canInstall } = usePWA();

  return (
    <div
      className={`app-shell ${isInstalled ? 'app-shell--standalone' : ''} ${canInstall ? 'app-shell--installable' : ''}`}
    >
      <OfflineBanner />
      <Header />
      {!isInstalled && <PWAInstallBanner />}
      <main className="app-main content-below-header">
        <Outlet />
      </main>
      <div className="hidden lg:block">
        <Footer />
      </div>
      <BottomNav />
      <PWAUpdatePrompt />
    </div>
  );
}

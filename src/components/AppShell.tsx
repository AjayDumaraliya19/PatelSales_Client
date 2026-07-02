import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';
import OfflineBanner from './pwa/OfflineBanner';
import PWAUpdatePrompt from './pwa/PWAUpdatePrompt';
import PWAInstallBanner from './pwa/PWAInstallBanner';
import PWAInstallFAB from './pwa/PWAInstallFAB';
import { usePWA } from '../hooks/usePWA';

export default function AppShell() {
  const { isInstalled, canInstall } = usePWA();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div
      className={`app-shell ${isInstalled ? 'app-shell--standalone' : ''} ${canInstall ? 'app-shell--installable' : ''}`}
    >
      <OfflineBanner />
      <Header />
      {!isInstalled && <PWAInstallBanner />}
      <main
        className={`app-main ${isHomePage ? 'app-main--home' : 'content-below-header'}`}
      >
        <Outlet />
      </main>
      <div className="hidden lg:block">
        <Footer />
      </div>
      <BottomNav />
      <PWAInstallFAB />
      <PWAUpdatePrompt />
    </div>
  );
}

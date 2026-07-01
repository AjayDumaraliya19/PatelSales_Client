import React from 'react';
import GetTheAppHero from '../components/get-the-app/GetTheAppHero';
import GetTheAppFeatures from '../components/get-the-app/GetTheAppFeatures';
import GetTheAppRestock, { GetTheAppPlus } from '../components/get-the-app/GetTheAppPromo';
import GetTheAppDoMore from '../components/get-the-app/GetTheAppDoMore';
import GetTheAppDownload, { GetTheAppEmailSignup } from '../components/get-the-app/GetTheAppDownload';
import PWAInstallBanner from '../components/pwa/PWAInstallBanner';

export default function GetTheAppPage() {
  return (
    <div className="min-h-full bg-[#f5f5f5]">
      <div className="px-3 sm:px-4 md:px-6 pt-4 lg:hidden">
        <PWAInstallBanner variant="card" />
      </div>
      <GetTheAppHero />
      <GetTheAppFeatures />
      <GetTheAppRestock />
      <GetTheAppPlus />
      <GetTheAppDoMore />
      <GetTheAppDownload />
      <GetTheAppEmailSignup />
    </div>
  );
}

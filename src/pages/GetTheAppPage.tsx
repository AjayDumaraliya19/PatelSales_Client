import React from 'react';
import GetTheAppHero from '../components/get-the-app/GetTheAppHero';
import GetTheAppFeatures from '../components/get-the-app/GetTheAppFeatures';
import GetTheAppRestock, { GetTheAppPlus } from '../components/get-the-app/GetTheAppPromo';
import GetTheAppDoMore from '../components/get-the-app/GetTheAppDoMore';
import GetTheAppDownload, { GetTheAppEmailSignup } from '../components/get-the-app/GetTheAppDownload';

export default function GetTheAppPage() {
  return (
    <div className="min-h-full bg-[#f5f5f5]">
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

import React from 'react';
import GetTheAppHero from '../components/get-the-app/GetTheAppHero';
import GetTheAppFeatures from '../components/get-the-app/GetTheAppFeatures';
import GetTheAppDoMore from '../components/get-the-app/GetTheAppDoMore';
import GetTheAppEmailSignup from '../components/get-the-app/GetTheAppEmailSignup';

export default function GetTheAppPage() {
  return (
    <div className="min-h-full bg-[#f5f5f5]">
      <GetTheAppHero />
      <GetTheAppFeatures />
      <GetTheAppDoMore />
      <GetTheAppEmailSignup />
    </div>
  );
}

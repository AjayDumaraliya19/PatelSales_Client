import React from 'react';
import InfoPageLayout from '../components/info/InfoPageLayout';
import LegalContent from '../components/info/LegalContent';
import { lastUpdated, privacyPolicySections } from '../data/sitePagesData';

export default function PrivacyPolicyPage() {
  return (
    <InfoPageLayout
      title="Privacy Policy"
      subtitle="How Patel Sales collects, uses, and protects your information."
      lastUpdated={lastUpdated}
      breadcrumbs={[
        { label: 'Patel Sales', href: '/' },
        { label: 'Privacy Policy' },
      ]}
    >
      <div className="bg-gradient-to-r from-[#003087] to-[#0040a0] rounded-2xl p-6 lg:p-8 shadow-lg mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-lg mb-1">
              Your Privacy Matters to Us
            </p>
            <p className="text-white/80 text-base">
              We are committed to protecting your personal information
            </p>
          </div>
        </div>
      </div>
      <LegalContent sections={privacyPolicySections} />
    </InfoPageLayout>
  );
}

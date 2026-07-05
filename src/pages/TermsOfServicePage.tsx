import React from 'react';
import InfoPageLayout from '../components/info/InfoPageLayout';
import LegalContent from '../components/info/LegalContent';
import { lastUpdated, termsOfServiceSections } from '../data/sitePagesData';

export default function TermsOfServicePage() {
  return (
    <InfoPageLayout
      title="Terms of Service"
      subtitle="Terms governing your use of Patel Sales wholesale ordering services."
      lastUpdated={lastUpdated}
      breadcrumbs={[
        { label: 'Patel Sales', href: '/' },
        { label: 'Terms of Service' },
      ]}
    >
      <div className="bg-gradient-to-r from-[#003087] to-[#0040a0] rounded-2xl p-6 lg:p-8 shadow-lg mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-lg mb-1">
              Please Read Our Terms
            </p>
            <p className="text-white/80 text-base">
              Understanding these terms helps ensure a smooth ordering experience
            </p>
          </div>
        </div>
      </div>
      <LegalContent sections={termsOfServiceSections} />
    </InfoPageLayout>
  );
}

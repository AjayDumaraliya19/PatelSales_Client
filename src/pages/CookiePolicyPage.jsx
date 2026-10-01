import React from 'react';
import { Link } from 'react-router-dom';
import InfoPageLayout from '../components/info/InfoPageLayout';
import LegalContent from '../components/info/LegalContent';
import { lastUpdated, cookiePolicySections } from '../data/sitePagesData';

export default function CookiePolicyPage() {
  return (
    <InfoPageLayout
      title="Cookie Policy"
      subtitle="How we use cookies and similar technologies on our website and app."
      lastUpdated={lastUpdated}
      breadcrumbs={[
        { label: 'Patel Sales', href: '/' },
        { label: 'Cookie Policy' },
      ]}
    >
      <LegalContent sections={cookiePolicySections} />
      <p className="text-sm text-gray-600 mt-6 text-center">
        See also our{' '}
        <Link to="/privacy-policy" className="text-[var(--secondary)] font-semibold hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </InfoPageLayout>
  );
}

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
      <LegalContent sections={privacyPolicySections} />
    </InfoPageLayout>
  );
}

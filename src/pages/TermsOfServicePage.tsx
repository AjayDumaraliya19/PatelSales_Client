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
      <LegalContent sections={termsOfServiceSections} />
    </InfoPageLayout>
  );
}

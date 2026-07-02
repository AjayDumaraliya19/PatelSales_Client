import React from 'react';
import { Link } from 'react-router-dom';
import InfoPageLayout from '../components/info/InfoPageLayout';
import LegalContent from '../components/info/LegalContent';
import { lastUpdated, returnsPolicySections } from '../data/sitePagesData';

export default function ReturnsPage() {
  return (
    <InfoPageLayout
      title="Returns & Exchanges"
      subtitle="Our 30-day return policy for wholesale food service supplies."
      lastUpdated={lastUpdated}
      breadcrumbs={[
        { label: 'Patel Sales', href: '/' },
        { label: 'Returns & Exchanges' },
      ]}
    >
      <LegalContent sections={returnsPolicySections} />
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <Link to="/contact" className="btn-primary min-h-[44px] inline-flex">
          Contact Support
        </Link>
        <Link to="/track-order" className="btn-outline min-h-[44px] inline-flex">
          Track Order
        </Link>
      </div>
    </InfoPageLayout>
  );
}

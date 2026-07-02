import React from 'react';
import { Link } from 'react-router-dom';
import InfoPageLayout from '../components/info/InfoPageLayout';
import LegalContent from '../components/info/LegalContent';
import { lastUpdated, shippingPolicySections } from '../data/sitePagesData';

export default function ShippingPage() {
  return (
    <InfoPageLayout
      title="Shipping Information"
      subtitle="Delivery areas, free shipping, and order processing times."
      lastUpdated={lastUpdated}
      breadcrumbs={[
        { label: 'Patel Sales', href: '/' },
        { label: 'Shipping Info' },
      ]}
    >
      <div className="app-card p-4 sm:p-5 mb-6 bg-[var(--secondary)]/5 border-[var(--secondary)]/20">
        <p className="text-sm font-semibold text-gray-900">
          Free shipping on orders over <span className="text-[var(--secondary)]">$150</span> in NJ, NY, CT &amp; PA
        </p>
      </div>
      <LegalContent sections={shippingPolicySections} />
      <div className="mt-6 text-center">
        <Link to="/track-order" className="btn-primary min-h-[44px] inline-flex">
          Track Your Order
        </Link>
      </div>
    </InfoPageLayout>
  );
}

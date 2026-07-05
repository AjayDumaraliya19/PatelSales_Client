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
      <div className="bg-gradient-to-r from-[#003087] to-[#0040a0] rounded-2xl p-6 lg:p-8 shadow-lg mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-lg mb-1">
              Free Shipping on Orders Over $150
            </p>
            <p className="text-white/80 text-base">
              Available in NJ, NY, CT & PA
            </p>
          </div>
        </div>
      </div>
      <LegalContent sections={shippingPolicySections} />
      <div className="mt-8 lg:mt-12 text-center">
        <Link to="/track-order" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#003087] to-[#0040a0] hover:from-[#002244] hover:to-[#003087] text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          Track Your Order
        </Link>
      </div>
    </InfoPageLayout>
  );
}

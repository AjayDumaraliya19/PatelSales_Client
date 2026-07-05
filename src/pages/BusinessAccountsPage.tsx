import React from 'react';
import { Link } from 'react-router-dom';
import InfoPageLayout from '../components/info/InfoPageLayout';
import LegalContent from '../components/info/LegalContent';
import Icon from '../components/ui/AppIcon';
import { businessAccountsSections } from '../data/sitePagesData';

const benefits = [
  { icon: 'CurrencyDollarIcon' as const, title: 'Wholesale Pricing', desc: 'Case quantities at up to 50% off retail' },
  { icon: 'ClockIcon' as const, title: 'Net-30 Terms', desc: 'Credit-approved business accounts' },
  { icon: 'TruckIcon' as const, title: 'Priority Shipping', desc: 'Faster processing for recurring orders' },
  { icon: 'PhoneIcon' as const, title: 'Dedicated Support', desc: 'Direct line to your account manager' },
];

export default function BusinessAccountsPage() {
  return (
    <InfoPageLayout
      title="Business Accounts"
      subtitle="Wholesale pricing and credit terms for food service businesses."
      breadcrumbs={[
        { label: 'Patel Sales', href: '/' },
        { label: 'Business Accounts' },
      ]}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {benefits.map((item) => (
          <div key={item.title} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-[#003087] to-[#0040a0] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <Icon name={item.icon} size={24} className="text-white" />
            </div>
            <p className="text-sm font-bold text-gray-900 mb-2">{item.title}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <LegalContent sections={businessAccountsSections} />

      <div className="mt-8 lg:mt-12 flex flex-wrap gap-4 justify-center">
        <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#003087] to-[#0040a0] hover:from-[#002244] hover:to-[#003087] text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Create Business Account
        </Link>
        <Link to="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-[#003087] text-[#003087] font-bold text-base px-8 py-4 rounded-xl hover:bg-[#003087] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Contact Sales Team
        </Link>
      </div>
    </InfoPageLayout>
  );
}

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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {benefits.map((item) => (
          <div key={item.title} className="app-card p-4 text-center">
            <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Icon name={item.icon} size={20} className="text-[var(--secondary)]" />
            </div>
            <p className="text-xs font-bold text-gray-900 mb-1">{item.title}</p>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <LegalContent sections={businessAccountsSections} />

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <Link to="/register" className="btn-primary min-h-[44px] inline-flex">
          Create Business Account
        </Link>
        <Link to="/contact" className="btn-outline min-h-[44px] inline-flex">
          Contact Sales Team
        </Link>
      </div>
    </InfoPageLayout>
  );
}

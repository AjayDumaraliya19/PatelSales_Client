import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import Icon from '../components/ui/AppIcon';

const accountLinks = [
  { icon: 'ClipboardDocumentListIcon' as const, label: 'Order History', href: '/account/orders', desc: 'View past orders' },
  { icon: 'TruckIcon' as const, label: 'Track Order', href: '/track-order', desc: 'Check delivery status' },
  { icon: 'ShoppingCartIcon' as const, label: 'Shopping Cart', href: '/cart', desc: 'View current cart' },
  { icon: 'BuildingStorefrontIcon' as const, label: 'Business Account', href: '/business-accounts', desc: 'Wholesale benefits' },
  { icon: 'UserCircleIcon' as const, label: 'Profile Settings', href: '/register', desc: 'Update account info' },
  { icon: 'QuestionMarkCircleIcon' as const, label: 'Help & FAQ', href: '/faq', desc: 'Common questions' },
];

export default function AccountPage() {
  return (
    <div className="min-h-full bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-10 sm:pt-8">
        <PageHeader
          title="My Account"
          breadcrumbs={[
            { label: 'Patel Sales', href: '/' },
            { label: 'My Account' },
          ]}
        />

        <div className="app-card p-5 sm:p-6 mb-6 flex items-center gap-4">
          <div className="w-14 h-14 bg-[var(--secondary)]/10 rounded-full flex items-center justify-center">
            <Icon name="UserCircleIcon" size={32} className="text-[var(--secondary)]" />
          </div>
          <div>
            <p className="font-bold text-gray-900">Welcome back!</p>
            <p className="text-sm text-gray-600">Manage your wholesale orders and account settings.</p>
            <Link to="/login" className="text-sm text-[var(--secondary)] font-semibold hover:underline mt-1 inline-block">
              Sign in to sync your account
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {accountLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="app-card p-4 sm:p-5 flex items-start gap-3 hover:border-[var(--secondary)] transition-colors"
            >
              <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center shrink-0">
                <Icon name={link.icon} size={20} className="text-[var(--secondary)]" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{link.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

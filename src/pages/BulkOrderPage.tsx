import React from 'react';
import InfoPageLayout from '../components/info/InfoPageLayout';
import ContactForm from '../components/contact/ContactForm';
import Icon from '../components/ui/AppIcon';

const bulkBenefits = [
  'Custom case pricing for 50+ cases',
  'Pallet and freight shipping quotes',
  'Dedicated account manager',
  'Scheduled recurring deliveries',
];

export default function BulkOrderPage() {
  return (
    <InfoPageLayout
      title="Bulk Order Inquiry"
      subtitle="Request a custom quote for large-volume wholesale orders."
      breadcrumbs={[
        { label: 'Patel Sales', href: '/' },
        { label: 'Bulk Order Inquiry' },
      ]}
    >
      <div className="app-card p-5 sm:p-6 mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-3">Why order in bulk?</h2>
        <ul className="space-y-2">
          {bulkBenefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2 text-sm text-gray-600">
              <Icon name="CheckCircleIcon" size={18} className="text-green-600 shrink-0" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <ContactForm defaultInquiryType="Bulk Order Quote" />
    </InfoPageLayout>
  );
}

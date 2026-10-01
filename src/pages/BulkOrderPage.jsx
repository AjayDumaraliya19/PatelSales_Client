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
      <div className="bg-gradient-to-r from-[#003087] to-[#0040a0] rounded-2xl p-6 lg:p-8 shadow-lg mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h2 className="text-white font-bold text-xl mb-1">Why Order in Bulk?</h2>
            <p className="text-white/80 text-base">Save more with volume discounts and exclusive benefits</p>
          </div>
        </div>
        <ul className="space-y-3">
          {bulkBenefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3 text-white/90 text-base">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <ContactForm defaultInquiryType="Bulk Order Quote" />
    </InfoPageLayout>
  );
}

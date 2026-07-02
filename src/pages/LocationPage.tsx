import React from 'react';
import { Link } from 'react-router-dom';
import InfoPageLayout from '../components/info/InfoPageLayout';
import ContactForm from '../components/contact/ContactForm';
import Icon from '../components/ui/AppIcon';
import { contactInfo } from '../data/contactPageData';

export default function LocationPage() {
  return (
    <InfoPageLayout
      title="Our Location"
      subtitle="Visit our North Brunswick, NJ warehouse for walk-in wholesale orders."
      breadcrumbs={[
        { label: 'Patel Sales', href: '/' },
        { label: 'Our Location' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="app-card p-5 sm:p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center shrink-0">
              <Icon name="MapPinIcon" size={20} className="text-[var(--secondary)]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-1">Warehouse Address</h2>
              <p className="text-sm text-gray-700">{contactInfo.address.line1}</p>
              <p className="text-sm text-gray-700">{contactInfo.address.line2}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center shrink-0">
              <Icon name="ClockIcon" size={20} className="text-[var(--secondary)]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-2">Store Hours</h2>
              <ul className="space-y-1">
                {contactInfo.hours.map((slot) => (
                  <li key={slot.days} className="flex justify-between gap-4 text-sm">
                    <span className="text-gray-600">{slot.days}</span>
                    <span className="font-semibold text-gray-900">{slot.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center shrink-0">
              <Icon name="PhoneIcon" size={20} className="text-[var(--secondary)]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-1">Phone</h2>
              <a href={contactInfo.phoneHref} className="text-sm font-semibold text-[var(--secondary)] hover:underline">
                {contactInfo.phone}
              </a>
            </div>
          </div>

          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address.full)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full justify-center min-h-[44px]"
          >
            Open in Google Maps
          </a>
        </div>

        <div className="app-card overflow-hidden">
          <div className="aspect-[4/3] bg-gray-100 flex flex-col items-center justify-center p-8 text-center">
            <Icon name="MapIcon" size={48} className="text-gray-300 mb-3" />
            <p className="text-sm font-semibold text-gray-700">{contactInfo.address.full}</p>
            <p className="text-xs text-gray-500 mt-2">Walk-in customers welcome during business hours</p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link to="/contact" className="btn-outline min-h-[44px] inline-flex">
          Contact Us
        </Link>
      </div>
    </InfoPageLayout>
  );
}

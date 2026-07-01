import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/AppIcon';

export default function QuoteBannerSection() {
  return (
    <section className="bg-white border-y border-gray-200 py-6">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50 border border-gray-200 rounded-lg px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#003087]/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="ClipboardDocumentListIcon" size={24} className="text-[#003087]" />
            </div>
            <p className="text-gray-700 font-medium text-sm md:text-base">
              Have a large list of items? Get a personalized quote just for you.
            </p>
          </div>
          <Link
            to="/products"
            className="bg-[#003087] hover:bg-[#002266] text-white font-bold text-sm px-6 py-3 rounded whitespace-nowrap transition-colors"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}

import React, { useMemo, useState } from 'react';
import InfoPageLayout from '../components/info/InfoPageLayout';
import { faqItems } from '../data/sitePagesData';

const categories = ['All', ...Array.from(new Set(faqItems.map((item) => item.category)))];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFaqs = useMemo(
    () =>
      activeCategory === 'All'
        ? faqItems
        : faqItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <InfoPageLayout
      title="Frequently Asked Questions"
      subtitle="Answers to common questions about ordering, shipping, and wholesale accounts."
      breadcrumbs={[
        { label: 'Patel Sales', href: '/' },
        { label: 'FAQ' },
      ]}
    >
      <div className="flex overflow-x-auto gap-3 mb-8 pb-2 scrollbar-hide sm:flex-wrap sm:pb-0">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 min-h-[44px] shrink-0 ${
              activeCategory === category
                ? 'bg-gradient-to-r from-[#003087] to-[#0040a0] text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredFaqs.map((faq) => (
          <details key={faq.question} className="bg-white rounded-2xl shadow-lg border border-gray-100 group overflow-hidden">
            <summary className="p-5 lg:p-6 cursor-pointer list-none flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              <span className="text-base font-bold text-gray-900">{faq.question}</span>
              <span className="text-[#003087] text-xl font-bold group-open:rotate-45 transition-transform duration-300 shrink-0">
                +
              </span>
            </summary>
            <div className="px-5 lg:px-6 pb-5 lg:pb-6 pt-0">
              <p className="text-base text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </InfoPageLayout>
  );
}

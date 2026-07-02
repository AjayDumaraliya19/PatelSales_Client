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
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors min-h-[36px] ${
              activeCategory === category
                ? 'bg-[var(--secondary)] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredFaqs.map((faq) => (
          <details key={faq.question} className="app-card group">
            <summary className="p-4 sm:p-5 cursor-pointer list-none flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-gray-900">{faq.question}</span>
              <span className="text-[var(--secondary)] text-lg font-bold group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 -mt-1">
              <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </InfoPageLayout>
  );
}

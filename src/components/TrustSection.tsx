import React, { useEffect, useRef } from 'react';
import Icon from './ui/AppIcon';

const trustItems = [
  {
    icon: 'TruckIcon' as const,
    title: 'Free Shipping on $150+',
    description: 'Orders over $150 ship free to NJ, NY, CT, and PA. Most orders arrive within 1–2 business days.',
    stat: '1–2 Days',
    statLabel: 'Avg. Delivery',
  },
  {
    icon: 'CubeIcon' as const,
    title: 'Wholesale Bulk Pricing',
    description: 'Buy by the case and save up to 50% vs. retail. Volume discounts available for accounts ordering $500+/month.',
    stat: 'Up to 50%',
    statLabel: 'Savings vs. Retail',
  },
  {
    icon: 'ShieldCheckIcon' as const,
    title: 'Quality Guaranteed',
    description: 'All products are FDA-compliant and food-safe certified. We carry trusted brands like Dart, Solo, and Pactiv.',
    stat: '100%',
    statLabel: 'FDA Compliant',
  },
  {
    icon: 'PhoneIcon' as const,
    title: 'Expert Support',
    description: 'Our knowledgeable team is available Mon–Sat to help you find the right products for your business needs.',
    stat: '6 Days',
    statLabel: 'Available',
  },
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll<HTMLElement>('.trust-card');
            cards.forEach((card, i) => {
              card.style.transition = `opacity 0.4s ease ${i * 100}ms, transform 0.4s ease ${i * 100}ms`;
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-8 px-4 bg-white border-y border-gray-200">
      <div className="w-full">
        {/* Section header */}
        <div className="wss-section-header mb-5">
          Why Choose Patel Sales
        </div>

        {/* 4-Card Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustItems.map((item, i) => (
            <div
              key={item.title}
              className="trust-card bg-white border border-gray-200 p-5 rounded-sm opacity-0"
              style={{ transform: 'translateY(8px)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#003087]/8 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon} size={20} className="text-[#003087]" />
                </div>
                <div>
                  <div className="text-xl font-bold text-[#e8471e]">{item.stat}</div>
                  <div className="text-[11px] text-gray-500 uppercase tracking-wide">{item.statLabel}</div>
                </div>
              </div>
              <h3 className="text-sm font-bold text-gray-800 mb-1.5">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-5 border-t border-gray-200">
          {[
            { value: '500+', label: 'Business Clients' },
            { value: '13+', label: 'Product Categories' },
            { value: '10k+', label: 'Orders Fulfilled' },
            { value: '3 yrs', label: 'In Business' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-[#003087]">{stat.value}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

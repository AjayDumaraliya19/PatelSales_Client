import React from 'react';
import PageHeader from '../ui/PageHeader';

export default function InfoPageLayout({
  title,
  subtitle,
  breadcrumbs,
  children,
  lastUpdated,
}) {
  return (
    <div className="min-h-full bg-[var(--background)]">
      <section className="bg-gradient-to-r from-[var(--secondary)] to-[#0040a0] py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">{title}</h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-10 sm:pt-8">
        <PageHeader title={title} breadcrumbs={breadcrumbs} />
        {lastUpdated && (
          <p className="text-xs text-gray-500 mb-6">Last updated: {lastUpdated}</p>
        )}
        {children}
      </div>
    </div>
  );
}

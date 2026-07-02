import React from 'react';
import { Link } from 'react-router-dom';
import InfoPageLayout from '../components/info/InfoPageLayout';
import { sitemapGroups } from '../data/sitePagesData';

export default function SitemapPage() {
  return (
    <InfoPageLayout
      title="Sitemap"
      subtitle="Browse all pages on the Patel Sales website."
      breadcrumbs={[
        { label: 'Patel Sales', href: '/' },
        { label: 'Sitemap' },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {sitemapGroups.map((group) => (
          <section key={group.title} className="app-card p-4 sm:p-5">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
              {group.title}
            </h2>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-[var(--secondary)] font-semibold hover:underline"
                  >
                    {link.label}
                  </Link>
                  {link.description && (
                    <p className="text-xs text-gray-500 mt-0.5">{link.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </InfoPageLayout>
  );
}

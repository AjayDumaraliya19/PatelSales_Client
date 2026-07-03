import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/AppIcon';
import { actionTiles } from '../../data/homePageData';

const bannerClassByVariant: Record<string, string> = {
  scratch: 'bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a]',
  custom: 'bg-gradient-to-br from-[#7b4fd4] to-[#6b3fd4]',
  sales: 'bg-gradient-to-b from-[#ffe082] via-[#ffca28] to-[#ffb300]',
  rewards: 'bg-gradient-to-br from-[#0c4a6e] to-[#0a3a5e]',
};

function ActionTileBanner({
  bannerVariant,
  bannerEyebrow,
  bannerTitle,
}: {
  bannerVariant: string;
  bannerEyebrow: string | null;
  bannerTitle: string;
}) {
  if (bannerVariant === 'scratch') {
    return (
      <h3 className="flex flex-wrap items-center justify-center gap-1.5 text-[1.5rem] sm:text-[1.625rem] font-extrabold leading-tight text-white">
        <span>Scratch</span>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#e8471e] text-sm font-extrabold text-white shadow-md">
          &amp;
        </span>
        <span>Dent</span>
      </h3>
    );
  }

  if (bannerVariant === 'rewards') {
    return (
      <div className="flex items-center justify-center gap-2">
        <Icon name="CheckBadgeIcon" size={32} className="shrink-0 text-[#60a5fa]" />
        <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold leading-none text-white">{bannerTitle}</h3>
      </div>
    );
  }

  if (bannerVariant === 'sales') {
    return (
      <div className="text-center">
        {bannerEyebrow && (
          <p className="mb-0.5 text-sm sm:text-base font-semibold text-gray-900">{bannerEyebrow}</p>
        )}
        <h3 className="text-[2rem] sm:text-[2.5rem] font-extrabold leading-none tracking-tight text-gray-900">
          {bannerTitle}
        </h3>
      </div>
    );
  }

  return (
    <div className="text-center">
      {bannerEyebrow && (
        <p className="mb-1 text-[0.875rem] sm:text-[0.9375rem] font-semibold leading-tight text-white">{bannerEyebrow}</p>
      )}
      <h3 className="text-[1.25rem] sm:text-[1.375rem] font-extrabold leading-tight text-white">{bannerTitle}</h3>
    </div>
  );
}

export default function ActionTilesSection() {
  return (
    <section className="bg-white py-6 md:py-8">
      <div className="mx-auto max-w-[1600px] px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {actionTiles.map((tile) => (
            <Link
              key={tile.title}
              to={tile.href}
              className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`flex min-h-[10rem] flex-col items-center justify-center px-4 py-6 text-center sm:min-h-[9rem] lg:min-h-[8rem] ${bannerClassByVariant[tile.bannerVariant] ?? 'bg-gray-700'}`}
              >
                <ActionTileBanner
                  bannerVariant={tile.bannerVariant}
                  bannerEyebrow={tile.bannerEyebrow}
                  bannerTitle={tile.bannerTitle}
                />
              </div>

              <div className="border-t border-gray-100 bg-white px-4 py-4 text-center">
                <p className="mb-2 text-sm sm:text-base leading-snug text-gray-600">{tile.description}</p>
                <span className="text-sm sm:text-base font-bold text-[#2f7d32] group-hover:text-[#1a5c1e] group-hover:underline transition-all duration-300">
                  {tile.ctaLabel}
                  <span aria-hidden="true" className="ml-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

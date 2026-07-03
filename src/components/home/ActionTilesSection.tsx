import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/AppIcon';
import { actionTiles } from '../../data/homePageData';

const bannerClassByVariant: Record<string, string> = {
  scratch: 'bg-[#4a4a4a]',
  custom: 'bg-[#7b4fd4]',
  sales: 'bg-gradient-to-b from-[#ffe082] via-[#ffca28] to-[#ffb300]',
  rewards: 'bg-[#0c4a6e]',
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
      <h3 className="flex flex-wrap items-center justify-center gap-1.5 text-[1.625rem] font-extrabold leading-tight text-white">
        <span>Scratch</span>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#e8471e] text-sm font-extrabold text-white">
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
        <h3 className="text-[1.75rem] font-extrabold leading-none text-white">{bannerTitle}</h3>
      </div>
    );
  }

  if (bannerVariant === 'sales') {
    return (
      <div className="text-center">
        {bannerEyebrow && (
          <p className="mb-0.5 text-base font-semibold text-gray-900">{bannerEyebrow}</p>
        )}
        <h3 className="text-[2.5rem] font-extrabold leading-none tracking-tight text-gray-900">
          {bannerTitle}
        </h3>
      </div>
    );
  }

  return (
    <div className="text-center">
      {bannerEyebrow && (
        <p className="mb-1 text-[0.9375rem] font-semibold leading-tight text-white">{bannerEyebrow}</p>
      )}
      <h3 className="text-[1.375rem] font-extrabold leading-tight text-white">{bannerTitle}</h3>
    </div>
  );
}

export default function ActionTilesSection() {
  return (
    <section className="bg-[#f5f5f5] py-4 md:py-6">
      <div className="mx-auto max-w-[1600px] px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {actionTiles.map((tile) => (
            <Link
              key={tile.title}
              to={tile.href}
              className="group block overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={`flex min-h-[9.5rem] flex-col items-center justify-center px-4 py-6 text-center sm:min-h-[8.5rem] lg:min-h-[7.5rem] ${bannerClassByVariant[tile.bannerVariant] ?? 'bg-gray-700'}`}
              >
                <ActionTileBanner
                  bannerVariant={tile.bannerVariant}
                  bannerEyebrow={tile.bannerEyebrow}
                  bannerTitle={tile.bannerTitle}
                />
              </div>

              <div className="border-t border-gray-100 bg-white px-4 py-3 text-center">
                <p className="mb-1 text-sm leading-snug text-gray-600">{tile.description}</p>
                <span className="text-sm font-bold text-[#2f7d32] group-hover:underline">
                  {tile.ctaLabel}
                  <span aria-hidden="true"> &gt;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

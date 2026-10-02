import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/AppIcon';
import { actionTiles } from '../../data/homePageData';

const bannerClassByVariant= {
  scratch: 'bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a]',
  custom: 'bg-gradient-to-br from-[#7b4fd4] to-[#6b3fd4]',
  sales: 'bg-gradient-to-b from-[#ffe082] via-[#ffca28] to-[#ffb300]',
  rewards: 'bg-gradient-to-br from-[#0c4a6e] to-[#0a3a5e]',
};

function ActionTileBanner({
  bannerVariant,
  bannerEyebrow,
  bannerTitle,
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
    <section className="bg-gradient-to-br from-[#f0f4f8] to-[#e8f0f8] py-10 md:py-12">
      <div className="w-full px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {actionTiles.map((tile, index) => (
            <Link
              key={tile.title}
              to={tile.href}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Card Background */}
              <div
                className={`relative min-h-[180px] flex flex-col items-center justify-center px-6 py-8 text-center ${bannerClassByVariant[tile.bannerVariant] ?? 'bg-gray-700'}`}
              >
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-xl -translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="relative z-10">
                  <ActionTileBanner
                    bannerVariant={tile.bannerVariant}
                    bannerEyebrow={tile.bannerEyebrow}
                    bannerTitle={tile.bannerTitle}
                  />
                </div>
              </div>

              {/* Card Content */}
              <div className="bg-white px-5 py-5 border-t-0 text-center">
                <p className="mb-3 text-sm leading-relaxed text-gray-600 line-clamp-2">{tile.description}</p>
                <div className="flex items-center justify-center">
                  <span className="text-sm font-bold text-[#003087] group-hover:text-[#e8471e] transition-all duration-300 flex items-center gap-1">
                    {tile.ctaLabel}
                    <Icon name="ArrowRightIcon" size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../ui/AppImage';
import Icon from '../ui/AppIcon';
import { promoGridItems } from '../../data/homePageData';

export default function PromoGridSection() {
  return (
    <section className="bg-white py-4">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {promoGridItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="group border border-gray-200 hover:border-[#003087]/30 hover:shadow-md transition-all bg-white overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                <AppImage
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-[#003087] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                  plus
                </span>
                <span
                  className={`absolute top-2 right-2 ${item.badgeColor} text-white text-[9px] font-bold w-12 h-12 rounded-full flex items-center justify-center text-center leading-tight shadow-md`}
                >
                  {item.badge}
                </span>
              </div>

              <div className="bg-gray-100 px-3 py-1.5 text-center border-y border-gray-200">
                <span className="text-[11px] text-gray-600">
                  Use Code: <span className="font-bold text-gray-800">{item.promoCode}</span>
                </span>
              </div>

              <div className="p-3 text-center">
                <h3 className="text-sm font-bold text-gray-800 group-hover:text-[#003087] transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlusBannerSection() {
  return (
    <section className="bg-[#e8f0fa] border-y border-[#003087]/10">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="bg-[#003087] text-white text-xs font-bold px-2 py-0.5 rounded">Plus</span>
          <span className="text-sm font-semibold text-[#003087]">
            Unlock FREE &amp; Priority Shipping with Plus!
          </span>
        </div>
        <Link
          to="/products"
          className="flex items-center gap-2 text-sm font-bold text-[#003087] hover:text-[#e8471e] transition-colors whitespace-nowrap"
        >
          Try it for FREE — 30-DAY TRIAL
          <Icon name="ArrowRightIcon" size={16} />
        </Link>
      </div>
    </section>
  );
}

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../ui/AppImage';
import Icon from '../ui/AppIcon';
import WssProductCard from './WssProductCard';
import { featuredSpotlight } from '../../data/homePageData';
import type { Product } from '../../types';

interface FeaturedProductSectionProps {
  products: Product[];
}

export default function FeaturedProductSection({ products }: FeaturedProductSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -220 : 220, behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-6">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left spotlight */}
          <Link
            to={featuredSpotlight.href}
            className="lg:col-span-3 relative bg-gradient-to-br from-[#003087] to-[#0040a0] rounded overflow-hidden group min-h-[280px] flex flex-col justify-end"
          >
            <div className="absolute inset-0 opacity-50 overflow-hidden">
              <AppImage
                src={featuredSpotlight.image}
                alt={featuredSpotlight.imageAlt}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 p-5">
              <h3 className="text-white font-bold text-xl mb-2">{featuredSpotlight.title}</h3>
              <p className="text-white/80 text-sm mb-4">{featuredSpotlight.description}</p>
              <span className="inline-block bg-[#e8471e] hover:bg-[#c73a17] text-white font-bold text-sm px-5 py-2 rounded transition-colors">
                {featuredSpotlight.cta}
              </span>
            </div>
          </Link>

          {/* Product row */}
          <div className="lg:col-span-9 relative">
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 hidden sm:flex"
              aria-label="Scroll left"
            >
              <Icon name="ChevronLeftIcon" size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 hidden sm:flex"
              aria-label="Scroll right"
            >
              <Icon name="ChevronRightIcon" size={16} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide px-1 py-1"
            >
              {products.map((product) => (
                <WssProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

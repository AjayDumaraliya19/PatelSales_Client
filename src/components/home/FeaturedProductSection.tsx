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
    scrollRef.current.scrollBy({ left: direction === 'left' ? -280 : 280, behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-8 md:py-10">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
          <p className="text-base md:text-lg text-gray-600 mt-2">
            Top picks for your business
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Left spotlight */}
          <Link
            to={featuredSpotlight.href}
            className="lg:col-span-3 relative bg-gradient-to-br from-[#003087] to-[#0040a0] rounded-xl overflow-hidden group min-h-[300px] md:min-h-[350px] flex flex-col justify-end shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 opacity-40 overflow-hidden group-hover:opacity-50 transition-opacity duration-300">
              <AppImage
                src={featuredSpotlight.image}
                alt={featuredSpotlight.imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="relative z-10 p-5 md:p-6">
              <h3 className="text-white font-bold text-xl md:text-2xl mb-2">{featuredSpotlight.title}</h3>
              <p className="text-white/90 text-sm md:text-base mb-4 leading-relaxed">{featuredSpotlight.description}</p>
              <span className="inline-block bg-[#e8471e] hover:bg-[#c73a17] text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                {featuredSpotlight.cta}
              </span>
            </div>
          </Link>

          {/* Product row */}
          <div className="lg:col-span-9 relative">
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 shadow-lg hover:shadow-xl rounded-full flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hidden sm:flex -translate-x-1/2"
              aria-label="Scroll left"
            >
              <Icon name="ChevronLeftIcon" size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 shadow-lg hover:shadow-xl rounded-full flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hidden sm:flex translate-x-1/2"
              aria-label="Scroll right"
            >
              <Icon name="ChevronRightIcon" size={18} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide px-2 py-2 scroll-smooth"
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

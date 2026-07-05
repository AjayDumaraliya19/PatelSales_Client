import React, { useRef } from 'react';
import Icon from '../ui/AppIcon';
import WssProductCard from './WssProductCard';
import type { Product } from '../../types';

interface BestSellingSectionProps {
  products: Product[];
}

export default function BestSellingSection({ products }: BestSellingSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -220 : 220, behavior: 'smooth' });
  };

  return (
    <section className="bg-[#f5f5f5] py-8">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
          Best Selling Products
        </h2>

        <div className="relative">
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

          <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-hide px-1 py-1">
            {products.map((product) => (
              <WssProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

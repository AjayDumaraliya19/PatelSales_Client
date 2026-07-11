import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/AppIcon';
import type { Product } from '../../types';

interface ProductSliderProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  viewAllLabel?: string;
}

export default function ProductSlider({ title, subtitle, products, viewAllLink, viewAllLabel = 'View All' }: ProductSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, products]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector(':scope > a')?.clientWidth || 200;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -(cardWidth + 16) : cardWidth + 16, behavior: 'smooth' });
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="text-sm font-semibold text-[#003087] hover:text-[#e8471e] transition-colors hidden sm:inline-flex items-center gap-1"
          >
            {viewAllLabel}
            <Icon name="ArrowRightIcon" size={14} />
          </Link>
        )}
      </div>

      {/* Slider */}
      <div className="relative group/slider">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-r from-white via-white/90 to-transparent flex items-center justify-start pl-1 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200"
            aria-label="Scroll left"
          >
            <span className="w-8 h-8 bg-white border border-gray-200 shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 hover:shadow-lg transition-all">
              <Icon name="ChevronLeftIcon" size={18} className="text-gray-600" />
            </span>
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-l from-white via-white/90 to-transparent flex items-center justify-end pr-1 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200"
            aria-label="Scroll right"
          >
            <span className="w-8 h-8 bg-white border border-gray-200 shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 hover:shadow-lg transition-all">
              <Icon name="ChevronRightIcon" size={18} className="text-gray-600" />
            </span>
          </button>
        )}

        {/* Product Row */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="flex-shrink-0 w-[150px] sm:w-[170px] md:w-[190px] lg:w-[200px] group/card"
            >
              <div className="bg-white border border-gray-200 hover:border-[#003087]/30 hover:shadow-md rounded-lg overflow-hidden transition-all duration-200 h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-square bg-gray-50 p-2.5 overflow-hidden">
                  <img
                    src={product.images?.[0] || '/placeholder.png'}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover/card:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <span className="absolute top-1.5 left-1.5 bg-[#e8471e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% OFF
                    </span>
                  )}
                  {product.isProductNew && (
                    <span className="absolute top-1.5 right-1.5 bg-[#003087] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                      New
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="px-2.5 pb-2.5 pt-2 flex-1 flex flex-col">
                  {/* Rating */}
                  {product.rating && product.rating > 0 ? (
                    <div className="flex items-center gap-0.5 mb-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-3 h-3 ${star <= Math.round(product.rating!) ? 'text-yellow-400' : 'text-gray-200'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-[10px] text-gray-400 ml-0.5">({product.reviewCount || 0})</span>
                    </div>
                  ) : (
                    <div className="mb-1.5" />
                  )}

                  {/* Name */}
                  <h3 className="text-[12px] sm:text-[13px] font-medium text-gray-800 group-hover/card:text-[#003087] leading-snug line-clamp-2 mb-auto min-h-[34px]">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <span className="text-sm font-bold text-[#e8471e]">${product.price.toFixed(2)}</span>
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <span className="text-[10px] text-gray-400 line-through ml-1.5">${product.compareAtPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile View All */}
      {viewAllLink && (
        <div className="mt-3 text-center sm:hidden">
          <Link
            to={viewAllLink}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#003087] hover:text-[#e8471e] transition-colors"
          >
            {viewAllLabel}
            <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>
      )}
    </section>
  );
}

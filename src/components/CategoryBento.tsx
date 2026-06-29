import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AppImage from './ui/AppImage';
import Icon from './ui/AppIcon';
import type { Category } from '../types';

interface CategoryBentoProps {
  categories: Category[];
}

export default function CategoryBento({ categories }: CategoryBentoProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll<HTMLElement>('.cat-card');
            children.forEach((child, i) => {
              child.style.transition = `opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms`;
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-8 px-4 bg-[#f5f5f5]">
      <div className="w-full">
        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <div className="wss-section-header flex-1 mr-4">
            Shop by Category
          </div>
          <Link
            to="/products"
            className="text-sm text-[#003087] hover:text-[#e8471e] font-semibold flex items-center gap-1 transition-colors whitespace-nowrap"
          >
            View All
            <Icon name="ChevronRightIcon" size={14} />
          </Link>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat, i) => (
            <Link
              key={cat._id}
              to="/products"
              className="cat-card group bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-card-hover hover:border-gray-300 transition-all opacity-0"
              style={{ transform: 'translateY(8px)' }}
              aria-label={`Shop ${cat.name}`}
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <AppImage
                  src={cat.image}
                  alt={`${cat.name} category - food service supplies`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-2.5">
                <h3 className="text-xs font-bold text-[#003087] group-hover:text-[#e8471e] transition-colors leading-tight">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5">{cat.productCount} products</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Popular searches */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-500 font-semibold">Popular:</span>
          {['Foam Cups', 'Foil Pans', 'Deli Containers', 'Paper Bags', 'Vinyl Gloves', 'Eco Boxes'].map((term) => (
            <Link
              key={term}
              to="/products"
              className="text-xs text-[#003087] hover:text-[#e8471e] hover:underline transition-colors"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

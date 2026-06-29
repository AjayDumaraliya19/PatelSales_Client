import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './ui/AppIcon';
import ProductCard from './ProductCard';
import type { Product } from '../types';

interface FlashSaleSectionProps {
  products: Product[];
}

export default function FlashSaleSection({ products }: FlashSaleSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const end = new Date();
    end.setHours(end.getHours() + 11, end.getMinutes() + 47, end.getSeconds() + 33);

    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, end.getTime() - now.getTime());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ h, m, s });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll<HTMLElement>('.flash-card');
            cards.forEach((card, i) => {
              card.style.transition = `opacity 0.4s ease ${i * 50}ms, transform 0.4s ease ${i * 50}ms`;
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section ref={sectionRef} className="py-8 px-4 bg-[#f5f5f5]">
      <div className="w-full">
        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="wss-section-header">
              <span className="flex items-center gap-2">
                <Icon name="BoltIcon" size={16} variant="solid" />
                Flash Sale Deals
              </span>
            </div>
            {/* Countdown */}
            <div className="flex items-center gap-1.5 bg-[#e8471e] text-white px-3 py-1.5 rounded-sm">
              <Icon name="ClockIcon" size={14} />
              <span className="font-bold text-sm tracking-wide">
                {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
              </span>
              <span className="text-white/70 text-xs">left</span>
            </div>
          </div>
          <Link
            to="/products"
            className="text-sm text-[#003087] hover:text-[#e8471e] font-semibold flex items-center gap-1 transition-colors"
          >
            View All Deals
            <Icon name="ChevronRightIcon" size={14} />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((product, i) => (
            <div
              key={product._id}
              className="flash-card opacity-0"
              style={{ transform: 'translateY(8px)' }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#003087] hover:bg-[#002266] text-white font-bold text-sm px-8 py-2.5 rounded-sm transition-colors"
          >
            <Icon name="Squares2X2Icon" size={16} />
            Browse Full Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}

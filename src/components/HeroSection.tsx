import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AppImage from './ui/AppImage';
import Icon from './ui/AppIcon';
import { heroSlides } from '../data/homePageData';

const SLIDE_INTERVAL_MS = 5500;
const SWIPE_THRESHOLD = 50;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(((index % heroSlides.length) + heroSlides.length) % heroSlides.length);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, SLIDE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) < SWIPE_THRESHOLD) return;
    if (diff > 0) nextSlide();
    else prevSlide();
  };

  return (
    <section className="hero-home">
      <div className="w-full px-0 sm:px-4 md:px-6 pb-4">
        <div
          className="relative overflow-hidden sm:border sm:border-gray-200 sm:shadow-sm"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slider track */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {heroSlides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="relative min-h-[380px] md:min-h-[380px] lg:min-h-[420px]">
                  {/* Full-slide background image */}
                  <div className="absolute inset-0 bg-gray-900">
                    <AppImage
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      className="hero-slide__image"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>

                  {/* Dark overlay — solid left, fades to transparent at 50% width */}
                  <div className="hero-slide-overlay" aria-hidden="true" />

                  {/* Left / top content */}
                  <div className="relative z-20 flex items-start md:items-center h-full min-h-[380px] md:min-h-[380px] lg:min-h-[420px]">
                    <div className="hero-slide__content">
                      <div className="flex items-center gap-2 mb-3 md:mb-4">
                        <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                          <Icon name="SparklesIcon" size={14} className="text-white" />
                        </div>
                        <span className="text-white/90 text-[11px] sm:text-xs font-bold tracking-widest uppercase">
                          {slide.brandLabel}
                        </span>
                      </div>

                      <h1 className="hero-slide__title text-white font-bold leading-tight mb-1.5 md:mb-2">
                        {slide.title}
                      </h1>
                      <p className="text-white/90 text-sm sm:text-base md:text-lg font-medium mb-2">
                        {slide.subtitle}
                      </p>
                      <p className="hero-slide__description text-white/80 text-sm leading-relaxed mb-4 md:mb-6">
                        {slide.description}
                      </p>

                      <div className="hero-slide__actions">
                        <Link
                          to={slide.ctaHref}
                          className="hero-slide__cta bg-[#003087] hover:bg-[#002266] text-white font-bold text-sm rounded transition-colors shadow-md"
                        >
                          {slide.cta}
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Discount badge */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-10 z-20">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] bg-[#003087] rounded-full flex flex-col items-center justify-center shadow-lg border-[3px] sm:border-4 border-white">
                      <span className="text-white font-bold text-sm md:text-base leading-none">
                        {slide.discountBadge.split(' ')[0]}
                      </span>
                      <span className="text-white/90 text-[10px] md:text-xs font-semibold">
                        {slide.discountBadge.split(' ')[1]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1.5">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white w-7 h-2'
                    : 'bg-white/50 hover:bg-white/80 w-2 h-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AppImage from './ui/AppImage';
import Icon from './ui/AppIcon';

const heroSlides = [{
  tag: 'Flash Sale — Limited Time',
  title: 'Wholesale Food Service Supplies',
  subtitle: 'Save up to 40% on foam cups, foil pans, plastic containers & more. Trusted by 500+ NJ restaurants.',
  cta: 'Shop All Deals',
  ctaHref: '/products',
  secondary: 'Browse Categories',
  secondaryHref: '/products',
  image: '',
  imageAlt: 'Commercial kitchen with stainless steel equipment and bright lighting showing professional food service environment',
  badge: 'Up to 40% OFF'
},
{
  tag: 'Fan-Favorite Treats',
  title: 'Eco-Friendly Packaging',
  subtitle: 'Sustainable solutions for your business. Compostable containers, biodegradable bags & more.',
  cta: 'Shop Eco Products',
  ctaHref: '/products',
  secondary: 'View All Categories',
  secondaryHref: '/products',
  image: '',
  imageAlt: 'Eco-friendly compostable containers and green packaging on natural background',
  badge: '20% OFF'
},
{
  tag: 'Bulk Savings',
  title: 'Foam Cups & Containers',
  subtitle: 'Premium quality foam cups at wholesale prices. Perfect for restaurants, cafes & delis.',
  cta: 'Shop Foam Products',
  ctaHref: '/products',
  secondary: 'View Catalog',
  secondaryHref: '/products',
  image: '',
  imageAlt: 'White foam cups stacked in rows on clean white background for commercial use',
  badge: 'Best Seller'
}];

const promoCards = [{
  title: 'Foam Cups & Containers',
  sub: 'Starting at $18.49/case',
  image: '',
  imageAlt: 'White foam cups stacked in rows on clean white background for commercial use',
  href: '/products',
  badge: 'Best Seller'
},
{
  title: 'Aluminum Foil & Pans',
  sub: 'Starting at $24.99/roll',
  image: '',
  imageAlt: 'Aluminum foil rolls and steam table pans on bright commercial kitchen counter',
  href: '/products',
  badge: 'Popular'
}];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = '0';
    setTimeout(() => {
      el.style.transition = 'opacity 0.5s ease';
      el.style.opacity = '1';
    }, 50);
  }, []);

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev: number) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev: number) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section ref={heroRef} className="pt-[108px] lg:pt-[140px] bg-[#f5f5f5]">
      {/* Main hero banner */}
      <div className="w-full px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main hero */}
          <div className="lg:col-span-8 order-1">
            <div className="relative bg-gradient-to-br from-[#003087] to-[#0040a0] rounded-lg overflow-hidden shadow-xl" style={{ minHeight: '450px' }}>
              {/* Placeholder black background */}
              <div className="absolute inset-0 bg-black/20" />
              
              <div className="absolute inset-0 bg-gradient-to-r from-[#003087]/95 via-[#003087]/75 to-[#003087]/50" />
              <div className="relative z-10 p-8 md:p-16 flex flex-col justify-center h-full" style={{ minHeight: '450px' }}>
                <span className="inline-flex items-center gap-2 bg-[#e8471e] text-white text-xs font-bold px-4 py-2 rounded-full mb-6 self-start shadow-lg">
                  <Icon name="BoltIcon" size={14} variant="solid" />
                  {slide.tag}
                </span>
                <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 max-w-2xl">
                  {slide.title}
                </h1>
                <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to={slide.ctaHref}
                    className="bg-[#e8471e] hover:bg-[#c73a17] text-white font-bold text-base px-8 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
                    
                    <Icon name="ShoppingCartIcon" size={18} />
                    {slide.cta}
                  </Link>
                  <Link
                    to={slide.secondaryHref}
                    className="bg-white/20 hover:bg-white/30 text-white font-semibold text-base px-8 py-3 rounded-lg transition-all backdrop-blur-sm border border-white/40 hover:border-white/60">
                    
                    {slide.secondary}
                  </Link>
                </div>
                <div className="mt-8 flex items-center gap-6">
                  <span className="bg-yellow-400 text-gray-900 font-bold text-sm px-4 py-2 rounded-lg shadow-md">
                    {slide.badge}
                  </span>
                  <span className="text-white/80 text-sm font-medium">Free shipping on orders $150+</span>
                </div>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 hover:shadow-2xl"
                aria-label="Previous slide"
              >
                <Icon name="ChevronLeftIcon" size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 hover:shadow-2xl"
                aria-label="Next slide"
              >
                <Icon name="ChevronRightIcon" size={24} />
              </button>

              {/* Pagination dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? 'bg-white w-10'
                        : 'bg-white/40 hover:bg-white/60 w-2'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Side promo cards */}
          <div className="lg:col-span-4 order-2 flex flex-col gap-4">
            {promoCards.map((card, index) =>
            <Link
              key={card.title}
              to={card.href}
              className="relative bg-gradient-to-br from-[#003087] to-[#0040a0] rounded-lg overflow-hidden group hover:shadow-2xl transition-all transform hover:-translate-y-1 flex-1"
              style={{ minHeight: '216px' }}>
              {/* Placeholder black background */}
              <div className="absolute inset-0 bg-black/20" />
              
              <div className="absolute inset-0 bg-gradient-to-br from-[#003087]/80 to-[#003087]/50" />
              <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                {card.badge &&
                <span className="wss-sale-badge self-start mb-3 shadow-md">{card.badge}</span>
                }
                <div className="text-white font-bold text-lg leading-tight mb-2">{card.title}</div>
                <div className="text-white/90 text-sm font-medium">{card.sub}</div>
              </div>
            </Link>
            )}
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-white border-y border-gray-200 mt-6 shadow-sm">
        <div className="w-full px-4 py-6">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-6">
            {[
            { icon: 'TruckIcon' as const, text: 'Free Shipping on Orders $150+' },
            { icon: 'CubeIcon' as const, text: 'Wholesale Bulk Pricing' },
            { icon: 'ShieldCheckIcon' as const, text: '100% FDA Compliant Products' },
            { icon: 'PhoneIcon' as const, text: 'Call (732) 762-7840' },
            { icon: 'ClockIcon' as const, text: 'Same-Day Pickup Available' }].
            map((item) =>
            <div key={item.text} className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-10 h-10 bg-[#003087]/10 rounded-full flex items-center justify-center">
                  <Icon name={item.icon} size={18} className="text-[#003087]" />
                </div>
                <span className="font-semibold">{item.text}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);
}

import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../ui/AppImage';
import { popularBrands } from '../../data/brandImages';

export default function PopularBrandsSection() {
  // Duplicate brands for infinite loop
  const duplicatedBrands = [...popularBrands, ...popularBrands, ...popularBrands];

  return (
    <section className="bg-white py-10 md:py-12 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Shop Popular Brands
          </h2>
          <p className="text-base md:text-lg text-gray-600 mt-2">
            Quality products from trusted manufacturers
          </p>
        </div>

        {/* Mobile: Static Grid */}
        <div className="md:hidden mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:gap-4">
          {popularBrands.map((brand) => (
            <Link
              key={brand.slug}
              to={brand.href}
              className="group relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border border-gray-200 hover:border-gray-300 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
              aria-label={`Shop ${brand.name} products`}
            >
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
                <AppImage
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={200}
                  height={80}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop: Auto-scrolling Slider */}
        <div className="hidden md:block">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="flex animate-scroll">
              {duplicatedBrands.map((brand, index) => (
                <Link
                  key={`${brand.slug}-${index}`}
                  to={brand.href}
                  className="group relative flex-shrink-0 w-[calc(100%/6)] flex items-center justify-center p-6 hover:bg-white/50 transition-all duration-300"
                  aria-label={`Shop ${brand.name} products`}
                >
                  <AppImage
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={200}
                    height={80}
                    className="max-h-[80px] max-w-[200px] object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

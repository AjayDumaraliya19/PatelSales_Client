import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../ui/AppImage';
import { popularBrands } from '../../data/brandImages';

export default function PopularBrandsSection() {
  return (
    <section className="bg-white py-8 md:py-10">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 text-center mb-5 md:mb-6">
          Shop Popular Brands
        </h2>

        <div className="mx-auto grid max-w-3xl grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
          {popularBrands.map((brand) => (
            <Link
              key={brand.slug}
              to={brand.href}
              className="group relative aspect-square bg-[#f3f3f3] hover:bg-[#ececec] transition-colors"
              aria-label={`Shop ${brand.name}`}
            >
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-5 md:p-6">
                <AppImage
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={200}
                  height={80}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

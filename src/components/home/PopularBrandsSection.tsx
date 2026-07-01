import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../ui/AppImage';
import { popularBrands } from '../../data/homePageData';

export default function PopularBrandsSection() {
  return (
    <section className="bg-white py-8">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-6">
          Shop Popular Brands
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {popularBrands.map((brand) => (
            <Link
              key={brand.name}
              to="/products"
              className="flex items-center justify-center bg-gray-50 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all p-4 min-h-[70px] grayscale hover:grayscale-0"
            >
              <AppImage
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={120}
                height={40}
                className="object-contain max-h-10 opacity-70 hover:opacity-100 transition-opacity"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

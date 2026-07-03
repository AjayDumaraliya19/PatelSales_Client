import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../ui/AppImage';
import { featuredCategories } from '../../data/homePageData';

export default function FeaturedCategoriesSection() {
  return (
    <section className="bg-white py-8">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-8">
          Featured Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-x-2.5 sm:gap-x-4 gap-y-6 sm:gap-y-6">
          {featuredCategories.map((category) => (
            <Link
              key={category.href}
              to={category.href}
              className="flex flex-col items-center group text-center px-0.5 sm:px-1"
            >
              <div className="relative mx-auto mb-3 w-full max-w-[11.25rem] aspect-square sm:max-w-[6.5rem] md:max-w-[5rem] lg:max-w-[6rem] rounded-full bg-gray-50 border-2 border-gray-100 group-hover:border-[#003087]/30 overflow-hidden transition-all group-hover:shadow-md">
                <div className="absolute inset-0">
                  <AppImage
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="text-base sm:text-xs md:text-sm font-semibold sm:font-medium text-gray-700 group-hover:text-[#003087] leading-snug transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

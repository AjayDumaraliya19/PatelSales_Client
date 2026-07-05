import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../ui/AppImage';
import { featuredCategories } from '../../data/homePageData';

export default function FeaturedCategoriesSection() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10">
          Featured Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-x-3 sm:gap-x-5 gap-y-8">
          {featuredCategories.map((category) => (
            <Link
              key={category.href}
              to={category.href}
              className="flex flex-col items-center group text-center px-1"
            >
              <div className="relative mx-auto mb-4 w-full max-w-[14rem] aspect-square sm:max-w-[10rem] md:max-w-[9rem] lg:max-w-[10rem] rounded-full bg-gray-50 border-2 border-gray-100 group-hover:border-[#003087]/30 overflow-hidden transition-all group-hover:shadow-md group-hover:scale-105">
                <div className="absolute inset-0">
                  <AppImage
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="text-lg sm:text-base md:text-lg font-bold text-gray-700 group-hover:text-[#003087] leading-snug transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

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
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-4 gap-y-6">
          {featuredCategories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="flex flex-col items-center group text-center"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-50 border-2 border-gray-100 group-hover:border-[#003087]/30 overflow-hidden mb-2 transition-all group-hover:shadow-md">
                <AppImage
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover p-3"
                />
              </div>
              <span className="text-xs sm:text-sm text-gray-700 group-hover:text-[#003087] font-medium leading-tight transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

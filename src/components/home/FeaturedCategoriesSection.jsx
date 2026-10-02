import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../ui/AppImage';
import categoriesService from '../../services/categoriesService';
import { getCategoryImagePath } from '../../data/categoryImages';

export default function FeaturedCategoriesSection({ title }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesService.getCategories();
        const activeCategories = (response.categories || []).filter((c) => c.isActive);
        setCategories(activeCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading || categories.length === 0) return null;

  return (
    <section className="bg-white py-10">
      <div className="w-full px-3 sm:px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10">
          {title || "Featured Categories"}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-x-3 sm:gap-x-5 gap-y-8">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/products?category=${category.slug}`}
              className="flex flex-col items-center group text-center px-1"
            >
              <div className="relative mx-auto mb-4 w-full max-w-[14rem] aspect-square sm:max-w-[10rem] md:max-w-[9rem] lg:max-w-[10rem] rounded-full bg-gray-50 border-2 border-gray-100 group-hover:border-[#003087]/30 overflow-hidden transition-all group-hover:shadow-md group-hover:scale-105">
                <div className="absolute inset-0">
                  <AppImage
                    src={category.image || getCategoryImagePath(category.slug)}
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

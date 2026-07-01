import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../ui/AppImage';
import { resourceArticles } from '../../data/homePageData';

export default function ResourcesSection() {
  return (
    <section className="bg-[#f5f5f5] py-8">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Foodservice Resources</h2>
          <Link to="/products" className="text-sm font-semibold text-[#003087] hover:text-[#e8471e] transition-colors">
            View More →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {resourceArticles.map((article) => (
            <Link
              key={article.title}
              to={article.href}
              className="bg-white border border-gray-200 hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                <AppImage
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 group-hover:text-[#003087] transition-colors mb-2">
                  {article.title}
                </h3>
                <span className="text-sm font-semibold text-[#003087] group-hover:text-[#e8471e] transition-colors">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

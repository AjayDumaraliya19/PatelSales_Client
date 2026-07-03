import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../ui/AppImage';
import Icon from '../ui/AppIcon';
import { resourceArticles } from '../../data/homePageData';

export default function ResourcesSection() {
  return (
    <section className="bg-white py-10 md:py-12">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Foodservice Resources
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Expert guides and tips for your business
            </p>
          </div>
          <Link
            to="/products"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-bold text-[#003087] hover:text-[#e8471e] transition-colors group"
          >
            View All Resources
            <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {resourceArticles.map((article) => (
            <Link
              key={article.title}
              to={article.href}
              className="bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                <AppImage
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#003087] transition-colors mb-3 leading-snug">
                  {article.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#003087] group-hover:text-[#e8471e] transition-colors">
                  Read Article
                  <Icon name="ArrowRightIcon" size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

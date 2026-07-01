import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../ui/AppImage';
import ProductCard from '../ProductCard';
import {
  disposablesHero,
  brandSpotlight,
  quickLinksRow1,
  quickLinksRow2,
  featuredResources,
  additionalResources,
  seoContent,
  type DisposablesCategoryCard,
} from '../../data/disposablesPageData';
import type { Product } from '../../types';

export function DisposablesHero() {
  return (
    <section className="relative bg-gray-900 overflow-hidden min-h-[200px] sm:min-h-[260px] md:min-h-[300px]">
      <div className="absolute inset-0">
        <AppImage
          src={disposablesHero.image}
          alt={disposablesHero.imageAlt}
          fill
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#003087]/90 via-[#003087]/60 to-transparent" />
      </div>
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16">
        <nav className="text-white/70 mb-4 text-xs sm:text-sm">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">Disposables</span>
        </nav>
        <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl mb-3">
          {disposablesHero.title}
        </h1>
        <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
          {disposablesHero.subtitle}
        </p>
      </div>
    </section>
  );
}

interface CategoryGridProps {
  categories: DisposablesCategoryCard[];
}

export function DisposablesCategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="bg-white py-6 sm:py-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <article
              key={category.title}
              className="border border-gray-200 hover:border-[#003087]/30 hover:shadow-md transition-all bg-white"
            >
              <Link to={category.href} className="block">
                <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                  <AppImage
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <div className="p-4">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                  <Link to={category.href} className="hover:text-[#003087] transition-colors">
                    {category.title}
                  </Link>
                </h2>
                <Link
                  to={category.href}
                  className="text-sm font-semibold text-[#003087] hover:text-[#e8471e] transition-colors"
                >
                  Shop {category.shopCount} Categories
                </Link>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 mb-3 leading-relaxed">
                  {category.description}
                </p>
                <ul className="space-y-1">
                  {category.subLinks.map((link) => (
                    <li key={link}>
                      <Link
                        to={category.href}
                        className="text-xs sm:text-sm text-[#003087] hover:text-[#e8471e] hover:underline transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DisposablesBrandSpotlight() {
  return (
    <section className="bg-[#f5f5f5] py-6 border-y border-gray-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          <div className="lg:w-56 shrink-0 bg-white border border-gray-200 p-5 flex flex-col justify-center items-center text-center">
            <AppImage
              src={brandSpotlight.logo}
              alt={`${brandSpotlight.name} logo`}
              width={120}
              height={48}
              className="object-contain mb-3"
            />
            <p className="text-sm font-bold text-gray-800 mb-3">{brandSpotlight.name} Products</p>
            <Link
              to={brandSpotlight.href}
              className="bg-[#003087] hover:bg-[#002266] text-white text-xs font-bold px-5 py-2 rounded transition-colors"
            >
              Shop All
            </Link>
          </div>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {brandSpotlight.products.map((product) => (
              <Link
                key={product.label}
                to={brandSpotlight.href}
                className="bg-white border border-gray-200 hover:shadow-md transition-shadow overflow-hidden group"
              >
                <div className="relative aspect-square bg-gray-50">
                  <AppImage src={product.image} alt={product.label} fill className="object-cover" />
                </div>
                <p className="text-xs font-semibold text-gray-800 p-2 text-center group-hover:text-[#003087] transition-colors">
                  {product.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface QuickLinksProps {
  links: { label: string; image: string; href: string }[];
}

export function DisposablesQuickLinks({ links }: QuickLinksProps) {
  return (
    <section className="bg-white py-6 sm:py-8 border-b border-gray-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-2">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="flex-shrink-0 w-[88px] sm:w-[100px] text-center group"
            >
              <div className="relative w-[88px] sm:w-[100px] h-[88px] sm:h-[100px] bg-gray-50 border border-gray-200 rounded overflow-hidden mb-2 group-hover:border-[#003087]/40 transition-colors">
                <AppImage src={link.image} alt={link.label} fill className="object-cover" />
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-[#003087] group-hover:text-[#e8471e] leading-tight block">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

interface TopProductsProps {
  products: Product[];
}

export function DisposablesTopProducts({ products }: TopProductsProps) {
  return (
    <section className="bg-[#f5f5f5] py-8 sm:py-10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Top Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function DisposablesResources() {
  return (
    <section className="bg-white py-8 sm:py-10 border-t border-gray-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 leading-snug">
              {seoContent.title}
            </h2>
            <div className="space-y-3">
              {seoContent.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-sm text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-base font-bold text-gray-900 mb-4">Featured Resources</h3>
            <div className="space-y-3">
              {featuredResources.map((resource) => (
                <Link
                  key={resource.title}
                  to={resource.href}
                  className="flex gap-3 border border-gray-200 hover:shadow-md transition-shadow overflow-hidden group"
                >
                  <div className="relative w-24 h-20 shrink-0 bg-gray-100">
                    <AppImage src={resource.image} alt={resource.title} fill className="object-cover" />
                  </div>
                  <div className="p-3 flex items-center">
                    <span className="text-sm font-semibold text-[#003087] group-hover:text-[#e8471e] transition-colors leading-snug">
                      {resource.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-base font-bold text-gray-900 mb-4">Additional Resources</h3>
            <ul className="space-y-2">
              {additionalResources.map((resource) => (
                <li key={resource}>
                  <Link
                    to="/products"
                    className="text-sm text-[#003087] hover:text-[#e8471e] hover:underline transition-colors"
                  >
                    {resource}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

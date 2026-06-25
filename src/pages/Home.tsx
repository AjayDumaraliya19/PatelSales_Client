import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { ProductCard } from '../components/product/ProductCard';
import { Loader } from '../components/ui/Loader';
import { fetchProducts } from '../services/productService';
import { fetchCategories } from '../services/categoryService';
import { fetchMarketingBanners } from '../services/cmsService';
import { addToCart } from '../store/slices/cartSlice';
import type { AppDispatch } from '../store';
import type { Product } from '../types';

const bannerColors = [
  'from-primary-600 to-primary-800',
  'from-accent-600 to-accent-800',
  'from-green-600 to-green-800',
];

export function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const [bannerIndex, setBannerIndex] = useState(0);

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['products', 'home'],
    queryFn: () => fetchProducts({ limit: 12, active: true }),
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const { data: promoBanners = [] } = useQuery({
    queryKey: ['marketing-banners'],
    queryFn: fetchMarketingBanners,
  });

  const products = productsData?.products || [];
  const featuredProducts = products.slice(0, 8);
  const bestSellers = [...products].sort((a, b) => b.stock - a.stock).slice(0, 6);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const nextBanner = () =>
    setBannerIndex((i) => (promoBanners.length ? (i + 1) % promoBanners.length : 0));
  const prevBanner = () =>
    setBannerIndex((i) => (promoBanners.length ? (i - 1 + promoBanners.length) % promoBanners.length : 0));

  if (productsLoading || categoriesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  const currentBanner = promoBanners[bannerIndex];

  return (
    <div className="space-y-8 sm:space-y-12">
      {currentBanner && (
        <section className="relative">
          <div
            className={`bg-gradient-to-r ${bannerColors[bannerIndex % bannerColors.length]} text-white rounded-lg overflow-hidden`}
          >
            <div className="px-6 sm:px-12 py-8 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{currentBanner.title}</h1>
                {(currentBanner.subtitle || currentBanner.description) && (
                  <p className="text-white/90 text-sm sm:text-base mb-4">
                    {currentBanner.subtitle || currentBanner.description}
                  </p>
                )}
                {currentBanner.promoCode && (
                  <span className="inline-block bg-white/20 px-3 py-1 rounded text-sm font-medium">
                    Use Code: {currentBanner.promoCode}
                  </span>
                )}
                <div className="mt-4">
                  <Link
                    to={currentBanner.link || '/products'}
                    className="inline-flex items-center gap-2 bg-white text-primary-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    {currentBanner.ctaText || 'Shop Now'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {promoBanners.length > 1 && (
            <>
              <button
                onClick={prevBanner}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextBanner}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </section>
      )}

      {categories.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Shop by Category</h2>
            <Link to="/categories" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category._id}
                to={`/categories/${category.slug}`}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md hover:border-primary-300 transition-all"
              >
                <p className="font-medium text-gray-900 text-sm">{category.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {featuredProducts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
            <Link to="/products" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </section>
      )}

      {bestSellers.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Best Sellers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
            {bestSellers.map((product) => (
              <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </section>
      )}

      {products.length === 0 && (
        <div className="text-center py-12 text-gray-600">
          <p>No products available yet. Please check back soon.</p>
        </div>
      )}
    </div>
  );
}

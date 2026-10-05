import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../components/ui/AppImage';
import Icon from '../components/ui/AppIcon';
import productsService from '../services/productsService';

const PRODUCTS_PER_PAGE = 12;

export default function WholesaleFlyerPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsService.getProducts({ page, limit: PRODUCTS_PER_PAGE });
        setProducts((prev) => (page === 1 ? response.products : [...prev, ...response.products]));
        setTotalPages(response.pages);
      } catch (error) {
        console.error('Failed to fetch wholesale products:', error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };
    fetchProducts();
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setLoadingMore(true);
      setPage((p) => p + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#e8f0f8]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003087] to-[#0040a0] py-12 md:py-16">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Wholesale Flyer
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            Browse our complete product catalog with wholesale pricing
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 py-10 md:py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-6 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <div className="absolute inset-0">
                    <AppImage
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {product.isOnSale && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-[#e8471e] to-[#ff5722] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      SALE
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <p className="text-xs text-[#003087] font-semibold uppercase mb-2">
                    {product.categoryName ?? product.category?.name}
                  </p>
                  <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#003087] transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-bold text-[#e8471e]">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Wholesale Info */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Icon name="CubeIcon" size={16} />
                    <span>Wholesale Pricing</span>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-sm font-semibold text-[#003087] group-hover:text-[#e8471e] transition-colors">
                      View Details
                    </span>
                    <Icon name="ArrowRightIcon" size={16} className="text-[#003087] group-hover:text-[#e8471e] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {page < totalPages && (
          <div className="text-center mt-10">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#003087] to-[#0040a0] hover:from-[#002244] hover:to-[#003087] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? 'Loading...' : 'Load More'}
              {!loadingMore && <Icon name="ArrowDownIcon" size={20} />}
            </button>
          </div>
        )}

        {/* Info Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-[#003087] to-[#0040a0] rounded-xl flex items-center justify-center mb-4">
              <Icon name="CubeIcon" size={24} className="text-white" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">5000+ Products</h3>
            <p className="text-gray-600 text-sm">Complete catalog of food service disposables</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-[#e8471e] to-[#ff5722] rounded-xl flex items-center justify-center mb-4">
              <Icon name="TagIcon" size={24} className="text-white" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Wholesale Pricing</h3>
            <p className="text-gray-600 text-sm">Competitive case pricing for bulk orders</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2F7D32] to-[#1a5c1e] rounded-xl flex items-center justify-center mb-4">
              <Icon name="TruckIcon" size={24} className="text-white" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">Free shipping on orders over $150</p>
          </div>
        </div>
      </div>
    </div>
  );
}

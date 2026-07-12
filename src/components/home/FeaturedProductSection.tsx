import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../ui/AppImage';
import Icon from '../ui/AppIcon';
import { useCartStore } from '../../store/cartStore';
import type { Product } from '../../types';

interface FeaturedProductCardProps {
  product: Product;
}

function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0 || adding) return;
    setAdding(true);
    await new Promise((r) => setTimeout(r, 450));
    addItem(product);
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link
      to={`/products/${product._id}`}
      className="block flex-shrink-0 w-[200px] sm:w-[240px] bg-white border border-gray-150 rounded-2xl flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
    >
      <div className="relative aspect-square bg-gray-50 p-4 flex items-center justify-center overflow-hidden">
        <AppImage
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Rating Capsule */}
        {typeof product.rating === 'number' && product.rating > 0 && (
          <div className="absolute top-3 left-3 bg-amber-400 text-gray-900 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm z-10">
            <span>★</span>
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-gray-700 font-semibold">({product.reviewCount})</span>
          </div>
        )}

        {/* Plus Badge */}
        {product.stock > 0 && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wider z-10">
            Plus
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="mb-2">
          {product.category && (
            <div className="text-[10px] font-extrabold text-[#003087]/80 uppercase tracking-widest mb-1 truncate">
              {product.category.name}
            </div>
          )}
          <h3 className="text-sm font-bold text-gray-800 leading-snug line-clamp-2 min-h-[40px] group-hover:text-[#003087] transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="text-xs"
                style={{ color: star <= Math.round(product.rating || 0) ? '#f5a623' : '#d1d5db' }}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-[10px] text-gray-500 font-medium">({product.reviewCount || 0})</span>
        </div>

        <div>
          <div className="flex items-baseline gap-2 mb-3">
            <div className="text-base sm:text-lg font-extrabold text-[#e8471e]">
              ${(typeof product.price === 'number' ? product.price : 0).toFixed(2)}
              <span className="text-[10px] text-gray-500 font-normal ml-0.5">
                {(() => {
                  const size = (product.caseSize || '').toLowerCase();
                  if (size.includes('bundle')) return '/bundle';
                  if (size.includes('pack')) return '/pack';
                  if (size.includes('box')) return '/box';
                  if (size.includes('each') || size.includes('piece')) return '/each';
                  
                  const name = (product.name || '').toLowerCase();
                  if (name.includes('/bundle') || name.includes('bundle')) return '/bundle';
                  if (name.includes('/pack') || name.includes('pack')) return '/pack';
                  if (name.includes('/box') || name.includes('box')) return '/box';
                  
                  return '/case';
                })()}
              </span>
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full text-xs font-bold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
              product.stock === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                : added
                ? 'bg-emerald-500 text-white shadow-emerald-100 hover:bg-emerald-600'
                : 'bg-[#003087] text-white shadow-blue-100 hover:bg-[#e8471e] hover:shadow-orange-100'
            }`}
          >
            {adding ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : added ? (
              <>
                <Icon name="CheckIcon" size={14} />
                Added!
              </>
            ) : product.stock === 0 ? (
              'Out of Stock'
            ) : (
              <>
                <Icon name="ShoppingBagIcon" size={14} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}

interface FeaturedProductSectionProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function FeaturedProductSection({
  products,
  title = "Best Reviewed Products",
  subtitle = "Top picks for your business"
}: FeaturedProductSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -280 : 280, behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-b from-[#f9fafb] to-white py-12 md:py-16">
      <div className="w-full px-3 sm:px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#003087]/10 text-[#003087] font-bold text-xs px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            <Icon name="StarIcon" size={12} className="fill-current text-[#003087]" />
            Customer Choice
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h2>
          <p className="text-base md:text-lg text-gray-600 mt-3 max-w-2xl mx-auto font-medium">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left spotlight banner */}
          <Link
            to="/products"
            className="lg:col-span-3 relative bg-gradient-to-br from-[#003087] via-[#0040a0]/90 to-[#003087]/80 rounded-2xl overflow-hidden group min-h-[350px] md:min-h-[400px] flex flex-col justify-end shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600')] bg-cover bg-center opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001a33]/90 via-[#003087]/40 to-transparent" />
            <div className="relative z-10 p-6 md:p-8">
              <span className="inline-block bg-amber-400 text-gray-900 font-extrabold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 shadow-sm">
                Highest Rated
              </span>
              <h3 className="text-white font-extrabold text-2xl md:text-3xl mb-3 leading-tight">Customer Favorites</h3>
              <p className="text-white/80 text-sm md:text-base mb-6 leading-relaxed">
                The most loved disposable food service supplies backed by reviews from local cafes, diners, and caterers.
              </p>
              <span className="inline-flex items-center gap-2 bg-[#e8471e] hover:bg-[#c73a17] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                <span>Shop All Favorites</span>
                <Icon name="ArrowRightIcon" size={16} />
              </span>
            </div>
          </Link>

          {/* Product row slider */}
          <div className="lg:col-span-9 relative flex items-center">
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 z-10 w-11 h-11 bg-white border border-gray-150 shadow-md hover:shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hidden sm:flex -translate-x-1/2"
              aria-label="Scroll left"
            >
              <Icon name="ChevronLeftIcon" size={20} className="text-gray-700" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 z-10 w-11 h-11 bg-white border border-gray-150 shadow-md hover:shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hidden sm:flex translate-x-1/2"
              aria-label="Scroll right"
            >
              <Icon name="ChevronRightIcon" size={20} className="text-gray-700" />
            </button>

            <div
              ref={scrollRef}
              className="w-full flex gap-5 overflow-x-auto scrollbar-hide px-2 py-4 scroll-smooth"
            >
              {products.map((product) => (
                <FeaturedProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

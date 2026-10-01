import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppImage from './ui/AppImage';
import Icon from './ui/AppIcon';
import { useCartStore } from '../store/cartStore';

export default function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0 || adding) return;
    setAdding(true);
    await new Promise((r) => setTimeout(r, 300));
    for (let i = 0; i < qty; i++) addItem(product);
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const displayPrice = typeof product.displayPrice === 'number' ? product.displayPrice : (typeof product.price === 'number' ? product.price : 0);

  const discount = typeof product.originalPrice === 'number' && product.originalPrice > 0
    ? Math.round(((product.originalPrice - displayPrice) / product.originalPrice) * 100)
    : 0;

  if (variant === 'list') {
    return (
      <Link to={`/products/${product._id}`} className="block">
        <div className="wss-product-card bg-white p-4 flex gap-4 group">
          {/* Image */}
          <div className="relative w-28 h-28 flex-shrink-0 bg-gray-50 border border-gray-100 overflow-hidden">
            <AppImage
              src={product.images[0]}
              alt={`${product.name} — ${product.categoryName} product`}
              fill
              sizes="112px"
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            />
            {product.isOnSale && discount > 0 && (
              <span className="absolute top-1 left-1 wss-sale-badge">{discount}% OFF</span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                {product.categoryName && (
                  <p className="text-[11px] text-[#003087] font-semibold uppercase tracking-wide mb-0.5">
                    {product.categoryName}
                  </p>
                )}
                <h3 className="text-sm font-semibold text-[#003087] hover:text-[#e8471e] transition-colors line-clamp-2 leading-snug">
                  {product.name}
                </h3>
              </div>
            </div>

            {product.caseSize && (
              <p className="text-xs text-gray-500 mt-0.5">Case Size: {product.caseSize}</p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-1 mt-1">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-xs ${
                      star <= Math.round(product.rating || 0)
                        ? 'text-amber-400'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.reviewCount || 0})</span>
            </div>

            <div className="flex items-center justify-between mt-2 gap-3">
              <div>
                <span className="wss-price">${displayPrice.toFixed(2)}</span>
                {typeof product.originalPrice === 'number' && product.originalPrice > 0 && (
                  <span className="wss-original-price ml-2">${product.originalPrice.toFixed(2)}</span>
                )}
                <span className="text-xs text-gray-500 block">
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
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="wss-add-to-cart max-w-[140px]"
                aria-label="Add to cart"
              >
                <Icon
                  name={added ? 'CheckIcon' : adding ? 'ArrowPathIcon' : 'ShoppingCartIcon'}
                  size={14}
                  className={adding ? 'animate-spin' : ''}
                />
                {added ? 'Added!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/products/${product._id}`} className="block h-full">
      <div className="wss-product-card bg-white flex flex-col h-full group">
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden border-b border-gray-100">
          <AppImage
            src={product.images[0]}
            alt={`${product.name} — ${product.categoryName} food service product`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isOnSale && discount > 0 && (
              <span className="wss-sale-badge">{discount}% OFF</span>
            )}
            {product.isProductNew && (
              <span className="wss-new-badge">NEW</span>
            )}
          </div>
          {product.stock <= 15 && product.stock > 0 && (
            <div className="absolute top-2 right-2">
              <span className="wss-badge bg-amber-500 text-white">Low Stock</span>
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="wss-badge bg-gray-600 text-white px-3 py-1.5">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col flex-1">
          {product.categoryName && (
            <p className="text-[11px] text-[#003087] font-semibold uppercase tracking-wide mb-1">
              {product.categoryName}
            </p>
          )}
          <h3 className="text-sm font-semibold text-[#003087] hover:text-[#e8471e] transition-colors leading-snug line-clamp-2 mb-1 flex-1">
            {product.name}
          </h3>
          {product.caseSize && (
            <p className="text-xs text-gray-500 mb-2">Case: {product.caseSize}</p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-xs ${
                    star <= Math.round(product.rating || 0)
                      ? 'text-amber-400'
                      : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount || 0})</span>
          </div>

          {/* Price */}
          <div className="mb-2">
            <span className="wss-price">${displayPrice.toFixed(2)}</span>
            {typeof product.originalPrice === 'number' && product.originalPrice > 0 && (
              <span className="wss-original-price ml-2">${product.originalPrice.toFixed(2)}</span>
            )}
            <span className="text-xs text-gray-500 block">
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

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="wss-add-to-cart mt-auto"
            aria-label={`Add ${product.name} to cart`}
          >
            <Icon
              name={added ? 'CheckIcon' : adding ? 'ArrowPathIcon' : 'ShoppingCartIcon'}
              size={14}
              className={adding ? 'animate-spin' : ''}
            />
            {added ? 'Added to Cart!' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../ui/AppImage';
import type { Product } from '../../types';

interface WssProductCardProps {
  product: Product;
  showPlusBadge?: boolean;
}

export default function WssProductCard({ product, showPlusBadge = true }: WssProductCardProps) {
  return (
    <Link to={`/products/${product._id}`} className="block flex-shrink-0 w-[180px] sm:w-[200px]">
      <div className="bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all h-full">
        <div className="relative aspect-square bg-white p-3">
          <AppImage
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain"
          />
          {showPlusBadge && (
            <span className="absolute top-2 left-2 bg-[#003087] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
              plus
            </span>
          )}
        </div>
        <div className="px-3 pb-3">
          {product.rating && (
            <div className="flex items-center gap-0.5 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-[#f5a623] text-xs">
                  {star <= Math.round(product.rating!) ? '★' : '☆'}
                </span>
              ))}
              <span className="text-[10px] text-gray-500 ml-1">({product.reviewCount})</span>
            </div>
          )}
          <h3 className="text-[13px] text-[#003087] hover:text-[#e8471e] leading-snug line-clamp-2 mb-1.5 min-h-[36px]">
            {product.name}
          </h3>
          <div className="text-[#e8471e] font-bold text-base">${product.price.toFixed(2)}</div>
          {product.originalPrice && (
            <div className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</div>
          )}
        </div>
      </div>
    </Link>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../ui/AppImage';

export default function WssProductCard({ product, showPlusBadge = true }) {
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
            <div className="absolute top-2 left-2">
              <svg width="36" height="24" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="bg-card" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#27B8F4" />
                    <stop offset="100%" stopColor="#1098E3" />
                  </linearGradient>
                </defs>
                <path d="M18 18 H108 L96 62 H8 Z" fill="url(#bg-card)" />
                <text
                  x="60"
                  y="48"
                  textAnchor="middle"
                  fontFamily="Arial, Helvetica, sans-serif"
                  fontSize="28"
                  fontWeight="700"
                  fontStyle="italic"
                  fill="#ffffff"
                  letterSpacing="0.5">
                  plus
                </text>
              </svg>
            </div>
          )}
        </div>
        <div className="px-3 pb-3">
          <div className="flex items-center gap-0.5 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-xs ${
                  star <= Math.round(product.rating || 0)
                    ? 'text-[#f5a623]'
                    : 'text-gray-305'
                }`}
                style={{ color: star <= Math.round(product.rating || 0) ? '#f5a623' : '#d1d5db' }}
              >
                ★
              </span>
            ))}
            <span className="text-[10px] text-gray-500 ml-1">({product.reviewCount || 0})</span>
          </div>
          <h3 className="text-[13px] text-[#003087] hover:text-[#e8471e] leading-snug line-clamp-2 mb-1.5 min-h-[36px]">
            {product.name}
          </h3>
          <div className="text-[#e8471e] font-bold text-base">
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
          {typeof product.originalPrice === 'number' && product.originalPrice > 0 && (
            <div className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</div>
          )}
        </div>
      </div>
    </Link>
  );
}

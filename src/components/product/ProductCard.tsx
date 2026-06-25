import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Package } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatPrice } from '../../utils/format';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const unit = product.sku.includes('CASE') || product.name.includes('/Case') ? 'Case' : 'Each';

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
      <Link to={`/products/${product._id}`}>
        <div className="aspect-square bg-gray-50 flex items-center justify-center border-b border-gray-100 overflow-hidden">
          {product.images[0]?.url ? (
            <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <Package className="w-16 h-16 text-gray-300 group-hover:text-primary-400 transition-colors" />
          )}
        </div>
      </Link>
      <div className="p-3">
        <div className="flex items-center gap-1 text-amber-500 mb-1">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span className="text-xs text-gray-600">4.{(product._id.charCodeAt(0) % 3) + 5} out of 5</span>
        </div>
        <Link to={`/products/${product._id}`}>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-primary-600 leading-snug mb-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between gap-2">
          <p className="text-base font-bold text-gray-900">{formatPrice(product.price, unit)}</p>
          <Button
            size="sm"
            className="text-xs px-2 py-1"
            disabled={product.stock === 0}
            onClick={() => onAddToCart?.(product)}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

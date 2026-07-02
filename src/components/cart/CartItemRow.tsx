import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../ui/AppImage';
import Icon from '../ui/AppIcon';
import { useCartStore } from '../../store/cartStore';

interface CartItemRowProps {
  item: {
    productId: string;
    product: any;
    quantity: number;
  };
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const [removing, setRemoving] = useState(false);
  const [updating, setUpdating] = useState(false);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await removeItem(item.productId);
    } catch (error) {
      console.error('Failed to remove item:', error);
      setRemoving(false);
    }
  };

  const handleUpdateQuantity = async (newQuantity: number) => {
    setUpdating(true);
    try {
      await updateQuantity(item.productId, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setUpdating(false);
    }
  };

  const discount = item.product.originalPrice
    ? Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)
    : 0;

  return (
    <div className={`p-4 flex gap-4 ${removing ? 'opacity-50' : ''}`}>
      {/* Product Image */}
      <Link to={`/products/${item.product._id}`} className="flex-shrink-0">
        <div className="w-24 h-24 bg-gray-50 border border-gray-100 overflow-hidden">
          <AppImage
            src={item.product.images[0]}
            alt={item.product.name}
            fill
            sizes="96px"
            className="object-contain p-2"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link to={`/products/${item.product._id}`} className="block mb-1">
          <h3 className="text-sm font-semibold text-[#003087] hover:text-[#e8471e] transition-colors line-clamp-2">
            {item.product.name}
          </h3>
        </Link>
        {item.product.caseSize && (
          <p className="text-xs text-gray-500 mb-2">Case: {item.product.caseSize}</p>
        )}
        <div className="flex items-center gap-2 mb-2">
          <span className="wss-price">${item.product.price.toFixed(2)}</span>
          {item.product.originalPrice && (
            <span className="wss-original-price">${item.product.originalPrice.toFixed(2)}</span>
          )}
          {discount > 0 && (
            <span className="wss-badge bg-green-100 text-green-700">{discount}% OFF</span>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-sm">
            <button
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease quantity"
            >
              <Icon name="MinusIcon" size={14} />
            </button>
            <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              disabled={item.quantity >= item.product.stock}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Increase quantity"
            >
              <Icon name="PlusIcon" size={14} />
            </button>
          </div>
          <button
            onClick={handleRemove}
            disabled={removing}
            className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors disabled:opacity-50"
          >
            {removing ? 'Removing...' : 'Remove'}
          </button>
        </div>
      </div>

      {/* Item Total */}
      <div className="text-right flex-shrink-0">
        <p className="wss-price">${(item.product.price * item.quantity).toFixed(2)}</p>
        {item.product.stock <= 10 && item.product.stock > 0 && (
          <p className="text-xs text-amber-600 mt-1">Only {item.product.stock} left</p>
        )}
      </div>
    </div>
  );
}

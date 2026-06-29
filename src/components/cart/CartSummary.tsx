import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/AppIcon';
import { useCartStore } from '../../store/cartStore';

export default function CartSummary() {
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getTax = useCartStore((s) => s.getTax);
  const getShipping = useCartStore((s) => s.getShipping);
  const getTotal = useCartStore((s) => s.getTotal);
  const getItemCount = useCartStore((s) => s.getItemCount);

  const subtotal = getSubtotal();
  const tax = getTax();
  const shipping = getShipping();
  const total = getTotal();
  const itemCount = getItemCount();

  const freeShippingProgress = Math.min((subtotal / 150) * 100, 100);
  const amountToFreeShipping = Math.max(150 - subtotal, 0);

  return (
    <div className="bg-white border border-gray-200 rounded-sm p-4 sticky top-[180px]">
      <h2 className="font-bold text-lg mb-4">Order Summary</h2>

      {/* Free Shipping Progress */}
      {subtotal < 150 && (
        <div className="mb-4 p-3 bg-gray-50 rounded-sm">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Free shipping progress</span>
            <span className="font-semibold text-[#003087]">
              ${amountToFreeShipping.toFixed(2)} away
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#003087] h-2 rounded-full transition-all"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({itemCount} items)</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (6.625%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between">
          <span className="font-bold text-lg">Total</span>
          <span className="font-bold text-lg text-[#003087]">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link
        to="/products"
        className="btn-primary w-full justify-center py-3 text-base"
      >
        Proceed to Checkout
      </Link>

      {/* Continue Shopping */}
      <Link
        to="/products"
        className="btn-outline w-full justify-center mt-3"
      >
        Continue Shopping
      </Link>

      {/* Trust Badges */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Icon name="ShieldCheckIcon" size={14} />
          <span>Secure Checkout</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Icon name="TruckIcon" size={14} />
          <span>Free Returns</span>
        </div>
      </div>
    </div>
  );
}

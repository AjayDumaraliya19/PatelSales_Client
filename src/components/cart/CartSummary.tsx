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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 sticky top-[180px]">
      <h2 className="font-bold text-xl mb-6 text-gray-900">Order Summary</h2>

      {/* Free Shipping Progress */}
      {subtotal < 150 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-[#003087]/5 to-[#0040a0]/5 rounded-xl border border-[#003087]/10">
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-gray-700 font-medium">Free shipping progress</span>
            <span className="font-semibold text-[#003087]">
              ${amountToFreeShipping.toFixed(2)} away
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-[#003087] to-[#0040a0] h-2.5 rounded-full transition-all"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Subtotal ({itemCount} items)</span>
          <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Tax (6.625%)</span>
          <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold text-gray-900">
            {shipping === 0 ? (
              <span className="text-green-600 font-bold">FREE</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        <div className="border-t border-gray-200 pt-4 flex justify-between">
          <span className="font-bold text-xl text-gray-900">Total</span>
          <span className="font-bold text-xl text-[#003087]">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link
        to="/checkout"
        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#003087] to-[#0040a0] hover:from-[#002244] hover:to-[#003087] text-white font-bold text-base px-6 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl w-full"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Proceed to Checkout
      </Link>

      {/* Continue Shopping */}
      <Link
        to="/products"
        className="inline-flex items-center justify-center gap-2 border-2 border-[#003087] text-[#003087] font-bold text-base px-6 py-4 rounded-xl hover:bg-[#003087] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl w-full mt-4"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Continue Shopping
      </Link>

      {/* Trust Badges */}
      <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-5 h-5 text-[#003087]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="font-medium">Secure Checkout</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-5 h-5 text-[#003087]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <span className="font-medium">Free Returns</span>
        </div>
      </div>
    </div>
  );
}

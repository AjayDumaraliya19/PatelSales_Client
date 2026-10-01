import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import CartItemRow from './CartItemRow';
import CartSummary from './CartSummary';
import CartEmpty from './CartEmpty';

export default function CartClientPage() {
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const items = useCartStore((s) => s.items);
  const getItemCount = useCartStore((s) => s.getItemCount);

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (promoCode.toLowerCase() === 'save10') {
      setPromoMessage('Promo code applied: 10% off!');
    } else if (promoCode) {
      setPromoMessage('Invalid promo code');
    }
  };

  if (items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      {/* Breadcrumb */}
      <div className="wss-breadcrumb mb-6">
        <Link to="/" className="text-gray-600 hover:text-[#003087] transition-colors">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900 font-semibold">Shopping Cart ({getItemCount()} items)</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#003087] to-[#0040a0] p-6 lg:p-8">
              <h1 className="text-white font-bold text-xl lg:text-2xl mb-1">Shopping Cart</h1>
              <p className="text-white/80 text-base">{getItemCount()} items</p>
            </div>
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <CartItemRow key={item.productId} item={item} />
              ))}
            </div>
          </div>

          {/* Promo Code */}
          <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Promo Code</h3>
            <form onSubmit={handlePromoSubmit} className="flex gap-3">
              <input
                type="text"
                placeholder="Promo code (try)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="input-field flex-1"
              />
              <button type="submit" className="btn-secondary min-h-[44px] px-6">
                Apply
              </button>
            </form>
            {promoMessage && (
              <p className={`text-sm mt-3 font-medium ${promoMessage.includes('applied') ? 'text-green-600' : 'text-red-600'}`}>
                {promoMessage}
              </p>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}

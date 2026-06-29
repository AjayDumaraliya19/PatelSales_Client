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

  const handlePromoSubmit = (e: React.FormEvent) => {
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
    <div className="w-full px-4 py-6">
      {/* Breadcrumb */}
      <div className="wss-breadcrumb mb-4">
        <Link to="/">Home</Link>
        <span className="mx-2">/</span>
        <span>Shopping Cart ({getItemCount()} items)</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-sm">
            <div className="p-4 border-b border-gray-200 bg-[#003087]">
              <h1 className="text-white font-bold text-lg">Shopping Cart</h1>
              <p className="text-white/70 text-sm">{getItemCount()} items</p>
            </div>
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <CartItemRow key={item.productId} item={item} />
              ))}
            </div>
          </div>

          {/* Promo Code */}
          <div className="mt-4 bg-white border border-gray-200 rounded-sm p-4">
            <form onSubmit={handlePromoSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Promo code (try: SAVE10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="input-field flex-1"
              />
              <button type="submit" className="btn-secondary">
                Apply
              </button>
            </form>
            {promoMessage && (
              <p className={`text-sm mt-2 ${promoMessage.includes('applied') ? 'text-green-600' : 'text-red-600'}`}>
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

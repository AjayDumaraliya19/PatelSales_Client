import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/AppIcon';

export default function CartEmpty() {
  return (
    <div className="w-full px-4 py-12">
      <div className="bg-white border border-gray-200 rounded-sm p-8 text-center">
        <Icon name="ShoppingCartIcon" size={64} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link
          to="/products"
          className="btn-primary inline-flex items-center gap-2"
        >
          <Icon name="Squares2X2Icon" size={16} />
          Start Shopping
        </Link>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Popular categories:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Foam Cups', 'Foil Pans', 'Plastic Containers', 'Paper Bags', 'Eco-Friendly'].map((cat) => (
              <Link
                key={cat}
                to="/products"
                className="text-sm text-[#003087] hover:text-[#e8471e] transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

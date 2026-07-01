import React from 'react';

interface PhoneMockupProps {
  variant?: 'light' | 'dark';
  className?: string;
  children?: React.ReactNode;
}

export default function PhoneMockup({ variant = 'dark', className = '', children }: PhoneMockupProps) {
  const frameColor = variant === 'dark' ? 'bg-gray-900' : 'bg-gray-200';

  return (
    <div className={`relative ${className}`}>
      <div className={`w-[220px] h-[440px] ${frameColor} rounded-[2.5rem] p-2.5 shadow-2xl`}>
        <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-xl z-10" />
          {children}
        </div>
      </div>
    </div>
  );
}

export function AppScreenContent({ type }: { type: 'home' | 'product' | 'plus' | 'search' | 'checkout' | 'notifications' }) {
  if (type === 'home') {
    return (
      <div className="pt-8 h-full bg-gray-50">
        <div className="h-10 bg-[#004d2c] flex items-center justify-center">
          <span className="text-white text-[10px] font-bold">Patel Sales</span>
        </div>
        <div className="p-2 space-y-2">
          <div className="h-16 bg-[#004d2c]/10 rounded-lg" />
          <div className="grid grid-cols-2 gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 bg-white rounded border border-gray-100" />
            ))}
          </div>
          <div className="h-20 bg-white rounded border border-gray-100" />
        </div>
      </div>
    );
  }

  if (type === 'product') {
    return (
      <div className="pt-8 h-full bg-white">
        <div className="h-8 bg-[#004d2c] flex items-center px-2">
          <span className="text-white text-[8px]">← Back</span>
        </div>
        <div className="p-2">
          <div className="h-28 bg-gray-100 rounded-lg mb-2" />
          <div className="h-2 bg-gray-200 rounded w-3/4 mb-1" />
          <div className="h-2 bg-gray-200 rounded w-1/2 mb-2" />
          <div className="flex gap-0.5 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-2 h-2 bg-yellow-400 rounded-sm" />
            ))}
          </div>
          <div className="h-8 bg-[#369550] rounded text-white text-[8px] flex items-center justify-center font-bold">
            Add to Cart
          </div>
        </div>
      </div>
    );
  }

  if (type === 'plus') {
    return (
      <div className="pt-8 h-full bg-white">
        <div className="h-12 bg-[#0066cc] flex items-center justify-center">
          <span className="text-white text-[10px] font-bold">Plus Membership</span>
        </div>
        <div className="p-2 space-y-2">
          <div className="bg-[#0066cc]/10 rounded-lg p-2">
            <div className="text-[8px] font-bold text-[#0066cc]">Free Shipping</div>
            <div className="text-[7px] text-gray-500">On orders $29+</div>
          </div>
          <div className="bg-green-50 rounded-lg p-2">
            <div className="text-[8px] font-bold text-[#004d2c]">Member Discounts</div>
            <div className="text-[7px] text-gray-500">Save up to 20%</div>
          </div>
          <div className="h-16 bg-gray-100 rounded-lg" />
        </div>
      </div>
    );
  }

  if (type === 'search') {
    return (
      <div className="pt-8 h-full bg-white p-2">
        <div className="h-7 bg-gray-100 rounded-full flex items-center px-2 mb-2">
          <div className="w-3 h-3 bg-gray-300 rounded-full mr-1" />
          <div className="h-1.5 bg-gray-200 rounded flex-1" />
        </div>
        <div className="h-20 bg-gray-100 rounded-lg mb-2" />
        <div className="space-y-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-1.5">
              <div className="w-10 h-10 bg-gray-100 rounded" />
              <div className="flex-1 space-y-1">
                <div className="h-1.5 bg-gray-200 rounded w-full" />
                <div className="h-1.5 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'checkout') {
    return (
      <div className="pt-8 h-full bg-gray-50 p-2">
        <div className="text-[9px] font-bold text-gray-800 mb-2">Your Order</div>
        {[1, 2].map((i) => (
          <div key={i} className="flex gap-1.5 bg-white rounded p-1.5 mb-1.5">
            <div className="w-8 h-8 bg-gray-100 rounded" />
            <div className="flex-1">
              <div className="h-1.5 bg-gray-200 rounded w-full mb-1" />
              <div className="h-1.5 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        ))}
        <div className="h-8 bg-[#369550] rounded text-white text-[8px] flex items-center justify-center font-bold mt-2">
          Place Order
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 h-full bg-gray-50 p-2 space-y-1.5">
      {['Order Delivered!', 'Flash Sale Live', 'New Products'].map((msg) => (
        <div key={msg} className="bg-white rounded-lg p-2 shadow-sm border border-gray-100">
          <div className="text-[8px] font-bold text-[#004d2c]">{msg}</div>
          <div className="h-1 bg-gray-200 rounded w-full mt-1" />
        </div>
      ))}
    </div>
  );
}

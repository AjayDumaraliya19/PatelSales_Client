import React from 'react';
import Icon from '../ui/AppIcon';

export default function BulkPricingTable({ tiers, basePrice, quantity }) {
  if (!tiers || tiers.length === 0) return null;

  const sorted = [...tiers].sort((a, b) => a.minQuantity - b.minQuantity);

  const getActiveTier = () => {
    let active = null;
    for (const tier of sorted) {
      if (quantity >= tier.minQuantity) active = tier;
    }
    return active;
  };

  const activeTier = getActiveTier();

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-4 py-2.5 bg-gray-100 border-b border-gray-200">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
          <Icon name="CurrencyDollarIcon" size={16} className="text-green-600" />
          Volume Pricing — Save More When You Buy More
        </h3>
      </div>
      <div className="divide-y divide-gray-200">
        <div className="grid grid-cols-3 gap-2 px-4 py-2 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <span>Quantity</span>
          <span className="text-center">Price/Case</span>
          <span className="text-right">You Save</span>
        </div>
        <div
          className={`grid grid-cols-3 gap-2 px-4 py-2.5 transition-colors bg-green-50 border-l-4 border-l-green-500`}
        >
          <span className="text-sm font-medium text-gray-700">1+ Cases</span>
          <span className="text-sm font-bold text-center text-gray-900">${basePrice.toFixed(2)}</span>
          <span className="text-sm text-gray-500 text-right">Base price</span>
        </div>
        {sorted.map((tier, idx) => {
          const savings = basePrice - tier.price;
          const savingsPercent = Math.round((savings / basePrice) * 100);
          const isActive = activeTier?.minQuantity === tier.minQuantity && quantity >= tier.minQuantity;

          return (
            <div
              key={idx}
              className={`grid grid-cols-3 gap-2 px-4 py-2.5 transition-colors ${
                isActive ? 'bg-green-50 border-l-4 border-l-green-500' : 'hover:bg-gray-50'
              }`}
            >
              <span className="text-sm font-medium text-gray-700">
                {tier.label || `${tier.minQuantity}+ Cases`}
                {isActive && <Icon name="CheckCircleIcon" size={14} className="inline ml-1 text-green-600" />}
              </span>
              <span className={`text-sm font-bold text-center ${isActive ? 'text-green-700' : 'text-gray-900'}`}>
                ${tier.price.toFixed(2)}
              </span>
              <span className="text-sm text-right">
                {savings > 0 ? (
                  <span className="text-green-600 font-semibold">
                    ${savings.toFixed(2)} ({savingsPercent}% off)
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </span>
            </div>
          );
        })}
      </div>
      {activeTier && quantity >= activeTier.minQuantity && (
        <div className="px-4 py-2 bg-green-50 border-t border-green-200">
          <p className="text-sm text-green-700 font-semibold flex items-center gap-1">
            <Icon name="TagIcon" size={14} />
            You're getting the {activeTier.label || `${activeTier.minQuantity}+`} discount
          </p>
        </div>
      )}
    </div>
  );
}

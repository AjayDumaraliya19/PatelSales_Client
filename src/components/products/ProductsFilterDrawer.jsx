import React, { useEffect } from 'react';
import Icon from '../ui/AppIcon';

export default function ProductsFilterDrawer({
  isOpen,
  onClose,
  categories,
  filter,
  onFilterChange,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-white shadow-xl overflow-y-auto scrollbar-hide">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-lg">Filters</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close filters"
            >
              <Icon name="XMarkIcon" size={20} />
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-3">Category</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category-mobile"
                  checked={!filter.category}
                  onChange={() => onFilterChange({ category: '' })}
                  className="w-4 h-4 text-[#003087] border-gray-300 focus:ring-[#003087]"
                />
                <span className="text-sm text-gray-700">All Categories</span>
              </label>
              {categories.map((cat) => (
                <label key={cat._id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category-mobile"
                    checked={filter.category === cat.slug}
                    onChange={() => onFilterChange({ category: cat.slug })}
                    className="w-4 h-4 text-[#003087] border-gray-300 focus:ring-[#003087]"
                  />
                  <span className="text-sm text-gray-700">{cat.name}</span>
                  <span className="text-xs text-gray-400 ml-auto">({cat.productCount})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-3">Price Range</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Min</label>
                <input
                  type="number"
                  value={filter.minPrice}
                  onChange={(e) => onFilterChange({ minPrice: e.target.value })}
                  className="input-field w-full"
                  min="0"
                  max="500"
                />
              </div>
              <span className="text-gray-400 mt-5">-</span>
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Max</label>
                <input
                  type="number"
                  value={filter.maxPrice}
                  onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
                  className="input-field w-full"
                  min="0"
                  max="500"
                />
              </div>
            </div>
          </div>

          {/* Sort By */}
          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-3">Sort By</h3>
            <select
              value={filter.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value})}
              className="input-field w-full"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price_asc">Price (Low to High)</option>
              <option value="price_desc">Price (High to Low)</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* Apply Button */}
          <button
            onClick={onClose}
            className="btn-primary w-full justify-center mb-3"
          >
            Apply Filters
          </button>
          <button
            onClick={() => {
              onFilterChange({ category: '', minPrice: 0, maxPrice: 500, search: '' });
              onClose();
            }}
            className="btn-outline w-full justify-center"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

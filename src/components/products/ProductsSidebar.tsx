import React from 'react';
import Icon from '../ui/AppIcon';
import type { Category, FilterState } from '../../types';

interface ProductsSidebarProps {
  categories: Category[];
  filter: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  activeFilterCount: number;
}

export default function ProductsSidebar({
  categories,
  filter,
  onFilterChange,
  activeFilterCount,
}: ProductsSidebarProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-sm p-4 sticky top-[140px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">Filters</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={() => onFilterChange({ category: '', minPrice: 0, maxPrice: 500, search: '' })}
            className="text-xs text-[#e8471e] hover:text-[#c73a17] font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-semibold text-sm mb-3">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
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
                name="category"
                checked={filter.category === cat._id}
                onChange={() => onFilterChange({ category: cat._id })}
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
              onChange={(e) => onFilterChange({ minPrice: Number(e.target.value) })}
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
              onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
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
          onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
          className="input-field w-full"
        >
          <option value="name">Name (A-Z)</option>
          <option value="price_asc">Price (Low to High)</option>
          <option value="price_desc">Price (High to Low)</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {/* Stock Status */}
      <div className="mb-6">
        <h3 className="font-semibold text-sm mb-3">Availability</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filter.minPrice > 0}
            onChange={(e) => onFilterChange({ minPrice: e.target.checked ? 1 : 0 })}
            className="w-4 h-4 text-[#003087] border-gray-300 focus:ring-[#003087]"
          />
          <span className="text-sm text-gray-700">In Stock Only</span>
        </label>
      </div>

      {/* Apply Button */}
      <button className="btn-primary w-full justify-center">
        Apply Filters
      </button>
    </div>
  );
}

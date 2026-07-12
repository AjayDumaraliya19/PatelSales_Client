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
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-5 pt-0 sticky top-[180px] max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
      <div className="sticky top-0 bg-white z-10 -mt-5 -mx-5 px-5 pt-5 pb-4 border-b border-gray-100 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="FunnelIcon" size={20} className="text-[#003087]" />
          <h2 className="font-bold text-xl text-gray-800">Filters</h2>
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={() => onFilterChange({ category: '', minPrice: 0, maxPrice: 500, search: '' })}
            className="text-sm text-[#e8471e] hover:text-[#c73a17] font-semibold transition-colors flex items-center gap-1"
          >
            <Icon name="XMarkIcon" size={16} />
            Clear All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="space-y-3 pt-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="radio"
                name="category"
                checked={!filter.category}
                onChange={() => onFilterChange({ category: '' })}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${!filter.category
                ? 'border-[#003087] bg-white'
                : 'border-gray-300 group-hover:border-[#003087]/50'
                }`}>
                {!filter.category && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#003087]" />
                )}
              </div>
            </div>
            <span className={`text-base transition-colors ${!filter.category ? 'text-[#003087] font-bold' : 'text-gray-700 group-hover:text-[#003087]'}`}>
              All Categories
            </span>
          </label>
          {categories.map((cat) => (
            <label key={cat._id} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="category"
                  checked={filter.category === cat.slug}
                  onChange={() => onFilterChange({ category: cat.slug })}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${filter.category === cat.slug
                  ? 'border-[#003087] bg-white'
                  : 'border-gray-300 group-hover:border-[#003087]/50'
                  }`}>
                  {filter.category === cat.slug && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#003087]" />
                  )}
                </div>
              </div>
              <span className={`text-base transition-colors flex-1 ${filter.category === cat.slug ? 'text-[#003087] font-bold' : 'text-gray-700 group-hover:text-[#003087]'}`}>
                {cat.name}
              </span>
              <span className={`text-sm bg-gray-100 px-2 py-0.5 rounded-full transition-all ${filter.category === cat.slug ? 'text-[#003087] font-bold bg-[#003087]/10' : 'text-gray-400'}`}>
                ({cat.productCount})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold text-base text-gray-800 mb-3 flex items-center gap-2">
          <Icon name="CurrencyDollarIcon" size={18} className="text-gray-500" />
          Price Range
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-sm text-gray-500 mb-1.5 block font-medium">Min</label>
            <input
              type="number"
              value={filter.minPrice}
              onChange={(e) => onFilterChange({ minPrice: Number(e.target.value) })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#003087] focus:border-transparent outline-none transition-all"
              min="0"
              max="500"
              placeholder="$0"
            />
          </div>
          <span className="text-gray-400 mt-6 font-medium">-</span>
          <div className="flex-1">
            <label className="text-sm text-gray-500 mb-1.5 block font-medium">Max</label>
            <input
              type="number"
              value={filter.maxPrice}
              onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#003087] focus:border-transparent outline-none transition-all"
              min="0"
              max="500"
              placeholder="$500"
            />
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <h3 className="font-semibold text-base text-gray-800 mb-3 flex items-center gap-2">
          <Icon name="ArrowUpDownIcon" size={18} className="text-gray-500" />
          Sort By
        </h3>
        <select
          value={filter.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#003087] focus:border-transparent outline-none transition-all appearance-none bg-white"
        >
          <option value="name">Name (A-Z)</option>
          <option value="price_asc">Price (Low to High)</option>
          <option value="price_desc">Price (High to Low)</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {/* Stock Status */}
      <div className="mb-6">
        <h3 className="font-semibold text-base text-gray-800 mb-3 flex items-center gap-2">
          <Icon name="CheckCircleIcon" size={18} className="text-gray-500" />
          Availability
        </h3>
        <label className={`flex items-center gap-3 cursor-pointer group p-3 rounded-xl transition-all duration-300 ${
          filter.minPrice > 0
            ? 'bg-[#003087]/5 border border-[#003087]/20'
            : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
        }`}>
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              checked={filter.minPrice > 0}
              onChange={(e) => onFilterChange({ minPrice: e.target.checked ? 1 : 0 })}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
              filter.minPrice > 0
                ? 'border-[#003087] bg-[#003087] text-white'
                : 'border-gray-300 bg-white group-hover:border-[#003087]/50'
            }`}>
              {filter.minPrice > 0 && (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                </svg>
              )}
            </div>
          </div>
          <span className={`text-base transition-colors font-semibold ${
            filter.minPrice > 0 ? 'text-[#003087]' : 'text-gray-700 group-hover:text-[#003087]'
          }`}>
            In Stock Only
          </span>
        </label>
      </div>

      {/* Apply Button */}
      <button className="w-full bg-gradient-to-r from-[#003087] to-[#0040a0] text-white font-semibold py-3.5 rounded-lg hover:from-[#002266] hover:to-[#003087] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-base">
        <Icon name="CheckIcon" size={20} />
        Apply Filters
      </button>
    </div>
  );
}

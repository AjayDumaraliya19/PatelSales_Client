import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '../ui/AppIcon';
import ProductCard from '../ProductCard';
import ProductsSidebar from './ProductsSidebar';
import ProductsFilterDrawer from './ProductsFilterDrawer';
import ProductsSkeleton from './ProductsSkeleton';
import type { Product, Category, FilterState } from '../../types';

interface ProductsClientPageProps {
  products: Product[];
  categories: Category[];
}

export default function ProductsClientPage({ products, categories }: ProductsClientPageProps) {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState<FilterState>({
    category: searchParams.get('category') || '',
    minPrice: 0,
    maxPrice: 500,
    sortBy: 'name',
    search: searchParams.get('search') || '',
    page: 1,
  });

  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      if (filter.category && product.categoryId !== filter.category) return false;
      if (filter.search && !product.name.toLowerCase().includes(filter.search.toLowerCase())) return false;
      if (product.price < filter.minPrice || product.price > filter.maxPrice) return false;
      return true;
    }).sort((a, b) => {
      switch (filter.sortBy) {
        case 'price_asc': return a.price - b.price;
        case 'price_desc': return b.price - a.price;
        case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default: return a.name.localeCompare(b.name);
      }
    });
  }, [products, filter]);

  const activeFilterCount = [
    filter.category,
    filter.minPrice > 0,
    filter.maxPrice < 500,
    filter.search,
  ].filter(Boolean).length;

  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilter((prev) => ({ ...prev, ...updates, page: 1 }));
  };

  const clearFilters = () => {
    setFilter({
      category: '',
      minPrice: 0,
      maxPrice: 500,
      sortBy: 'name',
      search: '',
      page: 1,
    });
  };

  return (
    <div className="w-full px-4 py-6">
      {/* Breadcrumb */}
      <div className="wss-breadcrumb mb-4">
        <span>Home</span>
        <span className="mx-2">/</span>
        <span>Products</span>
        {filter.category && (
          <>
            <span className="mx-2">/</span>
            <span>{categories.find((c) => c._id === filter.category)?.name}</span>
          </>
        )}
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {filter.category
              ? categories.find((c) => c._id === filter.category)?.name
              : 'All Products'}
          </h1>
          <p className="text-sm text-gray-500">{filteredProducts.length} products</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setFilterDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-sm text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <Icon name="FunnelIcon" size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-[#e8471e] text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* View Toggle */}
          <div className="flex border border-gray-300 rounded-sm overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-[#003087] text-white' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
              aria-label="Grid view"
            >
              <Icon name="Squares2X2Icon" size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-[#003087] text-white' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
              aria-label="List view"
            >
              <Icon name="ListBulletIcon" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-sm text-gray-500">Active filters:</span>
          {filter.category && (
            <button
              onClick={() => handleFilterChange({ category: '' })}
              className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-sm text-xs font-medium transition-colors"
            >
              {categories.find((c) => c._id === filter.category)?.name}
              <Icon name="XMarkIcon" size={12} />
            </button>
          )}
          {filter.minPrice > 0 && (
            <button
              onClick={() => handleFilterChange({ minPrice: 0 })}
              className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-sm text-xs font-medium transition-colors"
            >
              Min: ${filter.minPrice}
              <Icon name="XMarkIcon" size={12} />
            </button>
          )}
          {filter.maxPrice < 500 && (
            <button
              onClick={() => handleFilterChange({ maxPrice: 500 })}
              className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-sm text-xs font-medium transition-colors"
            >
              Max: ${filter.maxPrice}
              <Icon name="XMarkIcon" size={12} />
            </button>
          )}
          {filter.search && (
            <button
              onClick={() => handleFilterChange({ search: '' })}
              className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-sm text-xs font-medium transition-colors"
            >
              {filter.search}
              <Icon name="XMarkIcon" size={12} />
            </button>
          )}
          <button
            onClick={clearFilters}
            className="text-xs text-[#e8471e] hover:text-[#c73a17] font-medium transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex gap-6">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <ProductsSidebar
            categories={categories}
            filter={filter}
            onFilterChange={handleFilterChange}
            activeFilterCount={activeFilterCount}
          />
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
         {loading ? (
            <ProductsSkeleton viewMode={viewMode} />
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-sm p-8 text-center">
              <Icon name="MagnifyingGlassIcon" size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
              <button
                onClick={clearFilters}
                className="btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-3 ${
                viewMode === 'grid'
                  ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                  : 'grid-cols-1'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} variant={viewMode} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter Drawer - Mobile */}
      <ProductsFilterDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        categories={categories}
        filter={filter}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}

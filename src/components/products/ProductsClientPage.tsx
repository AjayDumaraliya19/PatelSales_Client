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
  loading?: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function ProductsClientPage({
  products,
  categories,
  loading = false,
  page = 1,
  totalPages = 1,
  onPageChange,
}: ProductsClientPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const [filter, setFilter] = useState<FilterState>({
    category: searchParams.get('category') || '',
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 500,
    sortBy: (searchParams.get('sort') as 'name' | 'price_asc' | 'price_desc' | 'newest') || 'name',
    search: searchParams.get('search') || '',
    page: 1,
  });

  // Sync filter with URL params
  React.useEffect(() => {
    setFilter({
      category: searchParams.get('category') || '',
      minPrice: Number(searchParams.get('minPrice')) || 0,
      maxPrice: Number(searchParams.get('maxPrice')) || 500,
      sortBy: (searchParams.get('sort') as 'name' | 'price_asc' | 'price_desc' | 'newest') || 'name',
      search: searchParams.get('search') || '',
      page: 1,
    });
  }, [searchParams]);

  // Products are already filtered by backend, no need for client-side filtering
  const filteredProducts = products;

  const activeFilterCount = [
    filter.category,
    filter.minPrice > 0,
    filter.maxPrice < 500,
    filter.search,
  ].filter(Boolean).length;

  const handleFilterChange = (updates: Partial<FilterState>) => {
    const newFilter = { ...filter, ...updates, page: 1 };
    setFilter(newFilter);
    
    // Update URL params
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (newFilter.category) {
      newSearchParams.set('category', newFilter.category);
    } else {
      newSearchParams.delete('category');
    }
    
    if (newFilter.search) {
      newSearchParams.set('search', newFilter.search);
    } else {
      newSearchParams.delete('search');
    }
    
    if (newFilter.minPrice > 0) {
      newSearchParams.set('minPrice', newFilter.minPrice.toString());
    } else {
      newSearchParams.delete('minPrice');
    }
    
    if (newFilter.maxPrice < 500) {
      newSearchParams.set('maxPrice', newFilter.maxPrice.toString());
    } else {
      newSearchParams.delete('maxPrice');
    }
    
    if (newFilter.sortBy !== 'name') {
      newSearchParams.set('sort', newFilter.sortBy);
    } else {
      newSearchParams.delete('sort');
    }
    
    setSearchParams(newSearchParams);
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
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 py-6">
      {/* Breadcrumb */}
      <div className="wss-breadcrumb mb-4">
        <span>Home</span>
        <span className="mx-2">/</span>
        <span>Products</span>
        {filter.category && (
          <>
            <span className="mx-2">/</span>
            <span>{categories.find((c) => c.slug === filter.category)?.name}</span>
          </>
        )}
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {filter.category
              ? categories.find((c) => c.slug === filter.category)?.name
              : 'All Products'}
          </h1>
          <p className="text-sm text-gray-500">{filteredProducts.length} products</p>
        </div>

        <div className="flex items-center gap-2 lg:sticky lg:top-4 lg:z-10">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setFilterDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-sm text-sm font-medium hover:bg-gray-50 transition-colors sticky top-0 z-10 bg-[#f5f5f5]"
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
          <div className="flex border border-gray-300 rounded-sm overflow-hidden lg:hidden sticky top-0 z-10 bg-[#f5f5f5]">
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

          {/* Desktop View Toggle */}
          <div className="hidden lg:flex border border-gray-300 rounded-sm overflow-hidden">
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
              {categories.find((c) => c.slug === filter.category)?.name}
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
              <button onClick={clearFilters} className="btn-secondary">
                Clear Filters
              </button>
            </div>
          ) : (
            <>
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2">
                  <button
                    onClick={() => onPageChange && onPageChange(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-3 py-2 border border-gray-300 rounded-sm text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => onPageChange && onPageChange(pageNum)}
                          className={`px-3 py-2 border rounded-sm text-sm font-medium transition-colors ${
                            page === pageNum
                              ? 'bg-[#003087] text-white border-[#003087]'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => onPageChange && onPageChange(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded-sm text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
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

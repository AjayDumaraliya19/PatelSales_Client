import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { Search as SearchIcon } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { CategoryNav } from '../components/layout/CategoryNav';
import { Loader } from '../components/ui/Loader';
import { fetchProducts } from '../services/productService';
import { addToCart } from '../store/slices/cartSlice';
import type { AppDispatch } from '../store';
import type { Product } from '../types';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const initialQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [initialQuery]);

  const { data, isLoading } = useQuery({
    queryKey: ['products', 'search', initialQuery],
    queryFn: () =>
      fetchProducts({
        search: initialQuery || undefined,
        active: true,
        limit: 50,
      }),
    enabled: !!initialQuery,
  });

  const filteredProducts = data?.products || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    }
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="flex gap-6">
      <CategoryNav />
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Products</h1>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-12 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary-500"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-4 bg-primary-600 text-white rounded-r-md hover:bg-primary-700"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="flex items-center justify-center h-32">
            <Loader />
          </div>
        )}

        {!isLoading && initialQuery && (
          <p className="text-sm text-gray-600 mb-4">
            {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for &quot;{initialQuery}&quot;
          </p>
        )}

        {!isLoading && initialQuery && filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
            <SearchIcon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-600">No products found matching your search.</p>
          </div>
        ) : (
          !isLoading &&
          initialQuery && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          )
        )}

        {!initialQuery && (
          <p className="text-gray-600 text-sm">Enter a search term to find products.</p>
        )}
      </div>
    </div>
  );
}

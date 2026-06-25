import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Loader } from '../components/ui/Loader';
import { ProductCard } from '../components/product/ProductCard';
import { CategoryNav } from '../components/layout/CategoryNav';
import { fetchProducts } from '../services/productService';
import { fetchCategories } from '../services/categoryService';
import { addToCart } from '../store/slices/cartSlice';
import type { AppDispatch } from '../store';
import type { Product } from '../types';

export function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const selectedCategoryId = categories.find((c) => c.name === selectedCategory)?._id;

  const { data, isLoading } = useQuery({
    queryKey: ['products', searchTerm, selectedCategoryId],
    queryFn: () =>
      fetchProducts({
        search: searchTerm || undefined,
        category: selectedCategoryId,
        active: true,
        limit: 50,
      }),
  });

  const products = data?.products || [];
  const categoryNames = ['All', ...categories.map((c) => c.name)];

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      <CategoryNav />
      <div className="flex-1 min-w-0 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
          <p className="text-gray-600 mt-1">Browse our premium selection of commercial supplies</p>
        </div>

        <Card padding="sm">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {categoryNames.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <Button variant="secondary" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found</p>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

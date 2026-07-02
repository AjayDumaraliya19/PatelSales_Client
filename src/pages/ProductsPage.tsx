import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductsClientPage from '../components/products/ProductsClientPage';
import productsService from '../services/productsService';
import categoriesService from '../services/categoriesService';
import type { Product, Category } from '../types';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesService.getCategories();
        setCategories(response.categories);
      } catch (err: any) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const categoryFilter = searchParams.get('category') || undefined;
        const searchQuery = searchParams.get('search') || undefined;
        const sortBy = (searchParams.get('sort') as any) || 'name-asc';
        const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
        const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;

        const response = await productsService.getProducts({
          page,
          limit: 20,
          category: categoryFilter,
          search: searchQuery,
          sort: sortBy,
          minPrice,
          maxPrice,
          active: true, // Only show active products
        });

        setProducts(response.products);
        setTotalPages(response.pages);
      } catch (err: any) {
        setError(err.message || 'Failed to load products');
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams, page]);

  if (error && !loading) {
    return (
      <div className="min-h-full bg-[#f5f5f5] flex items-center justify-center p-4">
        <div className="bg-white border border-red-200 rounded-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Failed to Load Products</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#f5f5f5]">
      <ProductsClientPage
        products={products}
        categories={categories}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

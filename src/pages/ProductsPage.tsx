import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductsClientPage from '../components/products/ProductsClientPage';
import productsService from '../services/productsService';
import categoriesService from '../services/categoriesService';
import { catalogCategories } from '../data/productCategories';
import type { Product, Category } from '../types';
import { useAuthStore } from '../store/authStore';

const PRODUCTS_PER_PAGE = 52;

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>(catalogCategories);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const deliveryPincode = useAuthStore((state) => state.deliveryPincode);

  const categoryFilter = searchParams.get('category') || undefined;
  const searchQuery = searchParams.get('search') || undefined;
  const sortBy = searchParams.get('sort') || 'name-asc';
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesService.getCategories();
        if (response.categories?.length) {
          setCategories(response.categories);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [categoryFilter, searchQuery, sortBy, minPrice, maxPrice]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productsService.getProducts({
          page,
          limit: PRODUCTS_PER_PAGE,
          category: categoryFilter,
          search: searchQuery,
          sort: sortBy as 'price-asc' | 'price-desc' | 'newest' | 'name-asc',
          minPrice,
          maxPrice,
          active: true,
          pincode: deliveryPincode || undefined,
        });

        setProducts(response.products);
        setTotalPages(response.pages);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryFilter, searchQuery, sortBy, minPrice, maxPrice, page, deliveryPincode]);

  const pageTitle = useMemo(() => {
    if (searchQuery) return `Search: ${searchQuery}`;
    if (!categoryFilter) return 'All Disposables';
    return categories.find((category) => category.slug === categoryFilter)?.name ?? 'Products';
  }, [categories, categoryFilter, searchQuery]);

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

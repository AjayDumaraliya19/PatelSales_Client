import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductsClientPage from '../components/products/ProductsClientPage';
import productsService from '../services/productsService';
import categoriesService from '../services/categoriesService';
import { catalogCategories } from '../data/productCategories';
import { mockProducts } from '../data/mockData';
import type { Product, Category } from '../types';

const PRODUCTS_PER_PAGE = 20;

function filterMockProducts(
  products: Product[],
  {
    categorySlug,
    searchQuery,
    sortBy,
    minPrice,
    maxPrice,
  }: {
    categorySlug?: string;
    searchQuery?: string;
    sortBy?: string;
    minPrice?: number;
    maxPrice?: number;
  },
) {
  let filteredProducts = products.filter((product) => product.isActive !== false);

  if (categorySlug) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.slug === categorySlug,
    );
  }

  if (searchQuery) {
    const normalizedSearch = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch) ||
        product.sku.toLowerCase().includes(normalizedSearch),
    );
  }

  if (minPrice !== undefined) {
    filteredProducts = filteredProducts.filter((product) => product.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice);
  }

  switch (sortBy) {
    case 'price-asc':
    case 'price_asc':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
    case 'price_desc':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filteredProducts.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
    case 'name-asc':
    case 'name':
    default:
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return filteredProducts;
}

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>(catalogCategories);
  const [loading, setLoading] = useState(true);
  const [isUsingMockCatalog, setIsUsingMockCatalog] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
          setIsUsingMockCatalog(false);
          return;
        }
      } catch (error) {
        console.error('Failed to fetch categories, using local catalog:', error);
      }

      setCategories(catalogCategories);
      setIsUsingMockCatalog(true);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [categoryFilter, searchQuery, sortBy, minPrice, maxPrice]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      if (!isUsingMockCatalog) {
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
          });

          setProducts(response.products);
          setTotalPages(response.pages);
          setLoading(false);
          return;
        } catch (error) {
          console.error('Failed to fetch products, using local catalog:', error);
          setIsUsingMockCatalog(true);
          setCategories(catalogCategories);
        }
      }

      const filteredProducts = filterMockProducts(mockProducts, {
        categorySlug: categoryFilter,
        searchQuery,
        sortBy,
        minPrice,
        maxPrice,
      });

      const pages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
      const currentPage = Math.min(page, pages);
      const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

      setProducts(filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE));
      setTotalPages(pages);
      setLoading(false);
    };

    fetchProducts();
  }, [categoryFilter, searchQuery, sortBy, minPrice, maxPrice, page, isUsingMockCatalog]);

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

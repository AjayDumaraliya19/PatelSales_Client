import { useState, useCallback } from 'react';
import productsService, {
  ProductsResponse,
  ProductQueryParams,
  Product,
} from '../services/productsService';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(
    async (params?) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await productsService.getProducts({
          page: params?.page || page,
          limit: params?.limit || limit,
          category: params?.category,
          search: params?.search,
          minPrice: params?.minPrice,
          maxPrice: params?.maxPrice,
          active: params?.active,
          featured: params?.featured,
          sort: params?.sort,
        });

        setProducts(response.products);
        setTotal(response.total);
        setPages(response.pages);
        if (params?.page) setPage(params.page);
        if (params?.limit) setLimit(params.limit);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    },
    [page, limit]
  );

  const fetchProductById = useCallback(
    async (idOrSlug) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await productsService.getProductById(idOrSlug);
        return response.product;
      } catch (err) {
        setError(err.message || 'Failed to fetch product');
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const fetchFeaturedProducts = useCallback(
    async (limit = 8) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await productsService.getFeaturedProducts(limit);
        setProducts(response.products);
        return response.products;
      } catch (err) {
        setError(err.message || 'Failed to fetch featured products');
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const searchProducts = useCallback(
    async (query, params?'search'>) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await productsService.searchProducts(query, params);
        setProducts(response.products);
        return response.products;
      } catch (err) {
        setError(err.message || 'Failed to search products');
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    products,
    total,
    pages,
    page,
    limit,
    isLoading,
    error,
    fetchProducts,
    fetchProductById,
    fetchFeaturedProducts,
    searchProducts,
    setPage,
    setLimit,
  };
};

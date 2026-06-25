import apiClient from './apiClient';
import { mapProduct } from '../utils/mappers';
import type { Product } from '../types';

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sort?: string;
  featured?: boolean;
  active?: boolean;
}

export async function fetchProducts(params: ProductQueryParams = {}): Promise<{
  products: Product[];
  total: number;
  page: number;
  pages: number;
}> {
  const response = await apiClient.get('/api/products', { params });
  const { products, total, page, pages } = response.data;
  return {
    products: (products || []).map(mapProduct),
    total: total || 0,
    page: page || 1,
    pages: pages || 0,
  };
}

export async function fetchProductById(productId: string): Promise<Product> {
  const response = await apiClient.get(`/api/products/${productId}`);
  return mapProduct(response.data.product);
}

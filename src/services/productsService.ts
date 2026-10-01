import apiClient from '../lib/apiClient';

// Types
export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  images: string[];
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  brand?: string;
  stock: number;
  lowStockThreshold: number;
  attributes?: Record<string, any>;
  variants?: any[];
  isActive: boolean;
  isFeatured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  rating?: number;
  reviewCount?: number;
  caseSize?: string;
  isOnSale?: boolean;
  isProductNew?: boolean;
  bulkPricingTiers?: {
    minQuantity: number;
    price: number;
    label: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  products: Product[];
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  active?: boolean;
  featured?: boolean;
  sort?: 'price-asc' | 'price-desc' | 'newest' | 'name-asc' | 'popular' | 'best-reviewed' | 'top';
  exclude?: string;
}

// Products Service
class ProductsService {
  /**
   * Get all products with filters
   */
  async getProducts(params?: ProductQueryParams): Promise<ProductsResponse> {
    const response = await apiClient.get<ProductsResponse>('/products', { params });
    return response.data;
  }

  /**
   * Get single product by ID or slug
   */
  async getProductById(idOrSlug: string): Promise<{ success: boolean; product: Product }> {
    const response = await apiClient.get(`/products/${idOrSlug}`);
    return response.data;
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit: number = 8): Promise<ProductsResponse> {
    const response = await apiClient.get<ProductsResponse>('/products', {
      params: { featured: true, limit, active: true },
    });
    return response.data;
  }

  /**
   * Search products
   */
  async searchProducts(query: string, params?: Omit<ProductQueryParams, 'search'>): Promise<ProductsResponse> {
    const response = await apiClient.get<ProductsResponse>('/products', {
      params: { search: query, ...params },
    });
    return response.data;
  }

  /**
   * Get related products (same category, excluding current)
   */
  async getRelatedProducts(categoryId: string, excludeId: string, limit: number = 10): Promise<ProductsResponse> {
    const response = await apiClient.get<ProductsResponse>('/products', {
      params: { category: categoryId, exclude: excludeId, limit, active: true, sort: 'popular' },
    });
    return response.data;
  }

  /**
   * Get popular products (sorted by sales count)
   */
  async getPopularProducts(limit: number = 10, excludeId?: string): Promise<ProductsResponse> {
    const params: any = { limit, active: true, sort: 'popular' };
    if (excludeId) params.exclude = excludeId;
    const response = await apiClient.get<ProductsResponse>('/products', { params });
    return response.data;
  }

  /**
   * Get top products (featured + high sales)
   */
  async getTopProducts(limit: number = 10, excludeId?: string): Promise<ProductsResponse> {
    const params: any = { limit, active: true, sort: 'top' };
    if (excludeId) params.exclude = excludeId;
    const response = await apiClient.get<ProductsResponse>('/products', { params });
    return response.data;
  }

  /**
   * Get best reviewed products (sorted by rating)
   */
  async getBestReviewedProducts(limit: number = 10, excludeId?: string): Promise<ProductsResponse> {
    const params: any = { limit, active: true, sort: 'best-reviewed' };
    if (excludeId) params.exclude = excludeId;
    const response = await apiClient.get<ProductsResponse>('/products', { params });
    return response.data;
  }
}

export default new ProductsService();

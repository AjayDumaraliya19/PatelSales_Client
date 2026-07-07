import apiClient from '../lib/apiClient';

// Types
export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  displayPrice?: number;
  areaPrice?: number;
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
  sort?: 'price-asc' | 'price-desc' | 'newest' | 'name-asc';
  pincode?: string;
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
}

export default new ProductsService();

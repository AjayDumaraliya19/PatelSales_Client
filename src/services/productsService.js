import apiClient from '../lib/apiClient';

// Types

// Products Service
class ProductsService {
  /**
   * Get all products with filters
   */
  async getProducts(params) {
    const response = await apiClient.get('/products', { params });
    return response.data;
  }

  /**
   * Get single product by ID or slug
   */
  async getProductById(idOrSlug) {
    const response = await apiClient.get(`/products/${idOrSlug}`);
    return response.data;
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit = 8) {
    const response = await apiClient.get('/products', {
      params: { featured: true, limit, active: true },
    });
    return response.data;
  }

  /**
   * Search products
   */
  async searchProducts(query, params) {
    const response = await apiClient.get('/products', {
      params: { search: query, ...params },
    });
    return response.data;
  }

  /**
   * Get related products (same category, excluding current)
   */
  async getRelatedProducts(categoryId, excludeId, limit = 10) {
    const response = await apiClient.get('/products', {
      params: { category: categoryId, exclude: excludeId, limit, active: true, sort: 'popular' },
    });
    return response.data;
  }

  /**
   * Get popular products (sorted by sales count)
   */
  async getPopularProducts(limit = 10, excludeId) {
    const params = { limit, active: true, sort: 'popular' };
    if (excludeId) params.exclude = excludeId;
    const response = await apiClient.get('/products', { params });
    return response.data;
  }

  /**
   * Get top products (featured + high sales)
   */
  async getTopProducts(limit = 10, excludeId) {
    const params = { limit, active: true, sort: 'top' };
    if (excludeId) params.exclude = excludeId;
    const response = await apiClient.get('/products', { params });
    return response.data;
  }

  /**
   * Get best reviewed products (sorted by rating)
   */
  async getBestReviewedProducts(limit = 10, excludeId) {
    const params = { limit, active: true, sort: 'best-reviewed' };
    if (excludeId) params.exclude = excludeId;
    const response = await apiClient.get('/products', { params });
    return response.data;
  }
}

export default new ProductsService();

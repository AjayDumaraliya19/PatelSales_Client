import apiClient from '../lib/apiClient';

// Types

// Categories Service
class CategoriesService {
  constructor() {
    this.cachedCategories = null;
    this.categoriesPromise = null;
  }

  /**
   * Get all active categories
   */
  async getCategories(forceRefresh = false) {
    if (!forceRefresh && this.cachedCategories) {
      return this.cachedCategories;
    }
    if (!forceRefresh && this.categoriesPromise) {
      return this.categoriesPromise;
    }
    this.categoriesPromise = apiClient.get('/categories')
      .then((response) => {
        this.cachedCategories = response.data;
        this.categoriesPromise = null;
        return response.data;
      })
      .catch((error) => {
        this.categoriesPromise = null;
        throw error;
      });
    return this.categoriesPromise;
  }

  /**
   * Get single category by ID
   */
  async getCategoryById(id) {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
  }

  /**
   * Get single category by slug
   */
  async getCategoryBySlug(slug) {
    const response = await apiClient.get(`/categories/slug/${slug}`);
    return response.data;
  }

  /**
   * Get parent categories only (no parent field)
   */
  getParentCategories(categories) {
    return categories.filter(cat => !cat.parent);
  }

  /**
   * Get child categories of a parent
   */
  getChildCategories(categories) {
    return categories.filter(cat => cat.parent?._id === parentId);
  }
}

export default new CategoriesService();

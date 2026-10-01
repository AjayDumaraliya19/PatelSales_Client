import apiClient from '../lib/apiClient';

// Types

// Categories Service
class CategoriesService {
  /**
   * Get all active categories
   */
  async getCategories() {
    const response = await apiClient.get('/categories');
    return response.data;
  }

  /**
   * Get single category by ID
   */
  async getCategoryById(id) { success; category}> {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
  }

  /**
   * Get single category by slug
   */
  async getCategoryBySlug(slug) { success; category}> {
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

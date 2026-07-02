import apiClient from '../lib/apiClient';

// Types
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: {
    _id: string;
    name: string;
  } | null;
  displayOrder: number;
  isActive: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  success: boolean;
  count: number;
  categories: Category[];
}

// Categories Service
class CategoriesService {
  /**
   * Get all active categories
   */
  async getCategories(): Promise<CategoriesResponse> {
    const response = await apiClient.get<CategoriesResponse>('/categories');
    return response.data;
  }

  /**
   * Get single category by ID
   */
  async getCategoryById(id: string): Promise<{ success: boolean; category: Category }> {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
  }

  /**
   * Get single category by slug
   */
  async getCategoryBySlug(slug: string): Promise<{ success: boolean; category: Category }> {
    const response = await apiClient.get(`/categories/slug/${slug}`);
    return response.data;
  }

  /**
   * Get parent categories only (no parent field)
   */
  getParentCategories(categories: Category[]): Category[] {
    return categories.filter(cat => !cat.parent);
  }

  /**
   * Get child categories of a parent
   */
  getChildCategories(categories: Category[], parentId: string): Category[] {
    return categories.filter(cat => cat.parent?._id === parentId);
  }
}

export default new CategoriesService();

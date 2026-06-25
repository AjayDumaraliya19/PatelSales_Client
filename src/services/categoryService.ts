import apiClient from './apiClient';
import { mapCategory } from '../utils/mappers';
import type { Category } from '../types';

export async function fetchCategories(): Promise<Category[]> {
  const response = await apiClient.get('/api/categories');
  return (response.data.categories || []).map(mapCategory);
}

export async function fetchCategoryBySlug(slug: string): Promise<Category> {
  const response = await apiClient.get(`/api/categories/slug/${slug}`);
  return mapCategory(response.data.category);
}

import { useState, useCallback } from 'react';
import categoriesService from '../services/categoriesService';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await categoriesService.getCategories();
      setCategories(response.categories);
      return response.categories;
    } catch (err) {
      setError(err.message || 'Failed to fetch categories');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCategoryById = useCallback(
    async (id) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await categoriesService.getCategoryById(id);
        return response.category;
      } catch (err) {
        setError(err.message || 'Failed to fetch category');
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const fetchCategoryBySlug = useCallback(
    async (slug) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await categoriesService.getCategoryBySlug(slug);
        return response.category;
      } catch (err) {
        setError(err.message || 'Failed to fetch category');
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getParentCategories = useCallback(() => {
    return categoriesService.getParentCategories(categories);
  }, [categories]);

  const getChildCategories = useCallback(
    (parentId) => {
      return categoriesService.getChildCategories(categories, parentId);
    },
    [categories]
  );

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
    fetchCategoryById,
    fetchCategoryBySlug,
    getParentCategories,
    getChildCategories,
  };
};

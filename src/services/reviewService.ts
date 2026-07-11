import apiClient from '../lib/apiClient';

export interface Review {
  _id: string;
  user: { _id: string; name: string };
  product: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  breakdown: { 5: number; 4: number; 3: number; 2: number; 1: number };
}

export interface ReviewFormData {
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
}

export interface ReviewsResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  reviews: Review[];
}

class ReviewService {
  async getProductReviews(
    productId: string,
    params?: { page?: number; limit?: number; sort?: string; rating?: number }
  ): Promise<ReviewsResponse> {
    const response = await apiClient.get<ReviewsResponse>(`/products/${productId}/reviews`, { params });
    return response.data;
  }

  async getReviewStats(productId: string): Promise<ReviewStats & { success: boolean }> {
    const response = await apiClient.get(`/products/${productId}/reviews/stats`);
    return response.data;
  }

  async createReview(productId: string, data: ReviewFormData): Promise<{ success: boolean; review: Review }> {
    const response = await apiClient.post(`/products/${productId}/reviews`, data);
    return response.data;
  }

  async markHelpful(reviewId: string): Promise<{ success: boolean; helpful: number }> {
    const response = await apiClient.put(`/products/reviews/${reviewId}/helpful`);
    return response.data;
  }
}

export default new ReviewService();

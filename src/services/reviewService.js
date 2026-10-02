import apiClient from '../lib/apiClient';

class ReviewService {
  async getProductReviews(
    productId,
    params
  ) {
    const response = await apiClient.get(`/products/${productId}/reviews`, { params });
    return response.data;
  }

  async getReviewStats(productId) {
    const response = await apiClient.get(`/products/${productId}/reviews/stats`);
    return response.data;
  }

  async createReview(productId, data) {
    const response = await apiClient.post(`/products/${productId}/reviews`, data);
    return response.data;
  }

  async markHelpful(reviewId) {
    const response = await apiClient.put(`/products/reviews/${reviewId}/helpful`);
    return response.data;
  }
}

export default new ReviewService();

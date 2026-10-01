import apiClient from '../lib/apiClient';

class ReviewService {
  async getProductReviews(
    productId,
    params?: { page?; limit?; sort?; rating? }
  ) {
    const response = await apiClient.get(`/products/${productId}/reviews`, { params });
    return response.data;
  }

  async getReviewStats(productId): Promise<ReviewStats & { success }> {
    const response = await apiClient.get(`/products/${productId}/reviews/stats`);
    return response.data;
  }

  async createReview(productId, data) { success; review}> {
    const response = await apiClient.post(`/products/${productId}/reviews`, data);
    return response.data;
  }

  async markHelpful(reviewId) { success; helpful }> {
    const response = await apiClient.put(`/products/reviews/${reviewId}/helpful`);
    return response.data;
  }
}

export default new ReviewService();

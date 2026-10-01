import apiClient from '../lib/apiClient';

// Types

// Wishlist Service
class WishlistService {
  /**
   * Get user's wishlist
   */
  async getWishlist() {
    const response = await apiClient.get('/wishlist');
    return response.data;
  }

  /**
   * Add item to wishlist
   */
  async addToWishlist(productId) {
    const response = await apiClient.post('/wishlist', { product: productId });
    return response.data;
  }

  /**
   * Remove item from wishlist
   */
  async removeFromWishlist(productId) {
    const response = await apiClient.delete(`/wishlist/${productId}`);
    return response.data;
  }
}

export default new WishlistService();

import apiClient from '../lib/apiClient';

// Types

// Cart Service
class CartService {
  /**
   * Get user's cart
   */
  async getCart() {
    const response = await apiClient.get('/cart');
    return response.data;
  }

  /**
   * Add item to cart
   */
  async addToCart(data) {
    const response = await apiClient.post('/cart', data);
    return response.data;
  }

  /**
   * Update cart item quantity
   */
  async updateCartItem(itemId, data) {
    const response = await apiClient.put(`/cart/${itemId}`, data);
    return response.data;
  }

  /**
   * Remove item from cart
   */
  async removeCartItem(itemId) {
    const response = await apiClient.delete(`/cart/${itemId}`);
    return response.data;
  }

  /**
   * Clear entire cart
   */
  async clearCart() {
    const response = await apiClient.delete('/cart');
    return response.data;
  }
}

export default new CartService();

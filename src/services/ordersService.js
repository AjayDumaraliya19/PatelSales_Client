import apiClient from '../lib/apiClient';

// Types

// Orders Service
class OrdersService {
  /**
   * Create new order
   */
  async createOrder(data) {
    const response = await apiClient.post('/orders', data);
    return response.data;
  }

  /**
   * Get user's orders
   */
  async getMyOrders() {
    const response = await apiClient.get('/orders/my-orders');
    return response.data;
  }

  /**
   * Get single order by ID
   */
  async getOrderById(id) {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  }

  /**
   * Cancel order
   */
  async cancelOrder(id) {
    const response = await apiClient.put(`/orders/${id}/cancel`);
    return response.data;
  }

  /**
   * Validate promo code
   */
  async validateCoupon(code, subtotal) {
    const response = await apiClient.post('/orders/validate-coupon', {
      code,
      subtotal,
    });
    return response.data;
  }

  /**
   * Get public shipping settings
   */
  async getShippingSettings() {
    const response = await apiClient.get('/settings/shipping');
    return response.data;
  }
}

export default new OrdersService();

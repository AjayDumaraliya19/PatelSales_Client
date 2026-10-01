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
   * Track order by order number and email (public)
   */
  async trackOrder(orderNumber, email) {
    const response = await apiClient.post('/orders/track', {
      orderNumber,
      email,
    });
    return response.data;
  }
}

export default new OrdersService();

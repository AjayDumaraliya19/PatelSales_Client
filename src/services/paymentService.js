import apiClient from '../lib/apiClient';

// Types

// Payment Service
class PaymentService {
  /**
   * Create payment intent for Stripe
   */
  async createPaymentIntent(data) {
    const response = await apiClient.post('/payment/create-intent', data);
    return response.data;
  }

  /**
   * Confirm payment after successful Stripe payment
   */
  async confirmPayment(data) {
    const response = await apiClient.post('/payment/confirm', data);
    return response.data;
  }
}

export default new PaymentService();

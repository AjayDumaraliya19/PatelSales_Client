import apiClient from '../lib/apiClient';

// Types
export interface CreatePaymentIntentData {
  orderId: string;
  amount: number;
  currency?: string;
}

export interface PaymentIntentResponse {
  success: boolean;
  clientSecret: string;
  paymentIntentId: string;
}

export interface ConfirmPaymentData {
  paymentIntentId: string;
  orderId: string;
}

export interface ConfirmPaymentResponse {
  success: boolean;
  message: string;
  order: any;
}

// Payment Service
class PaymentService {
  /**
   * Create payment intent for Stripe
   */
  async createPaymentIntent(data: CreatePaymentIntentData): Promise<PaymentIntentResponse> {
    const response = await apiClient.post<PaymentIntentResponse>('/payment/create-intent', data);
    return response.data;
  }

  /**
   * Confirm payment after successful Stripe payment
   */
  async confirmPayment(data: ConfirmPaymentData): Promise<ConfirmPaymentResponse> {
    const response = await apiClient.post<ConfirmPaymentResponse>('/payment/confirm', data);
    return response.data;
  }
}

export default new PaymentService();

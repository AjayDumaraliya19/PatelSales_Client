import apiClient from '../lib/apiClient';

// Types
export interface OrderItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: Record<string, any>;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export interface Order {
  _id: string;
  user: string | {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentId?: string;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  items: Array<{
    product: string;
    quantity: number;
    variant?: Record<string, any>;
  }>;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  notes?: string;
}

export interface OrdersResponse {
  success: boolean;
  count: number;
  orders: Order[];
}

export interface OrderResponse {
  success: boolean;
  order: Order;
}

// Orders Service
class OrdersService {
  /**
   * Create new order
   */
  async createOrder(data: CreateOrderData): Promise<OrderResponse> {
    const response = await apiClient.post<OrderResponse>('/orders', data);
    return response.data;
  }

  /**
   * Get user's orders
   */
  async getMyOrders(): Promise<OrdersResponse> {
    const response = await apiClient.get<OrdersResponse>('/orders/my-orders');
    return response.data;
  }

  /**
   * Get single order by ID
   */
  async getOrderById(id: string): Promise<OrderResponse> {
    const response = await apiClient.get<OrderResponse>(`/orders/${id}`);
    return response.data;
  }

  /**
   * Cancel order
   */
  async cancelOrder(id: string): Promise<OrderResponse> {
    const response = await apiClient.put<OrderResponse>(`/orders/${id}/cancel`);
    return response.data;
  }

  /**
   * Track order by order number and email (public)
   */
  async trackOrder(orderNumber: string, email: string): Promise<OrderResponse> {
    const response = await apiClient.post<OrderResponse>('/orders/track', {
      orderNumber,
      email,
    });
    return response.data;
  }
}

export default new OrdersService();

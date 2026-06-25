import apiClient from './apiClient';
import { mapOrder } from '../utils/mappers';
import type { Order, Address } from '../types';

export interface CreateOrderPayload {
  items: { product: string; quantity: number }[];
  shippingAddress: Address & { phone: string };
  paymentMethod: string;
  notes?: string;
}

export async function fetchMyOrders(): Promise<Order[]> {
  const response = await apiClient.get('/api/orders');
  return (response.data.orders || []).map(mapOrder);
}

export async function fetchOrderById(orderId: string): Promise<Order> {
  const response = await apiClient.get(`/api/orders/${orderId}`);
  return mapOrder(response.data.order);
}

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const response = await apiClient.post('/api/orders', payload);
  return mapOrder(response.data.order);
}

export async function cancelOrder(orderId: string): Promise<Order> {
  const response = await apiClient.put(`/api/orders/${orderId}`);
  return mapOrder(response.data.order);
}

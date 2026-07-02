import type { Address, OrderItem, OrderStatus, PaymentStatus } from './index';

export type TrackingStepState = 'completed' | 'current' | 'upcoming';

export interface TrackingStep {
  key: string;
  label: string;
  description: string;
  timestamp?: string;
  state: TrackingStepState;
}

export interface TrackedOrder {
  _id: string;
  orderNumber: string;
  trackingNumber: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  products: OrderItem[];
  totalAmount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  shippingAddress: Address;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  carrier: string;
  estimatedDeliveryDate: string;
  createdAt: string;
  updatedAt: string;
  timeline: TrackingStep[];
}

export interface TrackOrderResult {
  success: boolean;
  order?: TrackedOrder;
  message?: string;
}

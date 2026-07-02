import { mockTrackedOrders } from '../data/mockOrders';
import type { TrackOrderResult } from '../types/tracking';

const SIMULATED_DELAY_MS = 600;

function normalizeQuery(query: string): string {
  return query.trim().toUpperCase().replace(/\s+/g, '');
}

function findOrder(query: string) {
  const normalized = normalizeQuery(query);
  return mockTrackedOrders.find(
    (order) =>
      normalizeQuery(order.trackingNumber) === normalized ||
      normalizeQuery(order.orderNumber) === normalized ||
      order._id.toLowerCase() === query.trim().toLowerCase()
  );
}

export async function trackOrder(query: string): Promise<TrackOrderResult> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

  if (!query.trim()) {
    return { success: false, message: 'Please enter an order or tracking number.' };
  }

  const order = findOrder(query);
  if (!order) {
    return {
      success: false,
      message: 'No order found. Check your order number or tracking ID and try again.',
    };
  }

  return { success: true, order };
}

export async function getSampleTrackingNumber(): Promise<string> {
  return mockTrackedOrders[0].trackingNumber;
}

import { useState, useCallback } from 'react';
import ordersService, { Order, CreateOrderData, OrdersResponse } from '../services/ordersService';
import { useAuthStore } from '../store/authStore';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated } = useAuthStore();

  const createOrder = useCallback(
    async (data: CreateOrderData) => {
      setIsCreatingOrder(true);
      setError(null);

      try {
        const response = await ordersService.createOrder(data);
        setCurrentOrder(response.order);
        return { success: true, order: response.order };
      } catch (err: any) {
        setError(err.message || 'Failed to create order');
        return { success: false, error: err.message };
      } finally {
        setIsCreatingOrder(false);
      }
    },
    []
  );

  const fetchMyOrders = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await ordersService.getMyOrders();
      setOrders(response.orders);
      return response.orders;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch orders');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const fetchOrderById = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await ordersService.getOrderById(id);
        setCurrentOrder(response.order);
        return response.order;
      } catch (err: any) {
        setError(err.message || 'Failed to fetch order');
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const cancelOrder = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await ordersService.cancelOrder(id);
        setCurrentOrder(response.order);
        return { success: true, order: response.order };
      } catch (err: any) {
        setError(err.message || 'Failed to cancel order');
        return { success: false, error: err.message };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const trackOrder = useCallback(
    async (orderNumber: string, email: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await ordersService.trackOrder(orderNumber, email);
        return { success: true, order: response.order };
      } catch (err: any) {
        setError(err.message || 'Failed to track order');
        return { success: false, error: err.message };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    orders,
    currentOrder,
    isLoading,
    isCreatingOrder,
    error,
    isAuthenticated,
    createOrder,
    fetchMyOrders,
    fetchOrderById,
    cancelOrder,
    trackOrder,
  };
};

import { useState, useCallback } from 'react';
import { useCartStore } from '../store/cartStore';
import cartService, { AddToCartData, UpdateCartItemData } from '../services/cartService';
import { useAuthStore } from '../store/authStore';

export const useCart = () => {
  const {
    items,
    isOpen,
    isSyncing,
    lastSyncedAt,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    fetchCart,
    syncCart,
    toggleCart,
    openCart,
    closeCart,
    getSubtotal,
    getTax,
    getShipping,
    getTotal,
    getItemCount,
  } = useCartStore();

  const { isAuthenticated } = useAuthStore();
  const [error, setError] = useState(null);

  const handleAddToCart = useCallback(
    async (productId, quantity = 1) => {
      setError(null);
      try {
        await addItem({ _id: productId });
        return { success: true };
      } catch (err) {
        setError(err.message || 'Failed to add item to cart');
        return { success: false, error };
      }
    },
    [addItem]
  );

  const handleRemoveItem = useCallback(
    async (productId) => {
      setError(null);
      try {
        await removeItem(productId);
        return { success: true };
      } catch (err) {
        setError(err.message || 'Failed to remove item from cart');
        return { success: false, error };
      }
    },
    [removeItem]
  );

  const handleUpdateQuantity = useCallback(
    async (productId, quantity) => {
      setError(null);
      try {
        await updateQuantity(productId, quantity);
        return { success: true };
      } catch (err) {
        setError(err.message || 'Failed to update cart item');
        return { success: false, error };
      }
    },
    [updateQuantity]
  );

  const handleSyncCart = useCallback(async () => {
    setError(null);
    try {
      await syncCart();
      return { success: true };
    } catch (err) {
      setError(err.message || 'Failed to sync cart');
      return { success: false, error };
    }
  }, [syncCart]);

  return {
    items,
    isOpen,
    isSyncing,
    lastSyncedAt,
    error,
    isAuthenticated,
    subtotal: getSubtotal(),
    tax: getTax(),
    shipping: getShipping(),
    total: getTotal(),
    itemCount: getItemCount(),
    handleAddToCart,
    handleRemoveItem,
    handleUpdateQuantity,
    handleSyncCart,
    toggleCart,
    openCart,
    closeCart,
  };
};

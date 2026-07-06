import { useState, useCallback } from 'react';
import { useWishlistStore } from '../store/wishlistStore';

export const useWishlist = () => {
  const {
    items,
    isOpen,
    isSyncing,
    addItem,
    removeItem,
    clearWishlist,
    fetchWishlist,
    syncWishlist,
    toggleWishlist,
    openWishlist,
    closeWishlist,
    isInWishlist,
  } = useWishlistStore();

  const [error, setError] = useState<string | null>(null);

  const handleAddToWishlist = useCallback(
    async (productId: string) => {
      setError(null);
      try {
        await addItem(productId);
        return { success: true };
      } catch (err: any) {
        setError(err.message || 'Failed to add item to wishlist');
        return { success: false, error };
      }
    },
    [addItem]
  );

  const handleRemoveFromWishlist = useCallback(
    async (productId: string) => {
      setError(null);
      try {
        await removeItem(productId);
        return { success: true };
      } catch (err: any) {
        setError(err.message || 'Failed to remove item from wishlist');
        return { success: false, error };
      }
    },
    [removeItem]
  );

  const handleSyncWishlist = useCallback(async () => {
    setError(null);
    try {
      await syncWishlist();
      return { success: true };
    } catch (err: any) {
      setError(err.message || 'Failed to sync wishlist');
      return { success: false, error };
    }
  }, [syncWishlist]);

  return {
    items,
    isOpen,
    isSyncing,
    error,
    isInWishlist,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    handleSyncWishlist,
    toggleWishlist,
    openWishlist,
    closeWishlist,
  };
};

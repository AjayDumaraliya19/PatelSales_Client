import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import wishlistService from '../services/wishlistService';
import { useAuthStore } from './authStore';

export const useWishlistStore = create()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isSyncing: false,

      /**
       * Add item to wishlist
       */
      addItem: async (productId) => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;
        
        // Optimistic update
        set((state) => ({
          items: [...state.items, productId],
        }));

        // Sync with backend if authenticated
        if (isAuthenticated) {
          try {
            set({ isSyncing: true });
            await wishlistService.addToWishlist(productId);
            set({ isSyncing: false });
          } catch (error) {
            console.error('Failed to sync wishlist with backend:', error);
            set({ isSyncing: false });
          }
        }
      },

      /**
       * Remove item from wishlist
       */
      removeItem: async (productId) => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;
        
        // Optimistic update
        set((state) => ({
          items: state.items.filter((id) => id !== productId),
        }));

        // Sync with backend if authenticated
        if (isAuthenticated) {
          try {
            set({ isSyncing: true });
            await wishlistService.removeFromWishlist(productId);
            set({ isSyncing: false });
          } catch (error) {
            console.error('Failed to sync wishlist removal with backend:', error);
            set({ isSyncing: false });
          }
        }
      },

      /**
       * Clear wishlist
       */
      clearWishlist: async () => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;
        
        // Optimistic update
        set({ items: [] });

        // Sync with backend if authenticated
        if (isAuthenticated) {
          try {
            set({ isSyncing: true });
            // Clear endpoint would be /wishlist/clear if available
            // For now, we'll remove each item individually
            for (const item of get().items) {
              try {
                await wishlistService.removeFromWishlist(item);
              } catch (error) {
                console.error(`Failed to remove ${item}:`, error);
              }
            }
            set({ isSyncing: false });
          } catch (error) {
            console.error('Failed to clear wishlist on backend:', error);
            set({ isSyncing: false });
          }
        }
      },

      /**
       * Fetch wishlist from backend
       */
      fetchWishlist: async () => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;
        
        if (!isAuthenticated) {
          return;
        }

        try {
          set({ isSyncing: true });
          const response = await wishlistService.getWishlist();
          // Extract product IDs from wishlist items
          const productIds = response.wishlist.map((item) =>
            typeof item.product === 'string' ? item.product : item.product._id
          );
          set({ items: productIds, isSyncing: false });
        } catch (error) {
          console.error('Failed to fetch wishlist from backend:', error);
          set({ isSyncing: false });
        }
      },

      /**
       * Sync local wishlist to backend
       */
      syncWishlist: async () => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;
        
        if (!isAuthenticated) {
          return;
        }

        const localItems = get().items;
        
        if (localItems.length === 0) {
          await get().fetchWishlist();
          return;
        }

        try {
          set({ isSyncing: true });
          
          for (const productId of localItems) {
            try {
              await wishlistService.addToWishlist(productId);
            } catch (error) {
              console.error(`Failed to sync item ${productId}:`, error);
            }
          }

          await get().fetchWishlist();
          set({ isSyncing: false });
        } catch (error) {
          console.error('Failed to sync wishlist:', error);
          set({ isSyncing: false });
        }
      },

      // UI Actions
      toggleWishlist: () => set((state) => ({ isOpen: !state.isOpen })),
      openWishlist: () => set({ isOpen: true }),
      closeWishlist: () => set({ isOpen: false }),

      // Checkers
      isInWishlist: (productId) => {
        return get().items.includes(productId);
      },
    }),
    {
      name: 'patelsales-wishlist',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// Subscribe to auth changes to sync wishlist
useAuthStore.subscribe((state, prevState) => {
  const justLoggedIn = state.isAuthenticated && !prevState.isAuthenticated;
  const justLoggedOut = !state.isAuthenticated && prevState.isAuthenticated;

  if (justLoggedIn) {
    useWishlistStore.getState().syncWishlist();
  } else if (justLoggedOut) {
    useWishlistStore.getState().clearWishlist();
  }
});

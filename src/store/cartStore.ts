import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '../types';
import cartService from '../services/cartService';
import { useAuthStore } from './authStore';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  isSyncing: boolean;
  lastSyncedAt: number | null;
  
  // Actions
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
  syncCart: () => Promise<void>;
  
  // UI Actions
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Calculations
  getSubtotal: () => number;
  getTax: () => number;
  getShipping: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isSyncing: false,
      lastSyncedAt: null,

      /**
       * Add item to cart
       * - If authenticated: sync with backend
       * - If guest: store locally
       */
      addItem: async (product: Product, quantity = 1) => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;

        // Optimistic update
        set((state) => {
          const existing = state.items.find((i) => i.productId === product._id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product._id
                  ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
                  : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product._id,
                product,
                quantity: Math.min(quantity, product.stock),
              },
            ],
          };
        });

        // Sync with backend if authenticated
        if (isAuthenticated) {
          try {
            set({ isSyncing: true });
            await cartService.addToCart({
              product: product._id,
              quantity,
            });
            set({ lastSyncedAt: Date.now(), isSyncing: false });
          } catch (error) {
            console.error('Failed to sync cart with backend:', error);
            set({ isSyncing: false });
            // Keep optimistic update even if sync fails
          }
        }
      },

      /**
       * Remove item from cart
       */
      removeItem: async (productId: string) => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;
        const itemToRemove = get().items.find((i) => i.productId === productId);

        // Optimistic update
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));

        // Sync with backend if authenticated
        if (isAuthenticated && itemToRemove) {
          try {
            set({ isSyncing: true });
            // Find backend cart item ID
            const backendCart = await cartService.getCart();
            const backendItem = backendCart.cart.items.find(
              (i) => (typeof i.product === 'string' ? i.product : i.product._id) === productId
            );
            
            if (backendItem && backendItem._id) {
              await cartService.removeCartItem(backendItem._id);
            }
            set({ lastSyncedAt: Date.now(), isSyncing: false });
          } catch (error) {
            console.error('Failed to sync cart removal with backend:', error);
            set({ isSyncing: false });
          }
        }
      },

      /**
       * Update item quantity
       */
      updateQuantity: async (productId: string, quantity: number) => {
        if (quantity <= 0) {
          await get().removeItem(productId);
          return;
        }

        const isAuthenticated = useAuthStore.getState().isAuthenticated;

        // Optimistic update
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        }));

        // Sync with backend if authenticated
        if (isAuthenticated) {
          try {
            set({ isSyncing: true });
            // Find backend cart item ID
            const backendCart = await cartService.getCart();
            const backendItem = backendCart.cart.items.find(
              (i) => (typeof i.product === 'string' ? i.product : i.product._id) === productId
            );
            
            if (backendItem && backendItem._id) {
              await cartService.updateCartItem(backendItem._id, { quantity });
            }
            set({ lastSyncedAt: Date.now(), isSyncing: false });
          } catch (error) {
            console.error('Failed to sync cart update with backend:', error);
            set({ isSyncing: false });
          }
        }
      },

      /**
       * Clear cart
       */
      clearCart: async () => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;

        // Optimistic update
        set({ items: [] });

        // Sync with backend if authenticated
        if (isAuthenticated) {
          try {
            set({ isSyncing: true });
            await cartService.clearCart();
            set({ lastSyncedAt: Date.now(), isSyncing: false });
          } catch (error) {
            console.error('Failed to clear cart on backend:', error);
            set({ isSyncing: false });
          }
        }
      },

      /**
       * Fetch cart from backend
       * - Called on login or page load if authenticated
       */
      fetchCart: async () => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;
        
        if (!isAuthenticated) {
          return; // Guest user - keep local cart
        }

        try {
          set({ isSyncing: true });
          const response = await cartService.getCart();
          
          // Transform backend cart items to local format
          const items: CartItem[] = response.cart.items.map((item) => ({
            productId: typeof item.product === 'string' ? item.product : item.product._id,
            product: typeof item.product === 'string' 
              ? {
                  _id: item.product,
                  name: item.name,
                  images: [item.image],
                  price: item.price,
                  stock: 100, // Default stock, will be updated if needed
                  // Add other required Product fields with defaults
                } as Product
              : {
                  _id: item.product._id,
                  name: item.product.name,
                  images: item.product.images,
                  price: item.product.price,
                  stock: item.product.stock,
                  // Map other fields as needed
                } as Product,
            quantity: item.quantity,
          }));

          set({ items, lastSyncedAt: Date.now(), isSyncing: false });
        } catch (error) {
          console.error('Failed to fetch cart from backend:', error);
          set({ isSyncing: false });
        }
      },

      /**
       * Sync local cart to backend on login
       * - Fetches backend cart first
       * - Merges local (guest) items into it (local quantity wins on conflict)
       * - Pushes merged items to backend
       * - Updates local state with final merged cart
       */
      syncCart: async () => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;

        if (!isAuthenticated) {
          return;
        }

        const localItems = get().items;

        if (localItems.length === 0) {
          // No local items — just pull backend cart
          await get().fetchCart();
          return;
        }

        try {
          set({ isSyncing: true });

          // 1. Push every local (guest) item to backend.
          //    Backend merges quantities if the product already exists.
          for (const item of localItems) {
            try {
              await cartService.addToCart({
                product: item.productId,
                quantity: item.quantity,
              });
            } catch (err) {
              console.error(`Failed to sync item ${item.productId} to backend:`, err);
            }
          }

          // 2. Fetch the fully merged cart from the backend and update local state.
          await get().fetchCart();
          set({ lastSyncedAt: Date.now(), isSyncing: false });
        } catch (error) {
          console.error('Failed to sync cart on login:', error);
          // Keep local items intact if sync fails
          set({ isSyncing: false });
        }
      },

      // UI Actions
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      // Calculations
      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
      },

      getTax: () => {
        return get().getSubtotal() * 0.0662; // NJ sales tax 6.625%
      },

      getShipping: () => {
        // ── Shipping charge temporarily disabled ──
        // const subtotal = get().getSubtotal();
        // return subtotal >= 150 ? 0 : 12.99;
        return 0;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax() + get().getShipping();
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'patelsales-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// Subscribe to auth changes to sync cart
useAuthStore.subscribe((state, prevState) => {
  const justLoggedIn = state.isAuthenticated && !prevState.isAuthenticated;
  const justLoggedOut = !state.isAuthenticated && prevState.isAuthenticated;

  if (justLoggedIn) {
    // User just logged in - sync local cart to backend
    useCartStore.getState().syncCart();
  } else if (justLoggedOut) {
    // User logged out - clear cart (keep local for now)
    // You can choose to clear or keep local cart on logout
    // useCartStore.getState().clearCart();
  }
});

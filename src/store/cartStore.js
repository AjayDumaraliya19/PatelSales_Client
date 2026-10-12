import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import cartService from '../services/cartService';
import { useAuthStore } from './authStore';

export const useCartStore = create()(
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
      addItem: async (product, quantity = 1) => {
        if (!product) return;
        const productId = product._id || product.id;
        if (!productId) return;

        const qty = Number(quantity) > 0 ? Math.floor(Number(quantity)) : 1;
        const maxStock = typeof product.stock === 'number' && product.stock >= 0 ? product.stock : 9999;
        if (maxStock === 0) return;

        const isAuthenticated = useAuthStore.getState().isAuthenticated;

        // Optimistic update
        set((state) => {
          const existing = state.items.find((i) => i.productId === productId);
          if (existing) {
            const currentQty = Number(existing.quantity) || 0;
            const updatedQty = Math.min(currentQty + qty, maxStock);
            return {
              items: state.items.map((i) =>
                i.productId === productId
                  ? { ...i, quantity: updatedQty }
                  : i
              ),
            };
          }

          const initialQty = Math.min(qty, maxStock);
          const normalizedProduct = {
            ...product,
            _id: productId,
            price: typeof product.price === 'number'
              ? product.price
              : (typeof product.displayPrice === 'number' ? product.displayPrice : 0),
            stock: maxStock,
            images: Array.isArray(product.images) && product.images.length > 0
              ? product.images
              : (product.image ? [product.image] : ['/images/placeholder.png']),
            name: product.name || 'Product',
          };

          return {
            items: [
              ...state.items,
              {
                productId,
                product: normalizedProduct,
                quantity: initialQty,
              },
            ],
          };
        });

        // Sync with backend if authenticated
        if (isAuthenticated) {
          try {
            set({ isSyncing: true });
            await cartService.addToCart({
              product: productId,
              quantity: qty,
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
      removeItem: async (productId) => {
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
      updateQuantity: async (productId, quantity) => {
        const qty = Number(quantity);
        if (isNaN(qty) || qty <= 0) {
          await get().removeItem(productId);
          return;
        }

        const validQty = Math.floor(qty);
        const isAuthenticated = useAuthStore.getState().isAuthenticated;

        // Optimistic update
        set((state) => ({
          items: state.items.map((i) => {
            if (i.productId === productId) {
              const maxStock = typeof i.product?.stock === 'number' && i.product.stock >= 0 ? i.product.stock : 9999;
              return { ...i, quantity: Math.min(validQty, maxStock) };
            }
            return i;
          }),
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
              await cartService.updateCartItem(backendItem._id, { quantity: validQty });
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
          const items= response.cart.items.map((item) => ({
            productId: typeof item.product === 'string' ? item.product : item.product._id,
            product: typeof item.product === 'string' 
              ? {
                  _id: item.product,
                  name: item.name,
                  images: [item.image],
                  price: item.price,
                  stock: 100, // Default stock, will be updated if needed
                  // Add other required Product fields with defaults
                }
              : {
                  _id: item.product._id,
                  name: item.product.name,
                  images: item.product.images,
                  price: item.product.price,
                  stock: item.product.stock,
                  // Map other fields
                },
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
      /**
       * Reset local cart without deleting user's cart from backend
       * Called on logout so guest has an empty cart and items don't duplicate on next login
       */
      resetLocalCart: () => {
        set({ items: [], lastSyncedAt: null, isSyncing: false });
        try {
          localStorage.removeItem('patelsales-cart');
        } catch (e) {
          console.error('Failed to clear cart storage:', e);
        }
      },

      /**
       * Sync local cart to backend on login
       * - Prevents duplicate concurrent executions
       * - If local cart is empty: simply fetches user's backend cart
       * - If guest has local items: merges them smartly (avoiding quantity doubling)
       */
      syncCart: async () => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;

        if (!isAuthenticated) {
          return;
        }

        // Concurrency guard: avoid duplicate simultaneous syncs
        if (get().isSyncing) {
          return;
        }

        const localItems = get().items || [];

        if (localItems.length === 0) {
          // No guest items to merge — simply pull user's cart from backend
          await get().fetchCart();
          return;
        }

        try {
          set({ isSyncing: true });

          // Fetch current backend cart first to check for existing items
          let backendCart = null;
          try {
            const res = await cartService.getCart();
            backendCart = res?.cart;
          } catch (e) {
            backendCart = null;
          }

          const backendItems = backendCart?.items || [];

          for (const item of localItems) {
            const prodId = String(item.productId || item.product?._id);
            if (!prodId) continue;

            const existingInBackend = backendItems.find((bi) => {
              const biProdId = typeof bi.product === 'string' ? bi.product : bi.product?._id;
              return String(biProdId) === prodId;
            });

            if (existingInBackend) {
              // Item is already in the user's backend cart:
              // Update to max quantity instead of blindly adding (which doubled the count!)
              const localQty = Number(item.quantity) || 1;
              const backendQty = Number(existingInBackend.quantity) || 1;
              const targetQty = Math.max(localQty, backendQty);

              if (existingInBackend._id && targetQty !== backendQty) {
                try {
                  await cartService.updateCartItem(existingInBackend._id, { quantity: targetQty });
                } catch (err) {
                  console.error(`Failed to update item ${prodId}:`, err);
                }
              }
            } else {
              // New guest item not in backend cart — add it
              try {
                await cartService.addToCart({
                  product: prodId,
                  quantity: Number(item.quantity) || 1,
                });
              } catch (err) {
                console.error(`Failed to add guest item ${prodId} to backend:`, err);
              }
            }
          }

          // Fetch canonical updated cart from backend
          await get().fetchCart();
          set({ lastSyncedAt: Date.now(), isSyncing: false });
        } catch (error) {
          console.error('Failed to sync cart on login:', error);
          set({ isSyncing: false });
        }
      },

      // UI Actions
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      // Calculations
      getSubtotal: () => {
        return (get().items || []).reduce(
          (sum, item) => {
            const price = typeof item.product?.price === 'number'
              ? item.product.price
              : (typeof item.product?.displayPrice === 'number' ? item.product.displayPrice : 0);
            const qty = Number(item.quantity) || 0;
            return sum + (price * qty);
          },
          0
        );
      },

      getTax: () => {
        return get().getSubtotal() * 0.0662; // NJ sales tax 6.625%
      },

      getShipping: () => {
        return 0;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax() + get().getShipping();
      },

      getItemCount: () => {
        return (get().items || []).reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
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
    // User logged out - reset local cart so guest has clean cart and items don't duplicate on re-login
    useCartStore.getState().resetLocalCart();
  }
});

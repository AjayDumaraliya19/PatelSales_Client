import apiClient from '../lib/apiClient';

// Types
export interface CartItem {
  _id?: string;
  product: string | {
    _id: string;
    name: string;
    images: string[];
    price: number;
    stock: number;
  };
  name: string;
  image: string;
  quantity: number;
  variant?: Record<string, any>;
  price: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CartResponse {
  success: boolean;
  cart: Cart;
}

export interface AddToCartData {
  product: string;
  quantity: number;
  variant?: Record<string, any>;
}

export interface UpdateCartItemData {
  quantity: number;
}

// Cart Service
class CartService {
  /**
   * Get user's cart
   */
  async getCart(): Promise<CartResponse> {
    const response = await apiClient.get<CartResponse>('/cart');
    return response.data;
  }

  /**
   * Add item to cart
   */
  async addToCart(data: AddToCartData): Promise<CartResponse> {
    const response = await apiClient.post<CartResponse>('/cart', data);
    return response.data;
  }

  /**
   * Update cart item quantity
   */
  async updateCartItem(itemId: string, data: UpdateCartItemData): Promise<CartResponse> {
    const response = await apiClient.put<CartResponse>(`/cart/${itemId}`, data);
    return response.data;
  }

  /**
   * Remove item from cart
   */
  async removeCartItem(itemId: string): Promise<CartResponse> {
    const response = await apiClient.delete<CartResponse>(`/cart/${itemId}`);
    return response.data;
  }

  /**
   * Clear entire cart
   */
  async clearCart(): Promise<CartResponse> {
    const response = await apiClient.delete<CartResponse>('/cart');
    return response.data;
  }
}

export default new CartService();

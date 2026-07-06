import apiClient from '../lib/apiClient';

// Types
export interface WishlistItem {
  _id?: string;
  product: string | {
    _id: string;
    name: string;
    images: string[];
    price: number;
    stock: number;
  };
  productDetails?: {
    _id: string;
    name: string;
    images: string[];
    price: number;
    stock: number;
  };
  createdAt: string;
}

export interface WishlistResponse {
  success: boolean;
  wishlist: WishlistItem[];
}

// Wishlist Service
class WishlistService {
  /**
   * Get user's wishlist
   */
  async getWishlist(): Promise<WishlistResponse> {
    const response = await apiClient.get<WishlistResponse>('/wishlist');
    return response.data;
  }

  /**
   * Add item to wishlist
   */
  async addToWishlist(productId: string): Promise<WishlistResponse> {
    const response = await apiClient.post<WishlistResponse>('/wishlist', { product: productId });
    return response.data;
  }

  /**
   * Remove item from wishlist
   */
  async removeFromWishlist(productId: string): Promise<WishlistResponse> {
    const response = await apiClient.delete<WishlistResponse>(`/wishlist/${productId}`);
    return response.data;
  }
}

export default new WishlistService();

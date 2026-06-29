export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  createdAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  categoryName?: string;
  images: string[];
  stock: number;
  status: 'active' | 'inactive';
  sku?: string;
  caseSize?: string;
  isOnSale?: boolean;
  isNew?: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface Category {
  _id: string;
  name: string;
  image: string;
  productCount?: number;
  slug: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  userId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface Order {
  _id: string;
  userId: string;
  products: OrderItem[];
  totalAmount: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Address {
  _id?: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';

export const OrderStatus = {
  Pending: 'Pending' as const,
  Confirmed: 'Confirmed' as const,
  Packed: 'Packed' as const,
  Shipped: 'Shipped' as const,
  Delivered: 'Delivered' as const,
  Cancelled: 'Cancelled' as const,
};

export type PaymentStatus = 'Pending' | 'Paid' | 'Failed';

export const PaymentStatus = {
  Pending: 'Pending' as const,
  Paid: 'Paid' as const,
  Failed: 'Failed' as const,
};

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'name' | 'price_asc' | 'price_desc' | 'newest';
  search: string;
  page: number;
}

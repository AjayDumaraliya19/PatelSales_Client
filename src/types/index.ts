// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  addresses?: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

// Product Types
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  categoryId?: string;
  images: ProductImage[];
  sku: string;
  stock: number;
  lowStockThreshold: number;
  status: ProductStatus;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  url: string;
  alt?: string;
}

export enum ProductStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  OutOfStock = 'OutOfStock',
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

// Order Types
export interface Order {
  _id: string;
  orderNumber: string;
  user: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  product: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export enum PaymentStatus {
  Pending = 'pending',
  Paid = 'paid',
  Failed = 'failed',
  Refunded = 'refunded',
}

export enum OrderStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Packed = 'packed',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
}

// Category Types
export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Review Types
export interface Review {
  _id: string;
  user: string;
  product: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

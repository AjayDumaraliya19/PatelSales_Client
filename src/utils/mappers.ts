import type { Product, Category, Order, User, Address } from '../types';
import { ProductStatus, OrderStatus, PaymentStatus } from '../types';

interface ApiCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  lowStockThreshold: number;
  images: (string | { url: string })[];
  category: string | ApiCategory;
  isActive?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export function mapCategory(apiCategory: ApiCategory): Category {
  return {
    _id: apiCategory._id,
    name: apiCategory.name,
    slug: apiCategory.slug,
    description: apiCategory.description,
    image: apiCategory.image,
    createdAt: apiCategory.createdAt || '',
    updatedAt: apiCategory.updatedAt || '',
  };
}

export function mapProduct(apiProduct: ApiProduct): Product {
  const categoryName =
    typeof apiProduct.category === 'object' && apiProduct.category !== null
      ? apiProduct.category.name
      : String(apiProduct.category || '');

  let status = ProductStatus.Active;
  if (apiProduct.isActive === false) status = ProductStatus.Inactive;
  else if (apiProduct.stock === 0) status = ProductStatus.OutOfStock;

  return {
    _id: apiProduct._id,
    name: apiProduct.name,
    description: apiProduct.description,
    price: apiProduct.price,
    category: categoryName,
    categoryId:
      typeof apiProduct.category === 'object' && apiProduct.category !== null
        ? apiProduct.category._id
        : undefined,
    images: (apiProduct.images || []).map((img) =>
      typeof img === 'string' ? { url: img } : img
    ),
    sku: apiProduct.sku,
    stock: apiProduct.stock,
    lowStockThreshold: apiProduct.lowStockThreshold,
    status,
    isFeatured: apiProduct.isFeatured,
    createdAt: apiProduct.createdAt || '',
    updatedAt: apiProduct.updatedAt || '',
  };
}

export function mapOrder(apiOrder: Record<string, unknown>): Order {
  const status = String(apiOrder.status || 'pending');
  const paymentStatus = String(apiOrder.paymentStatus || 'pending');

  return {
    _id: String(apiOrder._id),
    orderNumber: String(apiOrder.orderNumber),
    user:
      typeof apiOrder.user === 'object' && apiOrder.user !== null
        ? String((apiOrder.user as { _id: string })._id)
        : String(apiOrder.user),
    items: ((apiOrder.items as Record<string, unknown>[]) || []).map((item) => ({
      product: String(item.product),
      name: String(item.name),
      quantity: Number(item.quantity),
      price: Number(item.price),
      image: item.image ? String(item.image) : undefined,
    })),
    shippingAddress: apiOrder.shippingAddress as Address,
    subtotal: Number(apiOrder.subtotal),
    tax: Number(apiOrder.tax),
    shipping: Number(apiOrder.shipping),
    total: Number(apiOrder.total),
    paymentMethod: String(apiOrder.paymentMethod || ''),
    paymentStatus: paymentStatus as PaymentStatus,
    orderStatus: status as OrderStatus,
    trackingNumber: apiOrder.trackingNumber ? String(apiOrder.trackingNumber) : undefined,
    createdAt: String(apiOrder.createdAt || ''),
    updatedAt: String(apiOrder.updatedAt || ''),
  };
}

export function mapUser(apiUser: Record<string, unknown>): User {
  return {
    _id: String(apiUser.id || apiUser._id),
    name: String(apiUser.name),
    email: String(apiUser.email),
    phone: apiUser.phone ? String(apiUser.phone) : undefined,
    addresses: (apiUser.addresses as Address[]) || [],
    createdAt: String(apiUser.createdAt || ''),
    updatedAt: String(apiUser.updatedAt || ''),
  };
}

export const orderStatusSteps = [
  { key: 'pending', label: 'Pending' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'packed', label: 'Packed' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
];

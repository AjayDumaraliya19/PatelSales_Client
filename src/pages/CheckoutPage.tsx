import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import Icon from '../components/ui/AppIcon';
import { useCartStore } from '../store/cartStore';
import { useOrders } from '../hooks/useOrders';
import { useAuthStore } from '../store/authStore';
import type { Order } from '../services/ordersService';

function generateOrderNumber() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `PS-${date}-${random}`;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getTax = useCartStore((s) => s.getTax);
  const getShipping = useCartStore((s) => s.getShipping);
  const getTotal = useCartStore((s) => s.getTotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const { createOrder, isCreatingOrder, error } = useOrders();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <Icon name="ShoppingCartIcon" size={48} className="text-gray-300 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-sm text-gray-600 mb-6">Add products before proceeding to checkout.</p>
        <Link to="/products" className="btn-primary min-h-[44px] inline-flex">
          Shop Products
        </Link>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white border border-red-200 rounded-lg p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="ExclamationTriangleIcon" size={32} className="text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Login Required</h1>
          <p className="text-sm text-gray-600 mb-6">
            Please log in to place an order. Your cart items will be preserved after login.
          </p>
          <Link to="/login" className="btn-primary min-h-[44px] inline-flex">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    // Get form data
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const fullName = formData.get('fullName') as string;
    const company = formData.get('company') as string;
    const street = formData.get('street') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const zip = formData.get('zip') as string;
    const cardNumber = formData.get('cardNumber') as string;

    if (!email || !phone || !fullName || !street || !city || !state || !zip) {
      setFormError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // Build order items
    const orderItems = items.map((item) => ({
      product: item.productId,
      name: item.product.name,
      image: item.product.images?.[0] || '',
      price: item.product.price,
      quantity: item.quantity,
    }));

    // Build shipping address
    const shippingAddress: Order['shippingAddress'] = {
      street,
      city,
      state,
      zip,
      country: 'US',
      phone,
    };

    // Build order data
    const orderData = {
      items: orderItems,
      shippingAddress,
      paymentMethod: 'card',
      notes: company ? `Business: ${company}` : '',
    };

    try {
      const result = await createOrder(orderData);
      if (result.success) {
        clearCart();
        navigate('/order-confirmation', { state: { order: result.order } });
      } else {
        setFormError(result.error || 'Failed to create order. Please try again.');
      }
    } catch (err) {
      setFormError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-full bg-[var(--background)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-5 pb-10 sm:pt-8">
        <PageHeader
          title="Checkout"
          breadcrumbs={[
            { label: 'Patel Sales', href: '/' },
            { label: 'Cart', href: '/cart' },
            { label: 'Checkout' },
          ]}
        />

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {formError && (
            <div className="lg:col-span-5 bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 text-sm font-medium">{formError}</p>
            </div>
          )}
          <div className="lg:col-span-3 space-y-4">
            <section className="app-card p-5 sm:p-6">
              <h2 className="text-sm font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkout-email" className="app-label mb-1.5 block">Email *</label>
                  <input id="checkout-email" name="email" type="email" required className="input-field w-full min-h-[44px]" />
                </div>
                <div>
                  <label htmlFor="checkout-phone" className="app-label mb-1.5 block">Phone *</label>
                  <input id="checkout-phone" name="phone" type="tel" required className="input-field w-full min-h-[44px]" />
                </div>
              </div>
            </section>

            <section className="app-card p-5 sm:p-6">
              <h2 className="text-sm font-bold text-gray-900 mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="checkout-name" className="app-label mb-1.5 block">Full Name *</label>
                  <input id="checkout-name" name="fullName" type="text" required className="input-field w-full min-h-[44px]" />
                </div>
                <div>
                  <label htmlFor="checkout-company" className="app-label mb-1.5 block">Business Name</label>
                  <input id="checkout-company" name="company" type="text" className="input-field w-full min-h-[44px]" />
                </div>
                <div>
                  <label htmlFor="checkout-street" className="app-label mb-1.5 block">Street Address *</label>
                  <input id="checkout-street" name="street" type="text" required className="input-field w-full min-h-[44px]" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="checkout-city" className="app-label mb-1.5 block">City *</label>
                    <input id="checkout-city" name="city" type="text" required className="input-field w-full min-h-[44px]" />
                  </div>
                  <div>
                    <label htmlFor="checkout-state" className="app-label mb-1.5 block">State *</label>
                    <input id="checkout-state" name="state" type="text" required defaultValue="NJ" className="input-field w-full min-h-[44px]" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="checkout-zip" className="app-label mb-1.5 block">ZIP *</label>
                    <input id="checkout-zip" name="zip" type="text" required className="input-field w-full min-h-[44px]" />
                  </div>
                </div>
              </div>
            </section>

            <section className="app-card p-5 sm:p-6">
              <h2 className="text-sm font-bold text-gray-900 mb-4">Payment</h2>
              <p className="text-sm text-gray-600 mb-3">
                Demo checkout — no real payment is processed. Business accounts may use net-30 terms.
              </p>
              <input
                name="cardNumber"
                type="text"
                placeholder="Card number (demo)"
                className="input-field w-full min-h-[44px]"
                defaultValue="4111 1111 1111 1111"
                readOnly
              />
            </section>
          </div>

          <div className="lg:col-span-2">
            <div className="app-card p-5 sm:p-6 sticky top-24">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>
              <ul className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.productId} className="flex justify-between gap-2 text-sm">
                    <span className="text-gray-600 line-clamp-1">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-medium shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="space-y-2 border-t border-gray-100 pt-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${getTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{getShipping() === 0 ? 'FREE' : `$${getShipping().toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-[var(--secondary)]">${getTotal().toFixed(2)}</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting || isCreatingOrder}
                className="btn-primary w-full justify-center mt-4 min-h-[44px] disabled:opacity-70"
              >
                {isSubmitting || isCreatingOrder ? 'Placing Order...' : 'Place Order'}
              </button>
              <p className="text-xs text-gray-500 mt-3 text-center">
                By placing your order, you agree to our{' '}
                <Link to="/terms-of-service" className="text-[var(--secondary)] hover:underline">
                  Terms of Service
                </Link>
                .
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

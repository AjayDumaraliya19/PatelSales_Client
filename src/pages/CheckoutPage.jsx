import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import PageHeader from '../components/ui/PageHeader';
import Icon from '../components/ui/AppIcon';
import PaymentForm from '../components/checkout/PaymentForm';
import { useCartStore } from '../store/cartStore';
import { useOrders } from '../hooks/useOrders';
import { useAuthStore } from '../store/authStore';
import { getStripe, isStripeConfigured } from '../lib/stripe';
import ordersService from '../services/ordersService';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getTax = useCartStore((s) => s.getTax);
  const clearCart = useCartStore((s) => s.clearCart);
  const { createOrder, isCreatingOrder } = useOrders();

  const [deliveryType, setDeliveryType] = useState('delivery'); // 'delivery' | 'pickup'
  const [shippingSettings, setShippingSettings] = useState({ flatRate: 0, firstTimeFreeDelivery: false });

  // Promo code state
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState(null);
  const [promoSuccess, setPromoSuccess] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [createdOrderId, setCreatedOrderId] = useState(null);
  const [stripePromise, setStripePromise] = useState(null);
  const [paymentStep, setPaymentStep] = useState(false);

  // Fetch store shipping settings from Admin configuration
  useEffect(() => {
    let isMounted = true;
    ordersService.getShippingSettings()
      .then((res) => {
        if (isMounted && res?.shipping) {
          setShippingSettings(res.shipping);
        }
      })
      .catch((err) => {
        console.error('Failed to load shipping settings:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const subtotal = getSubtotal();
  const tax = getTax();
  const deliveryFee = deliveryType === 'pickup' ? 0 : Number(shippingSettings.flatRate || 0);
  const discountAmount = appliedPromo ? (appliedPromo.discount || 0) : 0;
  const finalTotal = Math.max(0, Math.round((subtotal + tax + deliveryFee - discountAmount) * 100) / 100);

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

  const handleApplyPromo = async () => {
    if (!promoCodeInput.trim()) return;
    setPromoLoading(true);
    setPromoError(null);
    setPromoSuccess(null);

    try {
      const response = await ordersService.validateCoupon(promoCodeInput.trim().toUpperCase(), subtotal);
      if (response.success && response.coupon) {
        setAppliedPromo(response.coupon);
        setPromoSuccess(`Promo code "${response.coupon.code}" applied! You saved $${Number(response.coupon.discount).toFixed(2)}.`);
      } else {
        setPromoError(response.message || 'Invalid promo code');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to apply promo code';
      setPromoError(msg);
    } finally {
      setPromoLoading(false);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoSuccess(null);
    setPromoError(null);
    setPromoCodeInput('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const phone = formData.get('phone');
    const fullName = formData.get('fullName');
    const company = formData.get('company');
    const street = formData.get('street');
    const city = formData.get('city');
    const state = formData.get('state');
    const zip = formData.get('zip');

    if (!email || !phone || !fullName) {
      setFormError('Please fill in your name, email, and phone number');
      setIsSubmitting(false);
      return;
    }

    if (deliveryType === 'delivery' && (!street || !city || !state || !zip)) {
      setFormError('Please fill in your complete delivery address');
      setIsSubmitting(false);
      return;
    }

    const orderItems = items.map((item) => ({
      product: item.productId,
      name: item.product.name,
      image: item.product.images?.[0] || '',
      price: item.product.price,
      quantity: item.quantity,
    }));

    const shippingAddress = deliveryType === 'pickup'
      ? {
        street: 'Store Pickup - 123 E-Commerce St',
        city: 'Patel Sales Store',
        state: 'NJ',
        zipCode: '07001',
        country: 'US',
        phone,
      }
      : {
        street,
        city,
        state,
        zipCode: zip,
        country: 'US',
        phone,
      };

    const orderData = {
      items: orderItems,
      shippingAddress,
      paymentMethod: 'card',
      deliveryType,
      couponCode: appliedPromo?.code || undefined,
      notes: company ? `Business: ${company}` : '',
    };

    try {
      const result = await createOrder(orderData);
      if (result.success && result.order) {
        setCreatedOrderId(result.order._id);
        if (isStripeConfigured()) {
          const stripe = await getStripe();
          if (stripe) {
            setStripePromise(Promise.resolve(stripe));
            setPaymentStep(true);
          } else {
            clearCart();
            navigate('/order-confirmation', { state: { order: result.order } });
          }
        } else {
          clearCart();
          navigate('/order-confirmation', { state: { order: result.order } });
        }
      } else {
        setFormError(result.error || 'Failed to create order. Please try again.');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'An error occurred. Please try again.';
      setFormError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = (paymentIntentId) => {
    clearCart();
    navigate('/order-confirmation', { state: { paymentIntentId } });
  };

  const handlePaymentError = (error) => {
    setFormError(error);
    setPaymentStep(false);
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
            <div className="lg:col-span-5 bg-red-50 border border-red-200 rounded-lg p-4 mb-2">
              <p className="text-red-700 text-sm font-medium">{formError}</p>
            </div>
          )}

          <div className="lg:col-span-3 space-y-4">
            {/* Fulfillment Selection: Delivery vs Store Pickup */}
            <section className="app-card p-5 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-gray-900">Choose Delivery or Store Pickup</h2>
                <span className="text-xs text-gray-500">Select preferred option</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Standard Delivery Option */}
                <div
                  onClick={() => setDeliveryType('delivery')}
                  className={`cursor-pointer rounded-xl border p-4 transition-all ${deliveryType === 'delivery'
                    ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${deliveryType === 'delivery' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                        <Icon name="TruckIcon" size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Standard Delivery</p>
                        <p className="text-xs text-gray-500 mt-0.5">Delivered to your address</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${deliveryFee === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                      {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                {/* Store Pickup Option */}
                <div
                  onClick={() => setDeliveryType('pickup')}
                  className={`cursor-pointer rounded-xl border p-4 transition-all ${deliveryType === 'pickup'
                    ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${deliveryType === 'pickup' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                        <Icon name="BuildingStorefrontIcon" size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Store Pickup</p>
                        <p className="text-xs text-gray-500 mt-0.5">Pick up directly at store</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      FREE
                    </span>
                  </div>
                </div>
              </div>

              {deliveryType === 'pickup' && (
                <div className="mt-4 p-3.5 bg-emerald-50/70 border border-emerald-200/60 rounded-xl text-xs text-emerald-950 flex items-start gap-2.5">
                  <Icon name="MapPinIcon" size={18} className="text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-emerald-900">Store Pickup Location:</p>
                    <p className="text-emerald-800 mt-0.5">Patel Sales LLC · 123 E-Commerce St, City, NJ 07001</p>
                    <p className="text-emerald-700 mt-1 font-medium">Orders are usually prepared and ready for pickup within 2 hours.</p>
                  </div>
                </div>
              )}
            </section>

            {/* Contact Information */}
            <section className="app-card p-5 sm:p-6">
              <h2 className="text-sm font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="checkout-name" className="app-label mb-1.5 block">Full Name *</label>
                  <input
                    id="checkout-name"
                    name="fullName"
                    type="text"
                    required
                    defaultValue={user?.name || ''}
                    className="input-field w-full min-h-[44px]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkout-email" className="app-label mb-1.5 block">Email Address *</label>
                    <input
                      id="checkout-email"
                      name="email"
                      type="email"
                      required
                      defaultValue={user?.email || ''}
                      className="input-field w-full min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-phone" className="app-label mb-1.5 block">Phone Number *</label>
                    <input
                      id="checkout-phone"
                      name="phone"
                      type="tel"
                      required
                      defaultValue={user?.phone || ''}
                      className="input-field w-full min-h-[44px]"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="checkout-company" className="app-label mb-1.5 block">Business / Store Name (Optional)</label>
                  <input
                    id="checkout-company"
                    name="company"
                    type="text"
                    className="input-field w-full min-h-[44px]"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Address (Only needed when Delivery is selected) */}
            {deliveryType === 'delivery' && (
              <section className="app-card p-5 sm:p-6">
                <h2 className="text-sm font-bold text-gray-900 mb-4">Delivery Address</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="checkout-street" className="app-label mb-1.5 block">Street Address *</label>
                    <input
                      id="checkout-street"
                      name="street"
                      type="text"
                      required={deliveryType === 'delivery'}
                      placeholder="123 Main St, Apt 4B"
                      className="input-field w-full min-h-[44px]"
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="checkout-city" className="app-label mb-1.5 block">City *</label>
                      <input
                        id="checkout-city"
                        name="city"
                        type="text"
                        required={deliveryType === 'delivery'}
                        className="input-field w-full min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label htmlFor="checkout-state" className="app-label mb-1.5 block">State *</label>
                      <input
                        id="checkout-state"
                        name="state"
                        type="text"
                        required={deliveryType === 'delivery'}
                        defaultValue="NJ"
                        className="input-field w-full min-h-[44px]"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="checkout-zip" className="app-label mb-1.5 block">ZIP Code *</label>
                      <input
                        id="checkout-zip"
                        name="zip"
                        type="text"
                        required={deliveryType === 'delivery'}
                        className="input-field w-full min-h-[44px]"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Payment Section */}
            <section className="app-card p-5 sm:p-6">
              <h2 className="text-sm font-bold text-gray-900 mb-4">Payment Method</h2>
              {paymentStep && createdOrderId ? (
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    Complete your payment to finalize the order.
                  </p>
                  {stripePromise && (
                    <Elements stripe={stripePromise}>
                      <PaymentForm
                        orderId={createdOrderId}
                        amount={finalTotal}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                        onBack={() => setPaymentStep(false)}
                      />
                    </Elements>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    {isStripeConfigured()
                      ? 'Secure card payment powered by Stripe. Your card will be charged after confirming.'
                      : 'Demo checkout — no real payment is processed.'}
                  </p>
                  <input
                    name="cardNumber"
                    type="text"
                    placeholder="Card number (demo)"
                    className="input-field w-full min-h-[44px]"
                    defaultValue="4111 1111 1111 1111"
                    readOnly
                  />
                </div>
              )}
            </section>
          </div>

          {/* Right Sidebar: Order Summary & Promo Code */}
          <div className="lg:col-span-2">
            <div className="app-card p-5 sm:p-6 sticky top-48 space-y-4">
              <h2 className="font-bold text-lg text-gray-900">Order Summary</h2>

              <ul className="space-y-3 max-h-48 overflow-y-auto divide-y divide-gray-50 pr-1">
                {items.map((item) => (
                  <li key={item.productId} className="flex justify-between gap-2 text-sm pt-2 first:pt-0">
                    <span className="text-gray-600 line-clamp-1">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-medium shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Promo Code Box */}
              <div className="pt-3 border-t border-gray-100">
                <label htmlFor="checkout-promo" className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Have a Promo Code?
                </label>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                      <Icon name="TagIcon" size={16} className="text-emerald-600 shrink-0" />
                      <span>
                        <strong>{appliedPromo.code}</strong> applied ({appliedPromo.discountType === 'percentage' ? `${appliedPromo.discountValue}% OFF` : `$${appliedPromo.discountValue} OFF`})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="text-red-600 hover:text-red-800 font-semibold text-xs ml-2 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        id="checkout-promo"
                        type="text"
                        value={promoCodeInput}
                        onChange={(e) => {
                          setPromoCodeInput(e.target.value.toUpperCase());
                          setPromoError(null);
                        }}
                        placeholder="e.g. WELCOME10"
                        className="input-field flex-1 text-xs uppercase"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        disabled={!promoCodeInput.trim() || promoLoading}
                        className="btn-secondary text-xs px-3.5 py-2 shrink-0 disabled:opacity-50"
                      >
                        {promoLoading ? 'Checking...' : 'Apply'}
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-xs text-red-600 mt-1.5 font-medium">{promoError}</p>
                    )}
                    {promoSuccess && (
                      <p className="text-xs text-emerald-600 mt-1.5 font-medium">{promoSuccess}</p>
                    )}
                    <p className="text-[11px] text-gray-500 mt-1">
                      First order? Use code <strong className="text-emerald-700 font-semibold">WELCOME10</strong> for 10% off!
                    </p>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 border-t border-gray-100 pt-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (NJ Sales Tax)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {deliveryType === 'pickup' ? 'Store Pickup' : 'Delivery Fee'}
                  </span>
                  <span className={deliveryFee === 0 ? 'text-emerald-600 font-semibold' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between font-bold text-base pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-[var(--secondary)]">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isCreatingOrder || paymentStep}
                className="btn-primary w-full justify-center mt-2 min-h-[44px] disabled:opacity-70"
              >
                {isSubmitting || isCreatingOrder ? 'Placing Order...' : 'Place Order'}
              </button>

              {paymentStep && (
                <p className="text-xs text-amber-600 mt-2 text-center">
                  Complete the payment form above to finalize your order.
                </p>
              )}

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

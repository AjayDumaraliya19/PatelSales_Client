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
import userService from '../services/userService';

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

  // Address management state for logged-in user
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState('new');
  const [saveAddressToProfile, setSaveAddressToProfile] = useState(true);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [addressSuccessMessage, setAddressSuccessMessage] = useState(null);

  // Form input states
  const [contactInfo, setContactInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: '',
  });

  const [newAddress, setNewAddress] = useState({
    title: 'Home',
    street: '',
    city: '',
    state: 'NJ',
    zip: '',
    phone: user?.phone || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [createdOrderId, setCreatedOrderId] = useState(null);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [stripePromise, setStripePromise] = useState(null);
  const [paymentStep, setPaymentStep] = useState(false);

  // Update contact info when user profile loads
  useEffect(() => {
    if (user) {
      setContactInfo((prev) => ({
        fullName: prev.fullName || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
        company: prev.company || '',
      }));
      setNewAddress((prev) => ({
        ...prev,
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [user]);

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

  // Fetch user's saved addresses
  const loadAddresses = async () => {
    if (!isAuthenticated) return;
    setIsLoadingAddresses(true);
    try {
      const res = await userService.getAddresses();
      if (res?.success && Array.isArray(res.addresses)) {
        setSavedAddresses(res.addresses);
        if (res.addresses.length > 0) {
          const defaultAddr = res.addresses.find((a) => a.isDefault) || res.addresses[0];
          setSelectedAddressId(defaultAddr._id);
        } else {
          setSelectedAddressId('new');
        }
      } else {
        setSelectedAddressId('new');
      }
    } catch (err) {
      console.error('Failed to load user addresses:', err);
      setSelectedAddressId('new');
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, [isAuthenticated]);

  const subtotal = getSubtotal();
  const tax = getTax();
  const deliveryFee = deliveryType === 'pickup' ? 0 : Number(shippingSettings.flatRate || 0);
  const discountAmount = appliedPromo ? (appliedPromo.discount || 0) : 0;
  const finalTotal = Math.max(0, Math.round((subtotal + tax + deliveryFee - discountAmount) * 100) / 100);

  // Check whether all required details are filled
  const isContactFilled = Boolean(
    contactInfo.fullName.trim() &&
    contactInfo.email.trim() &&
    contactInfo.phone.trim()
  );

  const isAddressFilled = deliveryType === 'pickup' || (
    selectedAddressId !== 'new'
      ? Boolean(savedAddresses.find((a) => a._id === selectedAddressId))
      : Boolean(
          newAddress.street.trim() &&
          newAddress.city.trim() &&
          newAddress.state.trim() &&
          newAddress.zip.trim()
        )
  );

  const isAllDetailsFilled = isContactFilled && isAddressFilled;

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

  const handleNewAddressChange = (field, value) => {
    setNewAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleSetDefaultAddress = async (addressId) => {
    try {
      const res = await userService.updateAddress(addressId, { address: { isDefault: true } });
      if (res?.success) {
        setSavedAddresses(res.addresses);
        setAddressSuccessMessage('Default delivery address updated');
        setTimeout(() => setAddressSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error('Failed to set default address:', err);
    }
  };

  const handleDeleteAddress = async (addressId, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this saved address?')) return;
    try {
      const res = await userService.deleteAddress(addressId);
      if (res?.success) {
        const remaining = savedAddresses.filter((a) => a._id !== addressId);
        setSavedAddresses(remaining);
        if (selectedAddressId === addressId) {
          if (remaining.length > 0) {
            const def = remaining.find((a) => a.isDefault) || remaining[0];
            setSelectedAddressId(def._id);
          } else {
            setSelectedAddressId('new');
          }
        }
      }
    } catch (err) {
      console.error('Failed to delete address:', err);
    }
  };

  const handleQuickSaveAddress = async () => {
    if (!newAddress.street.trim() || !newAddress.city.trim() || !newAddress.state.trim() || !newAddress.zip.trim()) {
      setFormError('Please enter street, city, state, and zip code to save this address');
      return;
    }
    setIsSavingAddress(true);
    setFormError(null);
    try {
      const res = await userService.addAddress({
        address: {
          title: newAddress.title || 'Delivery',
          name: contactInfo.fullName || user?.name || '',
          street: newAddress.street.trim(),
          city: newAddress.city.trim(),
          state: newAddress.state.trim(),
          zipCode: newAddress.zip.trim(),
          zip: newAddress.zip.trim(),
          country: 'US',
          phone: newAddress.phone.trim() || contactInfo.phone || user?.phone || '',
          isDefault: savedAddresses.length === 0,
        },
      });
      if (res?.success && Array.isArray(res.addresses)) {
        setSavedAddresses(res.addresses);
        const newlyAdded = res.addresses[res.addresses.length - 1];
        if (newlyAdded?._id) {
          setSelectedAddressId(newlyAdded._id);
        }
        setAddressSuccessMessage('Address successfully saved to your profile!');
        setTimeout(() => setAddressSuccessMessage(null), 4000);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to save address';
      setFormError(msg);
    } finally {
      setIsSavingAddress(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    const email = contactInfo.email.trim();
    const phone = contactInfo.phone.trim();
    const fullName = contactInfo.fullName.trim();
    const company = contactInfo.company.trim();

    if (!email || !phone || !fullName) {
      setFormError('Please fill in your name, email, and phone number');
      setIsSubmitting(false);
      return;
    }

    let finalStreet = '';
    let finalCity = '';
    let finalState = '';
    let finalZip = '';
    let finalPhone = phone;

    if (deliveryType === 'delivery') {
      if (selectedAddressId !== 'new') {
        const chosen = savedAddresses.find((a) => a._id === selectedAddressId);
        if (!chosen) {
          setFormError('Please select a valid delivery address or enter a new one');
          setIsSubmitting(false);
          return;
        }
        finalStreet = chosen.street;
        finalCity = chosen.city;
        finalState = chosen.state;
        finalZip = chosen.zipCode || chosen.zip;
        finalPhone = chosen.phone || phone;
      } else {
        finalStreet = newAddress.street.trim();
        finalCity = newAddress.city.trim();
        finalState = newAddress.state.trim();
        finalZip = newAddress.zip.trim();
        finalPhone = newAddress.phone.trim() || phone;

        if (!finalStreet || !finalCity || !finalState || !finalZip) {
          setFormError('Please fill in your complete delivery address (Street, City, State, ZIP Code)');
          setIsSubmitting(false);
          return;
        }

        // Auto-save address to user's profile if checkbox is checked
        if (saveAddressToProfile && isAuthenticated) {
          userService.addAddress({
            address: {
              title: newAddress.title || 'Delivery',
              name: fullName,
              street: finalStreet,
              city: finalCity,
              state: finalState,
              zipCode: finalZip,
              zip: finalZip,
              country: 'US',
              phone: finalPhone,
              isDefault: savedAddresses.length === 0,
            },
          }).then((res) => {
            if (res?.success && Array.isArray(res.addresses)) {
              setSavedAddresses(res.addresses);
            }
          }).catch((err) => {
            console.warn('Could not auto-save address in background:', err);
          });
        }
      }
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
        phone: finalPhone || phone,
      }
      : {
        street: finalStreet,
        city: finalCity,
        state: finalState,
        zipCode: finalZip,
        country: 'US',
        phone: finalPhone || phone,
      };

    // Note: Strictly 'card' payment method
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
        setCreatedOrder(result.order);
        if (isStripeConfigured()) {
          const stripe = await getStripe();
          if (stripe) {
            setStripePromise(Promise.resolve(stripe));
            setPaymentStep(true);
            const paySec = document.getElementById('payment-section');
            if (paySec) {
              paySec.scrollIntoView({ behavior: 'smooth' });
            }
          } else {
            clearCart();
            try {
              sessionStorage.setItem('lastOrder', JSON.stringify(result.order));
            } catch (e) {
              console.error('Session storage error:', e);
            }
            navigate('/order-confirmation', { state: { order: result.order } });
          }
        } else {
          clearCart();
          try {
            sessionStorage.setItem('lastOrder', JSON.stringify(result.order));
          } catch (e) {
            console.error('Session storage error:', e);
          }
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

  const handlePaymentSuccess = (confirmedOrder, paymentIntentId) => {
    clearCart();
    const finalOrder = confirmedOrder || createdOrder;
    if (finalOrder) {
      try {
        sessionStorage.setItem('lastOrder', JSON.stringify(finalOrder));
      } catch (e) {
        console.error('Session storage error:', e);
      }
    }
    navigate('/order-confirmation', {
      state: {
        order: finalOrder,
        paymentIntentId,
      },
    });
  };

  const handlePaymentError = (error) => {
    setFormError(error);
    // Keep user on card payment form so they can fix card details easily
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
            <div className="lg:col-span-5 bg-red-50 border border-red-200 rounded-lg p-4 mb-2 flex items-start gap-2.5">
              <Icon name="ExclamationTriangleIcon" size={18} className="text-red-600 shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm font-medium">{formError}</p>
            </div>
          )}

          <div className="lg:col-span-3 space-y-4">
            {/* Step 1 Indicator */}
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px]">1</span>
                Contact & Delivery Information
              </span>
              {isAllDetailsFilled && (
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <Icon name="CheckCircleIcon" size={14} className="text-emerald-600" />
                  Details Complete
                </span>
              )}
            </div>

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
                    value={contactInfo.fullName}
                    onChange={(e) => setContactInfo((prev) => ({ ...prev, fullName: e.target.value }))}
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
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo((prev) => ({ ...prev, email: e.target.value }))}
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
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo((prev) => ({ ...prev, phone: e.target.value }))}
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
                    value={contactInfo.company}
                    onChange={(e) => setContactInfo((prev) => ({ ...prev, company: e.target.value }))}
                    className="input-field w-full min-h-[44px]"
                  />
                </div>
              </div>
            </section>

            {/* Delivery Address Section (Only needed when Delivery is selected) */}
            {deliveryType === 'delivery' && (
              <section className="app-card p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                      <Icon name="MapPinIcon" size={18} />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-gray-900">Delivery Address</h2>
                      <p className="text-xs text-gray-500">
                        {savedAddresses.length > 0
                          ? 'Select your saved address or enter a new one'
                          : 'Enter your destination address'}
                      </p>
                    </div>
                  </div>

                  {savedAddresses.length > 0 && selectedAddressId !== 'new' && (
                    <button
                      type="button"
                      onClick={() => setSelectedAddressId('new')}
                      className="text-xs font-semibold text-[var(--secondary)] hover:underline flex items-center gap-1"
                    >
                      <Icon name="PlusIcon" size={14} />
                      Add New Address
                    </button>
                  )}
                  {savedAddresses.length > 0 && selectedAddressId === 'new' && (
                    <button
                      type="button"
                      onClick={() => {
                        const defaultAddr = savedAddresses.find((a) => a.isDefault) || savedAddresses[0];
                        setSelectedAddressId(defaultAddr._id);
                      }}
                      className="text-xs font-semibold text-[var(--secondary)] hover:underline flex items-center gap-1"
                    >
                      <Icon name="ArrowLeftIcon" size={14} />
                      Back to Saved Addresses
                    </button>
                  )}
                </div>

                {addressSuccessMessage && (
                  <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2 font-medium">
                    <Icon name="CheckCircleIcon" size={16} className="text-emerald-600 shrink-0" />
                    <span>{addressSuccessMessage}</span>
                  </div>
                )}

                {isLoadingAddresses ? (
                  <div className="py-6 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                    <Icon name="ArrowPathIcon" size={16} className="animate-spin text-emerald-600" />
                    <span>Loading your saved addresses...</span>
                  </div>
                ) : (
                  <>
                    {/* Saved Addresses List (Cards) */}
                    {savedAddresses.length > 0 && selectedAddressId !== 'new' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {savedAddresses.map((addr) => {
                            const isSelected = selectedAddressId === addr._id;
                            return (
                              <div
                                key={addr._id}
                                onClick={() => setSelectedAddressId(addr._id)}
                                className={`cursor-pointer rounded-xl border p-4 transition-all relative ${
                                  isSelected
                                    ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-sm'
                                    : 'border-gray-200 hover:border-gray-300 bg-white'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                        isSelected
                                          ? 'border-emerald-600 bg-emerald-600 text-white'
                                          : 'border-gray-300 bg-white'
                                      }`}
                                    >
                                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                    <span className="font-bold text-xs text-gray-900">
                                      {addr.title || 'Saved Address'}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1.5">
                                    {addr.isDefault && (
                                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                                        Default
                                      </span>
                                    )}
                                    <button
                                      type="button"
                                      onClick={(e) => handleDeleteAddress(addr._id, e)}
                                      className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors"
                                      title="Delete address"
                                    >
                                      <Icon name="TrashIcon" size={14} />
                                    </button>
                                  </div>
                                </div>

                                <div className="mt-2 text-xs text-gray-600 space-y-0.5 pl-6">
                                  <p className="font-medium text-gray-900">{addr.street}</p>
                                  <p>
                                    {addr.city}, {addr.state} {addr.zipCode || addr.zip}
                                  </p>
                                  {addr.phone && <p className="text-gray-500">Phone: {addr.phone}</p>}
                                </div>

                                {!addr.isDefault && (
                                  <div className="mt-3 pt-2 border-t border-gray-100 flex justify-end">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSetDefaultAddress(addr._id);
                                      }}
                                      className="text-[11px] font-medium text-[var(--secondary)] hover:underline"
                                    >
                                      Set as default
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedAddressId('new')}
                          className="w-full py-2.5 px-4 border-2 border-dashed border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/20 rounded-xl text-xs font-semibold text-gray-600 hover:text-emerald-700 flex items-center justify-center gap-1.5 transition-all"
                        >
                          <Icon name="PlusIcon" size={15} />
                          Deliver to a Different / New Address
                        </button>
                      </div>
                    )}

                    {/* New Address Input Form */}
                    {(savedAddresses.length === 0 || selectedAddressId === 'new') && (
                      <div className="space-y-4 pt-1">
                        {savedAddresses.length > 0 && (
                          <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center justify-between">
                            <span className="font-medium">Adding a new delivery address</span>
                            <button
                              type="button"
                              onClick={() => {
                                const defaultAddr = savedAddresses.find((a) => a.isDefault) || savedAddresses[0];
                                setSelectedAddressId(defaultAddr._id);
                              }}
                              className="font-bold underline text-blue-700 hover:text-blue-900"
                            >
                              Choose Saved Address
                            </button>
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="address-title" className="app-label mb-1.5 block">
                              Address Label (Optional)
                            </label>
                            <input
                              id="address-title"
                              type="text"
                              value={newAddress.title}
                              onChange={(e) => handleNewAddressChange('title', e.target.value)}
                              placeholder="e.g. Home, Office, Store"
                              className="input-field w-full min-h-[44px]"
                            />
                          </div>
                          <div>
                            <label htmlFor="address-phone" className="app-label mb-1.5 block">
                              Delivery Phone (Optional)
                            </label>
                            <input
                              id="address-phone"
                              type="tel"
                              value={newAddress.phone}
                              onChange={(e) => handleNewAddressChange('phone', e.target.value)}
                              placeholder="Phone for driver"
                              className="input-field w-full min-h-[44px]"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="checkout-street" className="app-label mb-1.5 block">
                            Street Address *
                          </label>
                          <input
                            id="checkout-street"
                            type="text"
                            required={deliveryType === 'delivery'}
                            value={newAddress.street}
                            onChange={(e) => handleNewAddressChange('street', e.target.value)}
                            placeholder="123 Main St, Apt 4B"
                            className="input-field w-full min-h-[44px]"
                          />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="checkout-city" className="app-label mb-1.5 block">
                              City *
                            </label>
                            <input
                              id="checkout-city"
                              type="text"
                              required={deliveryType === 'delivery'}
                              value={newAddress.city}
                              onChange={(e) => handleNewAddressChange('city', e.target.value)}
                              placeholder="City"
                              className="input-field w-full min-h-[44px]"
                            />
                          </div>
                          <div>
                            <label htmlFor="checkout-state" className="app-label mb-1.5 block">
                              State *
                            </label>
                            <input
                              id="checkout-state"
                              type="text"
                              required={deliveryType === 'delivery'}
                              value={newAddress.state}
                              onChange={(e) => handleNewAddressChange('state', e.target.value)}
                              placeholder="NJ"
                              className="input-field w-full min-h-[44px]"
                            />
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="checkout-zip" className="app-label mb-1.5 block">
                              ZIP Code *
                            </label>
                            <input
                              id="checkout-zip"
                              type="text"
                              required={deliveryType === 'delivery'}
                              value={newAddress.zip}
                              onChange={(e) => handleNewAddressChange('zip', e.target.value)}
                              placeholder="07001"
                              className="input-field w-full min-h-[44px]"
                            />
                          </div>
                        </div>

                        {/* Save Address to Profile Checkbox & Button */}
                        <div className="p-3.5 bg-emerald-50/60 border border-emerald-200/70 rounded-xl space-y-3">
                          <label className="flex items-start gap-2.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={saveAddressToProfile}
                              onChange={(e) => setSaveAddressToProfile(e.target.checked)}
                              className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300"
                            />
                            <span className="text-xs text-gray-800 leading-snug">
                              <strong>Save this address to my account</strong> for 1-click checkout on future orders.
                            </span>
                          </label>

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[11px] text-gray-500">
                              Address will be stored safely in your profile.
                            </span>
                            <button
                              type="button"
                              onClick={handleQuickSaveAddress}
                              disabled={isSavingAddress || !newAddress.street.trim() || !newAddress.city.trim() || !newAddress.zip.trim()}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 transition-colors shrink-0"
                            >
                              {isSavingAddress ? 'Saving...' : 'Save Address Now'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </section>
            )}

            {/* STEP 2: PAYMENT METHOD (Shows ONLY when user has filled all details) */}
            <div className="pt-2">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                    isAllDetailsFilled ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </span>
                  Payment Method
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Card Payment Only
                </span>
              </div>

              {!isAllDetailsFilled ? (
                /* LOCKED PLACEHOLDER when details are not filled yet */
                <div className="app-card p-6 border-2 border-dashed border-gray-300 bg-gray-50/70 rounded-2xl text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center mx-auto mb-3">
                    <Icon name="LockClosedIcon" size={24} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800">Payment Method Locked</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
                    Please complete your contact details and delivery address above. The card payment form will appear automatically once all details are filled.
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-medium text-gray-500">
                    <span className={isContactFilled ? 'text-emerald-700 font-bold' : 'text-gray-400'}>
                      {isContactFilled ? '✓ Contact Info' : '○ Contact Info'}
                    </span>
                    <span>•</span>
                    <span className={isAddressFilled ? 'text-emerald-700 font-bold' : 'text-gray-400'}>
                      {isAddressFilled ? '✓ Address' : '○ Address'}
                    </span>
                  </div>
                </div>
              ) : (
                /* UNLOCKED PAYMENT METHOD TAB (Only Card Payment) */
                <section className="app-card p-5 sm:p-6 transition-all duration-300 animate-fadeIn" id="payment-section">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                        <Icon name="CreditCardIcon" size={18} />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-gray-900">Card Payment</h2>
                        <p className="text-xs text-emerald-700 font-medium">Ready for secure payment</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <Icon name="CheckCircleIcon" size={13} />
                      Unlocked
                    </span>
                  </div>

                  {paymentStep && createdOrderId ? (
                    <div className="pt-2">
                      <div className="mb-4 p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                        <Icon name="LockClosedIcon" size={16} className="text-emerald-700 shrink-0" />
                        <span>Order initiated. Complete your secure card payment below to finalize.</span>
                      </div>
                      {stripePromise && (
                        <Elements stripe={stripePromise}>
                          <PaymentForm
                            orderId={createdOrderId}
                            order={createdOrder}
                            amount={finalTotal}
                            onSuccess={handlePaymentSuccess}
                            onError={handlePaymentError}
                            onBack={() => setPaymentStep(false)}
                          />
                        </Elements>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Exclusive Card Payment Selection Box */}
                      <div className="border-2 border-emerald-600 bg-emerald-50/40 rounded-xl p-4 sm:p-5 ring-2 ring-emerald-500/10">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              <div className="w-5 h-5 rounded-full border-2 border-emerald-600 bg-emerald-600 flex items-center justify-center text-white">
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                </svg>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-sm font-bold text-gray-900">Credit / Debit Card</h3>
                                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                                  Only Payment Method
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">
                                Safe and encrypted checkout powered by Stripe. All major cards accepted.
                              </p>

                              {/* Card Network Badges */}
                              <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-white text-blue-700 border border-blue-200 shadow-2xs">
                                  VISA
                                </span>
                                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-white text-red-600 border border-red-200 shadow-2xs">
                                  Mastercard
                                </span>
                                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-white text-indigo-700 border border-indigo-200 shadow-2xs">
                                  American Express
                                </span>
                                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-white text-orange-600 border border-orange-200 shadow-2xs">
                                  Discover
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-emerald-900">
                          <span className="flex items-center gap-1 font-medium">
                            <Icon name="ShieldCheckIcon" size={15} className="text-emerald-700" />
                            256-Bit SSL Encrypted & PCI-DSS Level 1 Compliant
                          </span>
                          <span className="text-gray-500 font-medium">Powered by Stripe</span>
                        </div>
                      </div>

                      <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                        <Icon name="InformationCircleIcon" size={17} className="text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-amber-950">Payment Policy Notice</p>
                          <p className="text-amber-800 mt-0.5">
                            Patel Sales only accepts Card Payment. Alternative payment options (including Cash on Delivery) are strictly not supported.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              )}
            </div>
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

              {/* Order Submission / Payment Button */}
              {paymentStep ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 text-center font-medium">
                  Payment in progress. Complete card details on the left to finalize your order.
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || isCreatingOrder || !isAllDetailsFilled}
                  className="btn-primary w-full justify-center mt-2 min-h-[46px] disabled:opacity-50 text-sm font-semibold shadow-sm"
                >
                  {isSubmitting || isCreatingOrder ? (
                    <span className="flex items-center gap-2">
                      <Icon name="ArrowPathIcon" size={16} className="animate-spin" />
                      Processing Order...
                    </span>
                  ) : !isAllDetailsFilled ? (
                    <span className="flex items-center justify-center gap-2">
                      <Icon name="LockClosedIcon" size={16} />
                      Complete Details to Pay
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Icon name="CreditCardIcon" size={16} />
                      Pay with Card · ${finalTotal.toFixed(2)}
                    </span>
                  )}
                </button>
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

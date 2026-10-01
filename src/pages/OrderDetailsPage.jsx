import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import StatusBadge, { getOrderStatusVariant } from '../components/ui/StatusBadge';
import Icon from '../components/ui/AppIcon';
import { useOrders } from '../hooks/useOrders';
import { Loader } from '../components/ui/Loader';

export default function OrderDetailsPage() {
  const { orderId } = useParams<{ orderId }>();
  const { currentOrder, isLoading, fetchOrderById, error } = useOrders();

  React.useEffect(() => {
    if (orderId) {
      fetchOrderById(orderId);
    }
  }, [orderId, fetchOrderById]);

  if (isLoading) {
    return (
      <div className="min-h-full bg-[var(--background)] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white border border-red-200 rounded-lg p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="ExclamationTriangleIcon" size={32} className="text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">{error}</h1>
          <p className="text-sm text-gray-600 mb-6">
            Failed to load order details. Please try again.
          </p>
          <Link to="/account/orders" className="btn-primary min-h-[44px] inline-flex">
            Back to Order History
          </Link>
        </div>
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="ShoppingBagIcon" size={32} className="text-gray-400" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Order Not Found</h1>
          <p className="text-sm text-gray-600 mb-6">
            The order you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/account/orders" className="btn-primary min-h-[44px] inline-flex">
            Back to Order History
          </Link>
        </div>
      </div>
    );
  }

  const discount = currentOrder.discount > 0 ? currentOrder.discount : 0;
  const tax = currentOrder.tax;
  const shipping = currentOrder.shipping;
  const subtotal = currentOrder.subtotal;
  const total = currentOrder.total;

  return (
    <div className="min-h-full bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-10 sm:pt-8">
        <PageHeader
          title={`Order ${currentOrder.orderNumber}`}
          breadcrumbs={[
            { label: 'Patel Sales', href: '/' },
            { label: 'My Account', href: '/account' },
            { label: 'Order History', href: '/account/orders' },
            { label: currentOrder.orderNumber },
          ]}
        />

        {/* Order Status Card */}
        <div className="app-card p-6 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-bold text-gray-900">Current Status</h2>
                <StatusBadge
                  label={currentOrder.status}
                  variant={getOrderStatusVariant(currentOrder.status)}
                />
              </div>
              <p className="text-sm text-gray-500">
                Order placed on {new Date(currentOrder.createdAt).toLocaleDateString()}
              </p>
            </div>
            {currentOrder.trackingNumber && (
              <Link
                to="/track-order"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#003087] text-[#003087] hover:bg-[#003087] hover:text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Icon name="TruckIcon" size={16} />
                Track Order
              </Link>
            )}
          </div>
        </div>

        {/* Order Items */}
        <div className="app-card p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Items</h2>
          <div className="space-y-4">
            {currentOrder.items.map((item) => (
              <div key={item.product} className="flex gap-4">
                <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={item.image || '/placeholder.png'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        {currentOrder.shippingAddress && (
          <div className="app-card p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Shipping Address</h2>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-gray-900">
                {currentOrder.shippingAddress.street}
              </p>
              <p>
                {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state}{' '}
                {currentOrder.shippingAddress.zip}
              </p>
              <p>{currentOrder.shippingAddress.country}</p>
            </div>
          </div>
        )}

        {/* Payment Information */}
        <div className="app-card p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 text-xs">Payment Method</p>
              <p className="font-medium text-gray-900 capitalize">{currentOrder.paymentMethod}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Payment Status</p>
              <StatusBadge
                label={currentOrder.paymentStatus}
                variant={
                  currentOrder.paymentStatus === 'paid'
                    ? 'success'
                    : currentOrder.paymentStatus === 'pending'
                    ? 'warning'
                    : 'danger'
                }
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="app-card p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-4 border-t border-gray-100">
              <span>Total</span>
              <span className="text-[var(--secondary)]">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Link to="/products" className="btn-primary min-h-[44px] flex-1">
            Continue Shopping
          </Link>
          <Link to="/account/orders" className="btn-secondary min-h-[44px] flex-1">
            Back to Order History
          </Link>
        </div>
      </div>
    </div>
  );
}

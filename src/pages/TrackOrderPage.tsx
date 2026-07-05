import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import EmptyState from '../components/ui/EmptyState';
import StatusBadge, { getOrderStatusVariant } from '../components/ui/StatusBadge';
import TrackingTimeline from '../components/tracking/TrackingTimeline';
import OrderTrackingDetails from '../components/tracking/OrderTrackingDetails';
import Icon from '../components/ui/AppIcon';
import { trackOrder, getSampleTrackingNumber } from '../services/orderTrackingService';
import { usePWA } from '../hooks/usePWA';
import type { TrackedOrder } from '../types/tracking';

type ViewState = 'idle' | 'loading' | 'success' | 'error';

export default function TrackOrderPage() {
  const { isOnline } = usePWA();
  const [query, setQuery] = useState('');
  const [viewState, setViewState] = useState<ViewState>('idle');
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getSampleTrackingNumber().then(setQuery);
  }, []);

  const handleTrack = async (event?: React.FormEvent) => {
    event?.preventDefault();

    if (!isOnline) {
      setViewState('error');
      setErrorMessage('You are offline. Connect to the internet to track your order.');
      return;
    }

    setViewState('loading');
    setErrorMessage('');
    setOrder(null);

    const result = await trackOrder(query);
    if (result.success && result.order) {
      setOrder(result.order);
      setViewState('success');
    } else {
      setErrorMessage(result.message ?? 'Unable to find order.');
      setViewState('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#e8f0f8]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003087] to-[#0040a0] py-12 md:py-16">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Track Your Order
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            Enter your order number to see real-time delivery status
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 py-10 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Search Form */}
          <form onSubmit={handleTrack} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <label htmlFor="tracking-query" className="block text-sm font-bold text-gray-800 mb-3">
              Order or Tracking Number
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="tracking-query"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. PSNJ7840123456"
                className="flex-1 min-h-[52px] px-4 border-2 border-gray-200 rounded-xl focus:border-[#003087] focus:outline-none transition-colors text-gray-900"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={viewState === 'loading'}
                className="min-h-[52px] px-8 bg-gradient-to-r from-[#003087] to-[#0040a0] hover:from-[#002244] hover:to-[#003087] text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
              >
                {viewState === 'loading' ? (
                  <>
                    <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                    Tracking...
                  </>
                ) : (
                  <>
                    <Icon name="MagnifyingGlassIcon" size={20} />
                    Track Order
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Try sample: <span className="font-mono font-semibold text-[#003087]">PSNJ7840123456</span>
            </p>
          </form>

          {viewState === 'loading' && (
            <div className="space-y-4">
              <div className="bg-gray-200 rounded-2xl shadow-lg p-6 h-32 animate-pulse" />
              <div className="bg-gray-200 rounded-2xl shadow-lg p-6 h-64 animate-pulse" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-gray-200 rounded-2xl shadow-lg p-6 h-40 animate-pulse" />
                <div className="bg-gray-200 rounded-2xl shadow-lg p-6 h-40 animate-pulse" />
              </div>
            </div>
          )}

          {viewState === 'error' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#e8471e] to-[#ff5722] rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="ExclamationTriangleIcon" size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h2>
              <p className="text-gray-600 mb-6">{errorMessage}</p>
              <button
                type="button"
                onClick={() => handleTrack()}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#003087] to-[#0040a0] hover:from-[#002244] hover:to-[#003087] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Icon name="ArrowPathIcon" size={20} />
                Try Again
              </button>
            </div>
          )}

          {viewState === 'success' && order && (
            <div className="space-y-6 animate-fade-in">
              {/* Order Status Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2F7D32] to-[#1a5c1e] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckCircleIcon" size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Current Status</p>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <StatusBadge label={order.orderStatus} variant={getOrderStatusVariant(order.orderStatus)} />
                    </div>
                    <span className="text-sm text-gray-600">
                      {order.products.length} item{order.products.length !== 1 ? 's' : ''} ·{' '}
                      <span className="font-semibold text-gray-900">${order.totalAmount.toFixed(2)}</span>
                    </span>
                  </div>
                </div>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-white border-2 border-[#003087] text-[#003087] hover:bg-[#003087] hover:text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Icon name="ShoppingBagIcon" size={20} />
                  Order Again
                </Link>
              </div>

              <TrackingTimeline steps={order.timeline} />
              <OrderTrackingDetails order={order} />
            </div>
          )}

          {viewState === 'idle' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#003087] to-[#0040a0] rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="TruckIcon" size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Track Your Wholesale Order</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Enter your order number or tracking ID above to see real-time delivery status, estimated arrival, and order details.
              </p>
              <button
                type="button"
                onClick={() => handleTrack()}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#003087] to-[#0040a0] hover:from-[#002244] hover:to-[#003087] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Icon name="MagnifyingGlassIcon" size={20} />
                Track Sample Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

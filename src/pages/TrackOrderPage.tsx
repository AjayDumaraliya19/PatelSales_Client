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
    <div className="min-h-full bg-[var(--background)] py-4 sm:py-6 pb-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <PageHeader
          title="Track Your Order"
          breadcrumbs={[
            { label: 'Patel Sales', href: '/' },
            { label: 'Track Order' },
          ]}
        />

        <form onSubmit={handleTrack} className="app-card p-4 sm:p-5 mb-5 animate-fade-in">
          <label htmlFor="tracking-query" className="app-label">
            Order or Tracking Number
          </label>
          <div className="flex flex-col sm:flex-row gap-2 mt-1.5">
            <input
              id="tracking-query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. PSNJ7840123456"
              className="input-field flex-1 min-h-[44px]"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={viewState === 'loading'}
              className="btn-primary min-h-[44px] px-6 shrink-0 disabled:opacity-70"
            >
              {viewState === 'loading' ? (
                <>
                  <Icon name="ArrowPathIcon" size={16} className="animate-spin" />
                  Tracking...
                </>
              ) : (
                <>
                  <Icon name="MagnifyingGlassIcon" size={16} />
                  Track Order
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Try sample: <span className="font-mono font-semibold text-gray-700">PSNJ7840123456</span>
          </p>
        </form>

        {viewState === 'loading' && (
          <div className="space-y-4 animate-pulse">
            <div className="app-card p-6 h-32 skeleton-pulse rounded-xl" />
            <div className="app-card p-6 h-64 skeleton-pulse rounded-xl" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="app-card p-6 h-40 skeleton-pulse rounded-xl" />
              <div className="app-card p-6 h-40 skeleton-pulse rounded-xl" />
            </div>
          </div>
        )}

        {viewState === 'error' && (
          <EmptyState
            icon="ExclamationTriangleIcon"
            title="Order Not Found"
            description={errorMessage}
            action={
              <button type="button" onClick={() => handleTrack()} className="btn-secondary">
                Try Again
              </button>
            }
          />
        )}

        {viewState === 'success' && order && (
          <div className="space-y-4 animate-fade-in">
            <div className="app-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Current Status</p>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge label={order.orderStatus} variant={getOrderStatusVariant(order.orderStatus)} />
                  <span className="text-sm text-gray-600">
                    {order.products.length} item{order.products.length !== 1 ? 's' : ''} ·{' '}
                    <span className="font-semibold text-gray-900">${order.totalAmount.toFixed(2)}</span>
                  </span>
                </div>
              </div>
              <Link to="/products" className="btn-outline min-h-[44px] text-center">
                Order Again
              </Link>
            </div>

            <TrackingTimeline steps={order.timeline} />
            <OrderTrackingDetails order={order} />
          </div>
        )}

        {viewState === 'idle' && (
          <EmptyState
            icon="TruckIcon"
            title="Track Your Wholesale Order"
            description="Enter your order number or tracking ID above to see real-time delivery status, estimated arrival, and order details."
            action={
              <button type="button" onClick={() => handleTrack()} className="btn-primary min-h-[44px]">
                Track Sample Order
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}

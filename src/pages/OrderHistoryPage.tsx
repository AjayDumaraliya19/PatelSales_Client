import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import StatusBadge, { getOrderStatusVariant } from '../components/ui/StatusBadge';
import { Loader } from '../components/ui/Loader';
import { useOrders } from '../hooks/useOrders';

export default function OrderHistoryPage() {
  const { orders, isLoading, isAuthenticated, fetchMyOrders } = useOrders();

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchMyOrders();
    }
  }, [isAuthenticated, fetchMyOrders]);

  if (isLoading) {
    return (
      <div className="min-h-full bg-[var(--background)] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-full bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your order history.</p>
          <Link to="/login" className="btn-primary mt-4">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-10 sm:pt-8">
        <PageHeader
          title="Order History"
          breadcrumbs={[
            { label: 'Patel Sales', href: '/' },
            { label: 'My Account', href: '/account' },
            { label: 'Order History' },
          ]}
        />

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
            <p className="text-gray-500 mt-2">Start shopping to see your order history.</p>
            <Link to="/products" className="btn-primary mt-6 inline-flex">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <article key={order._id} className="app-card p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Order Number</p>
                    <p className="font-bold text-gray-900">{order.orderNumber}</p>
                  </div>
                  <StatusBadge
                    label={order.status}
                    variant={getOrderStatusVariant(order.status)}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-4">
                  <div>
                    <p className="text-gray-500 text-xs">Date</p>
                    <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Items</p>
                    <p className="font-medium">{order.items.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Total</p>
                    <p className="font-bold text-[var(--secondary)]">${order.total.toFixed(2)}</p>
                  </div>
                  {order.trackingNumber && (
                    <div>
                      <p className="text-gray-500 text-xs">Tracking</p>
                      <p className="font-medium text-xs">{order.trackingNumber}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-4">
                  <Link
                    to={`/account/orders/${order._id}`}
                    className="text-sm text-[var(--secondary)] font-semibold hover:underline"
                  >
                    View Details →
                  </Link>
                  {order.trackingNumber && (
                    <Link
                      to="/track-order"
                      className="text-sm text-[var(--secondary)] font-semibold hover:underline"
                    >
                      Track this order →
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/products" className="btn-primary min-h-[44px] inline-flex">
            Place New Order
          </Link>
        </div>
      </div>
    </div>
  );
}

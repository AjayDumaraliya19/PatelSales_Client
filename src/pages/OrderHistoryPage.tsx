import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import StatusBadge, { getOrderStatusVariant } from '../components/ui/StatusBadge';
import { mockTrackedOrders } from '../data/mockOrders';

export default function OrderHistoryPage() {
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

        <div className="space-y-3">
          {mockTrackedOrders.map((order) => (
            <article key={order._id} className="app-card p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Order Number</p>
                  <p className="font-bold text-gray-900">{order.orderNumber}</p>
                </div>
                <StatusBadge label={order.orderStatus} variant={getOrderStatusVariant(order.orderStatus)} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-4">
                <div>
                  <p className="text-gray-500 text-xs">Date</p>
                  <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Items</p>
                  <p className="font-medium">{order.products.length}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Total</p>
                  <p className="font-bold text-[var(--secondary)]">${order.totalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Tracking</p>
                  <p className="font-medium text-xs">{order.trackingNumber}</p>
                </div>
              </div>

              <Link
                to="/track-order"
                className="text-sm text-[var(--secondary)] font-semibold hover:underline"
              >
                Track this order →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link to="/products" className="btn-primary min-h-[44px] inline-flex">
            Place New Order
          </Link>
        </div>
      </div>
    </div>
  );
}

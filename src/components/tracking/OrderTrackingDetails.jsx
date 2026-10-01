import React from 'react';
import AppImage from '../ui/AppImage';

function InfoRow({ label, value }: { label; value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 py-2 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-500 font-medium">{label}</span>
      <span className="text-sm text-gray-900 font-semibold sm:text-right break-all">{value}</span>
    </div>
  );
}

export default function OrderTrackingDetails({ order }: OrderTrackingDetailsProps) {
  const deliveryDate = new Date(order.estimatedDeliveryDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="app-card p-4 sm:p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Shipping Info</h3>
        <InfoRow label="Tracking Number" value={order.trackingNumber} />
        <InfoRow label="Carrier" value={order.carrier} />
        <InfoRow label="Est. Delivery" value={deliveryDate} />
        <InfoRow label="Order Number" value={order.orderNumber} />
      </div>

      <div className="app-card p-4 sm:p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Customer Info</h3>
        <InfoRow label="Name" value={order.customerName} />
        <InfoRow label="Email" value={order.customerEmail} />
        <InfoRow label="Phone" value={order.customerPhone} />
        <InfoRow
          label="Address"
          value={`${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}`}
        />
      </div>

      <div className="app-card p-4 sm:p-5 lg:col-span-2">
        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Order Summary</h3>
        <div className="space-y-3 mb-4">
          {order.products.map((item) => (
            <div key={item.productId} className="flex gap-3 items-center">
              <div className="relative w-14 h-14 bg-gray-50 border border-gray-100 rounded-lg overflow-hidden shrink-0">
                <AppImage src={item.image} alt={item.name} fill className="object-contain p-1" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 line-clamp-2">{item.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-bold text-[var(--primary)] shrink-0">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 pt-3 space-y-1.5 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 text-base pt-1">
            <span>Total</span>
            <span className="text-[var(--primary)]">${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

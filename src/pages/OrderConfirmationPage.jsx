import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../components/ui/AppIcon';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const stateOrder = location.state;

  const orderData = React.useMemo(() => {
    // First check if we have a full order object from backend
    if (stateOrder?.order) return stateOrder.order;

    // Fallback to sessionStorage for mock data
    try {
      const raw = sessionStorage.getItem('lastOrder');
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          _id: '',
          user: { _id: '', name: '', email: parsed.email }
          orderNumber: parsed.orderNumber,
          items: [],
          shippingAddress: {
            street: '',
            city: '',
            state: '',
            zip: '',
            country: 'US',
          },
          paymentMethod: 'card',
          paymentStatus: 'pending',
          subtotal: parsed.total,
          shipping: 0,
          tax: 0,
          discount: 0,
          total: parsed.total,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }
    } catch {
      // Fall through to null
    }
    return null;
  }, [stateOrder]);

  if (!orderData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-gray-900 mb-2">No Order Found</h1>
        <p className="text-sm text-gray-600 mb-6">Place an order to see your confirmation here.</p>
        <Link to="/products" className="btn-primary min-h-[44px] inline-flex">
          Shop Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[var(--background)]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 pb-12 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircleIcon" size={40} className="text-green-600" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-sm text-gray-600 mb-8">
          Thank you for your order. A confirmation email has been sent to{' '}
          <span className="font-semibold">{orderData.shippingAddress?.phone ? 'your registered email' : 'your email'}</span>.
        </p>

        <div className="app-card p-6 text-left mb-8">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Order Number</p>
              <p className="font-bold text-gray-900">{orderData.orderNumber}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Items</p>
              <p className="font-bold text-gray-900">{orderData.items.length}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Total</p>
              <p className="font-bold text-[var(--secondary)]">${orderData.total.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Status</p>
              <p className="font-bold text-green-600">Confirmed</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link to={`/track-order`} className="btn-primary min-h-[44px] inline-flex">
            Track Order
          </Link>
          <Link to="/account/orders" className="btn-outline min-h-[44px] inline-flex">
            View Order History
          </Link>
          <Link to="/products" className="btn-outline min-h-[44px] inline-flex">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

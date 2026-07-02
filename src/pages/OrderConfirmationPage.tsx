import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../components/ui/AppIcon';

interface OrderSummaryState {
  orderNumber: string;
  total: number;
  itemCount: number;
  email: string;
}

export default function OrderConfirmationPage() {
  const location = useLocation();
  const stateOrder = location.state as OrderSummaryState | null;

  const storedOrder = React.useMemo(() => {
    if (stateOrder) return stateOrder;
    try {
      const raw = sessionStorage.getItem('lastOrder');
      return raw ? (JSON.parse(raw) as OrderSummaryState) : null;
    } catch {
      return null;
    }
  }, [stateOrder]);

  if (!storedOrder) {
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
          <span className="font-semibold">{storedOrder.email}</span>.
        </p>

        <div className="app-card p-6 text-left mb-8">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Order Number</p>
              <p className="font-bold text-gray-900">{storedOrder.orderNumber}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Items</p>
              <p className="font-bold text-gray-900">{storedOrder.itemCount}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Total</p>
              <p className="font-bold text-[var(--secondary)]">${storedOrder.total.toFixed(2)}</p>
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

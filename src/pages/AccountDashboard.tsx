import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Package, Truck, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';
import { fetchMyOrders } from '../services/orderService';
import { formatPriceSimple, getOrderStatusColor } from '../utils/format';

export function AccountDashboard() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['my-orders'],
    queryFn: fetchMyOrders,
  });

  const recentOrders = orders.slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here&apos;s an overview of your account.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card padding="sm" className="text-center">
          <Package className="w-8 h-8 mx-auto text-primary-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
          <p className="text-sm text-gray-600">Total Orders</p>
        </Card>
        <Card padding="sm" className="text-center">
          <Truck className="w-8 h-8 mx-auto text-blue-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {orders.filter((o) => ['shipped', 'packed'].includes(o.orderStatus)).length}
          </p>
          <p className="text-sm text-gray-600">In Transit</p>
        </Card>
        <Card padding="sm" className="text-center">
          <Package className="w-8 h-8 mx-auto text-green-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {orders.filter((o) => o.orderStatus === 'delivered').length}
          </p>
          <p className="text-sm text-gray-600">Delivered</p>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <Link to="/account/orders" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-gray-600 text-sm">No orders yet.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <div key={order._id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <Link to={`/account/orders/${order._id}`} className="font-medium text-primary-600 hover:underline text-sm">
                    {order.orderNumber}
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString()} · {order.items.length} item
                    {order.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getOrderStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{formatPriceSimple(order.total)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="flex flex-wrap gap-3">
        <Link to="/account/track-order">
          <Button variant="secondary" leftIcon={<Truck className="w-4 h-4" />}>
            Track an Order
          </Button>
        </Link>
        <Link to="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}

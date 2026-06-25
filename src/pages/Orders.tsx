import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Package, Search, ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Loader } from '../components/ui/Loader';
import { fetchMyOrders } from '../services/orderService';
import { orderStatusSteps } from '../utils/mappers';
import { formatPriceSimple, getOrderStatusColor } from '../utils/format';

export function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['my-orders'],
    queryFn: fetchMyOrders,
  });

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || order.orderStatus.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

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
        <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
        <p className="text-gray-600 mt-1">View and track all your orders</p>
      </div>

      {orders.length === 0 ? (
        <Card className="text-center py-16">
          <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </Card>
      ) : (
        <>
          <Card padding="sm">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by order number..."
                  value={searchTerm}
                  onChange={setSearchTerm}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full md:w-auto"
                >
                  <option value="all">All Status</option>
                  {orderStatusSteps.map((status) => (
                    <option key={status.key} value={status.key}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden" padding="none">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Order Number</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Total</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase hidden sm:table-cell">Items</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <Link to={`/account/orders/${order._id}`} className="text-sm font-medium text-primary-600 hover:underline">
                          {order.orderNumber}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getOrderStatusColor(order.orderStatus)}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatPriceSimple(order.total)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">{order.items.length}</td>
                      <td className="px-4 py-3 text-right">
                        <Link to={`/account/orders/${order._id}`}>
                          <Button variant="secondary" size="sm">
                            View <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredOrders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">No orders found matching your criteria</p>
              </div>
            )}
          </Card>

          <p className="text-sm text-gray-600">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
        </>
      )}
    </div>
  );
}

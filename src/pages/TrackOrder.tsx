import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Package } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Loader } from '../components/ui/Loader';
import { fetchMyOrders } from '../services/orderService';

export function TrackOrder() {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState('');

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['my-orders'],
    queryFn: fetchMyOrders,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const order = orders.find(
      (o) => o.orderNumber.toLowerCase() === orderNumber.trim().toLowerCase()
    );
    if (order) {
      navigate(`/account/orders/${order._id}`);
    } else {
      setError('Order not found. Please check your order number and try again.');
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-900">Track Your Order</h1>
        <p className="text-gray-600 mt-1">Enter your order number to view status and tracking details.</p>
      </div>

      <Card className="max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Order Number"
            placeholder="e.g. ORD-1234567890-123"
            value={orderNumber}
            onChange={setOrderNumber}
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" leftIcon={<Search className="w-4 h-4" />}>
            Track Order
          </Button>
        </form>
      </Card>

      {orders.length > 0 && (
        <Card>
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Recent Orders</h2>
          <div className="space-y-2">
            {orders.slice(0, 3).map((order) => (
              <button
                key={order._id}
                onClick={() => navigate(`/account/orders/${order._id}`)}
                className="flex items-center gap-3 w-full text-left p-2 rounded hover:bg-gray-50"
              >
                <Package className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-primary-600 font-medium">{order.orderNumber}</span>
                <span className="text-xs text-gray-500 ml-auto capitalize">{order.orderStatus}</span>
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

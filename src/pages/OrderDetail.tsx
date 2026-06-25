import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Package, MapPin, CreditCard, CheckCircle, Circle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Loader } from '../components/ui/Loader';
import { fetchOrderById } from '../services/orderService';
import { orderStatusSteps } from '../utils/mappers';
import { formatPriceSimple, getOrderStatusBadgeVariant } from '../utils/format';

export function OrderDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: order, isLoading, isError } = useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 mb-4">Order not found</p>
        <Link to="/account/orders">
          <Button>Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const currentStepIndex = orderStatusSteps.findIndex(
    (step) => step.key === order.orderStatus.toLowerCase()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/account/orders" className="text-primary-600 hover:text-primary-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          <p className="text-gray-600 text-sm">{order.orderNumber}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
              <Badge
                variant={
                  getOrderStatusBadgeVariant(order.orderStatus) as 'success' | 'info' | 'warning' | 'danger'
                }
              >
                <span className="capitalize">{order.orderStatus}</span>
              </Badge>
            </div>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={`${item.product}-${index}`} className="flex gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <Package className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {formatPriceSimple(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h2>
            <div className="space-y-0">
              {orderStatusSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                return (
                  <div key={step.key} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      {isCompleted ? (
                        <CheckCircle className={`w-5 h-5 ${isCurrent ? 'text-primary-600' : 'text-green-500'}`} />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300" />
                      )}
                      {index < orderStatusSteps.length - 1 && (
                        <div
                          className={`w-0.5 h-8 ${isCompleted && index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'}`}
                        />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className={`font-medium text-sm ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.label}
                      </p>
                      {isCurrent && <p className="text-xs text-primary-600 mt-0.5">Current status</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPriceSimple(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>{formatPriceSimple(order.tax)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? 'Free' : formatPriceSimple(order.shipping)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>{formatPriceSimple(order.total)}</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-primary-600" />
              <h2 className="font-semibold text-gray-900">Shipping Address</h2>
            </div>
            <div className="text-sm text-gray-600 space-y-0.5">
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
              <p>{order.shippingAddress.zipCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-4 h-4 text-primary-600" />
              <h2 className="font-semibold text-gray-900">Payment</h2>
            </div>
            <p className="text-sm text-gray-600 capitalize">{order.paymentMethod}</p>
            <p className="text-xs text-gray-500 mt-1 capitalize">Status: {order.paymentStatus}</p>
          </Card>

          <Link to="/products">
            <Button className="w-full">Shop Again</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

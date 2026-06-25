import { useState, type FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { clearCart } from '../store/slices/cartSlice';
import { createOrder } from '../services/orderService';
import { formatPriceSimple } from '../utils/format';
import type { RootState, AppDispatch } from '../store';

export function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);
  const { user, token } = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    paymentMethod: 'card',
  });

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      await createOrder({
        items: items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          phone: formData.phone,
        },
        paymentMethod: formData.paymentMethod,
      });
      dispatch(clearCart());
      navigate('/account/orders');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to place order';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add items to your cart before checkout</p>
        <Button onClick={() => navigate('/products')}>Browse Products</Button>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Please sign in</h2>
        <p className="text-gray-600 mb-6">You need to be logged in to checkout</p>
        <Button onClick={() => navigate('/login')}>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600">Complete your order</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">Shipping Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Full Name" value={formData.name} onChange={(v) => handleInputChange('name', v)} required />
              <Input label="Email" type="email" value={formData.email} onChange={(v) => handleInputChange('email', v)} required disabled />
              <Input label="Phone" type="tel" value={formData.phone} onChange={(v) => handleInputChange('phone', v)} required />
              <Input label="Street Address" value={formData.street} onChange={(v) => handleInputChange('street', v)} required />
              <Input label="City" value={formData.city} onChange={(v) => handleInputChange('city', v)} required />
              <Input label="State" value={formData.state} onChange={(v) => handleInputChange('state', v)} required />
              <Input label="ZIP Code" value={formData.zipCode} onChange={(v) => handleInputChange('zipCode', v)} required />
              <Input label="Country" value={formData.country} onChange={(v) => handleInputChange('country', v)} required />
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
            </div>
            <select
              value={formData.paymentMethod}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="card">Credit / Debit Card</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </Card>
        </div>

        <div>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
            </div>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.product._id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.product.name} x {item.quantity}
                  </span>
                  <span className="font-medium">{formatPriceSimple(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-3 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPriceSimple(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span>{formatPriceSimple(tax)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPriceSimple(shipping)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPriceSimple(total)}</span>
                </div>
              </div>
            </div>
            <Button size="lg" fullWidth className="mt-6" isLoading={loading}>
              Place Order
            </Button>
          </Card>
        </div>
      </form>
    </div>
  );
}

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { formatPriceSimple } from '../utils/format';
import type { RootState, AppDispatch } from '../store';

export function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some products to get started</p>
        <Link to="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>
        <Button variant="danger" onClick={handleClearCart}>
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.product._id} className="p-4">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <div className="flex-1">
                  <Link to={`/products/${item.product._id}`}>
                    <h3 className="font-semibold text-gray-900 hover:text-primary-600">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-2">{item.product.category}</p>
                  <p className="text-lg font-bold text-gray-900">{formatPriceSimple(item.product.price)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => handleRemove(item.product._id)}
                    className="text-accent-600 hover:text-accent-700"
                    title="Remove"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPriceSimple(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (18% GST)</span>
                <span>{formatPriceSimple(tax)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPriceSimple(shipping)}</span>
              </div>
              {subtotal < 500 && (
                <p className="text-sm text-primary-600">
                  Add {formatPriceSimple(500 - subtotal)} more for free shipping
                </p>
              )}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPriceSimple(total)}</span>
                </div>
              </div>
            </div>
            <Link to="/checkout">
              <Button size="lg" className="w-full mt-6">
                Proceed to Checkout
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="secondary" size="lg" className="w-full mt-3">
                Continue Shopping
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

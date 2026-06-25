import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Loader } from '../components/ui/Loader';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { fetchProductById } from '../services/productService';
import { formatPrice, formatPriceSimple } from '../utils/format';
import type { AppDispatch } from '../store';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 mb-4">Product not found</p>
        <Link to="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  const mainImage = product.images[0]?.url;

  return (
    <div className="space-y-8">
      <Link to="/products" className="inline-flex items-center text-primary-600 hover:text-primary-700">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              {mainImage ? (
                <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <ShoppingCart className="w-32 h-32 text-gray-400" />
              )}
            </div>
          </Card>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden"
                >
                  <img src={image.url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant="info">{product.category}</Badge>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center text-yellow-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <p className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}</p>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-3">Product Details</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" /> SKU: {product.sku}
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" /> Category: {product.category}
              </li>
            </ul>
          </Card>

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <p className="text-sm text-gray-600">
              {product.stock > 0 ? `${product.stock} items available` : 'Out of stock'}
            </p>
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="flex-1" disabled={product.stock === 0} onClick={handleAddToCart}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Truck className="w-6 h-6 text-primary-600" />
              <div>
                <p className="font-medium text-gray-900">Free Delivery</p>
                <p className="text-sm text-gray-600">On orders above {formatPriceSimple(500)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Shield className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Quality Assured</p>
                <p className="text-sm text-gray-600">100% authentic products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

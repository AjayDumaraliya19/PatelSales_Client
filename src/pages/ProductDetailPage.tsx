import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppImage from '../components/ui/AppImage';
import Icon from '../components/ui/AppIcon';
import PageHeader from '../components/ui/PageHeader';
import productsService, { Product } from '../services/productsService';
import { useCartStore } from '../store/cartStore';

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      setLoading(true);
      setError(null);

      try {
        const response = await productsService.getProductById(productId);
        setProduct(response.product);

        // Fetch related products from same category
        if (response.product.category?._id) {
          const relatedResponse = await productsService.getProducts({
            category: response.product.category._id,
            limit: 5,
            active: true,
          });
          setRelatedProducts(
            relatedResponse.products.filter((p) => p._id !== response.product._id).slice(0, 4)
          );
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load product');
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product || product.stock === 0 || isAdding) return;
    
    setIsAdding(true);
    await new Promise((r) => setTimeout(r, 300));
    
    // Convert backend Product to cart Product format
    const cartProduct = {
      ...product,
      categoryId: product.category._id,
      categoryName: product.category.name,
      isNew: false,
      isOnSale: product.compareAtPrice ? product.compareAtPrice > product.price : false,
      originalPrice: product.compareAtPrice,
      caseSize: '', // TODO: Add caseSize to backend Product model
      rating: undefined,
      reviewCount: undefined,
    };
    
    addItem(cartProduct as any, quantity);
    setIsAdding(false);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-full bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-10 sm:pt-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
              <div className="aspect-square bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white border border-red-200 rounded-lg p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="ExclamationTriangleIcon" size={32} className="text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            {error || 'Product Not Found'}
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            This product may have been removed or the link is incorrect.
          </p>
          <Link to="/products" className="btn-primary min-h-[44px] inline-flex">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="min-h-full bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-10 sm:pt-8">
        <PageHeader
          title={product.name}
          breadcrumbs={[
            { label: 'Patel Sales', href: '/' },
            { label: 'Shop', href: '/products' },
            { label: product.category?.name ?? 'Product' },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-10">
          <div className="app-card overflow-hidden">
            <div className="relative aspect-square bg-gray-50">
              <AppImage
                src={product.images[0] || '/placeholder.png'}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-6"
                priority
              />
              {product.compareAtPrice && discount > 0 && (
                <span className="absolute top-4 left-4 wss-sale-badge">{discount}% OFF</span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {product.category?.name && (
              <p className="text-xs font-bold text-[var(--secondary)] uppercase tracking-wide">
                {product.category.name}
              </p>
            )}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">{product.name}</h1>

            <div>
              <span className="text-2xl font-bold text-[var(--secondary)]">${product.price.toFixed(2)}</span>
              {product.compareAtPrice && (
                <span className="text-lg text-gray-400 line-through ml-2">${product.compareAtPrice.toFixed(2)}</span>
              )}
              <span className="text-sm text-gray-500 block mt-1">per case</span>
            </div>

            {product.sku && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">SKU:</span> {product.sku}
              </p>
            )}
            {product.brand && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Brand:</span> {product.brand}
              </p>
            )}

            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-2 text-sm">
              {product.stock > 0 ? (
                <span className="text-green-600 font-semibold flex items-center gap-1">
                  <Icon name="CheckCircleIcon" size={16} />
                  In Stock ({product.stock} cases available)
                </span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 min-h-[44px] hover:bg-gray-50"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-4 py-2 min-w-[48px] text-center font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-2 min-h-[44px] hover:bg-gray-50"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
                className="btn-primary min-h-[44px] flex-1 sm:flex-none disabled:opacity-70"
              >
                <Icon name={isAdded ? 'CheckIcon' : 'ShoppingCartIcon'} size={18} />
                {isAdded ? 'Added to Cart!' : isAdding ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>

            <Link to="/bulk-order" className="text-sm text-[var(--secondary)] font-semibold hover:underline inline-flex items-center gap-1">
              <Icon name="CubeIcon" size={16} />
              Need 50+ cases? Request bulk quote
            </Link>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {relatedProducts.map((item) => (
                <Link key={item._id} to={`/products/${item._id}`} className="app-card p-3 hover:border-[var(--secondary)] transition-colors">
                  <p className="text-xs font-semibold text-gray-900 line-clamp-2">{item.name}</p>
                  <p className="text-sm font-bold text-[var(--secondary)] mt-1">${item.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

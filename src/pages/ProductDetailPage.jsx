import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppImage from '../components/ui/AppImage';
import Icon from '../components/ui/AppIcon';
import productsService from '../services/productsService';
import { useCartStore } from '../store/cartStore';
import BulkPricingTable from '../components/product/BulkPricingTable';
import ReviewSection from '../components/product/ReviewSection';
import QuestionSection from '../components/product/QuestionSection';
import ProductSlider from '../components/product/ProductSlider';

const isVideoUrl = (url) => /\.(mp4|webm|ogg|mov|avi)(\?|$)/i.test(url);

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [bestReviewedProducts, setBestReviewedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [lightBoxIndex, setLightBoxIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const isSwiping = useRef(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await productsService.getProductById(productId);
        setProduct(response.product);

        const [relatedRes, popularRes, topRes, bestRes] = await Promise.allSettled([
          response.product.category?._id
            ? productsService.getRelatedProducts(response.product.category._id, productId, 12)
            : Promise.resolve({ products: [] }),
          productsService.getPopularProducts(12, productId),
          productsService.getTopProducts(12, productId),
          productsService.getBestReviewedProducts(12, productId),
        ]);

        if (relatedRes.status === 'fulfilled') setRelatedProducts(relatedRes.value.products);
        if (popularRes.status === 'fulfilled') setPopularProducts(popularRes.value.products);
        if (topRes.status === 'fulfilled') setTopProducts(topRes.value.products);
        if (bestRes.status === 'fulfilled') setBestReviewedProducts(bestRes.value.products);
      } catch (err) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    setCurrentSlide(0);
    setQuantity(1);
    setLightBoxIndex(null);
    window.scrollTo(0, 0);
  }, [productId]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightBoxIndex(null);
      if (lightBoxIndex === null) return;
      if (e.key === 'ArrowRight') setLightBoxIndex((i) => (i !== null && product ? Math.min(i + 1, images.length - 1) : i));
      if (e.key === 'ArrowLeft') setLightBoxIndex((i) => (i !== null ? Math.max(i - 1, 0) : i));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightBoxIndex, product]);

  const handleAddToCart = async () => {
    if (!product || product.stock === 0 || isAdding) return;
    setIsAdding(true);
    await new Promise((r) => setTimeout(r, 300));

    let effectivePrice = product.price;
    if (product.bulkPricingTiers && product.bulkPricingTiers.length > 0) {
      const sorted = [...product.bulkPricingTiers].sort((a, b) => a.minQuantity - b.minQuantity);
      for (const tier of sorted) {
        if (quantity >= tier.minQuantity) effectivePrice = tier.price;
      }
    }

    const cartProduct = {
      ...product,
      price: effectivePrice,
      categoryId: product.category._id,
      categoryName: product.category.name,
      isNew: product.isProductNew || false,
      isOnSale: product.isOnSale || (product.compareAtPrice ? product.compareAtPrice > product.price : false),
      originalPrice: product.compareAtPrice,
      caseSize: product.caseSize || '',
      rating: product.rating,
      reviewCount: product.reviewCount,
    };
    addItem(cartProduct);
    setIsAdding(false);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const goToSlide = useCallback((idx) => {
    if (!product) return;
    const max = (product.images?.length || 1) - 1;
    setCurrentSlide(Math.max(0, Math.min(idx, max)));
  }, [product]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    isSwiping.current = false;
  };

  const handleTouchMove = (e) => {
    const delta = e.touches[0].clientX - touchStartX.current;
    touchDeltaX.current = delta;
    if (Math.abs(delta) > 10) isSwiping.current = true;
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    if (touchDeltaX.current < -threshold) {
      goToSlide(currentSlide + 1);
    } else if (touchDeltaX.current > threshold) {
      goToSlide(currentSlide - 1);
    }
    isSwiping.current = false;
  };

  if (loading) {
    return (
      <div className="min-h-full bg-[#f5f5f5]">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 pt-5 pb-10 sm:pt-8">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-6" />
            <div className="bg-white rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5">
                  <div className="aspect-square bg-gray-200 rounded-lg" />
                  <div className="flex gap-2 mt-3">
                    {[1, 2, 3, 4].map((i) => <div key={i} className="w-16 h-16 bg-gray-200 rounded-lg" />)}
                  </div>
                </div>
                <div className="lg:col-span-7 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-8 bg-gray-200 rounded w-3/4" />
                  <div className="h-6 bg-gray-200 rounded w-1/3" />
                  <div className="h-24 bg-gray-200 rounded" />
                  <div className="h-12 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => <div key={i} className="h-48 bg-gray-200 rounded-xl" />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 py-16 text-center">
        <div className="bg-white border border-red-200 rounded-xl p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="ExclamationTriangleIcon" size={32} className="text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">{error || 'Product Not Found'}</h1>
          <p className="text-sm text-gray-600 mb-6">This product may have been removed or the link is incorrect.</p>
          <Link to="/products" className="btn-primary min-h-[44px] inline-flex">Browse Products</Link>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : ['/placeholder.png'];
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;
  const inStock = product.stock > 0;
  const lowStock = inStock && product.stock <= product.lowStockThreshold;

  const getEffectivePrice = () => {
    if (!product.bulkPricingTiers || product.bulkPricingTiers.length === 0) return product.price;
    const sorted = [...product.bulkPricingTiers].sort((a, b) => a.minQuantity - b.minQuantity);
    let bestPrice = product.price;
    for (const tier of sorted) {
      if (quantity >= tier.minQuantity) bestPrice = tier.price;
    }
    return bestPrice;
  };

  const effectivePrice = getEffectivePrice();

  const tabs = [
    { key: 'description', label: 'Description' },
    { key: 'specs', label: 'Specifications' },
    { key: 'reviews', label: `Reviews (${product.reviewCount || 0})` },
    { key: 'qa', label: 'Q&A' },
  ];

  return (
    <div className="min-h-full bg-[#f5f5f5]">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 pt-5 pb-10 sm:pt-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 flex-wrap">
          <Link to="/" className="hover:text-[#003087] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#003087] transition-colors">Shop</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link to={`/products?category=${product.category.slug}`} className="hover:text-[#003087] transition-colors">{product.category.name}</Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-700 font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* ===== MAIN PRODUCT CARD ===== */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image Slider */}
            <div className="lg:col-span-5 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-gray-100">
              {/* Main slider area */}
              <div className="relative rounded-lg bg-gray-50 border border-gray-100 overflow-hidden select-none">
                {/* Slides track */}
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="flex-shrink-0 w-full aspect-square relative cursor-pointer"
                      onClick={() => { if (!isSwiping.current) setLightBoxIndex(idx); }}
                    >
                      <div className="w-full h-full flex items-center justify-center p-4">
                        {isVideoUrl(img) ? (
                          <video src={img} controls preload="metadata" className="max-w-full max-h-full object-contain" />
                        ) : (
                          <img src={img} alt={`${product.name} ${idx + 1}`} className="max-w-full max-h-full object-contain" loading={idx === 0 ? 'eager' : 'lazy'} />
                        )}
                      </div>
                      {discount > 0 && idx === 0 && (
                        <span className="absolute top-3 left-3 bg-[#e8471e] text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-md z-10">
                          {discount}% OFF
                        </span>
                      )}
                      {product.isProductNew && idx === 0 && (
                        <span className="absolute top-3 right-3 bg-[#003087] text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider z-10">New</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Navigation arrows (desktop) */}
                {images.length > 1 && (
                  <>
                    {currentSlide > 0 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); goToSlide(currentSlide - 1); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center z-10 transition-opacity"
                        aria-label="Previous image"
                      >
                        <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                      </button>
                    )}
                    {currentSlide < images.length - 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); goToSlide(currentSlide + 1); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center z-10 transition-opacity"
                        aria-label="Next image"
                      >
                        <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </button>
                    )}
                  </>
                )}

                {/* Counter badge */}
                {images.length > 1 && (
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs font-medium px-2 py-0.5 rounded-full z-10">
                    {currentSlide + 1} / {images.length}
                  </span>
                )}
              </div>

              {/* Dots */}
              {images.length > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={`rounded-full transition-all duration-200 ${
                        currentSlide === idx ? 'w-5 h-2 bg-[#003087]' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 mt-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 overflow-hidden transition-all ${
                        currentSlide === idx ? 'border-[#003087] shadow-md' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {isVideoUrl(img) ? (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
                        </div>
                      ) : (
                        <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain p-1" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:col-span-7 p-4 sm:p-6 lg:p-8">
              <div className="space-y-4">
                {/* Title & Brand */}
                <div>
                  {product.brand && (
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Brand: {product.brand}</p>
                  )}
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    {product.sku && <span>SKU: {product.sku}</span>}
                    {product.category?.name && (
                      <Link to={`/products?category=${product.category.slug}`} className="text-[#003087] hover:underline">{product.category.name}</Link>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <button onClick={() => setActiveTab('reviews')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4"
                        style={{ color: star <= Math.round(product.rating || 0) ? '#f5a623' : '#d1d5db' }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{(product.rating || 0).toFixed(1)}</span>
                  <span className="text-sm text-gray-450">({product.reviewCount || 0} reviews)</span>
                </button>

                {/* Price */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-[#e8471e]">${effectivePrice.toFixed(2)}</span>
                    {product.compareAtPrice && (
                      <>
                        <span className="text-lg text-gray-400 line-through">${product.compareAtPrice.toFixed(2)}</span>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Save ${(product.compareAtPrice - effectivePrice).toFixed(2)}</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">per case · wholesale pricing</p>
                </div>

                {/* Bulk Pricing */}
                {product.bulkPricingTiers && product.bulkPricingTiers.length > 0 && (
                  <BulkPricingTable tiers={product.bulkPricingTiers} basePrice={product.price} quantity={quantity} />
                )}

                {/* Stock */}
                <div className="flex items-center gap-4">
                  {inStock ? (
                    <span className={`flex items-center gap-1.5 text-sm font-semibold ${lowStock ? 'text-amber-600' : 'text-green-600'}`}>
                      <Icon name="CheckCircleIcon" size={16} />
                      {lowStock ? `Low Stock — Only ${product.stock} left` : `In Stock — ${product.stock} cases available`}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-red-600">
                      <Icon name="ExclamationTriangleIcon" size={16} /> Out of Stock
                    </span>
                  )}
                </div>

                {/* Quantity + Add to Cart */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                    <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-4 py-3 min-h-[48px] hover:bg-gray-50 text-lg font-bold text-gray-600 transition-colors" aria-label="Decrease">−</button>
                    <span className="px-5 py-3 min-w-[56px] text-center font-bold text-lg border-x-2 border-gray-200">{quantity}</span>
                    <button type="button" onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} className="px-4 py-3 min-h-[48px] hover:bg-gray-50 text-lg font-bold text-gray-600 transition-colors" aria-label="Increase">+</button>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!inStock || isAdding}
                    className={`flex-1 min-h-[48px] px-6 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      isAdded ? 'bg-green-500 text-white' : inStock ? 'bg-[#e8471e] hover:bg-[#c73a17] text-white shadow-lg hover:shadow-xl' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Icon name={isAdded ? 'CheckIcon' : 'ShoppingCartIcon'} size={18} />
                    {isAdded ? 'Added to Cart!' : isAdding ? 'Adding...' : 'Add to Cart'}
                  </button>
                </div>

                {/* Bulk Order CTA */}
                <Link to="/bulk-order" className="flex items-center gap-2 bg-[#003087]/5 hover:bg-[#003087]/10 text-[#003087] text-sm font-semibold px-4 py-3 rounded-lg transition-colors border border-[#003087]/10">
                  <Icon name="CubeIcon" size={18} />
                  Need 50+ cases? Request a bulk quote
                  <Icon name="ArrowRightIcon" size={14} className="ml-auto" />
                </Link>

                {/* Trust Signals */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <Icon name="TruckIcon" size={20} className="mx-auto text-[#003087] mb-1" />
                    <p className="text-[11px] font-semibold text-gray-700">Free Shipping</p>
                    <p className="text-[10px] text-gray-500">Orders $150+</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <Icon name="ShieldCheckIcon" size={20} className="mx-auto text-[#003087] mb-1" />
                    <p className="text-[11px] font-semibold text-gray-700">Quality Guarantee</p>
                    <p className="text-[10px] text-gray-500">100% satisfaction</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <Icon name="ClockIcon" size={20} className="mx-auto text-[#003087] mb-1" />
                    <p className="text-[11px] font-semibold text-gray-700">Fast Delivery</p>
                    <p className="text-[10px] text-gray-500">1-3 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== TABS SECTION ===== */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-5 sm:px-6 py-3.5 text-sm font-semibold transition-colors relative whitespace-nowrap ${
                  activeTab === key ? 'text-[#003087]' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {label}
                {activeTab === key && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003087]" />}
              </button>
            ))}
          </div>

          <div className="p-5 sm:p-6">
            {activeTab === 'description' && (
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>
                {product.metaDescription && <p className="text-gray-500 mt-4 text-sm italic">{product.metaDescription}</p>}
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-0">
                {[
                  { label: 'Product Name', value: product.name },
                  product.sku && { label: 'SKU', value: product.sku },
                  product.brand && { label: 'Brand', value: product.brand },
                  product.category?.name && { label: 'Category', value: product.category.name },
                  { label: 'Price', value: `$${product.price.toFixed(2)} per case` },
                  product.caseSize && { label: 'Case Size', value: product.caseSize },
                  { label: 'Availability', value: inStock ? `${product.stock} cases in stock` : 'Out of Stock', highlight: inStock },
                  ...(product.attributes ? Object.entries(product.attributes).map(([key, value]) => ({ label: key, value: String(value) })) : []),
                ].filter(Boolean).map((item, idx) => (
                  <div key={idx} className={`grid grid-cols-2 border-b border-gray-100 py-3 ${idx % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
                    <span className="text-sm font-semibold text-gray-700">{(item).label}</span>
                    <span className={`text-sm ${(item).highlight === false ? 'text-red-600 font-semibold' : (item).highlight === true ? 'text-green-600 font-semibold' : 'text-gray-600'}`}>
                      {(item).value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && <ReviewSection productId={product._id} productName={product.name} />}
            {activeTab === 'qa' && <QuestionSection productId={product._id} />}
          </div>
        </div>

        {/* ===== PRODUCT RECOMMENDATION SLIDERS ===== */}
        <div className="space-y-2">
          {relatedProducts.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
              <ProductSlider
                title="Related Products"
                subtitle={`More from ${product.category?.name || 'this category'}`}
                products={relatedProducts}
                viewAllLink={`/products?category=${product.category?.slug}`}
                viewAllLabel={`View all ${product.category?.name || ''}`}
              />
            </div>
          )}

          {popularProducts.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
              <ProductSlider
                title="Popular Products"
                subtitle="Most purchased by our customers"
                products={popularProducts}
                viewAllLink="/products?sort=popular"
                viewAllLabel="View all popular"
              />
            </div>
          )}

          {topProducts.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
              <ProductSlider
                title="Top Products"
                subtitle="Featured and trending items"
                products={topProducts}
                viewAllLink="/products?sort=top"
                viewAllLabel="View all top"
              />
            </div>
          )}

          {bestReviewedProducts.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
              <ProductSlider
                title="Best Reviewed Products"
                subtitle="Highest rated by customers"
                products={bestReviewedProducts}
                viewAllLink="/products?sort=best-reviewed"
                viewAllLabel="View all reviewed"
              />
            </div>
          )}
        </div>
      </div>

      {/* ===== FULL-SCREEN LIGHTBOX ===== */}
      {lightBoxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
          onClick={() => setLightBoxIndex(null)}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/80">
            <span className="text-white text-sm font-medium">
              {lightBoxIndex + 1} / {images.length}
            </span>
            <button
              onClick={() => setLightBoxIndex(null)}
              className="text-white/80 hover:text-white p-1"
              aria-label="Close"
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main content area */}
          <div
            className="flex-1 flex items-center justify-center relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {lightBoxIndex > 0 && (
              <button
                onClick={() => setLightBoxIndex((i) => i - 1)}
                className="absolute left-2 sm:left-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-colors"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            <div className="w-full h-full flex items-center justify-center px-12 py-4">
              {isVideoUrl(images[lightBoxIndex]) ? (
                <video
                  src={images[lightBoxIndex]}
                  controls
                  autoPlay
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              ) : (
                <img
                  src={images[lightBoxIndex]}
                  alt={`${product.name} ${lightBoxIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>

            {lightBoxIndex < images.length - 1 && (
              <button
                onClick={() => setLightBoxIndex((i) => i + 1)}
                className="absolute right-2 sm:right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-colors"
                aria-label="Next image"
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Bottom thumbnail strip */}
          {images.length > 1 && (
            <div className="px-4 py-3 bg-black/80 flex items-center justify-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setLightBoxIndex(idx); }}
                  className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden border-2 transition-all ${
                    lightBoxIndex === idx ? 'border-white scale-105' : 'border-white/30 hover:border-white/60'
                  }`}
                >
                  {isVideoUrl(img) ? (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
                    </div>
                  ) : (
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { ProductCard } from '../components/product/ProductCard';
import { CategoryNav } from '../components/layout/CategoryNav';
import { Loader } from '../components/ui/Loader';
import { fetchCategoryBySlug } from '../services/categoryService';
import { fetchProducts } from '../services/productService';
import { addToCart } from '../store/slices/cartSlice';
import type { AppDispatch } from '../store';
import type { Product } from '../types';

export function CategoryProducts() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ['category', slug],
    queryFn: () => fetchCategoryBySlug(slug!),
    enabled: !!slug,
  });

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['products', 'category', category?._id],
    queryFn: () => fetchProducts({ category: category!._id, active: true, limit: 50 }),
    enabled: !!category?._id,
  });

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  if (categoryLoading || productsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-bold text-gray-900">Category not found</h2>
        <Link to="/categories" className="text-primary-600 hover:underline mt-2 inline-block">
          Browse all categories
        </Link>
      </div>
    );
  }

  const categoryProducts = productsData?.products || [];

  return (
    <div className="flex gap-6">
      <CategoryNav />
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <nav className="text-sm text-gray-500 mb-2">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/categories" className="hover:text-primary-600">Categories</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{category.name}</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
          <p className="text-gray-600 mt-1">{category.description}</p>
        </div>

        {categoryProducts.length === 0 ? (
          <p className="text-gray-600">No products in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

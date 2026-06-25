import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../../services/categoryService';
import { Loader } from '../ui/Loader';

export function CategoryNav() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return (
      <div className="hidden lg:block w-56 flex-shrink-0">
        <Loader />
      </div>
    );
  }

  return (
    <div className="hidden lg:block w-56 flex-shrink-0">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden sticky top-36">
        <div className="bg-primary-700 text-white px-4 py-3">
          <h2 className="font-semibold text-sm">Shop by Category</h2>
        </div>
        <ul className="divide-y divide-gray-100">
          <li>
            <Link
              to="/products"
              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium"
            >
              All Products
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category._id}>
              <Link
                to={`/categories/${category.slug}`}
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

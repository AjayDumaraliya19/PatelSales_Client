import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { Loader } from '../components/ui/Loader';
import { fetchCategories } from '../services/categoryService';

export function Categories() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
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
        <h1 className="text-2xl font-bold text-gray-900">Shop by Category</h1>
        <p className="text-gray-600 mt-1">Browse our full selection of commercial supplies</p>
      </div>

      {categories.length === 0 ? (
        <p className="text-gray-600 text-center py-12">No categories available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/categories/${category.slug}`}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-primary-400 hover:shadow-md transition-all group flex items-center gap-4"
            >
              <div className="w-16 h-16 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 overflow-hidden">
                {category.image ? (
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-primary-700">{category.name[0]}</span>
                )}
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-gray-900 group-hover:text-primary-700">{category.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{category.description}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

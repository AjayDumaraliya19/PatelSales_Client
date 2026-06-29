import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/ui/AppIcon';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Icon name="ExclamationTriangleIcon" size={64} className="text-[#003087] mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-[#003087] mb-2">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleGoBack}
            className="btn-secondary"
          >
            <Icon name="ArrowLeftIcon" size={16} />
            Go Back
          </button>
          <Link to="/" className="btn-primary">
            <Icon name="HomeIcon" size={16} />
            Go Home
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Popular pages:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link to="/" className="text-sm text-[#003087] hover:text-[#e8471e] transition-colors">
              Home
            </Link>
            <span className="text-gray-300">·</span>
            <Link to="/products" className="text-sm text-[#003087] hover:text-[#e8471e] transition-colors">
              Products
            </Link>
            <span className="text-gray-300">·</span>
            <Link to="/cart" className="text-sm text-[#003087] hover:text-[#e8471e] transition-colors">
              Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

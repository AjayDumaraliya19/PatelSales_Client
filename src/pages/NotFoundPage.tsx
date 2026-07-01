import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/ui/AppIcon';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-[#003087]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Icon name="ExclamationTriangleIcon" size={40} className="text-[#003087]" />
        </div>
        <h1 className="text-5xl font-bold text-[#003087] mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 text-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => window.history.back()} className="btn-secondary">
            <Icon name="ArrowLeftIcon" size={16} />
            Go Back
          </button>
          <Link to="/" className="btn-primary">
            <Icon name="HomeIcon" size={16} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import InfoPageLayout from '../components/info/InfoPageLayout';
import LegalContent from '../components/info/LegalContent';
import ContactForm from '../components/contact/ContactForm';
import { wholesaleFlyerSections } from '../data/sitePagesData';
import { mockProducts } from '../data/mockData';

export default function WholesaleFlyerPage() {
  const flyerProducts = mockProducts.filter((product) => product.isOnSale).slice(0, 8);

  return (
    <InfoPageLayout
      title="Wholesale Flyer"
      subtitle="Current deals on bulk food service disposables — case pricing."
      breadcrumbs={[
        { label: 'Patel Sales', href: '/' },
        { label: 'Wholesale Flyer' },
      ]}
    >
      <LegalContent sections={wholesaleFlyerSections} />

      <section className="mt-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Featured Flyer Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {flyerProducts.map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="app-card p-4 flex gap-3 hover:border-[var(--secondary)] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[var(--secondary)] font-semibold uppercase mb-1">
                  {product.categoryName}
                </p>
                <p className="text-sm font-bold text-gray-900 line-clamp-2">{product.name}</p>
                <p className="text-sm font-bold text-[var(--secondary)] mt-1">
                  ${product.price.toFixed(2)}/case
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through ml-2 font-normal">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to="/products" className="btn-outline min-h-[44px] inline-flex">
            View All Products
          </Link>
        </div>
      </section>
    </InfoPageLayout>
  );
}

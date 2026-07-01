import React from 'react';
import ProductsClientPage from '../components/products/ProductsClientPage';
import { mockProducts, mockCategories } from '../data/mockData';

export default function ProductsPage() {
  return (
    <div className="min-h-full bg-[#f5f5f5]">
      <ProductsClientPage products={mockProducts} categories={mockCategories} />
    </div>
  );
}

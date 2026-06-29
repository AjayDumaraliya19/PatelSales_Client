import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import ProductsClientPage from '../components/products/ProductsClientPage';
import { mockProducts, mockCategories } from '../data/mockData';

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f5f5f5] pt-[108px] lg:pt-[140px]">
        <ProductsClientPage
          products={mockProducts}
          categories={mockCategories}
        />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import HeroSection from '../components/HeroSection';
import CategoryBento from '../components/CategoryBento';
import FlashSaleSection from '../components/FlashSaleSection';
import TrustSection from '../components/TrustSection';
import TestimonialsSection from '../components/TestimonialsSection';
import PWAInstallBanner from '../components/PWAInstallBanner';
import { mockCategories, mockProducts } from '../data/mockData';

export default function HomePage() {
  const flashSaleProducts = mockProducts.filter(p => p.isOnSale).slice(0, 4);

  return (
    <>
      <PWAInstallBanner />
      <Header />
      <main className="min-h-screen bg-[#f5f5f5]">
        <HeroSection />
        <CategoryBento categories={mockCategories} />
        <FlashSaleSection products={flashSaleProducts} />
        <TrustSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import CartClientPage from '../components/cart/CartClientPage';

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f5f5f5] pt-[108px] lg:pt-[140px]">
        <CartClientPage />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

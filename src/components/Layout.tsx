import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import '../styles/tailwind.css';

// Pages
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import GetTheAppPage from '../pages/GetTheAppPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function Layout() {
  return (
    <html lang="en" className="font-sans">
      <body className="font-body">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/get-the-app" element={<GetTheAppPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </body>
    </html>
  );
}

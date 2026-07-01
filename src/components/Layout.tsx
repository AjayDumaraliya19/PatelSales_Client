import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from './AppShell';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import GetTheAppPage from '../pages/GetTheAppPage';
import DisposablesPage from '../pages/DisposablesPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function Layout() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/disposables" element={<DisposablesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/get-the-app" element={<GetTheAppPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

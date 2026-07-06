import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from './AppShell';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderConfirmationPage from '../pages/OrderConfirmationPage';
import GetTheAppPage from '../pages/GetTheAppPage';
import DisposablesPage from '../pages/DisposablesPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ContactPage from '../pages/ContactPage';
import TrackOrderPage from '../pages/TrackOrderPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';
import ShippingPage from '../pages/ShippingPage';
import ReturnsPage from '../pages/ReturnsPage';
import FaqPage from '../pages/FaqPage';
import CookiePolicyPage from '../pages/CookiePolicyPage';
import BusinessAccountsPage from '../pages/BusinessAccountsPage';
import BulkOrderPage from '../pages/BulkOrderPage';
import WholesaleFlyerPage from '../pages/WholesaleFlyerPage';
import AccountPage from '../pages/AccountPage';
import OrderHistoryPage from '../pages/OrderHistoryPage';
import OrderDetailsPage from '../pages/OrderDetailsPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './auth/ProtectedRoute';

export default function Layout() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/disposables" element={<DisposablesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/get-the-app" element={<GetTheAppPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
        <Route path="/account/orders" element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} />
        <Route path="/account/orders/:orderId" element={<ProtectedRoute><OrderDetailsPage /></ProtectedRoute>} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/returns" element={<ReturnsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="/business-accounts" element={<BusinessAccountsPage />} />
        <Route path="/bulk-order" element={<BulkOrderPage />} />
        <Route path="/wholesale-flyer" element={<WholesaleFlyerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

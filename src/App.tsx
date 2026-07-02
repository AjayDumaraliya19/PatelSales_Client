import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { useAuthStore } from './store/authStore';
import { useCartStore } from './store/cartStore';

function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();
  const { fetchCart } = useCartStore();

  // Check authentication and fetch cart on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Fetch cart when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  );
}

export default App;

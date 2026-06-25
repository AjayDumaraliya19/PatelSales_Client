import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { AccountLayout } from '../layouts/AccountLayout';
import { Home } from '../pages/Home';
import { Products } from '../pages/Products';
import { ProductDetail } from '../pages/ProductDetail';
import { Cart } from '../pages/Cart';
import { Checkout } from '../pages/Checkout';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Profile } from '../pages/Profile';
import { Orders } from '../pages/Orders';
import { OrderDetail } from '../pages/OrderDetail';
import { Categories } from '../pages/Categories';
import { CategoryProducts } from '../pages/CategoryProducts';
import { Search } from '../pages/Search';
import { AccountDashboard } from '../pages/AccountDashboard';
import { Addresses } from '../pages/Addresses';
import { ChangePassword } from '../pages/ChangePassword';
import { TrackOrder } from '../pages/TrackOrder';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:id', element: <ProductDetail /> },
      { path: 'categories', element: <Categories /> },
      { path: 'categories/:slug', element: <CategoryProducts /> },
      { path: 'search', element: <Search /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'profile', element: <Navigate to="/account/profile" replace /> },
      { path: 'orders', element: <Navigate to="/account/orders" replace /> },
      {
        path: 'account',
        element: <AccountLayout />,
        children: [
          { index: true, element: <AccountDashboard /> },
          { path: 'orders', element: <Orders /> },
          { path: 'orders/:id', element: <OrderDetail /> },
          { path: 'track-order', element: <TrackOrder /> },
          { path: 'profile', element: <Profile /> },
          { path: 'addresses', element: <Addresses /> },
          { path: 'password', element: <ChangePassword /> },
        ],
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);

import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart, User, Search, ChevronDown, Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { selectCartItemsCount } from '../store/slices/cartSlice';
import { BottomNav } from '../components/layout/BottomNav';
import { fetchCategories } from '../services/categoryService';

export function Layout() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const cartItemsCount = useSelector(selectCartItemsCount);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowMobileMenu(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top promo bar */}
      <div className="bg-primary-800 text-white text-center text-xs sm:text-sm py-1.5 px-4">
        Commercial Supplies & Equipment — Fast shipping to keep your business running
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 sm:gap-4 h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <span className="text-lg sm:text-xl font-bold text-primary-700">Patel Sales</span>
            </Link>

            {/* Search - Webstaurant style */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden sm:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border-2 border-gray-300 rounded-md text-sm focus:outline-none focus:border-primary-500"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-3 bg-primary-600 text-white rounded-r-md hover:bg-primary-700"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4 ml-auto">
              {/* Mobile search icon */}
              <Link to="/search" className="sm:hidden p-2 text-gray-600">
                <Search className="w-5 h-5" />
              </Link>

              {/* Account */}
              <div className="relative">
                <button
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  className="flex items-center gap-1 p-2 text-gray-700 hover:text-primary-600 text-sm"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline font-medium">
                    {user ? user.name.split(' ')[0] : 'Account'}
                  </span>
                  <ChevronDown className="w-3 h-3 hidden md:inline" />
                </button>
                {showAccountMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowAccountMenu(false)} />
                    <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                      {user ? (
                        <>
                          <Link
                            to="/account"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowAccountMenu(false)}
                          >
                            My Account
                          </Link>
                          <Link
                            to="/account/orders"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowAccountMenu(false)}
                          >
                            My Orders
                          </Link>
                          <Link
                            to="/account/track-order"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowAccountMenu(false)}
                          >
                            Track Order
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowAccountMenu(false)}
                          >
                            Sign In
                          </Link>
                          <Link
                            to="/register"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowAccountMenu(false)}
                          >
                            Create An Account
                          </Link>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Cart */}
              <Link to="/cart" className="relative flex items-center gap-1 p-2 text-gray-700 hover:text-primary-600">
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden md:inline text-sm font-medium">Cart</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 md:static md:ml-0 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              <button
                className="lg:hidden p-2 text-gray-600"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <form onSubmit={handleSearch} className="sm:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-primary-500"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Category navigation bar - desktop */}
        <div className="hidden lg:block border-t border-gray-100 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              <Link
                to="/products"
                className="px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-primary-600 whitespace-nowrap"
              >
                All Products
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/categories/${cat.slug}`}
                  className="px-3 py-2.5 text-sm text-gray-600 hover:text-primary-600 whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile category menu */}
        {showMobileMenu && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3">
            <nav className="space-y-1">
              <Link
                to="/products"
                className="block py-2 text-sm font-medium text-gray-700"
                onClick={() => setShowMobileMenu(false)}
              >
                All Products
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/categories/${cat.slug}`}
                  className="block py-2 text-sm text-gray-600"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-20 md:pb-6">
        <Outlet />
      </main>

      {/* Footer - Webstaurant style */}
      <footer className="bg-white border-t border-gray-200 mt-auto hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3">Services</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/account/track-order" className="hover:text-primary-600">Track Your Order</Link></li>
                <li><Link to="/account" className="hover:text-primary-600">My Account</Link></li>
                <li><a href="#" className="hover:text-primary-600">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/categories" className="hover:text-primary-600">Shop Categories</Link></li>
                <li><Link to="/products" className="hover:text-primary-600">Weekly Sales</Link></li>
                <li><a href="#" className="hover:text-primary-600">Food Service Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3">About</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary-600">About Us</a></li>
                <li><a href="#" className="hover:text-primary-600">Return Policy</a></li>
                <li><a href="#" className="hover:text-primary-600">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3">Get Quick Help</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Email: info@patelsales.com</li>
                <li>Phone: +91 12345 67890</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
            <p>&copy; 2026 Patel Sales. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <BottomNav />
    </div>
  );
}

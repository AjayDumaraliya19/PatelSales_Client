import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, ShoppingCart, Package, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { selectCartItemsCount } from '../../store/slices/cartSlice';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/categories', label: 'Categories', icon: Grid3X3 },
  { to: '/cart', label: 'Cart', icon: ShoppingCart, showBadge: true },
  { to: '/account/orders', label: 'Orders', icon: Package },
  { to: '/account', label: 'Account', icon: User },
];

export function BottomNav() {
  const location = useLocation();
  const cartItemsCount = useSelector(selectCartItemsCount);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ to, label, icon: Icon, showBadge }) => (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center justify-center flex-1 h-full relative ${
              isActive(to) ? 'text-primary-600' : 'text-gray-500'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {showBadge && cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

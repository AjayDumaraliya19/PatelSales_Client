import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './ui/AppIcon';
import { useCartStore } from '../store/cartStore';

const navItems = [
  { href: '/', icon: 'HomeIcon', label: 'Home', match: (path) => path === '/' },
  {
    href: '/products',
    icon: 'Squares2X2Icon',
    label: 'Shop',
    match: (path) =>
      path.startsWith('/products') || path === '/disposables',
  },
  {
    href: '/cart',
    icon: 'ShoppingCartIcon',
    label: 'Cart',
    match: (path) => path === '/cart',
    badge: true,
  },
  {
    href: '/track-order',
    icon: 'TruckIcon',
    label: 'Track',
    match: (path) => path === '/track-order',
  },
  {
    href: '/account',
    icon: 'UserCircleIcon',
    label: 'Account',
    match: (path) => path === '/account' || path === '/login' || path === '/register' || path.startsWith('/account/'),
  },
];

export default function BottomNav() {
  const location = useLocation();
  const itemCount = useCartStore((s) => s?.getItemCount());

  return (
    <nav className="app-bottom-nav lg:hidden" aria-label="Mobile navigation">
      <div className="app-bottom-nav__inner">
        {navItems.map((item) => {
          const isActive = item.match(location.pathname);
          return (
            <Link
              key={item.label}
              to={item.href}
              className={`app-bottom-nav__item ${isActive ? 'app-bottom-nav__item--active' : ''}`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <Icon name={item.icon} size={22} />
                {item.badge && itemCount > 0 && (
                  <span className="app-bottom-nav__badge">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
              <span className="app-bottom-nav__label">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

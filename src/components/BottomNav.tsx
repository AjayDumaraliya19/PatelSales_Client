import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './ui/AppIcon';
import { useCartStore } from '../store/cartStore';

export default function BottomNav() {
  const itemCount = useCartStore((s) => s?.getItemCount());

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#003087] border-t border-white/20 bottom-nav-safe"
      aria-label="Mobile navigation"
    >
      <div className="flex items-stretch h-14">
        {[
          { href: '/', icon: 'HomeIcon' as const, label: 'Home' },
          { href: '/products', icon: 'Squares2X2Icon' as const, label: 'Products' },
          { href: '/products', icon: 'TagIcon' as const, label: 'Deals' },
          { href: '/cart', icon: 'ShoppingCartIcon' as const, label: 'Cart', badge: itemCount },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors relative"
            aria-label={item.label}
          >
            <div className="relative">
              <Icon name={item.icon} size={20} />
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] bg-[#e8471e] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

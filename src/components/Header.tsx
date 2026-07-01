import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './ui/AppIcon';
import { useCartStore } from '../store/cartStore';

interface CategoryItem {
  label: string;
  href: string;
  active?: boolean;
  subMenu?: {
    main: { title: string; image: string }[];
    more: string[];
  };
}

const categories: CategoryItem[] = [
  {
    label: 'Disposables',
    href: '/disposables',
    subMenu: {
      main: [
        { title: 'Portion Cups & Lids', image: '' },
        { title: 'Plastic Containers', image: '' },
        { title: 'Paper Napkins & Towels', image: '' },
        { title: 'Paper Bags', image: '' },
        { title: 'Microwaveable Containers', image: '' },
      ],
      more: [
        'Ken\'s Salad Dressings',
        'Foil Products',
        'Foam Containers',
        'Eco Friendly Products',
        'Disposable Plastic Cups',
        'Disposable Gloves',
      ],
    },
  },
  { label: 'Restaurant Equipment', href: '/products' },
  { label: 'Refrigeration', href: '/products' },
  { label: 'Smallwares', href: '/products' },
  { label: 'Food & Beverage', href: '/products' },
  { label: 'Tabletop', href: '/products' },
  { label: 'Furniture', href: '/products' },
  { label: 'Storage & Transport', href: '/products' },
  { label: 'Janitorial', href: '/products' },
  { label: 'Industrial', href: '/products' },
  { label: 'Foam Products', href: '/products' },
  { label: 'Uncategorized', href: '/products' },
];

const wholesaleOfferItems = [
  { label: 'Wholesale Flyer', href: '/products' },
  { label: 'Return Wholesale Flyer', href: '/products' },
];

const mainMenu = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Shop', href: '/products' },
  { label: 'Wholesale Offer', href: '/products', hasDropdown: true, dropdownType: 'wholesale' },
  { label: 'Categories', href: '/products', hasDropdown: true, dropdownType: 'categories' },
  { label: 'Track Order', href: '/products' },
  { label: 'Contact Us', href: '/products' },
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [wholesaleDropdownOpen, setWholesaleDropdownOpen] = useState(false);

  const itemCount = useCartStore((s) => s?.getItemCount());
  const searchRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
        setCategoriesDropdownOpen(false);
        setWholesaleDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeMobileMenu]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoriesDropdownOpen && !(event.target as Element).closest('.categories-dropdown')) {
        setCategoriesDropdownOpen(false);
      }
      if (wholesaleDropdownOpen && !(event.target as Element).closest('.wholesale-dropdown')) {
        setWholesaleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [categoriesDropdownOpen, wholesaleDropdownOpen]);

  const isMenuActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <header id="site-header" className="fixed top-0 left-0 right-0 z-50">
      {/* ── Utility bar ── hidden on mobile | md+: full info | lg+: utility links */}
      <div className="hidden md:block wss-utility-bar bg-gradient-to-r from-[#002244] to-[#003087]">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 py-1.5 md:py-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 overflow-hidden">
            <a
              href="tel:+17327627840"
              className="flex items-center gap-1.5 hover:text-white transition-colors shrink-0"
            >
              <Icon name="PhoneIcon" size={12} className="shrink-0" />
              <span className="text-xs sm:text-sm font-medium truncate">(732) 762-7840</span>
            </a>

            <span className="hidden md:inline text-white/20">|</span>
            <span className="hidden md:flex items-center gap-1.5 min-w-0">
              <Icon name="MapPinIcon" size={12} className="shrink-0" />
              <span className="text-xs sm:text-sm truncate">North Brunswick, NJ</span>
            </span>

            <span className="hidden lg:inline text-white/20">|</span>
            <span className="hidden lg:flex items-center gap-1.5 shrink-0">
              <Icon name="ClockIcon" size={12} />
              <span className="text-xs sm:text-sm">Mon–Sat 8am–6pm</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Main header ── mobile: 2 rows | md+: single row | lg+: full layout */}
      <div className="wss-header bg-gradient-to-r from-[#003087] to-[#0040a0] shadow-lg">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
          {/* Row 1: logo + actions */}
          <div className="flex items-center justify-between gap-2 py-2.5 md:py-3 lg:py-4">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-lg md:rounded-xl shadow-md flex items-center justify-center p-1">
                <img src="/logo.png" alt="Patel Sales Logo" className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0 hidden sm:block">
                <div className="text-white font-bold text-sm sm:text-base md:text-xl leading-tight tracking-wide">
                  PATEL
                </div>
                <div className="text-white/70 text-[10px] sm:text-xs leading-tight font-medium hidden sm:block">
                  SALES LLC
                </div>
              </div>
            </Link>

            {/* Search — tablet & desktop inline */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex flex-1 max-w-2xl lg:max-w-3xl mx-3 lg:mx-6"
            >
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="Search foam cups, foil pans, containers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 min-w-0 px-3 lg:px-5 py-2 lg:py-3 text-sm border-0 outline-none rounded-l-lg text-gray-800 placeholder-gray-400 bg-white"
                />
                <button
                  type="submit"
                  className="bg-[#e8471e] hover:bg-[#c73a17] text-white px-4 lg:px-8 py-2 lg:py-3 font-semibold text-sm transition-colors rounded-r-lg flex items-center gap-1.5 shrink-0"
                  aria-label="Search"
                >
                  <Icon name="MagnifyingGlassIcon" size={18} />
                  <span className="hidden lg:inline">Search</span>
                </button>
              </div>
            </form>

            {/* Action icons */}
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              <Link
                to="/register"
                className="hidden md:flex flex-col items-center justify-center min-w-[44px] min-h-[44px] md:min-w-[52px] px-1 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Icon name="UserCircleIcon" size={22} />
                <span className="text-[10px] font-medium hidden lg:block mt-0.5">Account</span>
              </Link>

              <Link
                to="/cart"
                className="hidden md:flex flex-col items-center justify-center min-w-[44px] min-h-[44px] md:min-w-[52px] px-1 text-white hover:bg-white/10 rounded-lg transition-colors relative"
                aria-label={`Cart — ${itemCount} items`}
              >
                <div className="relative">
                  <Icon name="ShoppingCartIcon" size={22} />
                  {itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] bg-[#e8471e] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium hidden lg:block mt-0.5">Cart</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-1 text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                <Icon name={mobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={22} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Main navigation bar */}
      <div className="hidden md:block bg-white shadow-md border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex items-center">
            {mainMenu.map((item) => (
              <div
                key={item.label}
                className={`relative shrink-0 ${item.dropdownType === 'categories' ? 'categories-dropdown' : item.dropdownType === 'wholesale' ? 'wholesale-dropdown' : ''}`}
                onMouseEnter={() => {
                  if (item.hasDropdown) {
                    if (item.dropdownType === 'categories') setCategoriesDropdownOpen(true);
                    if (item.dropdownType === 'wholesale') setWholesaleDropdownOpen(true);
                  }
                }}
                onMouseLeave={() => {
                  if (item.hasDropdown) {
                    if (item.dropdownType === 'categories') setCategoriesDropdownOpen(false);
                    if (item.dropdownType === 'wholesale') setWholesaleDropdownOpen(false);
                  }
                }}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 text-xs lg:text-sm font-semibold px-4 lg:px-6 py-3 whitespace-nowrap border-r border-gray-100 transition-colors ${
                    isMenuActive(item.href)
                      ? 'text-[#003087] bg-[#003087]/5 font-bold'
                      : 'text-gray-700 hover:text-[#003087] hover:bg-gray-50'
                  }`}
                  aria-haspopup="true"
                  aria-expanded={item.hasDropdown ? (item.dropdownType === 'categories' ? categoriesDropdownOpen : item.dropdownType === 'wholesale' ? wholesaleDropdownOpen : false) : undefined}
                >
                  {item.label}
                  {item.hasDropdown && <Icon name="ChevronDownIcon" size={12} />}
                </Link>

                {/* Categories Dropdown */}
                {item.hasDropdown && item.dropdownType === 'categories' && categoriesDropdownOpen && (
                  <div
                    className="absolute top-full left-0 w-full min-w-[900px] max-w-[1200px] bg-white rounded-xl border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-50 opacity-0 translate-y-3 transition-all duration-250 ease-out"
                    style={{ opacity: categoriesDropdownOpen ? 1 : 0, transform: categoriesDropdownOpen ? 'translateY(0)' : 'translateY(12px)' }}
                    role="menu"
                    aria-label="Categories menu"
                  >
                    <div className="flex">
                      {/* Left Section - 40% */}
                      <div className="w-[40%] p-6 border-r border-gray-100">
                        <div className="grid grid-cols-3 gap-x-4 gap-y-6">
                          {categories[0]?.subMenu?.main.map((cat, index) => (
                            <Link
                              key={index}
                              to={categories[0].href}
                              className="group flex flex-col items-center text-center p-3 rounded-lg border border-transparent hover:bg-[#F8FFF6] hover:border-[#2F7D32] transition-all duration-250"
                            >
                              <div className="w-[70px] h-[70px] bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-250">
                                <div className="w-12 h-12 bg-gray-100 rounded" />
                              </div>
                              <span className="text-[#2F7D32] font-semibold text-sm group-hover:text-[#1a5c1e] transition-colors">
                                {cat.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Right Section - 60% */}
                      <div className="w-[60%] p-8 bg-[#F7F7F5] rounded-r-xl">
                        <h3 className="text-lg font-bold text-[#333] mb-6">
                          More in {categories[0]?.label}
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                          {(() => {
                            const moreLinks = categories[0]?.subMenu?.more || [];
                            const col1 = moreLinks.slice(0, 3);
                            const col2 = moreLinks.slice(3, 6);
                            return [col1, col2].map((col, colIndex) => (
                              <div key={colIndex} className="space-y-1">
                                {col.map((link, linkIndex) => (
                                  <Link
                                    key={linkIndex}
                                    to={categories[0]?.href || '/products'}
                                    className="block text-[15px] text-[#555] leading-8 hover:text-[#2F7D32] hover:translate-x-1 transition-all duration-250"
                                  >
                                    {link}
                                  </Link>
                                ))}
                              </div>
                            ));
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Wholesale Dropdown */}
                {item.hasDropdown && item.dropdownType === 'wholesale' && wholesaleDropdownOpen && (
                  <div
                    className="absolute top-full left-0 w-[200px] bg-white rounded-xl border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-50 opacity-0 translate-y-3 transition-all duration-250 ease-out"
                    style={{ opacity: wholesaleDropdownOpen ? 1 : 0, transform: wholesaleDropdownOpen ? 'translateY(0)' : 'translateY(12px)' }}
                    role="menu"
                    aria-label="Wholesale offer menu"
                  >
                    <div className="p-2">
                      {wholesaleOfferItems.map((offer, index) => (
                        <Link
                          key={index}
                          to={offer.href}
                          className="block px-4 py-3 text-sm text-gray-700 hover:text-[#003087] hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          {offer.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile / tablet drawer ── */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div className="absolute left-0 right-0 top-full z-50 lg:hidden bg-white shadow-2xl max-h-[calc(100dvh-4rem)] overflow-hidden flex flex-col border-t border-gray-200">
            <nav className="flex-1 overflow-y-auto thin-scrollbar">
              {/* Search in menu */}
              <div className="px-4 py-3 border-b border-gray-100">
                <form onSubmit={handleSearchSubmit}>
                  <div className="flex w-full">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 min-w-0 px-4 py-2.5 text-sm border border-gray-300 rounded-l-lg outline-none focus:border-[#003087] bg-gray-50"
                    />
                    <button
                      type="submit"
                      className="bg-[#003087] hover:bg-[#002266] text-white px-4 py-2.5 font-semibold text-sm rounded-r-lg shrink-0"
                      aria-label="Search"
                    >
                      <Icon name="MagnifyingGlassIcon" size={18} />
                    </button>
                  </div>
                </form>
              </div>

              {/* Main navigation */}
              <div className="px-3 py-2 space-y-0.5">
                {mainMenu.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-3 text-gray-800 hover:bg-gray-50 rounded-lg text-sm font-semibold"
                  >
                    <Icon name="ChevronRightIcon" size={18} className="text-[#003087]" />
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Contact info — mobile drawer footer */}
              <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-2 mt-2">
                <a href="tel:+17327627840" className="flex items-center gap-2 text-sm text-gray-700">
                  <Icon name="PhoneIcon" size={16} className="text-[#003087]" />
                  (732) 762-7840
                </a>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon name="MapPinIcon" size={16} className="text-[#003087]" />
                  North Brunswick, NJ
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon name="ClockIcon" size={16} className="text-[#003087]" />
                  Mon–Sat 8am–6pm
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

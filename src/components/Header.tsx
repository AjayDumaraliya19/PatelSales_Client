import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './ui/AppIcon';
import { useCartStore } from '../store/cartStore';
import { disposablesCategoryNav, PRODUCTS_PAGE_PATH } from '../data/productCategories';

const wholesaleOfferItems = [
  { label: 'Wholesale Flyer', href: '/wholesale-flyer' },
  { label: 'Returns & Exchanges', href: '/returns' },
];

const drawerMainMenuItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Categories', href: PRODUCTS_PAGE_PATH, hasDropdown: true, dropdownType: 'categories' as const },
  { label: 'Wholesale Offer', href: '/wholesale-flyer', hasDropdown: true, dropdownType: 'wholesale' as const },
];

const drawerQuickLinks = [
  { label: 'Get the App', href: '/get-the-app' },
  { label: 'Track Your Order', href: '/track-order' },
  { label: 'Wholesale Flyer', href: '/wholesale-flyer' },
  { label: 'Business Accounts', href: '/business-accounts' },
  { label: 'Contact Us', href: '/contact' },
];

const mainMenu = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Categories', href: PRODUCTS_PAGE_PATH, hasDropdown: true, dropdownType: 'categories' as const },
  { label: 'Wholesale Offer', href: '/wholesale-flyer', hasDropdown: true, dropdownType: 'wholesale' as const },
  { label: 'Track Order', href: '/track-order' },
  { label: 'Get the App', href: '/get-the-app' },
  { label: 'Contact Us', href: '/contact' },
];

function HeaderBrand({
  variant = 'desktop',
  onNavigate,
}: {
  variant?: 'mobile' | 'desktop';
  onNavigate?: () => void;
}) {
  const variantClass = variant === 'mobile' ? 'site-header-brand--mobile' : 'site-header-brand--desktop';

  return (
    <Link
      to="/"
      onClick={onNavigate}
      className={`site-header-brand ${variantClass}`}
      aria-label="Patel Sales — Home"
    >
      <img src="/brand_logo.png" alt="Patel Sales LLP" className="site-header-brand__img" />
    </Link>
  );
}

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [wholesaleDropdownOpen, setWholesaleDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [mobileWholesaleOpen, setMobileWholesaleOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  const itemCount = useCartStore((s) => s?.getItemCount());
  const searchRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(56);
  const location = useLocation();
  const navigate = useNavigate();

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setMobileWholesaleOpen(false);
    setMobileCategoriesOpen(false);
  }, []);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        setHeaderHeight(height);
        document.documentElement.style.setProperty('--site-header-height', `${height}px`);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' && headerRef.current
        ? new ResizeObserver(updateHeaderHeight)
        : null;
    if (headerRef.current && resizeObserver) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      resizeObserver?.disconnect();
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
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
        setAccountDropdownOpen(false);
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
      if (accountDropdownOpen && !(event.target as Element).closest('.account-dropdown')) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [categoriesDropdownOpen, wholesaleDropdownOpen, accountDropdownOpen]);

  const isMenuActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      closeMobileMenu();
    }
  };

  return (
    <header
      id="site-header"
      ref={headerRef}
      className={`relative md:fixed top-0 left-0 right-0 z-50 ${mobileMenuOpen ? 'site-header--menu-open' : ''}`}
    >
      {/* Mobile header — stays visible when menu is open */}
      <div className="md:hidden site-header-mobile">
        <div className="site-header-mobile__inner">
          <div className="site-header-mobile__top">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="site-header-menu-btn"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <Icon name={mobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
              <span>Menu</span>
            </button>

            <HeaderBrand variant="mobile" onNavigate={mobileMenuOpen ? closeMobileMenu : undefined} />

            <Link
              to="/cart"
              onClick={mobileMenuOpen ? closeMobileMenu : undefined}
              className="site-header-cart-btn"
              aria-label={`Cart — ${itemCount} items`}
            >
              <div className="site-header-cart-icon-wrap">
                <Icon name="ShoppingCartIcon" size={22} />
                {itemCount > 0 && (
                  <span className="site-header-cart-badge">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
            </Link>
          </div>

          <form onSubmit={handleSearchSubmit} className="site-header-mobile-search site-header-mobile-search--plain">
            <input
              type="search"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="site-header-mobile-search__input"
              aria-label="Search products"
            />
            <button type="submit" className="site-header-mobile-search__btn sr-only" aria-label="Search">
              <Icon name="MagnifyingGlassIcon" size={18} />
            </button>
          </form>
        </div>
      </div>

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
      <div className="hidden md:block wss-header bg-gradient-to-r from-[#003087] to-[#0040a0] shadow-lg">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
          {/* Row 1: logo + actions */}
          <div className="flex items-center justify-between gap-2 py-2.5 md:py-3 lg:py-3.5">
            <HeaderBrand variant="desktop" />

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
              <div className="relative hidden md:block account-dropdown">
                <button
                  type="button"
                  onClick={() => setAccountDropdownOpen((prev) => !prev)}
                  className="flex flex-col items-center justify-center min-w-[44px] min-h-[44px] md:min-w-[52px] px-1 text-white hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Account menu"
                  aria-haspopup="true"
                  aria-expanded={accountDropdownOpen}
                >
                  <Icon name="UserCircleIcon" size={22} />
                  <span className="text-[10px] font-medium hidden lg:block mt-0.5">Account</span>
                </button>

                {accountDropdownOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.12)] z-50 overflow-hidden animate-fade-in"
                    role="menu"
                    aria-label="Account menu"
                  >
                    <div className="p-2">
                      <Link
                        to="/login"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:text-[#003087] hover:bg-gray-50 rounded-lg transition-colors"
                        role="menuitem"
                      >
                        <Icon name="ArrowRightOnRectangleIcon" size={18} className="text-[#003087]" />
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:text-[#003087] hover:bg-gray-50 rounded-lg transition-colors"
                        role="menuitem"
                      >
                        <Icon name="UserPlusIcon" size={18} className="text-[#003087]" />
                        Register
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/cart"
                className="hidden md:flex flex-col items-center justify-center min-w-[44px] min-h-[44px] md:min-w-[52px] px-1 text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label={`Cart — ${itemCount} items`}
              >
                <div className="site-header-cart-icon-wrap">
                  <Icon name="ShoppingCartIcon" size={22} />
                  {itemCount > 0 && (
                    <span className="site-header-cart-badge">
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
                  className={`flex items-center gap-1 text-xs lg:text-sm font-semibold px-4 lg:px-6 py-3 whitespace-nowrap border-r border-gray-100 transition-colors ${isMenuActive(item.href)
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
                          {disposablesCategoryNav.subMenu.main.map((category) => (
                            <Link
                              key={category.slug}
                              to={category.href}
                              className="group flex flex-col items-center text-center p-3 rounded-lg border border-transparent hover:bg-[#F8FFF6] hover:border-[#2F7D32] transition-all duration-250"
                            >
                              <div className="w-[70px] h-[70px] bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-250">
                                <div className="w-12 h-12 bg-gray-100 rounded" />
                              </div>
                              <span className="text-[#2F7D32] font-semibold text-sm group-hover:text-[#1a5c1e] transition-colors">
                                {category.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Right Section - 60% */}
                      <div className="w-[60%] p-8 bg-[#F7F7F5] rounded-r-xl">
                        <h3 className="text-lg font-bold text-[#333] mb-6">
                          More in {disposablesCategoryNav.label}
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                          {(() => {
                            const moreLinks = disposablesCategoryNav.subMenu.more;
                            const col1 = moreLinks.slice(0, 3);
                            const col2 = moreLinks.slice(3, 6);
                            return [col1, col2].map((col, colIndex) => (
                              <div key={colIndex} className="space-y-1">
                                {col.map((link) => (
                                  <Link
                                    key={link.slug}
                                    to={link.href}
                                    className="block text-[15px] text-[#555] leading-8 hover:text-[#2F7D32] hover:translate-x-1 transition-all duration-250"
                                  >
                                    {link.title}
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

      {/* ── Mobile / tablet menu panel — opens below sticky header ── */}
      {mobileMenuOpen && (
        <>
          <button
            type="button"
            className="mobile-drawer-backdrop lg:hidden"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          />
          <div
            className="mobile-drawer mobile-drawer--open lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="mobile-drawer__scroll scrollbar-hide">
              {/* 2×2 utility buttons */}
              <div className="mobile-drawer__utility-grid">
                <Link to="/login" onClick={closeMobileMenu} className="mobile-drawer__utility-btn">
                  Sign In
                </Link>
                <Link to="/register" onClick={closeMobileMenu} className="mobile-drawer__utility-btn">
                  Create Account
                </Link>
                <Link to="/track-order" onClick={closeMobileMenu} className="mobile-drawer__utility-btn">
                  <Icon name="ArchiveBoxIcon" size={18} className="text-gray-500 shrink-0" />
                  Returns &amp; Orders
                </Link>
                <Link to="/faq" onClick={closeMobileMenu} className="mobile-drawer__utility-btn">
                  <Icon name="QuestionMarkCircleIcon" size={18} className="text-gray-500 shrink-0" />
                  Help Center
                </Link>
              </div>

              {/* Main menu — header nav items */}
              <nav aria-label="Main menu">
                {drawerMainMenuItems.map((item) => {
                  if (!item.hasDropdown) {
                    return (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={closeMobileMenu}
                        className={`mobile-drawer__dept-row ${isMenuActive(item.href) ? 'mobile-drawer__dept-row--active' : ''}`}
                        aria-current={isMenuActive(item.href) ? 'page' : undefined}
                      >
                        <span>{item.label}</span>
                        <Icon name="ChevronRightIcon" size={18} className="mobile-drawer__dept-chevron" />
                      </Link>
                    );
                  }

                  if (item.dropdownType === 'wholesale') {
                    const isOpen = mobileWholesaleOpen;
                    return (
                      <div key={item.label}>
                        <button
                          type="button"
                          onClick={() => setMobileWholesaleOpen((prev) => !prev)}
                          className="mobile-drawer__dept-row mobile-drawer__dept-row--toggle"
                          aria-expanded={isOpen}
                        >
                          <span>{item.label}</span>
                          <Icon
                            name="ChevronRightIcon"
                            size={18}
                            className={`mobile-drawer__dept-chevron ${isOpen ? 'mobile-drawer__dept-chevron--open' : ''}`}
                          />
                        </button>
                        {isOpen && (
                          <div className="mobile-drawer__sub">
                            {wholesaleOfferItems.map((offer) => (
                              <Link
                                key={offer.label}
                                to={offer.href}
                                onClick={closeMobileMenu}
                                className="mobile-drawer__sub-row"
                              >
                                {offer.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  if (item.dropdownType === 'categories') {
                    const isOpen = mobileCategoriesOpen;

                    return (
                      <div key={item.label}>
                        <button
                          type="button"
                          onClick={() => setMobileCategoriesOpen((prev) => !prev)}
                          className="mobile-drawer__dept-row mobile-drawer__dept-row--toggle"
                          aria-expanded={isOpen}
                        >
                          <span>{item.label}</span>
                          <Icon
                            name="ChevronRightIcon"
                            size={18}
                            className={`mobile-drawer__dept-chevron ${isOpen ? 'mobile-drawer__dept-chevron--open' : ''}`}
                          />
                        </button>
                        {isOpen && (
                          <div className="mobile-drawer__sub">
                            <Link
                              to={disposablesCategoryNav.href}
                              onClick={closeMobileMenu}
                              className="mobile-drawer__sub-row mobile-drawer__sub-row--heading"
                            >
                              All {disposablesCategoryNav.label}
                            </Link>
                            {disposablesCategoryNav.subMenu.main.map((subItem) => (
                              <Link
                                key={subItem.slug}
                                to={subItem.href}
                                onClick={closeMobileMenu}
                                className="mobile-drawer__sub-row"
                              >
                                {subItem.title}
                              </Link>
                            ))}
                            {disposablesCategoryNav.subMenu.more.map((subItem) => (
                              <Link
                                key={subItem.slug}
                                to={subItem.href}
                                onClick={closeMobileMenu}
                                className="mobile-drawer__sub-row"
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return null;
                })}
              </nav>

              <div className="mobile-drawer__divider" aria-hidden="true" />

              {/* Quick Links */}
              <h2 className="mobile-drawer__section-title">Quick Links</h2>
              <nav aria-label="Quick links">
                {drawerQuickLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={closeMobileMenu}
                    className={`mobile-drawer__quick-link ${isMenuActive(link.href) ? 'mobile-drawer__quick-link--active' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Get the App promo — bottom banner */}
            <Link
              to="/get-the-app"
              onClick={closeMobileMenu}
              className="mobile-drawer__app-promo"
              aria-label="Get the Patel Sales app"
            >
              <div className="mobile-drawer__app-phone" aria-hidden="true">
                <div className="mobile-drawer__app-phone-notch" />
                <div className="mobile-drawer__app-phone-bar">Patel Sales</div>
                <div className="mobile-drawer__app-phone-body">
                  <div className="mobile-drawer__app-phone-card" />
                  <div className="mobile-drawer__app-phone-grid">
                    <span /><span /><span /><span />
                  </div>
                </div>
              </div>
              <div className="mobile-drawer__app-copy">
                <p className="mobile-drawer__app-title">Get the App</p>
                <p className="mobile-drawer__app-sub">Stock up from anywhere, anytime.</p>
                <div className="mobile-drawer__app-badges">
                  <span className="mobile-drawer__store-badge">App Store</span>
                  <span className="mobile-drawer__store-badge">Google Play</span>
                </div>
              </div>
            </Link>
          </div>
        </>
      )}
    </header>
  );
}

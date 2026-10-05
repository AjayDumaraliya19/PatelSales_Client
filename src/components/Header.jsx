import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './ui/AppIcon';
import AppImage from './ui/AppImage';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useWishlistStore } from '../store/wishlistStore';
import categoriesService from '../services/categoriesService';
import { getCategoryImagePath } from '../data/categoryImages';
import { catalogCategories } from '../data/productCategories';

const PRODUCTS_PAGE_PATH = '/products';

const wholesaleOfferItems = [
  { label: 'Wholesale Flyer', href: '/wholesale-flyer' },
  { label: 'Returns & Exchanges', href: '/returns' },
];

const drawerMainMenuItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Categories', href: PRODUCTS_PAGE_PATH, hasDropdown: true, dropdownType: 'categories'},
  { label: 'Wholesale Offer', href: '/wholesale-flyer', hasDropdown: true, dropdownType: 'wholesale'},
];

const drawerQuickLinks = [
  { label: 'Get the App', href: '/get-the-app' },
  { label: 'Track Your Order', href: '/track-order' },
  { label: 'Wholesale Flyer', href: '/wholesale-flyer' },
  { label: 'Business Accounts', href: '/business-accounts' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
];

const mainMenu = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Categories', href: PRODUCTS_PAGE_PATH, hasDropdown: true, dropdownType: 'categories'},
  { label: 'Wholesale Offer', href: '/wholesale-flyer', hasDropdown: true, dropdownType: 'wholesale'},
  { label: 'Track Order', href: '/track-order' },
  { label: 'Get the App', href: '/get-the-app' },
  { label: 'Contact Us', href: '/contact' },
];

function HeaderBrand({
  variant = 'desktop',
  onNavigate,
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
  const [apiCategories, setApiCategories] = useState(catalogCategories);

  const itemCount = useCartStore((s) => s?.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const openWishlist = useWishlistStore((s) => s.openWishlist);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const searchRef = useRef(null);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(56);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch categories from API on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesService.getCategories();
        if (response?.categories?.length) {
          const activeCats = response.categories.filter((c) => c.isActive !== false);
          if (activeCats.length) {
            setApiCategories(activeCats);
          }
        }
      } catch (error) {
        console.error('Failed to fetch categories for header:', error);
      }
    };
    fetchCategories();
  }, []);

  // Split: first 6 with images, rest title-only
  const categoriesWithImages = apiCategories.slice(0, 6);
  const categoriesTitleOnly = apiCategories.slice(6);

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
    const handleEscape = (event) => {
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
    const handleClickOutside = (event) => {
      if (categoriesDropdownOpen && !(event.target).closest('.categories-dropdown')) {
        setCategoriesDropdownOpen(false);
      }
      if (wholesaleDropdownOpen && !(event.target).closest('.wholesale-dropdown')) {
        setWholesaleDropdownOpen(false);
      }
      if (accountDropdownOpen && !(event.target).closest('.account-dropdown')) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [categoriesDropdownOpen, wholesaleDropdownOpen, accountDropdownOpen]);

  const isMenuActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  const handleSearchSubmit = (e) => {
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
      className={`sticky md:fixed top-0 left-0 right-0 w-full z-50 ${mobileMenuOpen ? 'site-header--menu-open' : ''}`}
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
      <div className="hidden md:block wss-utility-bar bg-gradient-to-r from-[#003087]/95 to-[#0040a0]/95">
        <div className="w-full px-3 sm:px-4 md:px-6 py-1.5 md:py-2 flex items-center justify-between gap-2">
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
      <div className="hidden md:block wss-header bg-gradient-to-r from-[#003087]/90 to-[#0040a0]/90 shadow-lg">
        <div className="w-full px-3 sm:px-4 md:px-6">
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
                  {isAuthenticated && user ? (
                    <div className="w-[22px] h-[22px] rounded-full bg-[#e8471e] flex items-center justify-center text-white text-[10px] font-bold uppercase leading-none ring-2 ring-white/40">
                      {user.name?.[0] ?? user.email?.[0] ?? 'U'}
                    </div>
                  ) : (
                    <Icon name="UserCircleIcon" size={22} />
                  )}
                  <span className="text-[10px] font-medium hidden lg:block mt-0.5">
                    {isAuthenticated && user ? (user.name.split(' ')[0] ?? 'Account') : 'Account'}
                  </span>
                </button>

                {accountDropdownOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-60 bg-white rounded-xl border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.12)] z-50 overflow-hidden animate-fade-in"
                    role="menu"
                    aria-label="Account menu"
                  >
                    {isAuthenticated && user ? (
                      <>
                        {/* Logged-in user info */}
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#003087] flex items-center justify-center text-white text-sm font-bold uppercase shrink-0">
                              {user.name?.[0] ?? user.email?.[0] ?? 'U'}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-gray-900 truncate">
                                {user.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <Link
                            to="/account"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-[#003087] hover:bg-gray-50 rounded-lg transition-colors"
                            role="menuitem"
                          >
                            <Icon name="UserCircleIcon" size={18} className="text-[#003087]" />
                            My Account
                          </Link>
                          <Link
                            to="/track-order"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-[#003087] hover:bg-gray-50 rounded-lg transition-colors"
                            role="menuitem"
                          >
                            <Icon name="ArchiveBoxIcon" size={18} className="text-[#003087]" />
                            My Orders
                          </Link>
                          <button
                            type="button"
                            onClick={async () => {
                              setAccountDropdownOpen(false);
                              await logout();
                              navigate('/');
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            role="menuitem"
                          >
                            <Icon name="ArrowRightOnRectangleIcon" size={18} />
                            Logout
                          </button>
                        </div>
                      </>
                    ) : (
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
                    )}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={openWishlist}
                className="relative hidden md:flex flex-col items-center justify-center min-w-[44px] min-h-[44px] md:min-w-[52px] px-1 text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label={`Wishlist — ${wishlistCount} items`}
              >
                <div className="relative">
                  <Icon name="HeartIcon" size={22} />
                  {wishlistCount > 0 && (
                    <span className="site-header-cart-badge">{wishlistCount > 99 ? '99+' : wishlistCount}</span>
                  )}
                </div>
                <span className="text-[10px] font-medium hidden lg:block mt-0.5">Wishlist</span>
              </button>

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
        <div className="w-full px-3 sm:px-4 md:px-6">
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
                {item.hasDropdown && item.dropdownType === 'categories' && (
                  <div
                    className={`absolute top-full left-0 md:-left-8 lg:left-0 w-[880px] lg:w-[1000px] xl:w-[1120px] max-w-[calc(100vw-2rem)] bg-white rounded-xl border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-50 transition-all duration-300 ease-out ${
                      categoriesDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
                    }`}
                    onMouseEnter={() => setCategoriesDropdownOpen(true)}
                    onMouseLeave={() => setCategoriesDropdownOpen(false)}
                    role="menu"
                    aria-label="Categories menu"
                  >
                    <div className="flex">
                      {/* Left Section - 58% — first 6 categories with images */}
                      <div className="w-[58%] p-6 border-r border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-base lg:text-lg font-bold text-gray-800">Popular Categories</h3>
                          <Link
                            to="/products"
                            onClick={() => setCategoriesDropdownOpen(false)}
                            className="text-xs font-semibold text-[#003087] hover:text-[#e8471e] hover:underline"
                          >
                            All Categories &rarr;
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                          {categoriesWithImages.map((category) => (
                            <Link
                              key={category._id || category.slug}
                              to={`/products?category=${category.slug}`}
                              onClick={() => setCategoriesDropdownOpen(false)}
                              className="group flex flex-row items-center p-2.5 rounded-xl border border-gray-100 hover:bg-gradient-to-r hover:from-[#F8FFF6] hover:to-white hover:border-[#2F7D32] hover:shadow-md transition-all duration-300"
                            >
                              <div className="w-[46px] h-[46px] bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-center mr-2.5 overflow-hidden group-hover:shadow-md group-hover:border-[#2F7D32]/40 transition-all duration-300 shrink-0 relative">
                                <AppImage
                                  src={category.image || getCategoryImagePath(category.slug)}
                                  alt={category.name}
                                  fill
                                  className="object-contain p-1"
                                />
                              </div>
                              <span className="text-gray-700 font-semibold text-xs lg:text-sm group-hover:text-[#2F7D32] transition-colors leading-tight line-clamp-2">
                                {category.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Right Section - 42% — remaining categories title only */}
                      <div className="w-[42%] p-6 lg:p-7 bg-[#F7F7F5] rounded-r-xl flex flex-col justify-between">
                        <div>
                          <h3 className="text-base lg:text-lg font-bold text-[#333] mb-4">
                            More Categories
                          </h3>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                            {categoriesTitleOnly.map((category) => (
                              <Link
                                key={category._id || category.slug}
                                to={`/products?category=${category.slug}`}
                                onClick={() => setCategoriesDropdownOpen(false)}
                                className="block text-xs lg:text-sm text-[#555] py-1.5 hover:text-[#2F7D32] hover:translate-x-1 transition-all duration-200 font-medium truncate"
                              >
                                {category.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-200/60 mt-4">
                          <Link
                            to="/products"
                            onClick={() => setCategoriesDropdownOpen(false)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003087] hover:text-[#e8471e] transition-colors"
                          >
                            <span>Browse full catalog</span>
                            <Icon name="ArrowRightIcon" size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Wholesale Dropdown */}
                {item.hasDropdown && item.dropdownType === 'wholesale' && (
                  <div
                    className={`absolute top-full left-0 w-[200px] bg-white rounded-xl border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-50 transition-all duration-300 ease-out ${
                      wholesaleDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
                    }`}
                    onMouseEnter={() => setWholesaleDropdownOpen(true)}
                    onMouseLeave={() => setWholesaleDropdownOpen(false)}
                    role="menu"
                    aria-label="Wholesale offer menu"
                  >
                    <div className="p-2">
                      {wholesaleOfferItems.map((offer, index) => (
                        <Link
                          key={index}
                          to={offer.href}
                          className="block px-4 py-3 text-sm text-gray-700 hover:text-[#003087] hover:bg-gray-50 rounded-lg transition-all duration-300"
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
            className="mobile-drawer-backdrop md:hidden"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          />
          <div
            className="mobile-drawer mobile-drawer--open md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="mobile-drawer__scroll scrollbar-hide">
              {/* 2×2 utility buttons */}
              <div className="mobile-drawer__utility-grid">
                {isAuthenticated && user ? (
                  <>
                    <Link to="/account" onClick={closeMobileMenu} className="mobile-drawer__utility-btn mobile-drawer__utility-btn--user col-span-2 justify-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#003087] flex items-center justify-center text-white text-sm font-bold uppercase shrink-0">
                        {user.name?.[0] ?? user.email?.[0] ?? 'U'}
                      </div>
                      <div className="text-left min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </Link>
                    <Link to="/track-order" onClick={closeMobileMenu} className="mobile-drawer__utility-btn">
                      <Icon name="ArchiveBoxIcon" size={18} className="text-gray-500 shrink-0" />
                      My Orders
                    </Link>
                    <button
                      type="button"
                      onClick={async () => { closeMobileMenu(); await logout(); navigate('/'); }}
                      className="mobile-drawer__utility-btn text-red-600"
                    >
                      <Icon name="ArrowRightOnRectangleIcon" size={18} className="text-red-500 shrink-0" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={closeMobileMenu} className="mobile-drawer__utility-btn">
                      Sign In
                    </Link>
                    <Link to="/register" onClick={closeMobileMenu} className="mobile-drawer__utility-btn">
                      Create Account
                    </Link>
                  </>
                )}
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
                              to="/products"
                              onClick={closeMobileMenu}
                              className="mobile-drawer__sub-row mobile-drawer__sub-row--heading"
                            >
                              All Categories
                            </Link>
                            {apiCategories.map((category) => (
                              <Link
                                key={category._id}
                                to={`/products?category=${category.slug}`}
                                onClick={closeMobileMenu}
                                className="mobile-drawer__sub-row"
                              >
                                {category.name}
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

            {/* Login promo banner */}
            <Link
              to="/login"
              onClick={closeMobileMenu}
              className="flex-shrink-0 flex items-center justify-center p-4 bg-white border-t border-gray-200"
              aria-label="Login to Patel Sales"
            >
              <img
                src="/images/login-registration/login.png"
                alt="Login to Patel Sales"
                className="w-full h-auto rounded-lg"
              />
            </Link>
          </div>
        </>
      )}
    </header>
  );
}

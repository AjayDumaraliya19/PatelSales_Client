import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from './ui/AppIcon';
import { useCartStore } from '../store/cartStore';

const categories = [
  { 
    label: 'Restaurant Equipment', 
    href: '/products',
    subMenu: {
      main: [
        { title: 'Cooking Equipment', image: '' },
        { title: 'Commercial Work Tables', image: '' },
        { title: 'Food Preparation', image: '' },
        { title: 'Commercial Ovens', image: '' },
        { title: 'Food Holding & Warming', image: '' },
        { title: 'Beverage Equipment', image: '' },
        { title: 'Food Display', image: '' },
        { title: 'Dish Washing', image: '' },
      ],
      more: [
        'Equipment Parts',
        'Stainless Steel Work Tables',
        'Commercial Fryers',
        'Gas Ranges',
        'Convection Ovens',
        'Frozen Drink Machines',
        'Commercial Mixers',
        'Griddles',
        'Food Processors',
        'Meat Slicers',
        '3 Compartment Sinks',
        'Commercial Dishwashers',
        'Commercial Blenders',
        'Rapid Cook Ovens',
        'Vacuum Packaging',
        'Commercial Microwaves',
        'Charbroilers',
        'Espresso Machines',
        'Steam Tables',
        'Immersion Blenders',
      ]
    }
  },
  { label: 'Refrigeration', href: '/products' },
  { label: 'Smallwares', href: '/products' },
  { label: 'Food & Beverage', href: '/products' },
  { label: 'Tabletop', href: '/products' },
  { label: 'Disposables', href: '/products', active: true },
  { label: 'Furniture', href: '/products' },
  { label: 'Storage & Transport', href: '/products' },
  { label: 'Janitorial', href: '/products' },
  { label: 'Industrial', href: '/products' },
  { label: 'Business Type', href: '/products' },
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catNavOpen, setCatNavOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const itemCount = useCartStore((s) => s?.getItemCount());
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top utility bar */}
      <div className="wss-utility-bar bg-gradient-to-r from-[#002244] to-[#003087]">
        <div className="w-full px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+17327627840" className="flex items-center gap-2 hover:text-white transition-colors group">
              <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Icon name="PhoneIcon" size={12} />
              </div>
              <span className="text-sm font-medium">(732) 762-7840</span>
            </a>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                <Icon name="MapPinIcon" size={12} />
              </div>
              <span className="text-sm">North Brunswick, NJ</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                <Icon name="ClockIcon" size={12} />
              </div>
              <span className="text-sm">Mon–Sat 8am–6pm</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <Link to="/get-the-app" className="text-sm font-medium hover:text-white transition-colors hover:underline underline-offset-4">Get the App</Link>
            <span className="text-white/20">|</span>
            <Link to="/products" className="text-sm font-medium hover:text-white transition-colors hover:underline underline-offset-4">Track Order</Link>
            <span className="text-white/20">|</span>
            <Link to="/products" className="text-sm font-medium hover:text-white transition-colors hover:underline underline-offset-4">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="wss-header bg-gradient-to-r from-[#003087] to-[#0040a0] shadow-lg">
        <div className="w-full px-6 py-4 flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center p-1.5 hover:shadow-xl transition-shadow">
              <img 
                src="/logo.jpeg" 
                alt="Patel Sales Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-xl leading-tight tracking-tight">Patel Sales</div>
              <div className="text-white/70 text-xs leading-tight font-medium">Wholesale Food Service Supplies</div>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 flex max-w-3xl">
            <div className="flex w-full">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search foam cups, foil pans, containers, gloves..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-5 py-3 text-sm border-0 outline-none rounded-l-lg text-gray-800 placeholder-gray-400 bg-white shadow-inner"
              />
              <button
                type="submit"
                className="bg-[#e8471e] hover:bg-[#c73a17] text-white px-8 py-3 font-semibold text-sm transition-all shadow-lg hover:shadow-xl rounded-r-lg flex items-center gap-2"
                aria-label="Search"
              >
                <Icon name="MagnifyingGlassIcon" size={18} />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Account */}
            <Link
              to="/products"
              className="flex flex-col items-center gap-1 px-4 py-2 text-white hover:bg-white/10 rounded-xl transition-all group"
            >
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Icon name="UserCircleIcon" size={20} />
              </div>
              <span className="text-[10px] font-medium hidden sm:block">Account</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex flex-col items-center gap-1 px-4 py-2 text-white hover:bg-white/10 rounded-xl transition-all group relative"
              aria-label={`Cart — ${itemCount} items`}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Icon name="ShoppingCartIcon" size={20} />
                </div>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#e8471e] text-white text-[11px] font-bold rounded-full flex items-center justify-center px-1 leading-none shadow-lg">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium hidden sm:block">Cart</span>
            </Link>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col items-center gap-1 px-4 py-2 text-white hover:bg-white/10 rounded-xl transition-all group"
              aria-label="Menu"
            >
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Icon name={mobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} />
              </div>
              <span className="text-[10px] font-medium">Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category nav bar */}
      <div className="wss-cat-bar hidden lg:block relative bg-white shadow-md">
        <div className="w-full px-6">
          <div className="flex items-center overflow-x-auto scrollbar-hide">
            {/* All Categories dropdown trigger */}
            <div 
              className="relative"
              onMouseEnter={() => setCatNavOpen(true)}
              onMouseLeave={() => setCatNavOpen(false)}
            >
              <button
                className="wss-cat-nav-item bg-[#003087] hover:bg-[#002266] border-r border-gray-200 font-bold px-5 py-3 rounded-l-lg transition-all"
              >
                <Icon name="Bars3Icon" size={16} />
                <span className="ml-2">All Categories</span>
                <Icon name="ChevronDownIcon" size={14} className="ml-2" />
              </button>

              {/* Dropdown Menu */}
              {catNavOpen && (
                <div className="absolute top-full left-0 mt-0 w-[900px] bg-white shadow-2xl rounded-b-xl border border-gray-200 z-50">
                  <div className="p-8 grid grid-cols-4 gap-6">
                    {categories.map((cat) => (
                      <Link
                        key={cat.label}
                        to={cat.href}
                        className="group flex items-center gap-3 p-4 rounded-xl hover:bg-[#003087]/5 transition-all hover:shadow-md"
                      >
                        <div className="w-10 h-10 bg-[#003087]/10 rounded-xl flex items-center justify-center group-hover:bg-[#003087]/20 transition-colors">
                          <Icon name="ChevronRightIcon" size={16} className="text-[#003087]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-[#003087] transition-colors">
                          {cat.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 p-6 bg-gradient-to-r from-gray-50 to-white rounded-b-xl">
                    <Link
                      to="/products"
                      className="flex items-center justify-center gap-2 text-sm font-bold text-[#003087] hover:text-[#e8471e] transition-colors"
                    >
                      View All Categories
                      <Icon name="ArrowRightIcon" size={16} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Category links with mega menu */}
            {categories.map((cat) => (
              <div 
                key={cat.label}
                className="relative"
                onMouseEnter={() => {
                  if (cat.subMenu) {
                    setActiveCategory(cat.label);
                    setMegaMenuOpen(true);
                  }
                }}
                onMouseLeave={() => {
                  setActiveCategory(null);
                  setMegaMenuOpen(false);
                }}
              >
                <Link 
                  to={cat.href} 
                  className={`wss-cat-nav-item border-r border-gray-200 px-5 py-3 transition-all hover:bg-gray-50 hover:text-[#003087] ${cat.active ? 'bg-[#003087]/5 text-[#003087] font-bold' : 'text-gray-700'}`}
                >
                  {cat.label}
                  {cat.subMenu && <Icon name="ChevronDownIcon" size={12} className="ml-1.5" />}
                </Link>

                {/* Mega Menu */}
                {megaMenuOpen && activeCategory === cat.label && cat.subMenu && (
                  <div className="absolute top-full left-0 mt-0 w-[1100px] bg-white shadow-2xl rounded-b-xl border border-gray-200 z-50">
                    <div className="flex">
                      {/* Main Section */}
                      <div className="flex-1 p-8 border-r border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">{cat.label}</h3>
                        <div className="grid grid-cols-4 gap-6">
                          {cat.subMenu.main.map((item, index) => (
                            <Link
                              key={index}
                              to={cat.href}
                              className="group"
                            >
                              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-3 overflow-hidden relative shadow-sm group-hover:shadow-md transition-shadow">
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                              </div>
                              <p className="text-sm font-semibold text-gray-700 group-hover:text-[#003087] transition-colors line-clamp-2">
                                {item.title}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* More Section */}
                      <div className="w-96 p-8 bg-gradient-to-b from-gray-50 to-white">
                        <h3 className="text-sm font-bold text-gray-800 mb-6 uppercase tracking-wide">More in {cat.label}</h3>
                        <ul className="space-y-3">
                          {cat.subMenu.more.map((item, index) => (
                            <li key={index}>
                              <Link
                                to={cat.href}
                                className="text-sm text-gray-600 hover:text-[#003087] transition-colors block py-2 px-3 rounded-lg hover:bg-[#003087]/5"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <Link to="/products" className="wss-cat-nav-item ml-auto px-5 py-3 text-[#e8471e] font-bold hover:bg-[#e8471e]/5 transition-all rounded-r-lg">
              🔥 Flash Deals
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#003087] border-t border-white/20">
          <nav className="w-full px-4 py-3 flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-white hover:bg-white/10 rounded-sm text-sm font-medium"
            >
              <Icon name="HomeIcon" size={16} />
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-white hover:bg-white/10 rounded-sm text-sm font-medium"
            >
              <Icon name="Squares2X2Icon" size={16} />
              All Products
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-white/80 hover:bg-white/10 rounded-sm text-sm"
              >
                <Icon name="ChevronRightIcon" size={14} />
                {cat.label}
              </Link>
            ))}
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-white hover:bg-white/10 rounded-sm text-sm font-medium"
            >
              <Icon name="ShoppingCartIcon" size={16} />
              Cart
              {itemCount > 0 && (
                <span className="ml-auto bg-[#e8471e] text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './ui/AppIcon';
import { disposablesCategoryNav, getCategoryProductHref, productCategoryDefinitions } from '../data/productCategories';

const footerLinks = {
  'Shop': [
    { label: `All ${disposablesCategoryNav.label}`, href: disposablesCategoryNav.href },
    ...productCategoryDefinitions.slice(0, 5).map((category) => ({
      label: category.title,
      href: getCategoryProductHref(category.slug),
    })),
  ],
  'Customer Service': [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Track Your Order', href: '/track-order' },
    { label: 'Returns & Exchanges', href: '/returns' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Bulk Order Inquiry', href: '/bulk-order' },
    { label: 'FAQ', href: '/faq' },
  ],
  'About Patel Sales': [
    { label: 'About Us', href: '/about' },
    { label: 'Business Accounts', href: '/business-accounts' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#001a33] to-[#003087]">
      {/* Trust bar */}
      <div className="bg-gradient-to-r from-[#003087] to-[#0040a0] border-b border-white/10">
        <div className="w-full px-3 sm:px-4 md:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: 'TruckIcon': 'Free Shipping $150+', sub: 'NJ, NY, CT & PA' },
              { icon: 'CubeIcon': 'Wholesale Pricing', sub: 'Up to 50% off retail' },
              { icon: 'ShieldCheckIcon': 'FDA Compliant', sub: 'All products certified' },
              { icon: 'PhoneIcon': '(732) 762-7840', sub: 'Mon–Sat 8am–6pm' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center gap-3 group">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                  <Icon name={item.icon} size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-base mb-0.5">{item.title}</div>
                  <div className="text-white/70 text-sm">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="w-full px-3 sm:px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="flex flex-col items-center text-center">
            <Link to="/" className="inline-block mb-5">
              <div className="bg-white rounded-2xl px-3 py-1 inline-block shadow-lg">
                <img src="/brand_logo.png" alt="Patel Sales Logo" className="h-12 w-auto object-contain" />
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-5 max-w-sm">
              Your trusted source for bulk disposable food service supplies in New Jersey. Serving restaurants, delis, bakeries, and hotels since 2021.
            </p>
            <div className="flex flex-col items-center gap-3 mb-5">
              <a href="tel:+17327627840" className="flex items-center gap-3 text-white/80 hover:text-white text-sm transition-colors group">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Icon name="PhoneIcon" size={16} className="text-white" />
                </div>
                (732) 762-7840
              </a>
              <div className="flex items-center gap-3 text-white/80 text-sm text-center">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPinIcon" size={16} className="text-white" />
                </div>
                <span>102-103 North Center Dr, North Brunswick, NJ 08902</span>
              </div>
            </div>
            {/* Social Media */}
            <div className="flex items-center justify-center gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300" aria-label="X (Twitter)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="text-center">
              <h3 className="text-white font-bold text-base mb-5 uppercase tracking-wider">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-white/70 hover:text-white text-sm transition-colors inline-block duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="w-full px-3 sm:px-4 md:px-6 py-5 flex flex-col items-center justify-center text-center gap-3">
          <p className="text-white/60 text-sm">
            © 2026 Patel Sales LLC · All Rights Reserved · North Brunswick, NJ 08902
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/privacy-policy" className="text-white/60 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <span className="text-white/20">|</span>
            <Link to="/terms-of-service" className="text-white/60 hover:text-white text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

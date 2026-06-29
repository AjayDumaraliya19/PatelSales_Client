import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './ui/AppIcon';

const footerLinks = {
  'Shop': [
    { label: 'Foam Products', href: '/products' },
    { label: 'Foil & Pans', href: '/products' },
    { label: 'Plastic Containers', href: '/products' },
    { label: 'Paper Bags', href: '/products' },
    { label: 'Eco Friendly', href: '/products' },
    { label: 'Disposable Gloves', href: '/products' },
  ],
  'Customer Service': [
    { label: 'Contact Us', href: '/products' },
    { label: 'Track Your Order', href: '/products' },
    { label: 'Returns & Exchanges', href: '/products' },
    { label: 'Shipping Info', href: '/products' },
    { label: 'Bulk Order Inquiry', href: '/products' },
  ],
  'About Patel Sales': [
    { label: 'About Us', href: '/products' },
    { label: 'Our Location', href: '/products' },
    { label: 'Business Accounts', href: '/products' },
    { label: 'Privacy Policy', href: '/products' },
    { label: 'Terms of Service', href: '/products' },
  ],
};

export default function Footer() {
  return (
    <footer className="wss-footer">
      {/* Trust bar */}
      <div className="bg-[#003087] border-b border-white/10">
        <div className="w-full px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: 'TruckIcon' as const, title: 'Free Shipping $150+', sub: 'NJ, NY, CT & PA' },
              { icon: 'CubeIcon' as const, title: 'Wholesale Pricing', sub: 'Up to 50% off retail' },
              { icon: 'ShieldCheckIcon' as const, title: 'FDA Compliant', sub: 'All products certified' },
              { icon: 'PhoneIcon' as const, title: '(732) 762-7840', sub: 'Mon–Sat 8am–6pm' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon} size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-white text-sm font-bold">{item.title}</div>
                  <div className="text-white/60 text-xs">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="w-full px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div>
            <div className="text-white font-bold text-xl mb-1">Patel Sales LLC</div>
            <div className="text-white/50 text-xs mb-4">Wholesale Food Service Supplies</div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Your trusted source for bulk disposable food service supplies in New Jersey. Serving restaurants, delis, bakeries, and hotels since 2021.
            </p>
            <div className="space-y-2">
              <a href="tel:+17327627840" className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
                <Icon name="PhoneIcon" size={14} />
                (732) 762-7840
              </a>
              <div className="flex items-start gap-2 text-white/70 text-sm">
                <Icon name="MapPinIcon" size={14} className="mt-0.5 flex-shrink-0" />
                102-103 North Center Dr,<br />North Brunswick, NJ 08902
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-white/60 hover:text-white text-sm transition-colors"
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
        <div className="w-full px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs">
            © 2026 Patel Sales LLC · All Rights Reserved · North Brunswick, NJ 08902
          </p>
          <div className="flex items-center gap-4">
            <Link to="/products" className="text-white/50 hover:text-white/80 text-xs transition-colors">Privacy Policy</Link>
            <span className="text-white/20">|</span>
            <Link to="/products" className="text-white/50 hover:text-white/80 text-xs transition-colors">Terms of Service</Link>
            <span className="text-white/20">|</span>
            <Link to="/products" className="text-white/50 hover:text-white/80 text-xs transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

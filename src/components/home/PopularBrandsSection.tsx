import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppImage from '../ui/AppImage';
import brandService from '../../services/brandService';
import type { Brand } from '../../services/brandService';

const FALLBACK_LOGO = 'https://placehold.co/240x120/f4f4f4/999999?text=Brand';

export default function PopularBrandsSection() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const activeBrands = await brandService.getActiveBrands();
        setBrands(activeBrands);
      } catch (error) {
        console.error('Failed to fetch brands:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  if (loading || brands.length === 0) return null;

  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="bg-white py-10 md:py-12 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Shop Popular Brands
          </h2>
          <p className="text-base md:text-lg text-gray-600 mt-2">
            Quality products from trusted manufacturers
          </p>
        </div>

        {/* Mobile: Static Grid */}
        <div className="md:hidden mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:gap-4">
          {brands.map((brand) => (
            <Link
              key={brand._id}
              to={`/products?brand=${brand.slug}`}
              className="group relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border border-gray-200 hover:border-gray-300 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
              aria-label={`Shop ${brand.name} products`}
            >
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
                <AppImage
                  src={brand.logo || FALLBACK_LOGO}
                  alt={`${brand.name} logo`}
                  width={200}
                  height={80}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop: Auto-scrolling Slider */}
        <div className="hidden md:block">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="flex animate-scroll">
              {duplicatedBrands.map((brand, index) => (
                <Link
                  key={`${brand._id}-${index}`}
                  to={`/products?brand=${brand.slug}`}
                  className="group relative flex-shrink-0 w-[calc(100%/6)] flex items-center justify-center p-6 hover:bg-white/50 transition-all duration-300"
                  aria-label={`Shop ${brand.name} products`}
                >
                  <AppImage
                    src={brand.logo || FALLBACK_LOGO}
                    alt={`${brand.name} logo`}
                    width={200}
                    height={80}
                    className="max-h-[80px] max-w-[200px] object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

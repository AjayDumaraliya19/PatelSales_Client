import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import PromoGridSection, { PlusBannerSection } from '../components/home/PromoGridSection';
import FeaturedProductSection from '../components/home/FeaturedProductSection';
import ActionTilesSection from '../components/home/ActionTilesSection';
import FeaturedCategoriesSection from '../components/home/FeaturedCategoriesSection';
import BestSellingSection from '../components/home/BestSellingSection';
import QuoteBannerSection from '../components/home/QuoteBannerSection';
import PopularBrandsSection from '../components/home/PopularBrandsSection';
import ResourcesSection from '../components/home/ResourcesSection';
import NewsletterAppSection from '../components/home/NewsletterAppSection';
import productsService from '../services/productsService';
import type { Product } from '../types';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [featured, bestSelling] = await Promise.all([
          productsService.getFeaturedProducts(8),
          productsService.getProducts({ limit: 10, sort: 'newest', active: true }),
        ]);
        setFeaturedProducts(featured.products);
        setBestSellingProducts(bestSelling.products);
      } catch (error) {
        console.error('Failed to fetch home page products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-full bg-white">
      <HeroSection />
      <PromoGridSection />
      <PlusBannerSection />
      <FeaturedProductSection products={featuredProducts} />
      <ActionTilesSection />
      <FeaturedCategoriesSection />
      <BestSellingSection products={bestSellingProducts} />
      <QuoteBannerSection />
      <PopularBrandsSection />
      <ResourcesSection />
      <NewsletterAppSection />
    </div>
  );
}

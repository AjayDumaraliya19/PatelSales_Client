import React from 'react';
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
import { mockProducts } from '../data/mockData';

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 8);
  const bestSellingProducts = [...mockProducts]
    .sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))
    .slice(0, 10);

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

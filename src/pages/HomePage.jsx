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

export default function HomePage() {
  const [bestReviewedProducts, setBestReviewedProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [bestReviewed, bestSelling] = await Promise.all([
          productsService.getBestReviewedProducts(20),
          productsService.getProducts({ limit: 20, sort: 'newest', active: true }),
        ]);
        
        let bestReviewedList = bestReviewed.products || [];
        if (bestReviewedList.length === 0 && bestSelling.products && bestSelling.products.length > 0) {
          bestReviewedList = bestSelling.products.slice(0, 20);
        }

        setBestReviewedProducts(bestReviewedList);
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
      <FeaturedProductSection products={bestReviewedProducts} />
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

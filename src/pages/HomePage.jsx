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
import TestimonialsSection from '../components/home/TestimonialsSection';
import TrustBadgesSection from '../components/home/TrustBadgesSection';
import productsService from '../services/productsService';
import cmsService from '../services/cmsService';

export default function HomePage() {
  const [bestReviewedProducts, setBestReviewedProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [cmsHomePage, setCmsHomePage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [bestReviewed, bestSelling, cmsContent] = await Promise.all([
          productsService.getBestReviewedProducts(20),
          productsService.getProducts({ limit: 20, sort: 'newest', active: true }),
          cmsService.getHomePage()
        ]);
        
        let bestReviewedList = bestReviewed.products || [];
        if (bestReviewedList.length === 0 && bestSelling.products && bestSelling.products.length > 0) {
          bestReviewedList = bestSelling.products.slice(0, 20);
        }

        setBestReviewedProducts(bestReviewedList);
        setBestSellingProducts(bestSelling.products);
        setCmsHomePage(cmsContent?.content || null);
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
      {(!cmsHomePage || cmsHomePage?.heroSection?.enabled !== false) && <HeroSection />}
      {(!cmsHomePage || cmsHomePage?.marketingBanners?.enabled !== false) && <PromoGridSection />}
      {(!cmsHomePage || cmsHomePage?.marketingBanners?.enabled !== false) && <PlusBannerSection />}
      {(!cmsHomePage || cmsHomePage?.featuredProducts?.enabled !== false) && <FeaturedProductSection products={bestReviewedProducts} title={cmsHomePage?.featuredProducts?.title} />}
      <ActionTilesSection />
      {(!cmsHomePage || cmsHomePage?.featuredCategories?.enabled !== false) && <FeaturedCategoriesSection title={cmsHomePage?.featuredCategories?.title} />}
      <BestSellingSection products={bestSellingProducts} />
      <QuoteBannerSection />
      {(!cmsHomePage || cmsHomePage?.testimonials?.enabled !== false) && cmsHomePage?.testimonials?.testimonials?.length > 0 && (
        <TestimonialsSection 
          title={cmsHomePage.testimonials.title} 
          testimonials={cmsHomePage.testimonials.testimonials} 
        />
      )}
      <PopularBrandsSection />
      <ResourcesSection />
      <NewsletterAppSection />
      {(!cmsHomePage || cmsHomePage?.trustBadges?.enabled !== false) && cmsHomePage?.trustBadges?.badges?.length > 0 && (
        <TrustBadgesSection badges={cmsHomePage.trustBadges.badges} />
      )}
    </div>
  );
}

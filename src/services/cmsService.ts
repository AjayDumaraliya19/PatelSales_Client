import apiClient from './apiClient';

export interface MarketingBanner {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  link?: string;
  ctaText?: string;
  promoCode?: string;
  backgroundColor?: string;
  isActive?: boolean;
  enabled?: boolean;
}

export async function fetchMarketingBanners(): Promise<MarketingBanner[]> {
  const response = await apiClient.get('/api/cms/marketing-banners', {
    params: { enabled: 'true', limit: 10 },
  });
  return response.data.banners || [];
}

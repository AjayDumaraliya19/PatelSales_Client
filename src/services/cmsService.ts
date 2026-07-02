import apiClient from '../lib/apiClient';

// Types
export interface CmsHomePage {
  _id: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  heroCta?: {
    text: string;
    link: string;
  };
  featuredProductsTitle?: string;
  featuredProducts?: string[];
  sections?: any[];
  createdAt: string;
  updatedAt: string;
}

export interface CmsNavigation {
  _id: string;
  menuItems: Array<{
    label: string;
    link: string;
    children?: Array<{
      label: string;
      link: string;
    }>;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CmsFooter {
  _id: string;
  sections?: Array<{
    title: string;
    links: Array<{
      label: string;
      link: string;
    }>;
  }>;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  copyrightText?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CmsSeo {
  _id: string;
  page: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  structuredData?: any;
  createdAt: string;
  updatedAt: string;
}

export interface CmsMarketingBanner {
  _id: string;
  image: string;
  title?: string;
  description?: string;
  link?: string;
  bannerType: string;
  placement: string;
  priority: number;
  startDate?: string;
  endDate?: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CmsPopup {
  _id: string;
  image?: string;
  title?: string;
  content?: string;
  ctaButton?: {
    text: string;
    link: string;
  };
  popupType: string;
  displayTrigger: string;
  displayFrequency: string;
  delaySeconds: number;
  startDate?: string;
  endDate?: string;
  enabled: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

// CMS Service
class CmsService {
  /**
   * Get home page content
   */
  async getHomePage(): Promise<{ success: boolean; content: CmsHomePage | null }> {
    const response = await apiClient.get('/cms/home-page');
    return response.data;
  }

  /**
   * Get navigation menu
   */
  async getNavigation(): Promise<{ success: boolean; menu: CmsNavigation | null }> {
    const response = await apiClient.get('/cms/navigation');
    return response.data;
  }

  /**
   * Get footer content
   */
  async getFooter(): Promise<{ success: boolean; footer: CmsFooter | null }> {
    const response = await apiClient.get('/cms/footer');
    return response.data;
  }

  /**
   * Get SEO settings for a page
   */
  async getSeoSettings(page: string): Promise<{ success: boolean; seo: CmsSeo | null }> {
    const response = await apiClient.get(`/cms/seo/${page}`);
    return response.data;
  }

  /**
   * Get marketing banners
   */
  async getMarketingBanners(params?: {
    bannerType?: string;
    enabled?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{
    success: boolean;
    count: number;
    total: number;
    page: number;
    pages: number;
    banners: CmsMarketingBanner[];
  }> {
    const response = await apiClient.get('/cms/marketing-banners', { params });
    return response.data;
  }

  /**
   * Get active marketing banners by placement
   */
  async getBannersByPlacement(placement: string): Promise<CmsMarketingBanner[]> {
    const response = await this.getMarketingBanners({
      enabled: true,
      limit: 100,
    });
    
    // Filter by placement and check if currently active (date range)
    const now = new Date();
    return response.banners
      .filter(banner => {
        if (banner.placement !== placement) return false;
        
        if (banner.startDate && new Date(banner.startDate) > now) return false;
        if (banner.endDate && new Date(banner.endDate) < now) return false;
        
        return true;
      })
      .sort((a, b) => a.priority - b.priority);
  }

  /**
   * Get popups
   */
  async getPopups(params?: {
    enabled?: boolean;
    type?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    success: boolean;
    count: number;
    total: number;
    page: number;
    pages: number;
    popups: CmsPopup[];
  }> {
    const response = await apiClient.get('/cms/popups', { params });
    return response.data;
  }

  /**
   * Get active popups
   */
  async getActivePopups(): Promise<CmsPopup[]> {
    const response = await this.getPopups({
      enabled: true,
      limit: 100,
    });
    
    // Filter by date range
    const now = new Date();
    return response.popups
      .filter(popup => {
        if (popup.startDate && new Date(popup.startDate) > now) return false;
        if (popup.endDate && new Date(popup.endDate) < now) return false;
        return true;
      })
      .sort((a, b) => a.priority - b.priority);
  }
}

export default new CmsService();

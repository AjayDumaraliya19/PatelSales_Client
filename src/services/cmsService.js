import apiClient from '../lib/apiClient';

// Types

// CMS Service
class CmsService {
  /**
   * Get home page content
   */
  async getHomePage() { success; content}> {
    const response = await apiClient.get('/cms/home-page');
    return response.data;
  }

  /**
   * Get navigation menu
   */
  async getNavigation() { success; menu}> {
    const response = await apiClient.get('/cms/navigation');
    return response.data;
  }

  /**
   * Get footer content
   */
  async getFooter() { success; footer}> {
    const response = await apiClient.get('/cms/footer');
    return response.data;
  }

  /**
   * Get SEO settings for a page
   */
  async getSeoSettings(page) { success; seo}> {
    const response = await apiClient.get(`/cms/seo/${page}`);
    return response.data;
  }

  /**
   * Get marketing banners
   */
  async getMarketingBanners(params?: {
    bannerType?;
    enabled?;
    page?;
    limit?;
  }) {
    success;
    count;
    total;
    page;
    pages;
    banners;
  }> {
    const response = await apiClient.get('/cms/marketing-banners', { params });
    return response.data;
  }

  /**
   * Get active marketing banners by placement
   */
  async getBannersByPlacement(placement) {
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
    enabled?;
    type?;
    page?;
    limit?;
  }) {
    success;
    count;
    total;
    page;
    pages;
    popups;
  }> {
    const response = await apiClient.get('/cms/popups', { params });
    return response.data;
  }

  /**
   * Get active popups
   */
  async getActivePopups() {
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

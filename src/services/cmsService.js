import apiClient from '../lib/apiClient';

// Types

// CMS Service
class CmsService {
  constructor() {
    this.cachedAbout = null;
    this.aboutPromise = null;
    this.cachedHome = null;
    this.homePromise = null;
  }

  /**
   * Get home page content
   */
  async getHomePage(forceRefresh = false) {
    if (!forceRefresh && this.cachedHome) {
      return this.cachedHome;
    }
    if (!forceRefresh && this.homePromise) {
      return this.homePromise;
    }
    this.homePromise = apiClient.get('/cms/home-page')
      .then((response) => {
        this.cachedHome = response.data;
        this.homePromise = null;
        return response.data;
      })
      .catch((error) => {
        this.homePromise = null;
        throw error;
      });
    return this.homePromise;
  }

  /**
   * Get about page content
   */
  async getAboutPage(forceRefresh = false) {
    if (!forceRefresh && this.cachedAbout) {
      return this.cachedAbout;
    }
    if (!forceRefresh && this.aboutPromise) {
      return this.aboutPromise;
    }
    this.aboutPromise = apiClient.get('/cms/about')
      .then((response) => {
        this.cachedAbout = response.data;
        this.aboutPromise = null;
        return response.data;
      })
      .catch((error) => {
        this.aboutPromise = null;
        throw error;
      });
    return this.aboutPromise;
  }

  /**
   * Get navigation menu
   */
  async getNavigation() {
    const response = await apiClient.get('/cms/navigation');
    return response.data;
  }

  /**
   * Get footer content
   */
  async getFooter() {
    const response = await apiClient.get('/cms/footer');
    return response.data;
  }

  /**
   * Get SEO settings for a page
   */
  async getSeoSettings(page) {
    const response = await apiClient.get(`/cms/seo/${page}`);
    return response.data;
  }

  /**
   * Get marketing banners
   */
  async getMarketingBanners(params = {}) {
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
  async getPopups(params = {}) {
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

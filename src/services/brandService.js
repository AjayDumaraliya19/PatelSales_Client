import apiClient from '../lib/apiClient';

class BrandService {
  async getActiveBrands() {
    const response = await apiClient.get<{ success; brands}>('/brands');
    return response.data.brands || [];
  }
}

export default new BrandService();

import apiClient from '../lib/apiClient';

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

class BrandService {
  async getActiveBrands(): Promise<Brand[]> {
    const response = await apiClient.get<{ success: boolean; brands: Brand[] }>('/brands');
    return response.data.brands || [];
  }
}

export default new BrandService();

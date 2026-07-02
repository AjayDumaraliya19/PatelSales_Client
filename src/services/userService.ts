import apiClient from '../lib/apiClient';
import { Address } from './authService';

// Types
export interface AddressesResponse {
  success: boolean;
  addresses: Address[];
}

export interface AddAddressData {
  address: Omit<Address, '_id'>;
}

export interface UpdateAddressData {
  address: Partial<Omit<Address, '_id'>>;
}

// User Service
class UserService {
  /**
   * Get user addresses
   */
  async getAddresses(): Promise<AddressesResponse> {
    const response = await apiClient.get<AddressesResponse>('/user/addresses');
    return response.data;
  }

  /**
   * Add new address
   */
  async addAddress(data: AddAddressData): Promise<AddressesResponse> {
    const response = await apiClient.post<AddressesResponse>('/user/addresses', data);
    return response.data;
  }

  /**
   * Update address
   */
  async updateAddress(addressId: string, data: UpdateAddressData): Promise<AddressesResponse> {
    const response = await apiClient.put<AddressesResponse>(`/user/addresses/${addressId}`, data);
    return response.data;
  }

  /**
   * Delete address
   */
  async deleteAddress(addressId: string): Promise<AddressesResponse> {
    const response = await apiClient.delete<AddressesResponse>(`/user/addresses/${addressId}`);
    return response.data;
  }
}

export default new UserService();

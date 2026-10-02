import apiClient from '../lib/apiClient';


// Types

// User Service
class UserService {
  /**
   * Get user addresses
   */
  async getAddresses() {
    const response = await apiClient.get('/user/addresses');
    return response.data;
  }

  /**
   * Add new address
   */
  async addAddress(data) {
    const response = await apiClient.post('/user/addresses', data);
    return response.data;
  }

  /**
   * Update address
   */
  async updateAddress(addressId, data) {
    const response = await apiClient.put(`/user/addresses/${addressId}`, data);
    return response.data;
  }

  /**
   * Delete address
   */
  async deleteAddress(addressId) {
    const response = await apiClient.delete(`/user/addresses/${addressId}`);
    return response.data;
  }
}

export default new UserService();

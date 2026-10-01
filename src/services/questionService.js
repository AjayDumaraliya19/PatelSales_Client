import apiClient from '../lib/apiClient';

class QuestionService {
  async getProductQuestions(
    productId,
    params?: { page?; limit? }
  ) {
    const response = await apiClient.get(`/products/${productId}/questions`, { params });
    return response.data;
  }

  async askQuestion(productId, question) { success; question}> {
    const response = await apiClient.post(`/products/${productId}/questions`, { question });
    return response.data;
  }
}

export default new QuestionService();

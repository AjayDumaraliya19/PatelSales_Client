import apiClient from '../lib/apiClient';

export interface Question {
  _id: string;
  user: { _id: string; name: string };
  product: string;
  question: string;
  answer?: string;
  answeredBy?: { _id: string; name: string };
  status: 'pending' | 'answered';
  createdAt: string;
  updatedAt: string;
}

export interface QuestionsResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  questions: Question[];
}

class QuestionService {
  async getProductQuestions(
    productId: string,
    params?: { page?: number; limit?: number }
  ): Promise<QuestionsResponse> {
    const response = await apiClient.get<QuestionsResponse>(`/products/${productId}/questions`, { params });
    return response.data;
  }

  async askQuestion(productId: string, question: string): Promise<{ success: boolean; question: Question }> {
    const response = await apiClient.post(`/products/${productId}/questions`, { question });
    return response.data;
  }
}

export default new QuestionService();

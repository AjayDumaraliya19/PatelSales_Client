import apiClient from '../lib/apiClient';

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'order' | 'promo' | 'system' | 'info';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface NotificationsResponse {
  success: boolean;
  notifications: Notification[];
  unreadCount: number;
}

class NotificationService {
  async getNotifications(): Promise<NotificationsResponse> {
    const response = await apiClient.get<NotificationsResponse>('/user/notifications');
    return response.data;
  }

  async markAsRead(notificationId: string): Promise<{ success: boolean }> {
    const response = await apiClient.put(`/user/notifications/${notificationId}/read`);
    return response.data;
  }

  async markAllAsRead(): Promise<{ success: boolean }> {
    const response = await apiClient.put('/user/notifications/read-all');
    return response.data;
  }
}

export default new NotificationService();

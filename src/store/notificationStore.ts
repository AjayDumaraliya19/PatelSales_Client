import { create } from 'zustand';
import notificationService from '../services/notificationService';
import type { Notification } from '../services/notificationService';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,

  fetchNotifications: async () => {
    set({ loading: true });
    try {
      const response = await notificationService.getNotifications();
      if (response.success) {
        set({
          notifications: response.notifications,
          unreadCount: response.unreadCount,
        });
      }
    } catch {
      // Silently fail
    } finally {
      set({ loading: false });
    }
  },

  markAsRead: async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      const { notifications, unreadCount } = get();
      set({
        notifications: notifications.map((n) =>
          n._id === id ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, unreadCount - 1),
      });
    } catch {
      // Silently fail
    }
  },

  markAllAsRead: async () => {
    try {
      await notificationService.markAllAsRead();
      const { notifications } = get();
      set({
        notifications: notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      });
    } catch {
      // Silently fail
    }
  },
}));

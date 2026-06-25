import apiClient from './apiClient';
import { mapUser } from '../utils/mappers';
import type { LoginCredentials, RegisterCredentials, User, Address } from '../types';

export async function loginUser(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
  const response = await apiClient.post('/api/auth/login', credentials);
  const { token, user } = response.data;
  localStorage.setItem('token', token);
  return { token, user: mapUser(user) };
}

export async function registerUser(credentials: RegisterCredentials): Promise<{ user: User; token: string }> {
  const response = await apiClient.post('/api/auth/register', credentials);
  const { token, user } = response.data;
  localStorage.setItem('token', token);
  return { token, user: mapUser(user) };
}

export async function fetchCurrentUser(): Promise<User> {
  const response = await apiClient.get('/api/auth/me');
  return mapUser(response.data.user);
}

export async function updateProfile(data: {
  name?: string;
  phone?: string;
  addresses?: Address[];
}): Promise<User> {
  const response = await apiClient.put('/api/auth/profile', data);
  return mapUser(response.data.user);
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  await apiClient.put('/api/auth/password', { currentPassword, newPassword });
}

export function logoutUser(): void {
  localStorage.removeItem('token');
}

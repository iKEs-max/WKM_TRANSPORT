import api from './api';
import type { LoginPayload, RegisterPayload, AuthResponse } from '@/types/auth.types';

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.post<any>('/auth/login', {
      email: payload.email,
      password: payload.password,
    });

    const authData = (data as any).data || data;

    return {
      user: {
        id: String(authData.user.id),
        email: authData.user.email,
        firstName: authData.user.firstName || 'Admin',
        lastName: authData.user.lastName || '',
        role: authData.user.role,
        createdAt: new Date().toISOString(),
      },
      tokens: {
        access: { token: authData.tokens.access.token, expires: String(authData.tokens.access.expires) },
        refresh: { token: authData.tokens.refresh.token, expires: String(authData.tokens.refresh.expires) },
      },
    };
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await api.post<any>('/auth/register', payload);
    return (data as any).data || data;
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const { data } = await api.post<any>('/auth/refresh-token', { refreshToken });
    return (data as any).data || data;
  },

  getProfile: async (): Promise<AuthResponse['user']> => {
    const { data } = await api.get<any>('/auth/profile');
    return (data as any).data || data;
  },

  forgotPassword: async (email: string): Promise<void> => {
    await api.post('/auth/forgot-password', { email });
  },

  changePassword: async (password: string): Promise<void> => {
    await api.put('/auth/change-password', { password });
  },
};

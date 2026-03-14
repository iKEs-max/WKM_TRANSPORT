import api from './api';
import type { DashboardStats, AdminFilters, GlobalSettings } from '@/types/admin.types';
import type { Booking } from '@/types/booking.types';
import type { Route } from '@/types/route.types';
import type { User } from '@/types/auth.types';
import type { ApiResponse, PaginatedResponse } from '@/types/api.types';

export const adminService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const { data } = await api.get<ApiResponse<DashboardStats>>('/admin/stats');
    return data.data;
  },

  getAllBookings: async (filters?: AdminFilters): Promise<PaginatedResponse<Booking>> => {
    const { data } = await api.get<PaginatedResponse<Booking>>('/admin/bookings', {
      params: filters,
    });
    return data;
  },

  getAllRoutes: async (filters?: AdminFilters): Promise<PaginatedResponse<Route>> => {
    const { data } = await api.get<PaginatedResponse<Route>>('/routes', {
      params: filters,
    });
    return data.data as any; // Extracting the array from PaginatedResponse
  },

  getAllUsers: async (): Promise<PaginatedResponse<User>> => {
    const { data } = await api.get<PaginatedResponse<User>>('/admin/users');
    return data.data as any;
  },

  updateBookingStatus: async (id: string, status: string): Promise<Booking> => {
    const { data } = await api.patch<ApiResponse<Booking>>(`/bookings/${id}/status`, { status });
    return data.data;
  },

  getSettings: async (): Promise<GlobalSettings> => {
    const { data } = await api.get<ApiResponse<GlobalSettings>>('/admin/settings');
    return data.data;
  },

  updateSettings: async (settings: GlobalSettings): Promise<GlobalSettings> => {
    const { data } = await api.patch<ApiResponse<GlobalSettings>>('/admin/settings', settings);
    return data.data;
  },
};

import api from './api';
import type { Booking, CreateBookingPayload } from '@/types/booking.types';
import type { ApiResponse, PaginatedResponse } from '@/types/api.types';

export const bookingService = {
  createBooking: async (payload: CreateBookingPayload): Promise<Booking> => {
    const { data } = await api.post<ApiResponse<Booking>>('/bookings', payload);
    return data.data;
  },

  getBookings: async (page = 1, limit = 10): Promise<PaginatedResponse<Booking>> => {
    const { data } = await api.get<PaginatedResponse<Booking>>('/bookings', {
      params: { page, limit },
    });
    return data;
  },

  getBookingById: async (id: string): Promise<Booking> => {
    const { data } = await api.get<ApiResponse<Booking>>(`/bookings/${id}`);
    return data.data;
  },

  getBookingByTicket: async (ticketNumber: string): Promise<Booking> => {
    const { data } = await api.get<ApiResponse<Booking>>(`/bookings/ticket/${ticketNumber}`);
    return data.data;
  },

  cancelBooking: async (id: string): Promise<Booking> => {
    const { data } = await api.post<ApiResponse<Booking>>(`/bookings/${id}/cancel`);
    return data.data;
  },

  updateBookingStatus: async (id: string, status: string): Promise<Booking> => {
    const { data } = await api.patch<ApiResponse<Booking>>(`/bookings/${id}/status`, { status });
    return data.data;
  },
};

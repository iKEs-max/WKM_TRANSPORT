import api from './api';
import type { Route, CreateRoutePayload, UpdateRoutePayload } from '@/types/route.types';

const parseRoutes = (raw: any[]): Route[] => {
  if (!Array.isArray(raw)) return [];
  
  return raw
    .filter(r => r !== null && typeof r === 'object')
    .map((r) => ({
      ...r,
      // Normalize field names from backend (backend uses base_price, frontend uses price)
      price: Number(r.price ?? r.base_price ?? 0),
      departure: r.departure ?? r.origin ?? 'Unknown',
      totalSeats: Number(r.totalSeats ?? r.total_seats ?? 0),
      availableSeats: Number(r.availableSeats ?? r.available_seats ?? 0),
      departureTimes: r.departureTimes ?? r.departure_times ?? [],
    }));
};

export const routeService = {
  getRoutes: async (): Promise<Route[]> => {
    const { data } = await api.get('/routes');
    // Handle both { data: [...] } and { data: { data: [...] } }
    const routes = (data as any).data ?? data ?? [];
    return parseRoutes(Array.isArray(routes) ? routes : []);
  },

  getRouteById: async (id: string): Promise<Route> => {
    const { data } = await api.get(`/routes/${id}`);
    const r = data.data;
    return parseRoutes([r])[0];
  },

  createRoute: async (payload: CreateRoutePayload): Promise<Route> => {
    const { data } = await api.post('/routes', payload);
    const r = data.data;
    return parseRoutes([r])[0];
  },

  updateRoute: async (id: string, payload: UpdateRoutePayload): Promise<Route> => {
    const { data } = await api.patch(`/routes/${id}`, payload);
    const r = data.data;
    return parseRoutes([r])[0];
  },

  // Toggle ACTIVE / INACTIVE
  updateRouteStatus: async (id: string, status: 'ACTIVE' | 'INACTIVE'): Promise<void> => {
    await api.patch(`/routes/${id}/status`, { status });
  },

  // Update available_seats and/or total_seats
  updateRouteSeats: async (
    id: string,
    totalSeats: number,
    availableSeats: number
  ): Promise<{ availabilityLabel: string }> => {
    const { data } = await api.patch(`/routes/${id}/seats`, {
      totalSeats,
      availableSeats,
    });
    return { availabilityLabel: data.availabilityLabel };
  },

  deleteRoute: async (id: string): Promise<void> => {
    await api.delete(`/routes/${id}`);
  },

  // Admin dashboard stats
  getDashboardStats: async () => {
    const { data } = await api.get('/routes/admin/stats');
    return data.stats;
  },
};

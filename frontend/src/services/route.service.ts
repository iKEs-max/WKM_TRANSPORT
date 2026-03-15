import { supabase } from '@/config/supabaseClient';
import type { Route, CreateRoutePayload, UpdateRoutePayload } from '@/types/route.types';

const parseRoutes = (raw: any[]): Route[] => {
  if (!Array.isArray(raw)) return [];
  
  return raw
    .filter(r => r !== null && typeof r === 'object')
    .map((r) => ({
      ...r,
      id: String(r.id),
      // Normalize field names from Supabase (postgres often uses snake_case)
      price: Number(r.price ?? r.base_price ?? 0),
      departure: r.departure ?? r.origin ?? 'Unknown',
      destination: r.destination ?? 'Unknown',
      totalSeats: Number(r.totalSeats ?? r.total_seats ?? 0),
      availableSeats: Number(r.availableSeats ?? r.available_seats ?? 0),
      departureTimes: Array.isArray(r.departureTimes) ? r.departureTimes : (Array.isArray(r.departure_times) ? r.departure_times : []),
      status: r.status ?? 'ACTIVE',
      isPopular: r.isPopular ?? r.is_popular ?? false,
      estimatedDuration: r.estimatedDuration ?? r.estimated_duration ?? '',
      operatingDays: r.operatingDays ?? r.operating_days ?? '',
    }));
};

export const routeService = {
  getRoutes: async (): Promise<Route[]> => {
    const { data, error } = await supabase
      .from('routes')
      .select('*')
      .order('departure', { ascending: true });

    if (error) throw error;
    return parseRoutes(data || []);
  },

  getRouteById: async (id: string): Promise<Route> => {
    const { data, error } = await supabase
      .from('routes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return parseRoutes([data])[0];
  },

  createRoute: async (payload: CreateRoutePayload): Promise<Route> => {
    const dbPayload = {
      departure: payload.departure ?? payload.origin,
      destination: payload.destination,
      price: payload.price ?? payload.base_price,
      departure_times: payload.departure_times,
      total_seats: payload.totalSeats ?? payload.total_seats,
      available_seats: payload.totalSeats ?? payload.total_seats,
      status: payload.status ?? 'ACTIVE',
      is_popular: payload.isPopular,
      estimated_duration: payload.estimatedDuration,
      operating_days: payload.operatingDays,
    };

    const { data, error } = await supabase
      .from('routes')
      .insert([dbPayload])
      .select()
      .single();

    if (error) throw error;
    return parseRoutes([data])[0];
  },

  updateRoute: async (id: string, payload: UpdateRoutePayload): Promise<Route> => {
    const dbPayload: any = {};
    if (payload.departure !== undefined || payload.origin !== undefined) dbPayload.departure = payload.departure ?? payload.origin;
    if (payload.destination !== undefined) dbPayload.destination = payload.destination;
    if (payload.price !== undefined || payload.base_price !== undefined) dbPayload.price = payload.price ?? payload.base_price;
    if (payload.departure_times !== undefined) dbPayload.departure_times = payload.departure_times;
    if (payload.totalSeats !== undefined || payload.total_seats !== undefined) dbPayload.total_seats = payload.totalSeats ?? payload.total_seats;
    if (payload.availableSeats !== undefined || payload.available_seats !== undefined) dbPayload.available_seats = payload.availableSeats ?? payload.available_seats;
    if (payload.status !== undefined) dbPayload.status = payload.status;
    if (payload.isPopular !== undefined) dbPayload.is_popular = payload.isPopular;
    if (payload.estimatedDuration !== undefined) dbPayload.estimated_duration = payload.estimatedDuration;
    if (payload.operatingDays !== undefined) dbPayload.operating_days = payload.operatingDays;

    const { data, error } = await supabase
      .from('routes')
      .update(dbPayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return parseRoutes([data])[0];
  },

  updateRouteStatus: async (id: string, status: 'ACTIVE' | 'INACTIVE'): Promise<void> => {
    const { error } = await supabase
      .from('routes')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
  },

  updateRouteSeats: async (
    id: string,
    totalSeats: number,
    availableSeats: number
  ): Promise<{ availabilityLabel: string }> => {
    const { error } = await supabase
      .from('routes')
      .update({ 
        total_seats: totalSeats, 
        available_seats: availableSeats 
      })
      .eq('id', id);

    if (error) throw error;

    // Derive label locally as we bypassed the backend logic
    const pct = totalSeats > 0 ? (availableSeats / totalSeats) * 100 : 0;
    let availabilityLabel = 'Available';
    if (availableSeats === 0) availabilityLabel = 'Full';
    else if (availableSeats === 1) availabilityLabel = '1 Seat Left';
    else if (pct <= 20) availabilityLabel = 'Filling Fast';

    return { availabilityLabel };
  },

  deleteRoute: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('routes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  getDashboardStats: async () => {
    // Fetch real metrics from Supabase
    const { count: totalRoutes } = await supabase.from('routes').select('*', { count: 'exact', head: true });
    const { count: activeRoutes } = await supabase.from('routes').select('*', { count: 'exact', head: true }).eq('status', 'ACTIVE');
    
    // Fetch all bookings for stats and recent list
    const { data: allBookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('*, route:routeId(departure, destination)')
      .order('createdAt', { ascending: false });

    if (bookingsError) {
      console.error('Error fetching bookings for stats:', bookingsError);
    }

    const bookings = allBookings || [];
    
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED').length;
    const pendingBookings = bookings.filter(b => b.status === 'PENDING').length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (parseFloat(b.totalAmount) || 0), 0);
    
    // Generate 7-day chart data
    const chartData = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = bookings.filter(b => b.createdAt?.startsWith(dateStr)).length;
      chartData.push({ date: dateStr, count, revenue: 0 });
    }

    // Map top 10 most recent bookings
    const recentBookings = bookings.slice(0, 10).map(b => ({
      ...b,
      origin: b.route?.departure,
      destination: b.route?.destination
    }));

    // Fetch routes for routesFill (Inventory Health)
    const { data: routesData } = await supabase.from('routes').select('*');
    const routesFill = (routesData || []).map(r => ({
      id: r.id,
      origin: r.departure, // Map departure to origin for AdminDashboard
      destination: r.destination,
      total_seats: r.totalSeats,
      available_seats: r.availableSeats,
      status: r.status,
      base_price: r.price
    }));

    return {
      totalRoutes: totalRoutes || 0,
      activeRoutes: activeRoutes || 0,
      totalBookings,
      totalRevenue,
      confirmedBookings,
      pendingBookings,
      chartData,
      recentBookings,
      routesFill,
    };
  },
};

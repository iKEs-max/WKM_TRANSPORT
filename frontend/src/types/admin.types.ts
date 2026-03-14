export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
  activeRoutes: number;
  recentBookings: number;
  bookingsTrend: number;    // percentage change
  revenueTrend: number;
  usersTrend: number;
}

export interface AdminFilters {
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GlobalSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  defaultCurrency: string;
  paymentProvider: string;
  maxSeatsPerBooking: number;
  enableEmailNotifications: boolean;
}

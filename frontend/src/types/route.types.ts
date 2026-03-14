export type RouteStatus = 'ACTIVE' | 'INACTIVE';

export interface Route {
  id: string;
  departure: string;
  destination: string;
  price: number;
  departureTime?: string;     // Legacy
  arrivalTime?: string;       // Legacy
  departureTimes: string[];   // New
  estimatedDuration: string;  // New
  operatingDays: string;      // New
  isPopular: boolean;
  totalSeats: number;
  availableSeats: number;
  status: RouteStatus;
  createdAt?: string;
  updatedAt?: string;
  // Fallback aliases for backend mapping
  origin?: string;
  base_price?: number;
  total_seats?: number;
  available_seats?: number;
}

export interface CreateRoutePayload {
  departure?: string;
  origin?: string;
  destination: string;
  price?: number;
  base_price?: number;
  departureTime?: string;
  departure_time?: string;
  departure_times?: string[];
  totalSeats?: number;
  total_seats?: number;
  isPopular?: boolean;
  estimatedDuration?: string;
  operatingDays?: string;
  status?: RouteStatus;
}

export interface UpdateRoutePayload extends Partial<CreateRoutePayload> {
  available_seats?: number;
  availableSeats?: number;
}

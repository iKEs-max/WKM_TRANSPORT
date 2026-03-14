import { create } from 'zustand';
import { routeService } from '@/services/route.service';
import type { Route } from '@/types/route.types';
export type { Route };

interface RouteState {
  routes: Route[];
  isLoading: boolean;
  error: string | null;
  fetchRoutes: () => Promise<void>;
  getRoute: (id: string) => Route | undefined;
}

export const useRouteStore = create<RouteState>((set, get) => ({
  routes: [],
  isLoading: false,
  error: null,
  
  fetchRoutes: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await routeService.getRoutes();
      set({ routes: data, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch routes',
        isLoading: false 
      });
    }
  },

  getRoute: (id: string) => {
    return get().routes.find(route => route.id === id);
  }
}));

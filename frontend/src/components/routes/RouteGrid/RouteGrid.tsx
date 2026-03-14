import React from 'react';
import { RouteCard } from '@/components/routes/RouteCard/RouteCard';
import { Loader } from '@/components/common/Loader/Loader';
import type { Route } from '@/store/route.store';

interface RouteGridProps {
  routes: Route[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export const RouteGrid: React.FC<RouteGridProps> = ({
  routes,
  isLoading = false,
  emptyMessage = 'No routes available at the moment.',
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 w-full">
        <Loader size="lg" />
      </div>
    );
  }

  if (routes.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
        <p className="text-slate-500 font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {routes.map((route) => (
        <RouteCard key={route.id} route={route} />
      ))}
    </div>
  );
};

import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign, Map, CalendarCheck, RefreshCw,
  TrendingUp, Bus, Activity, ClipboardList, MapPin
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useAdminStore } from '@/store/admin.store';
import { formatCurrency } from '@/utils/formatters';

/* ── Helpers ──────────────────────────────────────────────────────────────*/
const getAvailLabel = (total: number, available: number) => {
  if (available === 0) return { label: 'Full', cls: 'bg-slate-500/10 text-slate-400' };
  if (available === 1) return { label: '1 Seat Left', cls: 'bg-rose-500/10 text-rose-400' };
  const pct = total > 0 ? (available / total) * 100 : 100;
  if (pct <= 20) return { label: 'Filling Fast', cls: 'bg-onukpa-orange/10 text-onukpa-orange' };
  return { label: 'Available', cls: 'bg-emerald-500/10 text-emerald-400' };
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    CONFIRMED: "bg-emerald-500/10 text-emerald-400",
    PENDING:   "bg-onukpa-orange/10 text-onukpa-orange",
    CANCELLED: "bg-rose-500/10 text-rose-400",
    COMPLETED: "bg-blue-500/10 text-blue-400",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status] || 'bg-slate-500/10 text-slate-400'}`}>
      {status}
    </span>
  );
};

/* ── Tiny CSS bar chart ───────────────────────────────────────────────────*/
const BarChart: React.FC<{ data: { date: string; count: number }[] }> = ({ data }) => {
  const max = Math.max(...data.map((d) => d.count), 1);
  const days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  return (
    <div className="h-48 flex items-end gap-3 pt-8 px-2 relative">
       {/* Y-Axis Guideline */}
       <div className="absolute left-0 right-0 top-8 border-t border-white/5"></div>
       <div className="absolute left-0 right-0 top-1/2 border-t border-white/5"></div>

      {data.map((d, i) => {
        const day = new Date(d.date).getDay();
        const heightPct = Math.max((d.count / max) * 100, 4);
        return (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group relative">
            <AnimatePresence>
               {d.count > 0 && (
                 <motion.span 
                   initial={{ opacity: 0, y: 5 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="absolute -top-6 text-[10px] font-bold text-onukpa-orange opacity-0 group-hover:opacity-100 transition-opacity"
                 >
                   {d.count}
                 </motion.span>
               )}
            </AnimatePresence>
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.05, type: 'spring', damping: 15 }}
              className="w-full bg-gradient-to-t from-onukpa-orange to-orange-400 rounded-t-lg origin-bottom relative group-hover:from-white group-hover:to-onukpa-orange transition-colors"
              style={{ height: `${heightPct}%` }}
            />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{days[day]}</span>
          </div>
        );
      })}
      {data.length === 0 && (
        <div className="flex-1 flex items-center justify-center opacity-40 text-sm font-medium">
          No data for the last 7 days
        </div>
      )}
    </div>
  );
};

/* ── Main component ───────────────────────────────────────────────────────*/
export const AdminDashboard: React.FC = () => {
  const { stats, liveStats, allRoutes, isLoading, fetchDashboardStats, fetchAllRoutes } = useAdminStore();

  useEffect(() => { 
    fetchDashboardStats();
    fetchAllRoutes();
  }, [fetchDashboardStats, fetchAllRoutes]);

  useEffect(() => {
    const id = setInterval(() => {
      fetchDashboardStats();
      fetchAllRoutes();
    }, 30_000);
    return () => clearInterval(id);
  }, [fetchDashboardStats, fetchAllRoutes]);

  const handleRefresh = useCallback(() => { 
    fetchDashboardStats();
    fetchAllRoutes();
  }, [fetchDashboardStats, fetchAllRoutes]);

  const roadTimePause = allRoutes.filter(r => r.status === 'INACTIVE').length;

  const kpis = [
    {
      label: 'Bookings Today', value: liveStats?.totalBookings ?? stats?.totalBookings ?? 0,
      icon: <CalendarCheck size={28} />, accent: 'text-onukpa-orange', glow: 'bg-onukpa-orange/20'
    },
    {
      label: 'Estimated Revenue', value: formatCurrency(liveStats?.totalRevenue ?? stats?.totalRevenue ?? 0),
      icon: <DollarSign size={28} />, accent: 'text-emerald-400', glow: 'bg-emerald-400/20'
    },
    {
      label: 'Active Routes', value: liveStats?.activeRoutes ?? stats?.activeRoutes ?? 0,
      icon: <Map size={28} />, accent: 'text-onukpa-blue', glow: 'bg-onukpa-blue/20'
    },
    {
      label: 'Inactive Routes', value: roadTimePause,
      icon: <Activity size={28} />, accent: 'text-rose-400', glow: 'bg-rose-500/20'
    },
  ];

  const chartData = liveStats?.chartData ?? [];
  const recentBookings = liveStats?.recentBookings ?? [];
  const routesFill = liveStats?.routesFill ?? [];

  return (
    <div className="space-y-10 pb-20 overflow-visible">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight"
          >
            Control <span className="text-onukpa-orange">Center.</span>
          </motion.h1>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
             <p className="text-slate-400 font-medium text-sm">System operational — auto-syncing every 30s</p>
          </div>
        </div>
        
        <button 
          onClick={handleRefresh} 
          disabled={isLoading}
          className="group flex items-center gap-3 px-6 py-3.5 bg-white/5 border border-white/10 rounded-[1.25rem] text-sm font-bold text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw size={18} className={`${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'} text-onukpa-orange`} />
          {isLoading ? 'Refreshing Bridge...' : 'Refresh Feed'}
        </button>
      </div>

      {/* ── KPI Cards ── */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        initial="hidden" animate="show"
      >
        {kpis.map((k) => (
          <motion.div
            key={k.label}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 overflow-hidden hover:bg-white/[0.08] transition-all"
          >
             {/* Decorative Background Blob */}
             <div className={`absolute top-0 right-0 w-32 h-32 ${k.glow} rounded-full blur-[80px] -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700`}></div>
             
             <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 w-fit mb-6 ${k.accent}`}>
                {k.icon}
             </div>
             
             <div className="space-y-1 relative z-10">
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{k.label}</span>
                <span className="block text-3xl font-display font-bold text-white">{k.value}</span>
             </div>
             
             <div className="absolute bottom-4 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <TrendingUp size={16} className={k.accent} />
             </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Two-column: chart + feed ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 7-day booking chart */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
           <div className="flex items-center justify-between mb-8">
              <h3 className="flex items-center gap-3 text-white font-bold text-lg">
                 <Activity size={20} className="text-onukpa-orange" /> Booking Frequency
              </h3>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/10 truncate">Last 7 Operating Days</span>
           </div>
           <BarChart data={chartData} />
        </div>

        {/* Live activity feed */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 flex flex-col overflow-hidden relative">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-onukpa-blue/5 rounded-full blur-[60px] -mr-[25%]"></div>
           <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="flex items-center gap-3 text-white font-bold text-lg">
                 <Bus size={20} className="text-onukpa-blue" /> Live Activity
              </h3>
              <div className="flex gap-1">
                 {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-slate-700"></div>)}
              </div>
           </div>
           
           <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar relative z-10 pr-2">
            {recentBookings.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                 <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-600 mb-4">
                    <ClipboardList size={20} />
                 </div>
                 <p className="text-slate-500 text-sm font-medium">No active bookings detected in the stream.</p>
              </div>
            )}
            {recentBookings.map((b: any, i: number) => (
              <motion.div 
                key={b.id ?? i} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all cursor-default"
              >
                <div className="relative">
                   <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover:scale-105 duration-300`}>
                      <MapPin size={16} className="text-slate-500 group-hover:text-onukpa-orange transition-colors" />
                   </div>
                   <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#111827] ${
                     b.status === 'CONFIRMED' ? 'bg-emerald-500' :
                     b.status === 'PENDING'   ? 'bg-onukpa-orange' :
                     b.status === 'CANCELLED' ? 'bg-rose-500' : 'bg-slate-400'
                   }`}></div>
                </div>
                <div className="flex-1 space-y-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                     <p className="text-xs font-bold text-white truncate pr-2">
                       {b.origin ?? b.departure ?? '?'} → {b.destination ?? '?'}
                     </p>
                     <span className="text-[10px] font-bold text-emerald-400">{formatCurrency(b.total_amount ?? b.totalAmount ?? 0)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-medium text-slate-500 truncate">{b.passenger_name ?? b.passengerName ?? 'Guest'}</p>
                     <StatusBadge status={b.status} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Route Fill Status ── */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 overflow-hidden relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
           <div>
              <h3 className="flex items-center gap-3 text-white font-bold text-lg mb-1">
                 <TrendingUp size={20} className="text-amber-400" /> Inventory Health
              </h3>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Real-time seat occupancy visualization</p>
           </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="pb-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] pl-2">Route</th>
                <th className="pb-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Seats (Avail/Total)</th>
                <th className="pb-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-8">Occupancy</th>
                <th className="pb-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Status</th>
                <th className="pb-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] text-right pr-2">Active State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {routesFill.map((r: any) => {
                const total = r.total_seats ?? 45;
                const avail = r.available_seats ?? 0;
                const fillPct = total > 0 ? Math.round(((total - avail) / total) * 100) : 0;
                const { label, cls } = getAvailLabel(total, avail);
                const fillColor = fillPct > 80 ? 'bg-rose-500' : fillPct > 50 ? 'bg-onukpa-orange' : 'bg-emerald-500';
                
                return (
                  <tr key={r.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-8 pl-2">
                       <span className="block font-bold text-white text-sm mb-0.5">{r.origin} → {r.destination}</span>
                       <span className="block text-[10px] font-medium text-slate-500">Regular Fleet Operation</span>
                    </td>
                    <td className="py-8 font-mono text-xs text-slate-400">
                       <span className="text-white font-bold">{avail}</span> / {total}
                    </td>
                    <td className="py-8 px-8 min-w-[240px]">
                      <div className="space-y-2">
                         <div className="flex justify-between items-end">
                            <span className="text-[10px] font-bold text-slate-500">{fillPct}% Occupied</span>
                         </div>
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${fillPct}%` }}
                             className={`h-full ${fillColor} shadow-[0_0_10px_rgba(255,255,255,0.1)]`} 
                           />
                         </div>
                      </div>
                    </td>
                    <td className="py-8">
                       <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/5 ${cls}`}>
                          <div className="w-1 h-1 rounded-full bg-current animate-pulse"></div>
                          {label}
                       </span>
                    </td>
                    <td className="py-8 text-right pr-2">
                      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${r.status === 'ACTIVE' ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {routesFill.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-slate-600 text-sm font-medium">
                     The fleet is currently offline. No route data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};



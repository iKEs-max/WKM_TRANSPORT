import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Search, Edit2, CheckCircle, 
  ChevronDown, CheckSquare, 
  Clock, DollarSign, Activity, ArrowUpRight,
  Mail, User
} from 'lucide-react';
import { useAdminStore } from '@/store/admin.store';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Button } from '@/components/common/Button/Button';

type StatusFilter = 'ALL' | 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'COMPLETED';

const STATUS_TABS: { label: string; value: StatusFilter; color: string; glow: string }[] = [
  { label: 'All Records', value: 'ALL',       color: 'text-slate-400', glow: 'bg-slate-500/10' },
  { label: 'Confirmed',   value: 'CONFIRMED', color: 'text-emerald-400', glow: 'bg-emerald-500/10' },
  { label: 'Pending',     value: 'PENDING',   color: 'text-onukpa-orange', glow: 'bg-onukpa-orange/10' },
  { label: 'Cancelled',   value: 'CANCELLED', color: 'text-rose-400', glow: 'bg-rose-500/10' },
  { label: 'Completed',   value: 'COMPLETED', color: 'text-onukpa-blue', glow: 'bg-onukpa-blue/10' },
];

const exportToCsv = (data: any[]) => {
  if (!data.length) return;
  const headers = ['Reference', 'Passenger', 'Route', 'Amount', 'Status', 'Date'];
  const rows = data.map((b) => [
    b.booking_reference ?? b.ticketNumber ?? b.id,
    b.passenger_name ?? b.passengerName ?? '–',
    `${b.origin ?? b.departure ?? '?'} → ${b.destination ?? '?'}`,
    b.total_amount ?? b.totalAmount ?? 0,
    b.status,
    b.created_at ?? b.createdAt ?? '',
  ]);
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `onukpa-bookings-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

export const AdminBookings: React.FC = () => {
  const { allBookings, liveStats, isLoading, fetchDashboardStats, updateBookingStatus } = useAdminStore();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [search, setSearch] = useState('');
  const [editingBooking, setEditingBooking] = useState<any>(null);
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedBookingId((prev) => (prev === id ? null : id));
  };

  useEffect(() => { fetchDashboardStats(); }, [fetchDashboardStats]);

  const bookings: any[] = allBookings.length > 0
    ? allBookings
    : (liveStats?.recentBookings ?? []);

  const filtered = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    const q = search.toLowerCase();
    const name = (b.passenger_name ?? b.passengerName ?? '').toLowerCase();
    const ref = (b.booking_reference ?? b.ticketNumber ?? '').toLowerCase();
    const route = `${b.origin ?? ''}${b.destination ?? ''}`.toLowerCase();
    return matchesStatus && (!q || name.includes(q) || ref.includes(q) || route.includes(q));
  });

  const counts: Record<StatusFilter, number> = {
    ALL: bookings.length,
    CONFIRMED: bookings.filter((b) => b.status === 'CONFIRMED').length,
    PENDING: bookings.filter((b) => b.status === 'PENDING').length,
    CANCELLED: bookings.filter((b) => b.status === 'CANCELLED').length,
    COMPLETED: bookings.filter((b) => b.status === 'COMPLETED').length,
  };

  const handleEdit = (booking: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingBooking(booking);
    setNewStatus(booking.status);
  };

  const handleUpdateStatus = async (id: string, status: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsSaving(true);
    try {
      await updateBookingStatus(id, status);
      setEditingBooking(null);
    } finally {
      setIsSaving(false);
    }
  };

  const totalRevenue = filtered.reduce((sum, b) => sum + parseFloat(String(b.total_amount ?? b.totalAmount ?? 0)), 0);

  const kpis = [
    { label: 'Registry Load', value: counts.ALL, icon: <Activity size={24} />, accent: 'text-slate-400' },
    { label: 'Authorized', value: counts.CONFIRMED, icon: <CheckSquare size={24} />, accent: 'text-emerald-400' },
    { label: 'Awaiting Sync', value: counts.PENDING, icon: <Clock size={24} />, accent: 'text-onukpa-orange' },
    { label: 'Asset Flow', value: formatCurrency(totalRevenue), icon: <DollarSign size={24} />, accent: 'text-onukpa-blue' },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
        <div className="space-y-1">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight"
          >
            Booking <span className="text-onukpa-orange">Ledger.</span>
          </motion.h1>
          <p className="text-slate-500 font-medium text-sm">Comprehensive transaction monitoring and status management</p>
        </div>
        
        <button 
          onClick={() => exportToCsv(filtered)}
          className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-[1.25rem] text-sm font-bold text-white hover:bg-white/10 transition-all active:scale-95"
        >
          <Download size={18} className="text-onukpa-orange" />
          Export Dataset (CSV)
        </button>
      </div>

      {/* ── KPI Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((k) => (
          <div key={k.label} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-between group">
             <div>
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{k.label}</span>
                <span className="block text-2xl font-display font-bold text-white">{k.value}</span>
             </div>
             <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${k.accent} group-hover:scale-110 transition-transform`}>
                {k.icon}
             </div>
          </div>
        ))}
      </div>

      {/* ── Filter Bar ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
         <div className="flex flex-wrap bg-white/5 border border-white/10 p-1.5 rounded-[1.5rem] gap-1">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={`
                  flex items-center gap-3 px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all
                  ${statusFilter === tab.value 
                    ? 'bg-onukpa-blue text-white shadow-lg shadow-onukpa-blue/20' 
                    : 'text-slate-500 hover:text-white hover:bg-white/5'}
                `}
              >
                {tab.label}
                <span className={`px-2 py-0.5 rounded-full text-[9px] ${statusFilter === tab.value ? 'bg-white/10 text-white' : tab.glow + ' ' + tab.color}`}>
                   {counts[tab.value]}
                </span>
              </button>
            ))}
         </div>

         <div className="relative group w-full lg:max-w-md">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-onukpa-orange transition-colors" />
            <input
              className="w-full bg-white/5 border-2 border-white/10 pl-16 pr-8 py-4.5 rounded-[1.5rem] text-white font-medium focus:outline-none focus:border-onukpa-orange transition-all"
              placeholder="Query reference, passenger, route..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
      </div>

      {/* ── Main Ledger Table ── */}
      <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden relative">
         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full">
               <thead>
                  <tr className="text-left border-b border-white/5">
                     <th className="py-8 pl-10 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Digital Reference</th>
                     <th className="py-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Passenger Profile</th>
                     <th className="py-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Fleet Trajectory</th>
                     <th className="py-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Asset Value</th>
                     <th className="py-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Hub Status</th>
                     <th className="py-8 pr-10 text-right text-[10px] font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {isLoading ? (
                    <tr><td colSpan={6} className="py-32 text-center animate-pulse text-slate-600 font-bold uppercase tracking-widest">Synchronizing Ledger...</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={6} className="py-32 text-center text-slate-600 font-bold uppercase tracking-widest">Dataset Empty. No matches found.</td></tr>
                  ) : (
                    filtered.map((b, i) => {
                       const isExpanded = expandedBookingId === (b.id ?? i.toString());

                       return (
                         <React.Fragment key={b.id ?? i}>
                            <motion.tr 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: (i % 20) * 0.02 }}
                              className={`group hover:bg-white/[0.03] transition-all cursor-pointer ${isExpanded ? 'bg-white/[0.04]' : ''}`}
                              onClick={(e) => toggleExpand(b.id ?? i.toString(), e)}
                            >
                               <td className="py-7 pl-10">
                                  <div className="flex items-center gap-4">
                                     <div className={`w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-transform group-hover:rotate-12 ${isExpanded ? 'rotate-180 text-onukpa-orange' : 'text-slate-500'}`}>
                                        <ChevronDown size={14} />
                                     </div>
                                     <span className="font-mono text-xs text-slate-400 tracking-tighter uppercase">{b.booking_reference ?? b.ticketNumber ?? b.id.slice(-8)}</span>
                                  </div>
                               </td>
                               <td className="py-7">
                                  <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                                        <User size={14} />
                                     </div>
                                     <span className="text-sm font-bold text-white">{b.passenger_name ?? b.passengerName ?? 'Anonymous'}</span>
                                  </div>
                               </td>
                               <td className="py-7">
                                  <div className="flex items-center gap-2 group-hover:gap-3 transition-all">
                                     <span className="text-xs font-medium text-slate-400">{b.origin ?? b.departure ?? '?'}</span>
                                     <ArrowUpRight size={10} className="text-onukpa-orange opacity-40" />
                                     <span className="text-xs font-bold text-white">{b.destination ?? '?'}</span>
                                  </div>
                               </td>
                               <td className="py-7">
                                  <span className="text-sm font-bold text-emerald-400">{formatCurrency(b.total_amount ?? b.totalAmount ?? 0)}</span>
                               </td>
                               <td className="py-7 pr-10 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                     {b.status === 'PENDING' && (
                                       <button 
                                         onClick={(e) => handleUpdateStatus(b.id, 'CONFIRMED', e)}
                                         className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all shadow-lg shadow-emerald-500/0 hover:shadow-emerald-500/20"
                                         title="Confirm Booking"
                                       >
                                          <CheckCircle size={16} />
                                       </button>
                                     )}
                                     {b.status === 'CONFIRMED' && (
                                       <button 
                                         onClick={(e) => handleUpdateStatus(b.id, 'COMPLETED', e)}
                                         className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
                                         title="Mark Completed"
                                       >
                                          <CheckSquare size={16} />
                                       </button>
                                     )}
                                     <button 
                                       onClick={(e) => handleEdit(b, e)}
                                       className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all"
                                       title="Detailed Sync/Edit"
                                     >
                                         <Edit2 size={16} />
                                     </button>
                                  </div>
                               </td>
                            </motion.tr>

                            {/* Expanded Detail View */}
                            <AnimatePresence>
                               {isExpanded && (
                                 <motion.tr 
                                   initial={{ opacity: 0, height: 0 }}
                                   animate={{ opacity: 1, height: 'auto' }}
                                   exit={{ opacity: 0, height: 0 }}
                                   className="bg-black/40"
                                 >
                                    <td colSpan={6} className="p-0 border-none">
                                       <div className="p-10 border-b border-white/5 space-y-8">
                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                             <div className="space-y-4">
                                                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Contact Node</h5>
                                                <div className="space-y-3">
                                                   <div className="flex items-center gap-3 text-slate-300">
                                                      <Mail size={14} className="text-onukpa-orange" />
                                                      <span className="text-xs font-medium">{b.email || b.passenger_email || 'No email provided'}</span>
                                                   </div>
                                                    <div className="flex items-center gap-3 text-slate-300">
                                                       <User size={14} className="text-onukpa-blue" />
                                                       <span className="text-xs font-medium">{b.phone || b.passenger_phone || 'No direct comms linked'}</span>
                                                    </div>
                                                 </div>
                                              </div>
                                             <div className="space-y-4 px-10 border-x border-white/5">
                                                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Temporal Stamp</h5>
                                                <div className="space-y-1">
                                                   <span className="block text-lg font-bold text-white">{formatDate(b.created_at ?? b.createdAt)}</span>
                                                   <span className="block text-[10px] font-medium text-slate-500">TRANSACTION INDEX: #{b.id}</span>
                                                </div>
                                             </div>
                                             <div className="space-y-4">
                                                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Network Command</h5>
                                                <div className="flex gap-3">
                                                   <Button variant="outline" size="sm" className="rounded-xl border-white/10 text-xs py-3" onClick={() => alert('Printing Secure Ticket...')}>Generate Ticket</Button>
                                                   <Button variant="glass" size="sm" className="rounded-xl text-xs py-3" onClick={() => alert('Opening Logistics map...')}>Track Asset</Button>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </td>
                                 </motion.tr>
                               )}
                            </AnimatePresence>
                         </React.Fragment>
                       );
                    })
                  )}
               </tbody>
            </table>
         </div>
         
         {/* Footer Sync Indicator */}
         <div className="p-6 border-t border-white/5 bg-black/20 flex justify-between items-center px-10">
            <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
               Secure Ledger Sync Active
            </div>
            <p className="text-[10px] font-medium text-slate-600">v4.2.0 Management Matrix</p>
         </div>
      </div>

      {/* ── Status Management Modal ── */}
      <AnimatePresence>
          {editingBooking && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setEditingBooking(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110]"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-onukpa-blue-dark border border-white/10 rounded-[2.5rem] p-10 z-[111] shadow-2xl space-y-8"
              >
                 <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-white">Update Status</h3>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Modifying Booking Registry Node</p>
                 </div>

                 <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Digital Reference</span>
                       <span className="block text-white font-mono font-bold">{editingBooking.booking_reference ?? editingBooking.id}</span>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">New Hub Status</label>
                       <div className="grid grid-cols-2 gap-3">
                          {['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((s) => (
                            <button
                              key={s}
                              onClick={() => setNewStatus(s)}
                              className={`
                                py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all
                                ${newStatus === s 
                                  ? 'bg-onukpa-orange border-onukpa-orange text-white shadow-lg shadow-onukpa-orange/20' 
                                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:text-white'}
                              `}
                            >
                               {s}
                            </button>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <button 
                      onClick={() => setEditingBooking(null)}
                      className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
                      title="Discard Changes"
                    >
                       Discard
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(editingBooking.id, newStatus)}
                      disabled={isSaving}
                      className="flex-1 py-4 rounded-xl bg-onukpa-orange text-white font-bold text-xs uppercase tracking-widest hover:bg-orange-600 shadow-xl shadow-onukpa-orange/20 transition-all disabled:opacity-50"
                      title="Apply New Status"
                    >
                       {isSaving ? 'Syncing...' : 'Apply Status'}
                    </button>
                 </div>
              </motion.div>
            </>
          )}
      </AnimatePresence>
    </div>
  );
};

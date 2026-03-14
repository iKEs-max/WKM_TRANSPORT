import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, Pencil, Trash2, Save, Map, MapPin, Activity, ChevronRight, Check, AlertCircle } from 'lucide-react';
import { useAdminStore } from '@/store/admin.store';
import { formatCurrency } from '@/utils/formatters';
import type { Route } from '@/types/route.types';
import { Button } from '@/components/common/Button/Button';

/* ── Helpers ──────────────────────────────────────────────────────────────*/
const getAvailInfo = (total: number, available: number) => {
  if (available === 0) return { label: 'Full', cls: 'bg-slate-500/10 text-slate-400 border-slate-500/20' };
  if (available === 1) return { label: '1 Seat Left', cls: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
  const pct = total > 0 ? (available / total) * 100 : 100;
  if (pct <= 20) return { label: 'Filling Fast', cls: 'bg-onukpa-orange/10 text-onukpa-orange border-onukpa-orange/20' };
  return { label: 'Available', cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
};

/* ── Seat stepper ─────────────────────────────────────────────────────────*/
const SeatStepper: React.FC<{
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}> = ({ value, onChange, min = 0, max = 100 }) => (
  <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-1 rounded-xl">
    <button 
      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors disabled:opacity-30" 
      onClick={() => onChange(Math.max(min, value - 1))} 
      disabled={value <= min}
      title="Decrease seats"
    >−</button>
    <span className="min-w-[2rem] text-center font-bold text-white tabular-nums">{value}</span>
    <button 
      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors disabled:opacity-30" 
      onClick={() => onChange(Math.min(max, value + 1))} 
      disabled={value >= max}
      title="Increase seats"
    >+</button>
  </div>
);

/* ── Time chip input ──────────────────────────────────────────────────────*/
const TimeChips: React.FC<{
  times: string[];
  onChange: (times: string[]) => void;
}> = ({ times, onChange }) => {
  const [adding, setAdding] = useState(false);
  const [val, setVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTime = () => {
    if (val && !times.includes(val)) onChange([...times, val]);
    setVal('');
    setAdding(false);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {times.map((t) => (
        <span key={t} className="flex items-center gap-2 px-3 py-1.5 bg-onukpa-blue/10 border border-onukpa-blue/20 text-onukpa-blue text-[10px] font-bold uppercase tracking-wider rounded-lg group">
          <Clock size={10} /> {t}
          <button className="opacity-40 hover:opacity-100 transition-opacity" onClick={() => onChange(times.filter((x) => x !== t))}>×</button>
        </span>
      ))}
      {adding ? (
        <input
          ref={inputRef}
          type="time"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onBlur={addTime}
          onKeyDown={(e) => e.key === 'Enter' && addTime()}
          className="w-24 bg-white/5 border-2 border-onukpa-orange/40 text-white rounded-lg px-2 py-1 text-xs outline-none focus:ring-4 focus:ring-onukpa-orange/10"
          autoFocus
        />
      ) : (
        <button 
          className="px-3 py-1.5 rounded-lg border border-dashed border-white/20 text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:border-white/40 hover:text-slate-300 transition-all" 
          onClick={() => setAdding(true)}
        >
          + Add Time
        </button>
      )}
    </div>
  );
};

/* ── Detail slide-in panel ───────────────────────────────────────────────*/
interface PanelProps {
  route: Route | null;
  onClose: () => void;
  onSave: (id: string, data: Partial<Route>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const RouteDetailPanel: React.FC<PanelProps> = ({ route, onClose, onSave, onDelete }) => {
  const [form, setForm] = useState<Partial<Route>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (route) {
      setForm({
        departure: (route as any).departure ?? (route as any).origin ?? '',
        destination: route.destination ?? '',
        price: route.price ?? (route as any).base_price ?? 0,
        totalSeats: (route as any).totalSeats ?? (route as any).total_seats ?? 45,
        availableSeats: (route as any).availableSeats ?? (route as any).available_seats ?? 45,
        status: route.status ?? 'ACTIVE',
        departureTimes: (route as any).departureTimes ?? (route as any).departure_times ?? [],
        isPopular: (route as any).isPopular ?? false,
        estimatedDuration: route.estimatedDuration ?? '',
        operatingDays: route.operatingDays ?? '',
      });
    }
  }, [route]);

  if (!route) return null;

  const totalSeats = (form.totalSeats as number) ?? 45;
  const availSeats = (form.availableSeats as number) ?? 0;
  getAvailInfo(totalSeats, availSeats);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(String(route.id), {
        departure: form.departure,
        destination: form.destination,
        price: parseFloat(String(form.price)) || 0,
        totalSeats,
        availableSeats: availSeats,
        departureTimes: form.departureTimes,
        isPopular: form.isPopular,
        estimatedDuration: form.estimatedDuration,
        operatingDays: form.operatingDays,
        status: form.status,
      } as any);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" 
      />
      <motion.div
        className="fixed inset-y-4 right-4 w-full max-w-[500px] bg-onukpa-blue-dark/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] z-[101] shadow-2xl flex flex-col overflow-hidden"
        initial={{ x: '110%' }}
        animate={{ x: 0 }}
        exit={{ x: '110%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Header */}
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display font-bold text-white">Edit Route</h2>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mt-1">Route ID: #{String(route.id).slice(-6)}</p>
            </div>
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors" 
              onClick={onClose}
              title="Close Drawer"
            >
               <X size={20} />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            {/* Origin / Destination */}
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Departure</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 px-5 py-3.5 rounded-xl text-white font-medium focus:outline-none focus:border-onukpa-orange focus:ring-4 focus:ring-onukpa-orange/5 transition-all" 
                    value={form.departure ?? ''} 
                    onChange={(e) => setForm((f) => ({ ...f, departure: e.target.value }))} 
                    placeholder="e.g. Accra" 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Destination</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 px-5 py-3.5 rounded-xl text-white font-medium focus:outline-none focus:border-onukpa-orange focus:ring-4 focus:ring-onukpa-orange/5 transition-all" 
                    value={form.destination ?? ''} 
                    onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))} 
                    placeholder="e.g. Kumasi" 
                  />
               </div>
            </div>

            {/* Price & Status */}
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Price (GHS)</label>
                  <input 
                    type="number"
                    className="w-full bg-white/5 border border-white/10 px-5 py-3.5 rounded-xl text-white font-medium focus:outline-none focus:border-onukpa-orange transition-all" 
                    value={form.price as number ?? ''} 
                    onChange={(e) => setForm((f) => ({ ...f, price: parseFloat(e.target.value) }))} 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Route Hub Status</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 px-5 py-3.5 rounded-xl text-white font-bold focus:outline-none transition-all appearance-none" 
                    value={form.status ?? 'ACTIVE'} 
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as any }))}
                    title="Route Status"
                  >
                    <option value="ACTIVE">System Active</option>
                    <option value="INACTIVE">Maintenance Mode</option>
                  </select>
               </div>
            </div>

            {/* Departure times */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Operating Time Slots</label>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                 <TimeChips
                   times={(form.departureTimes as string[]) ?? []}
                   onChange={(times) => setForm((f) => ({ ...f, departureTimes: times }))}
                 />
              </div>
            </div>

            {/* Seat control */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Total Fleet Capacity</label>
                <SeatStepper
                  value={totalSeats}
                  onChange={(v) => setForm((f) => ({ ...f, totalSeats: v, availableSeats: Math.min((f.availableSeats as number) ?? v, v) }))}
                  min={1} max={100}
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Allocated Availability</label>
                <SeatStepper
                  value={availSeats}
                  onChange={(v) => setForm((f) => ({ ...f, availableSeats: v }))}
                  min={0} max={totalSeats}
                />
              </div>
            </div>

            {/* Popular Route Toggle */}
            <label className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer group hover:bg-white/[0.08] transition-all">
               <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${form.isPopular ? 'bg-onukpa-orange border-onukpa-orange' : 'border-white/20'}`}>
                  {form.isPopular && <Check size={14} className="text-white" />}
               </div>
               <input
                 type="checkbox"
                 className="hidden"
                 checked={form.isPopular ?? false}
                 onChange={(e) => setForm((f) => ({ ...f, isPopular: e.target.checked }))}
               />
               <div className="space-y-0.5">
                  <span className="block text-sm font-bold text-white">Promoted Route</span>
                  <span className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest">Mark as popular/top for platform visibility</span>
               </div>
            </label>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-white/10 bg-black/20 flex gap-4">
          <Button 
            variant="primary" 
            size="lg" 
            fullWidth 
            onClick={handleSave} 
            disabled={saving}
            className="rounded-2xl"
          >
            {saving ? 'Syncing...' : 'Deploy Changes'}
          </Button>
          <button 
            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all"
            onClick={() => onDelete(String(route.id)).then(onClose)}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </motion.div>
    </>
  );
};

/* ── Main AdminRoutes page ───────────────────────────────────────────────*/
export const AdminRoutes: React.FC = () => {
  const { allRoutes, isLoading, fetchAllRoutes, updateRoute, deleteRoute } = useAdminStore();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Route | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Inline Add Route Form State
  const [addForm, setAddForm] = useState<Partial<Route>>({
    departure: '', destination: '', price: 0, totalSeats: 45, availableSeats: 45, status: 'ACTIVE', departureTimes: [], estimatedDuration: '', operatingDays: '', isPopular: false
  });
  const [addingSaving, setAddingSaving] = useState(false);

  useEffect(() => { fetchAllRoutes(); }, [fetchAllRoutes]);

  const filtered = allRoutes.filter((r) => {
    const q = search.toLowerCase();
    const dep = ((r as any).departure ?? (r as any).origin ?? '').toLowerCase();
    const dest = (r.destination ?? '').toLowerCase();
    return !q || dep.includes(q) || dest.includes(q);
  });



  const handleSave = async (id: string, data: any) => {
    if (!id || id === 'undefined') {
      await useAdminStore.getState().createRoute(data);
    } else {
      await updateRoute(id, data);
    }
  };

  const handleInlineAddSave = async () => {
    setAddingSaving(true);
    try {
      await handleSave('', {
        ...addForm,
        departure_times: addForm.departureTimes,
        price: parseFloat(String(addForm.price)) || 0,
      });
      setAddForm({ departure: '', destination: '', price: 0, totalSeats: 45, availableSeats: 45, status: 'ACTIVE', departureTimes: [], estimatedDuration: '', operatingDays: '', isPopular: false });
      setIsAddingNew(false);
    } finally {
      setAddingSaving(false);
    }
  };

  const activeRoutesCount = allRoutes.filter((r) => r.status === 'ACTIVE').length;
  const popularRoutesCount = allRoutes.filter((r: any) => r.isPopular).length;

  const kpis = [
    { label: 'Total Inventory', value: allRoutes.length, icon: <Map size={24} />, accent: 'text-onukpa-blue' },
    { label: 'Operational', value: activeRoutesCount, icon: <Activity size={24} />, accent: 'text-emerald-400' },
    { label: 'High Priority', value: popularRoutesCount, icon: <MapPin size={24} />, accent: 'text-onukpa-orange' },
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
            Route <span className="text-onukpa-orange">Architect.</span>
          </motion.h1>
          <p className="text-slate-500 font-medium text-sm">Global logistics and transport network configuration</p>
        </div>
        
        <button 
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="flex items-center gap-3 px-8 py-4 bg-onukpa-orange rounded-[1.25rem] text-sm font-bold text-white hover:bg-orange-600 shadow-lg shadow-onukpa-orange/20 transition-all active:scale-95"
        >
          {isAddingNew ? <X size={20} /> : <MapPin size={20} />}
          {isAddingNew ? 'Close Registry' : 'Launch New Route'}
        </button>
      </div>

      {/* ── KPI Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((k) => (
          <div key={k.label} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-between group">
             <div>
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{k.label}</span>
                <span className="block text-3xl font-display font-bold text-white">{k.value}</span>
             </div>
             <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${k.accent} group-hover:scale-110 transition-transform`}>
                {k.icon}
             </div>
          </div>
        ))}
      </div>

      {/* ── Add New Route Registry ── */}
      <AnimatePresence>
        {isAddingNew && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="overflow-hidden"
          >
            <div className="bg-white/5 backdrop-blur-3xl border-2 border-onukpa-orange/20 rounded-[2.5rem] p-10 space-y-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <MapPin size={200} className="text-onukpa-orange" />
               </div>
               
               <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-onukpa-orange/10 border border-onukpa-orange/20 text-onukpa-orange text-[10px] font-bold uppercase tracking-[0.2em]">
                     <AlertCircle size={12} /> New Registry Entry
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white leading-tight">Define Route Parameters.</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Portal A (Origin)</label>
                    <input className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white font-bold focus:outline-none focus:border-onukpa-orange transition-all" value={addForm.departure ?? ''} onChange={(e) => setAddForm((f) => ({ ...f, departure: e.target.value }))} placeholder="e.g. Accra" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Portal B (Destination)</label>
                    <input className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white font-bold focus:outline-none focus:border-onukpa-orange transition-all" value={addForm.destination ?? ''} onChange={(e) => setAddForm((f) => ({ ...f, destination: e.target.value }))} placeholder="e.g. Kumasi" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Asset Value (GHS)</label>
                    <input className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white font-bold focus:outline-none focus:border-emerald-500 transition-all" type="number" value={addForm.price as number ?? ''} onChange={(e) => setAddForm((f) => ({ ...f, price: parseFloat(e.target.value) }))} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Estimated Travel Time</label>
                    <input className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white font-bold focus:outline-none focus:border-onukpa-blue transition-all" value={addForm.estimatedDuration ?? ''} onChange={(e) => setAddForm((f) => ({ ...f, estimatedDuration: e.target.value }))} placeholder="e.g. 4h 30m" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Operating Schedule</label>
                    <input className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white font-bold focus:outline-none focus:border-onukpa-blue transition-all" value={addForm.operatingDays ?? ''} onChange={(e) => setAddForm((f) => ({ ...f, operatingDays: e.target.value }))} placeholder="e.g. Daily" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Standard Crew Capacity</label>
                    <SeatStepper value={(addForm.totalSeats as number) ?? 45} onChange={(v) => setAddForm((f) => ({ ...f, totalSeats: v, availableSeats: v }))} min={1} max={100} />
                  </div>
                  <div className="lg:col-span-3 space-y-4">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Operational Windows (Time Slots)</label>
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                       <TimeChips times={(addForm.departureTimes as string[]) ?? []} onChange={(times) => setAddForm((f) => ({ ...f, departureTimes: times }))} />
                    </div>
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${addForm.isPopular ? 'bg-amber-400 border-amber-400' : 'border-white/20'}`}>
                       {addForm.isPopular && <Check size={12} className="text-black" />}
                    </div>
                    <input type="checkbox" className="hidden" checked={addForm.isPopular ?? false} onChange={(e) => setAddForm((f) => ({ ...f, isPopular: e.target.checked }))} />
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Premium Platform Spotlight</span>
                  </label>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                     <button className="flex-1 sm:px-12 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all font-display" onClick={() => setIsAddingNew(false)}>Cancel</button>
                     <button className="flex-2 sm:px-16 py-5 rounded-2xl bg-onukpa-orange text-white font-bold text-sm hover:bg-orange-600 shadow-xl shadow-onukpa-orange/20 transition-all font-display flex items-center gap-3 justify-center" onClick={handleInlineAddSave} disabled={addingSaving}>
                        {addingSaving ? 'Integrating...' : <><Save size={18} /> Deploy to Network</>}
                     </button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Routes Directory ── */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
           <div className="relative group flex-1 max-w-2xl">
              <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-onukpa-orange transition-colors" />
              <input
                className="w-full bg-white/5 border-2 border-white/10 pl-16 pr-8 py-5 rounded-[1.5rem] text-white font-medium focus:outline-none focus:border-onukpa-orange focus:ring-4 focus:ring-onukpa-orange/5 transition-all"
                placeholder="Locate route in the directory..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
           
           <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Filter Status:</span>
              <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl">
                 <button className="px-4 py-2 rounded-xl bg-onukpa-blue text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-onukpa-blue/20">All Hubs</button>
                 <button className="px-4 py-2 rounded-xl text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Active Only</button>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {isLoading && (
            <div className="py-20 text-center animate-pulse space-y-4">
               <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-onukpa-orange animate-spin mx-auto"></div>
               <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Deciphering network data...</p>
            </div>
          )}
          
          {!isLoading && filtered.length === 0 && (
            <div className="py-24 text-center bg-white/5 border border-white/10 rounded-[3rem] space-y-4">
               <MapPin size={48} className="mx-auto text-slate-700" />
               <p className="text-slate-500 font-bold uppercase tracking-widest">No routes found matching your coordinates.</p>
            </div>
          )}

          <div className="space-y-4">
            {filtered.map((r, i) => {
              const total = (r as any).total_seats ?? (r as any).totalSeats ?? 45;
              const avail = (r as any).available_seats ?? (r as any).availableSeats ?? 0;
              const dep = (r as any).departure ?? (r as any).origin ?? '–';
              const price = r.price ?? (r as any).base_price ?? 0;
              const { label, cls } = getAvailInfo(total, avail);

              return (
                <motion.div 
                  key={r.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-pointer"
                  onClick={() => setSelected(r)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
                     <div className="flex-1 flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-br from-onukpa-blue to-onukpa-blue-dark border border-white/10 flex items-center justify-center text-onukpa-orange shadow-lg relative shrink-0">
                           <Map size={24} />
                           <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-4 border-onukpa-blue-dark ${r.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-slate-500'}`}></div>
                        </div>
                        <div className="min-w-0">
                           <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-display font-bold text-white text-lg truncate group-hover:text-onukpa-orange transition-colors">{dep} → {r.destination}</h4>
                              {(r as any).isPopular && <span className="shrink-0 scale-75 p-1 bg-amber-400 text-black rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"><Activity size={12} /></span>}
                           </div>
                           <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                              <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                 <Clock size={10} className="text-onukpa-orange" /> {(r as any).estimatedDuration || '4h 30m'}
                              </div>
                              <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                 <AlertCircle size={10} className="text-onukpa-blue" /> {(r as any).operatingDays || 'Daily'}
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center gap-8 lg:gap-12">
                        <div className="px-8 border-x border-white/5">
                           <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 text-center">Price Index</span>
                           <span className="block text-xl font-bold text-white tabular-nums">{formatCurrency(price)}</span>
                        </div>
                        
                        <div className="space-y-2 min-w-[160px]">
                           <div className="flex justify-between items-end">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{avail}/{total} Seats</span>
                              <span className={`text-[9px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-full border ${cls}`}>{label}</span>
                           </div>
                           <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                              <div 
                                className={`h-full ${avail > 10 ? 'bg-emerald-500' : avail > 0 ? 'bg-onukpa-orange' : 'bg-slate-600'}`}
                                style={{ width: `${(avail/total)*100}%` }}
                              />
                           </div>
                        </div>

                        <div className="flex items-center gap-4">
                           <button 
                             onClick={(e) => { e.stopPropagation(); setSelected(r); }}
                             className="p-3 text-slate-500 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                           >
                              <Pencil size={20} />
                           </button>
                           <ChevronRight size={20} className="text-slate-600 group-hover:text-onukpa-orange group-hover:translate-x-1 transition-all" />
                        </div>
                     </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Slide-in detail panel ── */}
      <AnimatePresence>
        {selected !== null && (
          <RouteDetailPanel
            route={selected}
            onClose={() => setSelected(null)}
            onSave={handleSave}
            onDelete={async (id) => { if(confirm('Are you sure? This route will be archived.')) { await deleteRoute(id); setSelected(null); } }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

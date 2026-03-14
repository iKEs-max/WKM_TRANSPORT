import React, { useState, useEffect } from 'react';
import { Bus, MapPin, User, ChevronRight, CheckCircle, Loader2, Calendar, Phone, Clock } from 'lucide-react';
import { routeService } from '@/services/route.service';
import { bookingService } from '@/services/booking.service';
import type { Route } from '@/types/route.types';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/common/Button/Button';
import { formatCurrency } from '@/utils/formatters';

interface BookingForm { 
  route: string; 
  date: string; 
  time: string; 
  seats: string; 
  name: string; 
  phone: string; 
  payment: string; 
}

export const BookRide: React.FC = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BookingForm>({ 
    route: '', 
    date: '', 
    time: '', 
    seats: '1', 
    name: '', 
    phone: '', 
    payment: 'momo' 
  });
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [routesData] = await Promise.all([
          routeService.getRoutes(),
        ]);
        setRoutes(routesData);
      } catch (err) {
        console.error('Failed to load booking data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const selectedRoute = routes.find(r => String(r.id) === form.route);
  const departureTimes = selectedRoute?.departureTimes || [];
  const price = typeof selectedRoute?.price === 'number' ? selectedRoute.price : parseFloat(selectedRoute?.price || '0');
  const total = price * parseInt(form.seats || '1');

  const tomorrow = new Date(); 
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setFormError(null);
      if (!/^\+?[0-9]{10,15}$/.test(form.phone.replace(/\s/g, ''))) {
        setFormError('Please enter a valid phone number (at least 10 digits).');
        return;
      }
      // Create booking and send SMS as soon as passenger info is provided
      setLoading(true);
      try {
        const booking = await bookingService.createConciergeBooking({
          routeId: form.route,
          numberOfTickets: parseInt(form.seats),
          name: form.name,
          phone: form.phone,
          paymentMethod: form.payment,
          date: form.date,
          time: form.time
        });
        setBookingId(booking.ticketNumber || booking.id);
        setConfirmed(true);
      } catch (err) {
        console.error('Booking failed:', err);
        setFormError('Failed to process booking. Please check your network and try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-onukpa-blue" size={48} />
        <p className="text-slate-400 font-medium">Loading premium routes…</p>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-slate-50/50 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-10 md:p-16 rounded-[3rem] text-center border-white/60"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8 shadow-inner">
               <CheckCircle size={56} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Request Received!</h2>
            <p className="text-slate-500 text-lg mb-10">We've sent a detailed confirmation SMS to {form.phone}. Our concierge team will verify your payment shortly.</p>
            
            <div className="bg-slate-50/50 rounded-3xl p-8 mb-10 text-left space-y-4 border border-slate-100">
               <div className="flex justify-between items-center pb-4 border-b border-slate-200/50">
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Ticket ID</span>
                  <span className="font-bold text-onukpa-orange tracking-widest">{bookingId || '---'}</span>
               </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-200/50">
                 <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Route</span>
                 <span className="font-bold text-onukpa-blue-dark">{selectedRoute?.departure} → {selectedRoute?.destination}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-200/50">
                 <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Travel</span>
                 <span className="font-bold text-onukpa-blue-dark">{form.date} · {form.time}</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Total Price</span>
                 <span className="text-2xl font-display font-bold text-onukpa-orange">{formatCurrency(total)}</span>
              </div>
            </div>

            <Button variant="secondary" size="lg" fullWidth onClick={() => { setConfirmed(false); setStep(1); setForm({ route:'',date:'',time:'',seats:'1',name:'',phone:'',payment:'momo' }); setBookingId(null); }}>
              New Booking 
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 pb-24">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-onukpa-blue-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-onukpa-blue to-onukpa-blue-dark"></div>
        {/* Background Student Pattern */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay scale-110">
           <img src="/images/authentic/student_tracking.png" className="w-full h-full object-cover" alt="Student Booking Onukpa Express" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 border border-white/10 text-onukpa-orange text-xs font-bold tracking-widest uppercase">
            📅 Concierge Booking
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Reserve Your <span className="text-gradient">Seat</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Experience the gold standard in student transport. Complete the details below to secure your journey.
          </p>
        </div>
      </section>

      <section className="py-12 -mt-12 relative z-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-2 space-y-10">
              {/* Premium Step Indicator */}
              <div className="flex items-center justify-between max-w-xl mx-auto mb-4">
                {['Trip', 'Passenger'].map((label, i) => (
                  <div key={label} className="flex flex-col items-center relative flex-1 last:flex-none">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 border-2 ${
                      step > i + 1 ? "bg-green-500 border-green-500 text-white" :
                      step === i + 1 ? "bg-onukpa-orange border-onukpa-orange text-white text-glow shadow-lg" :
                      "bg-white border-slate-200 text-slate-300"
                    }`}>
                      {step > i + 1 ? <CheckCircle size={18} /> : i + 1}
                    </div>
                    <span className={`text-[10px] uppercase tracking-widest font-bold mt-3 ${
                      step === i + 1 ? "text-onukpa-orange" : "text-slate-400"
                    }`}>
                      {label}
                    </span>
                    {i < 1 && (
                       <div className={`absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-0.5 transition-colors duration-500 ${
                         step > i + 1 ? "bg-green-500" : "bg-slate-200"
                       }`} />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleNext} className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/80">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <h3 className="text-2xl font-display font-bold flex items-center gap-3">
                         <MapPin className="text-onukpa-orange" /> Trip Details
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="route" className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Route</label>
                          <select 
                            id="route"
                            className="w-full bg-slate-50 border-2 border-slate-100 py-4 px-6 rounded-2xl focus:outline-none focus:border-onukpa-orange focus:ring-4 focus:ring-onukpa-orange/5 transition-all font-bold text-onukpa-blue-dark appearance-none"
                            value={form.route} 
                            onChange={e => setForm({...form, route: e.target.value, time: ''})} 
                            required
                          >
                            <option value="">Choose your route…</option>
                            {routes.map(r => (
                              <option key={r.id} value={r.id}>
                                {r.departure} → {r.destination} — {formatCurrency(r.price)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="date" className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Travel Date</label>
                          <div className="relative">
                             <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                             <input 
                              id="date"
                              type="date" 
                              className="w-full bg-slate-50 border-2 border-slate-100 py-4 pl-14 pr-6 rounded-2xl focus:outline-none focus:border-onukpa-orange focus:ring-4 focus:ring-onukpa-orange/5 transition-all font-bold text-onukpa-blue-dark" 
                              min={minDate} 
                              value={form.date} 
                              onChange={e => setForm({...form, date: e.target.value})} 
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {departureTimes.length > 0 && (
                        <div className="space-y-4">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Preferred Time</label>
                          <div className="flex flex-wrap gap-3">
                            {departureTimes.map(t => (
                              <button 
                                key={t} 
                                type="button" 
                                className={`px-6 py-3 rounded-xl font-bold transition-all border-2 ${
                                  form.time === t 
                                    ? "bg-onukpa-blue border-onukpa-blue text-white shadow-lg" 
                                    : "bg-white border-slate-100 text-slate-500 hover:border-onukpa-orange hover:text-onukpa-orange"
                                }`}
                                onClick={() => setForm({...form, time: t})}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Number of Seats</label>
                        <div className="flex gap-3">
                           {[1,2,3,4,5].map(n => (
                             <button
                                key={n}
                                type="button"
                                className={`w-12 h-12 rounded-xl font-bold transition-all flex items-center justify-center border-2 ${
                                  parseInt(form.seats) === n
                                    ? "bg-onukpa-orange border-onukpa-orange text-white"
                                    : "bg-white border-slate-100 text-slate-400 hover:border-onukpa-orange hover:text-onukpa-orange"
                                }`}
                                onClick={() => setForm({...form, seats: n.toString()})}
                             >
                                {n}
                             </button>
                           ))}
                        </div>
                      </div>

                      <div className="pt-6">
                        <Button 
                          type="submit" 
                          variant="primary" 
                          size="lg" 
                          fullWidth 
                          disabled={!form.route || !form.date || (departureTimes.length > 0 && !form.time)}
                          rightIcon={<ChevronRight size={20} />}
                        >
                          Continue to passenger info
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <h3 className="text-2xl font-display font-bold flex items-center gap-3">
                         <User className="text-onukpa-orange" /> Passenger & Payment
                      </h3>
                      
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                              id="name"
                              className="w-full bg-slate-50 border-2 border-slate-100 py-4 pl-14 pr-6 rounded-2xl focus:outline-none focus:border-onukpa-orange focus:ring-4 focus:ring-onukpa-orange/5 transition-all font-bold text-onukpa-blue-dark" 
                              placeholder="e.g. Ama Owusu" 
                              value={form.name} 
                              onChange={e => setForm({...form, name: e.target.value})} 
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Phone Number (For SMS)</label>
                          <div className="relative">
                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                              id="phone"
                              className="w-full bg-slate-50 border-2 border-slate-100 py-4 pl-14 pr-6 rounded-2xl focus:outline-none focus:border-onukpa-orange focus:ring-4 focus:ring-onukpa-orange/5 transition-all font-bold text-onukpa-blue-dark" 
                              placeholder="e.g. 055 123 4567" 
                              value={form.phone} 
                              onChange={e => { setFormError(null); setForm({...form, phone: e.target.value}); }} 
                              required
                             />
                           </div>
                           <p className="text-xs text-slate-400 italic">We'll send your ticket and tracking link via SMS immediately.</p>
                           {formError && (
                             <p className="text-sm font-bold text-rose-500 mt-2 flex items-center gap-1.5">⚠️ {formError}</p>
                           )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Payment Method</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { value:'momo',   label:'MTN Mobile Money',     icon:'📱' },
                            { value:'telecel',label:'Telecel Cash',          icon:'💵' },
                            { value:'airtel', label:'AirtelTigo Money',      icon:'⚡' },
                            { value:'onsite', label:'Pay at Station',        icon:'📍' },
                          ].map(opt => (
                            <label 
                              key={opt.value} 
                              className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                                form.payment === opt.value 
                                  ? "bg-onukpa-blue/5 border-onukpa-blue ring-4 ring-onukpa-blue/5" 
                                  : "bg-white border-slate-100 hover:border-slate-200"
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                                 form.payment === opt.value ? "bg-onukpa-blue text-white" : "bg-slate-50 text-slate-400"
                              }`}>
                                 {opt.icon}
                              </div>
                              <div className="flex-1">
                                 <p className="font-bold text-onukpa-blue-dark">{opt.label}</p>
                              </div>
                              <input 
                                type="radio" 
                                className="w-5 h-5 accent-onukpa-blue" 
                                name="payment" 
                                value={opt.value} 
                                checked={form.payment === opt.value} 
                                onChange={() => setForm({...form, payment: opt.value})}
                              />
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-6">
                        <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)}>
                           Back
                        </Button>
                        <Button type="submit" variant="primary" size="lg" disabled={!form.name || !form.phone}>
                           Finalize booking
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Sticky Summary Column */}
            <div className="hidden lg:block">
              <div className="sticky top-32">
                 <motion.div 
                    layout
                    className="glass-card p-8 rounded-[2.5rem] border-white/80 overflow-hidden relative"
                 >
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-onukpa-orange/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    
                    <h3 className="text-xl font-display font-bold mb-8 flex items-center gap-2">
                       <Bus size={20} className="text-onukpa-blue" /> Booking Summary
                    </h3>
                    
                    <AnimatePresence mode="wait">
                      {selectedRoute ? (
                        <motion.div 
                          key="summary-filled"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-6"
                        >
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">Selected Route</p>
                            <p className="font-bold text-onukpa-blue-dark leading-tight">{selectedRoute.departure} <span className="text-onukpa-orange mx-1">→</span> {selectedRoute.destination}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                             <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date</p>
                                <p className="text-sm font-bold">{form.date || '---'}</p>
                             </div>
                             <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time</p>
                                <p className="text-sm font-bold">{form.time || '---'}</p>
                             </div>
                          </div>

                          <div className="flex items-center justify-between py-4 border-y border-slate-100">
                             <div className="flex items-center gap-2 text-slate-400">
                                <User size={14} />
                                <span className="text-xs font-bold uppercase tracking-wider">{form.seats} Seat{parseInt(form.seats) > 1 ? 's' : ''}</span>
                             </div>
                             <div className="flex items-center gap-2 text-slate-400">
                                <Clock size={14} />
                                <span className="text-xs font-bold uppercase tracking-wider">Fast Route</span>
                             </div>
                          </div>

                          <div className="pt-2">
                             <div className="flex justify-between items-end">
                                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Total Investment</span>
                                <span className="text-3xl font-display font-bold text-onukpa-orange">{formatCurrency(total)}</span>
                             </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="summary-empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-12"
                        >
                           <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
                              <Loader2 size={24} className="opacity-20" />
                           </div>
                           <p className="text-sm text-slate-400 font-medium">Choose a route to see your summary details.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </motion.div>

                 <div className="mt-8 p-8 rounded-[2.5rem] bg-onukpa-blue-dark text-white relative overflow-hidden group">
                    <div className="relative z-10">
                       <h4 className="text-lg font-bold mb-2">Student Trusted</h4>
                       <p className="text-white/60 text-xs leading-relaxed">Join 5,000+ students who rely on Onukpa Express Ride for safe, comfortable travel every semester.</p>
                    </div>
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-onukpa-orange/20 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

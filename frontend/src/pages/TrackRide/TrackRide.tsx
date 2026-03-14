import React, { useState } from 'react';
import { Clock, Compass, Navigation, MapPin, ChevronRight, Bus } from 'lucide-react';
import api from '@/services/api';
import { TrackingMap } from '@/components/TrackingMap/TrackingMap';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/common/Button/Button';

interface TrackResult {
  status: string;
  eta: string;
  booking: {
    ticket_code: string;
    origin: string;
    destination: string;
    departure_time: string;
    travel_date: string;
  };
}

export const TrackRide: React.FC = () => {
  const [ticketCode, setTicketCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackResult | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketCode.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await api.get(`/bookings/track/${ticketCode.trim()}`);
      if (response.data.success) {
        setResult(response.data);
      } else {
        setError(response.data.message || 'Ticket code not found. Please double check.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Could not find ticket. Please check the code and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-onukpa-blue-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-onukpa-blue to-onukpa-blue-dark"></div>
        {/* Authentic Background Student Image */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay scale-110">
           <img src="/images/authentic/student_tracking.png" className="w-full h-full object-cover" alt="Student Tracking Ride" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 border border-white/10 text-onukpa-orange text-xs font-bold tracking-widest uppercase"
          >
            🛰️ Real-Time Tracking
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
          >
            Locate Your <span className="text-gradient">Ride</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            Enter your journey's ticket code to see your vehicle's current location and estimated arrival time.
          </motion.p>
        </div>
      </section>

      <section className="py-12 -mt-12 relative z-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                key="track-form"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="max-w-2xl mx-auto"
              >
                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/40">
                  <form onSubmit={handleTrack} className="space-y-8">
                    <div className="space-y-4">
                      <label htmlFor="ticketCode" className="block text-sm font-bold text-onukpa-blue-dark uppercase tracking-wider ml-1">
                        Ticket Code
                      </label>
                      <div className="relative group">
                         <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-onukpa-orange transition-colors">
                            <Navigation size={20} />
                         </div>
                         <input
                          id="ticketCode"
                          type="text"
                          className="w-full bg-white border-2 border-slate-100 py-5 pl-14 pr-6 rounded-2xl focus:outline-none focus:border-onukpa-orange focus:ring-4 focus:ring-onukpa-orange/5 transition-all text-xl font-bold tracking-wide placeholder:text-slate-300 placeholder:font-normal"
                          placeholder="e.g. OER-12345"
                          value={ticketCode}
                          onChange={(e) => setTicketCode(e.target.value.toUpperCase())}
                          required
                        />
                      </div>
                      <p className="text-sm text-slate-400 ml-1">You'll find this code in your booking confirmation message.</p>
                    </div>

                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-red-50 text-red-600 px-6 py-4 rounded-xl text-sm font-bold flex items-center gap-3 border border-red-100"
                      >
                        <span className="text-lg">⚠️</span> {error}
                      </motion.div>
                    )}

                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      fullWidth 
                      isLoading={isLoading} 
                      disabled={!ticketCode}
                    >
                       Track My Vehicle <ChevronRight size={20} className="ml-2" />
                    </Button>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="track-result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Result Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="glass-card p-8 rounded-[2rem] border-white/80">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-onukpa-blue/10 flex items-center justify-center text-onukpa-blue">
                         <Compass size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-bold">Trip Details</h3>
                        <p className="text-sm text-slate-400">{result.booking.ticket_code}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="pb-6 border-b border-slate-100">
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Destination</span>
                        <span className="text-lg font-bold text-onukpa-blue-dark">{result.booking.destination}</span>
                      </div>
                      
                      <div className="pb-6 border-b border-slate-100">
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Departure</span>
                        <span className="text-lg font-bold text-onukpa-blue-dark">
                          {new Date(result.booking.travel_date).toLocaleDateString()} · {result.booking.departure_time}
                        </span>
                      </div>

                      <div>
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Current Status</span>
                        <div className="flex items-center justify-between">
                           <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                              result.status === 'Arrived' ? 'bg-green-100 text-green-600' :
                              result.status === 'In Transit' ? 'bg-onukpa-blue text-white' :
                              'bg-amber-100 text-amber-600'
                           }`}>
                              {result.status}
                           </span>
                           {result.eta && result.eta !== 'N/A' && (
                             <div className="flex items-center gap-1.5 text-onukpa-orange font-bold">
                                <Clock size={16} />
                                <span className="text-lg">{result.eta}</span>
                             </div>
                           )}
                        </div>
                      </div>
                    </div>

                    <Button 
                       variant="outline" 
                       size="md" 
                       fullWidth 
                       className="mt-12"
                       onClick={() => { setResult(null); setTicketCode(''); }}
                    >
                       Clear & Track Again
                    </Button>
                  </div>

                  <div className="bg-gradient-to-br from-onukpa-orange to-amber-600 p-8 rounded-[2rem] text-white overflow-hidden relative group">
                     <div className="relative z-10">
                        <Bus className="mb-4 opacity-50" size={32} />
                        <h4 className="text-xl font-bold mb-2">Safe Travels!</h4>
                        <p className="text-white/80 text-sm">Need help? WhatsApp us for direct support with your journey.</p>
                     </div>
                     <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  </div>
                </div>

                {/* Map View */}
                <div className="lg:col-span-2">
                   <div className="glass-card h-[600px] rounded-[2rem] border-white/80 overflow-hidden relative">
                      <TrackingMap 
                        origin={result.booking.origin}
                        destination={result.booking.destination}
                        status={result.status}
                      />
                      
                      {/* Floating Indicator */}
                      <div className="absolute top-6 left-6 right-6">
                         <div className="bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-premium border border-white flex items-center justify-between">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                                  <MapPin size={20} />
                               </div>
                               <div>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Live Journey</p>
                                  <p className="text-sm font-bold text-slate-800">{result.booking.origin} <span className="text-slate-300 mx-2">→</span> {result.booking.destination}</p>
                               </div>
                            </div>
                            <div className="hidden sm:block">
                               <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">GPS Active</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

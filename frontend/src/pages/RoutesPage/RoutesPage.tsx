import React, { useState, useEffect } from 'react';
import { useRouteStore } from '@/store/route.store';
import { RouteGrid } from '@/components/routes/RouteGrid/RouteGrid';
import { Search, MapPin, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FILTERS = ['All Routes', 'Accra', 'Kumasi', 'Cape Coast', 'Tamale', 'Takoradi'];

export const RoutesPage: React.FC = () => {
  const { routes, isLoading, fetchRoutes } = useRouteStore();
  const [activeFilter, setActiveFilter] = useState('All Routes');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

  const activeRoutes = routes.filter(r => r.status === 'ACTIVE');
  
  const filteredRoutes = activeRoutes.filter(r => {
    const matchesFilter = activeFilter === 'All Routes' || 
      r.departure.toLowerCase().includes(activeFilter.toLowerCase()) || 
      r.destination.toLowerCase().includes(activeFilter.toLowerCase());
    
    const matchesSearch = !searchQuery || 
      r.departure.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.destination.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FBFCFE]">
      {/* Premium Centered Hero */}
      <section className="relative pt-40 pb-24 bg-onukpa-blue-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-onukpa-blue to-onukpa-blue-dark"></div>
        {/* Background Student Pattern */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay scale-110">
           <img src="/images/authentic/campus_life.png" className="w-full h-full object-cover" alt="Campus Life at Onukpa" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/10 border border-white/10 text-onukpa-orange text-xs font-bold tracking-[0.2em] uppercase"
          >
             📍 National Coverage
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-7xl font-display font-bold text-white mb-8 tracking-tight"
          >
            Explore Our <span className="text-gradient">Routes</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Direct connectivity between Ghana's major educational hubs and urban centers, designed for the modern student.
          </motion.p>
        </div>
      </section>

      {/* Elite Interface Section */}
      <section className="py-16 -mt-10 relative z-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="glass-card p-6 md:p-10 rounded-[2.5rem] border-white/60 mb-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              {/* Tactile Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                {FILTERS.map((f, i) => (
                  <motion.button
                    key={f}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFilter(f)}
                    className={`px-8 py-3 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all border-2 ${
                      activeFilter === f 
                        ? "bg-onukpa-blue border-onukpa-blue text-white shadow-lg shadow-onukpa-blue/20" 
                        : "bg-white text-slate-500 border-slate-100 hover:border-onukpa-orange hover:text-onukpa-orange hover:shadow-sm"
                    }`}
                  >
                    {f}
                  </motion.button>
                ))}
              </div>
              
              {/* Premium Search Bar */}
              <div className="relative w-full lg:w-96 group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-onukpa-orange transition-colors">
                  <Search size={20} />
                </div>
                <input 
                  type="text"
                  placeholder="Search destination..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 py-4.5 pl-16 pr-8 rounded-2xl focus:outline-none focus:border-onukpa-orange focus:ring-4 focus:ring-onukpa-orange/5 transition-all text-sm font-bold text-onukpa-blue-dark placeholder:font-medium placeholder:text-slate-300"
                />
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter + searchQuery}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <RouteGrid 
                routes={filteredRoutes} 
                isLoading={isLoading} 
                emptyMessage={`No routes found for "${searchQuery || activeFilter}". Try adjusting your search.`}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Specialized Info Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                 <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-orange-50 text-onukpa-orange text-sm font-bold">
                    <Compass size={20} /> Expanding Network
                 </div>
                 <h2 className="text-4xl md:text-5xl font-display font-bold text-onukpa-blue-dark">Can't find your <br /><span className="text-onukpa-orange">campus?</span></h2>
                 <p className="text-lg text-slate-500 font-medium leading-relaxed">
                    We're constantly working to connect more students with safer, better travel options. 
                    Suggest a new route to your university and we'll prioritize it in our expansion.
                 </p>
                 <div className="flex flex-wrap gap-4 pt-4">
                    <button className="bg-onukpa-blue text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-onukpa-blue/20 hover:bg-onukpa-blue-dark active:scale-95 transition-all">
                       Suggest a Route
                    </button>
                    <button className="bg-slate-50 text-slate-600 px-10 py-4 rounded-2xl font-bold hover:bg-slate-100 active:scale-95 transition-all">
                       View Map
                    </button>
                 </div>
              </div>

              <div className="relative">
                 <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-1000">
                    <img src="/images/authentic/campus_life.png" className="w-full h-full object-cover" alt="Students collaborating at Onukpa campus" />
                 </div>
                 <div className="absolute -bottom-10 -left-10 glass-card p-10 rounded-[2.5rem] border-white shadow-2xl max-w-xs hidden lg:block">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                          <MapPin size={24} />
                       </div>
                       <div className="font-bold text-lg">24/7 Support</div>
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">Our logistics center is always active to ensure your journey is smooth and on schedule.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

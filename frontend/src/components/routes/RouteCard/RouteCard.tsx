import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import type { Route } from '@/types/route.types';
import { motion } from 'framer-motion';

interface RouteCardProps {
  route: Route;
}

const getCampusImage = () => {
  return '/images/authentic/travel_route_cover.png';
};

export const RouteCard: React.FC<RouteCardProps> = ({ route }) => {
  const navigate = useNavigate();
  const isAvailable = route.availableSeats > 0;
  const campusImg = getCampusImage();

  const handleBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/booking/${route.id}`);
  };

  return (
    <motion.div 
      whileHover={{ y: -8, transition: { duration: 0.4, ease: "circOut" } }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/booking/${route.id}`)}
      className="group relative bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden hover:border-onukpa-orange/30 hover:shadow-premium transition-all cursor-pointer flex flex-col h-full shadow-sm"
    >
      {/* Dynamic Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-onukpa-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Image Header */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={campusImg} 
          alt={route.destination}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onukpa-blue-dark/80 via-transparent to-transparent"></div>
        
        {route.isPopular && (
          <div className="absolute top-5 right-5 bg-onukpa-orange text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-glow brightness-110 tracking-widest uppercase">
            POPULAR
          </div>
        )}

        <div className="absolute bottom-5 left-5">
          <div className="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20 text-white shadow-2xl">
            <span className="text-[10px] block opacity-60 font-bold uppercase tracking-widest mb-0.5">Premium Fare</span>
            <span className="text-lg font-display font-bold">{formatCurrency(Number(route.price))}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow relative z-10">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
          <div className="flex -space-x-1 mr-2">
             {[1,2,3].map(i => (
                <div key={i} className="w-4 h-4 rounded-full border border-white bg-slate-100 flex items-center justify-center text-[6px]">👤</div>
             ))}
          </div>
          <span>Student Choice • {route.estimatedDuration}</span>
        </div>

        <div className="space-y-4 mb-8 flex-grow">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-onukpa-blue shadow-[0_0_8px_rgba(30,58,138,0.4)] shrink-0"></div>
            <div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Departure</p>
               <span className="font-bold text-onukpa-blue-dark text-base">{route.departure}</span>
            </div>
          </div>
          
          <div className="w-[1px] h-6 bg-slate-100 ml-[4.5px]"></div>
          
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-onukpa-orange shadow-glow shrink-0"></div>
            <div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Destination</p>
               <span className="font-bold text-onukpa-blue-dark text-base">{route.destination}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-bold border ${
              isAvailable 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                : 'bg-rose-50 text-rose-600 border-rose-100'
            }`}>
              <Users size={12} />
              {route.availableSeats} Seats Left
            </div>
          </div>
          
          <motion.button 
            whileHover={{ x: 4 }}
            onClick={handleBook}
            disabled={!isAvailable}
            className="flex items-center gap-2 text-xs font-bold text-onukpa-blue hover:text-onukpa-orange transition-colors group/btn"
          >
            {isAvailable ? 'Book Seat' : 'Sold Out'}
            {isAvailable && <ArrowRight size={16} className="text-onukpa-orange" />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

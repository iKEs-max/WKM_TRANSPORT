import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

export const Refund: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className=" prose prose-blue lg:prose-xl max-w-none"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-onukpa-orange">
               <RotateCcw size={28} />
            </div>
            <h1 className="text-4xl font-display font-bold text-onukpa-blue-dark m-0">Refund <span className="text-onukpa-orange">Policy.</span></h1>
          </div>

          <p className="text-slate-500 font-medium leading-relaxed mb-10">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-onukpa-blue mb-4">1. Cancellation Window</h2>
            <p className="text-slate-600 leading-relaxed">Full refunds (in the form of travel credit) are provided for cancellations made at least **24 hours** before the scheduled departure time.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-onukpa-blue mb-4">2. Late Cancellations</h2>
            <p className="text-slate-600 leading-relaxed">Cancellations made between 24 and 12 hours before departure are subject to a 50% cancellation fee. No refunds are provided for cancellations made less than 12 hours before departure.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-onukpa-blue mb-4">3. Service Disruptions</h2>
            <p className="text-slate-600 leading-relaxed">In the rare event that Onukpa Express Ride cancels a trip, a 100% cash refund or priority re-booking will be offered to all affected passengers.</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className=" prose prose-blue lg:prose-xl max-w-none"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-onukpa-blue/10 flex items-center justify-center text-onukpa-blue">
               <ShieldAlert size={28} />
            </div>
            <h1 className="text-4xl font-display font-bold text-onukpa-blue-dark m-0">Terms of <span className="text-onukpa-orange">Service.</span></h1>
          </div>

          <p className="text-slate-500 font-medium leading-relaxed mb-10">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-onukpa-blue mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 leading-relaxed">By accessing and using Onukpa Express Ride services, you agree to be bound by these Terms of Service and all applicable laws and regulations in Ghana.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-onukpa-blue mb-4">2. Service Usage</h2>
            <p className="text-slate-600 leading-relaxed">Our transport services are primarily designed for university students. Users must provide valid identification upon request. Onukpa Express Ride reserves the right to refuse service to any individual who violates safety protocols.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-onukpa-blue mb-4">3. Booking & Payments</h2>
            <p className="text-slate-600 leading-relaxed">All bookings must be paid in full through our integrated payment systems. Tickets are digital and must be presented (QR code) upon boarding.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-onukpa-blue mb-4">4. Liability</h2>
            <p className="text-slate-600 leading-relaxed">While we strive for 100% on-time performance, Onukpa Express Ride is not liable for delays caused by extreme weather, traffic accidents, or road closures beyond our control.</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className=" prose prose-blue lg:prose-xl max-w-none"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
               <Lock size={28} />
            </div>
            <h1 className="text-4xl font-display font-bold text-onukpa-blue-dark m-0">Privacy <span className="text-onukpa-orange">Policy.</span></h1>
          </div>

          <p className="text-slate-500 font-medium leading-relaxed mb-10">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-onukpa-blue mb-4">1. Data Collection</h2>
            <p className="text-slate-600 leading-relaxed">We collect only essential information required for your travel, including name, phone number, email, and university affiliation.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-onukpa-blue mb-4">2. Use of Information</h2>
            <p className="text-slate-600 leading-relaxed">Your data is used solely for booking confirmations, safety manifests, and service updates. We never sell your personal data to third parties.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-onukpa-blue mb-4">3. Data Security</h2>
            <p className="text-slate-600 leading-relaxed">We implement industry-standard encryption and security measures to protect your digital identity and transaction history.</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

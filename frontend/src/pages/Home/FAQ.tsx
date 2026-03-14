import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "How do I book a ride?",
      a: "Simply click on the 'Book Now' button, select your route, choosing your preferred terminal and time, and complete the paperless payment process."
    },
    {
      q: "What universities do you serve?",
      a: "We currently provide elite transport services for major Ghanaian universities including UG-Legon, KNUST, UCC, and UDS campuses."
    },
    {
      q: "Can I cancel my booking?",
      a: "Yes, cancellations are permitted up to 24 hours before departure for a full credit. Please refer to our Refund Policy for details."
    },
    {
      q: "Is there onboard WiFi?",
      a: "Absolutely. All Onukpa Express Ride buses are equipped with ultra-fast 5G connectivity for all passengers."
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <HelpCircle className="mx-auto text-onukpa-orange mb-6" size={48} />
          <h1 className="text-4xl md:text-6xl font-display font-bold text-onukpa-blue-dark mb-6">Frequently Asked <span className="text-onukpa-orange">Questions.</span></h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto">Everything you need to know about Ghana's gold standard in campus transport.</p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-[2rem] border-white/60 shadow-sm hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-bold text-onukpa-blue mb-4 flex items-center justify-between">
                {faq.q}
                <ChevronDown size={20} className="text-slate-300" />
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

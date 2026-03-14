import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  Zap, 
  Search
} from 'lucide-react';
import { useRouteStore } from '@/store/route.store';
import { RouteGrid } from '@/components/routes/RouteGrid/RouteGrid';
import { ROUTES } from '@/config/routes';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button/Button';
import { Logo } from '@/components/common/Logo/Logo';

// Final deployment synchronization trigger: 2026-03-14T01:54Z
export const Home: React.FC = () => {
  const { routes, isLoading, fetchRoutes } = useRouteStore();
  const popularRoutes = routes.slice(0, 3);

  React.useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Centered Elite Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden min-h-[95vh] flex items-center bg-onukpa-blue-dark">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero_bg.png" 
            className="w-full h-full object-cover opacity-60" 
            alt="Onukpa Hero" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-onukpa-blue-dark/80 via-transparent to-onukpa-blue-dark/90"></div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-10">

             <motion.h1 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="text-5xl md:text-8xl font-display font-bold text-white leading-[1.05] tracking-tight"
             >
                Travel in <span className="text-onukpa-orange">Style.</span> <br /> 
                Arrive <span className="italic font-normal serif decoration-onukpa-orange underline decoration-4 underline-offset-8">Inspired.</span>
             </motion.h1>

             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="text-xl md:text-2xl text-blue-100/80 max-w-2xl mx-auto font-medium"
             >
                The gold standard in campus transport. Secure, comfortable, and always on time. Your education deserves the best journey.
             </motion.p>

             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 }}
               className="flex flex-wrap justify-center gap-4 pt-6"
             >
                <Link to={ROUTES.BOOK_RIDE}>
                  <Button variant="primary" size="lg" className="px-12 py-5 text-lg rounded-2xl shadow-2xl">
                    Book My Seat
                  </Button>
                </Link>
                <Link to={ROUTES.TRACK_RIDE}>
                  <Button variant="outline" size="lg" className="px-12 py-5 text-lg rounded-2xl">
                    Track Journey
                  </Button>
                </Link>
             </motion.div>
          </div>

          {/* Floating High-Res Imagery */}
          <div className="mt-24 relative max-w-5xl mx-auto">
             <motion.div 
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, ease: "circOut" }}
               className="rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-4 border-white"
             >
                <img 
                  src="/images/students_exp.png" 
                  className="w-full aspect-[21/9] object-cover" 
                  alt="Authentic Onukpa Student Experience" 
                />
             </motion.div>

             {/* Tactile Floating Card (Booking Quick Link) */}
             <motion.div
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -bottom-12 -right-12 hidden lg:block"
             >
                <div className="glass-card p-10 rounded-[2.5rem] border-white max-w-xs shadow-2xl">
                   <div className="w-12 h-12 bg-onukpa-orange rounded-2xl flex items-center justify-center text-white mb-6 shadow-glow">
                      <Search size={24} />
                   </div>
                   <h4 className="text-xl font-display font-bold mb-2">Fast Discover</h4>
                   <p className="text-slate-500 text-sm leading-relaxed mb-6">Find the perfect route to your campus in under 30 seconds.</p>
                   <Link to={ROUTES.ROUTES} className="text-onukpa-orange font-bold text-sm flex items-center gap-2 group">
                      Explore Routes <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                   </Link>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Elite Benefits Section */}
      <section className="py-32 bg-slate-50/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
             <div className="max-w-2xl">
                <span className="text-onukpa-orange font-bold text-xs uppercase tracking-[0.2em] mb-4 block">The Onukpa Difference</span>
                <h2 className="text-4xl md:text-6xl font-display font-bold">Why Students <span className="text-slate-400">Choose Us.</span></h2>
             </div>
             <p className="text-slate-500 font-medium max-w-sm">We don't just move people; we move dreams, aspirations, and the future of Ghana.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: <ShieldCheck size={32} />, 
                title: 'Unmatched Safety', 
                desc: 'Every driver undergoes elite training and background checks for your absolute peace of mind.',
                color: 'bg-blue-50 text-blue-600'
              },
              { 
                icon: <Zap size={32} />, 
                title: 'High-Speed Wifi', 
                desc: 'Stay connected, study, or stream your favorite shows with our complimentary ultra-fast onboard 5G.',
                color: 'bg-onukpa-orange/10 text-onukpa-orange'
              },
              { 
                icon: <Calendar size={32} />, 
                title: 'Reliable Timing', 
                desc: 'Our advanced scheduling system ensures 99.8% on-time departures and arrivals, every single time.',
                color: 'bg-emerald-50 text-emerald-600'
              },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="glass-card p-12 rounded-[2.5rem] border-white/40 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 ${benefit.color} shadow-sm`}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">{benefit.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes Preview */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <div className="max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Popular Campus Hubs</h2>
            <p className="text-slate-500 font-medium text-lg">Direct, high-frequency routes connecting all major university campuses across the nation.</p>
          </div>
          
          <RouteGrid routes={popularRoutes} isLoading={isLoading} />
          
          <div className="mt-20">
            <Link to={ROUTES.ROUTES}>
              <Button variant="outline" size="lg" className="px-12 rounded-2xl">
                 View All Routes & Schedules
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Essential Travel Documentation Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <h2 className="text-4xl font-display font-bold mb-8">Journey <span className="text-onukpa-orange">Essentials.</span></h2>
              <div className="space-y-6">
                {[
                  { title: "Onboarding Guide", desc: "A comprehensive document for first-time riders, covering scanning tickets and luggage protocols." },
                  { title: "Student Rights Charter", desc: "Our commitment to your safety, privacy, and academic flexibility during travel." },
                  { title: "Route Network Directory", desc: "Detailed maps and estimated arrival times for every terminal in our network." }
                ].map((doc, idx) => (
                  <div key={idx} className="flex gap-6 p-6 rounded-3xl bg-slate-50 hover:bg-onukpa-blue/5 transition-colors group">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-onukpa-blue font-bold group-hover:bg-onukpa-orange group-hover:text-white transition-all">
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{doc.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{doc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl skew-x-1 hover:skew-x-0 transition-transform duration-700">
                <img src="/images/driver_welcome.png" alt="Travel Essentials" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-8 -left-8 glass-card p-8 rounded-[2rem] border-white shadow-xl max-w-xs">
                <p className="font-bold text-onukpa-blue mb-2 text-left">Paperless Check-in</p>
                <p className="text-xs text-slate-500 text-left">Scan your digital ticket QR code upon boarding for an instant verify.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Impact CTA Banner */}
      <section className="py-24">
         <div className="container mx-auto px-4 max-w-7xl">
            <div className="relative rounded-[4rem] bg-onukpa-blue-dark p-12 md:p-24 overflow-hidden border-8 border-white shadow-2xl">
               {/* Background High-Res Student Shot */}
               <div className="absolute inset-0 opacity-40 mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <img src="/images/authentic/knust_campus_elite.png" className="w-full h-full object-cover" alt="Student Life at Onukpa" />
               </div>
               <div className="absolute inset-0 bg-gradient-to-r from-onukpa-blue-dark via-onukpa-blue-dark/80 to-transparent"></div>
               
               <div className="relative z-10 max-w-2xl">
                  <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">Ready for a <span className="text-onukpa-orange">Better</span> Way to Travel?</h2>
                  <p className="text-blue-100 text-xl font-medium mb-12 leading-relaxed">Join the next generation of students who demand comfort, safety, and reliability. Your seat is waiting.</p>
                  <Link to={ROUTES.BOOK_RIDE}>
                    <Button variant="primary" size="lg" className="px-16 py-6 text-xl rounded-2xl shadow-glow">
                      Book Your Journey Now
                    </Button>
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

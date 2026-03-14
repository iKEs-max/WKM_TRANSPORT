import { motion } from "motion/react";
import { Link } from "react-router";
import { Search, MapPin, Calendar, Users, ChevronRight, ShieldCheck, Clock, CreditCard, Sparkles } from "lucide-react";

export function Home() {
  const routes = [
    {
      id: 1,
      from: "Legon Campus (UG)",
      to: "KNUST, Kumasi",
      price: "150 GHS",
      date: "Fri, Oct 12",
      spots: 12,
      image: "https://images.unsplash.com/photo-1722791438165-be7cf02adad7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXMlMjB0cmFuc3BvcnQlMjB0cmF2ZWx8ZW58MXx8fHwxNzczMzc3MTY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 2,
      from: "UCC Campus",
      to: "Accra Mall",
      price: "100 GHS",
      date: "Sat, Oct 13",
      spots: 5,
      image: "https://images.unsplash.com/photo-1727023663921-967d01f69c7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaGFuYSUyMGFjY3JhfGVufDF8fHx8MTc3MzQxMTExN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 3,
      from: "KNUST Campus",
      to: "Tamale",
      price: "250 GHS",
      date: "Sun, Oct 14",
      spots: 24,
      image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwdHJhdmVsfGVufDF8fHx8MTc3MzQxMTExN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-slate-50 overflow-hidden pt-12 lg:pt-20 pb-24">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] rounded-full bg-onukpa-orange/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] rounded-full bg-onukpa-blue/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            <motion.div 
              className="flex-1 text-center lg:text-left pt-8 lg:pt-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 text-onukpa-blue font-medium text-sm mb-6">
                <Sparkles size={16} className="text-onukpa-orange" />
                <span>The #1 Student Travel Network in Ghana</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 leading-tight mb-6">
                Travel from Campus to <span className="text-onukpa-orange">Anywhere</span> in Comfort.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 font-sans leading-relaxed">
                Book affordable, safe, and reliable bus rides designed specifically for Ghanaian university students. No more hassle at the station.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link 
                  to="/book" 
                  className="w-full sm:w-auto px-8 py-4 bg-onukpa-blue text-white rounded-full font-medium text-lg shadow-xl shadow-blue-900/20 hover:bg-blue-900 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  Book Your Seat <ChevronRight size={20} />
                </Link>
                <Link 
                  to="/routes" 
                  className="w-full sm:w-auto px-8 py-4 bg-white text-onukpa-blue rounded-full font-medium text-lg border border-slate-200 hover:border-onukpa-orange hover:text-onukpa-orange transition-all flex items-center justify-center"
                >
                  View Routes
                </Link>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start gap-6">
                <div className="flex -space-x-3">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Student" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Student" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                  <img src="https://randomuser.me/api/portraits/men/68.jpg" alt="Student" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm">
                    +5k
                  </div>
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  Students traveling with us
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="flex-1 w-full max-w-lg lg:max-w-none relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Floating glass card */}
              <div className="absolute -left-6 lg:-left-12 top-1/4 z-20 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/40 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 font-heading">Safe & Secure</div>
                  <div className="text-xs text-slate-500 font-sans">Verified Drivers</div>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-8 border-white aspect-[4/5] sm:aspect-square md:aspect-[4/3] lg:aspect-[4/5] group">
                <img 
                  src="https://images.unsplash.com/photo-1632834380561-d1e05839a33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBjYW1wdXN8ZW58MXx8fHwxNzczNDExMTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                  alt="Happy students traveling" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onukpa-blue/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold font-heading mb-2">Student Life, Simplified.</h3>
                  <p className="text-white/80 font-sans">Your journey starts here.</p>
                </div>
              </div>

              {/* Floating glass card 2 */}
              <div className="absolute -right-6 lg:-right-8 bottom-1/4 z-20 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/40 flex items-center gap-4 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-onukpa-orange">
                  <Clock size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 font-heading">On Time</div>
                  <div className="text-xs text-slate-500 font-sans">Strict Schedules</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Search Widget - Negative Margin to overlap hero */}
      <section className="relative z-30 container mx-auto px-4 md:px-6 -mt-12 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100"
        >
          <form className="flex flex-col md:flex-row items-end gap-4" onSubmit={(e) => { e.preventDefault(); window.location.href='/routes'; }}>
            <div className="w-full md:w-1/3 space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <MapPin size={16} className="text-onukpa-orange" /> From
              </label>
              <select className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-onukpa-orange/50 appearance-none font-medium text-slate-800 min-h-[56px]">
                <option>University of Ghana (UG)</option>
                <option>KNUST</option>
                <option>UCC</option>
                <option>UPSA</option>
              </select>
            </div>
            
            <div className="hidden md:flex items-center justify-center pb-4 text-slate-300">
              <ChevronRight size={24} />
            </div>

            <div className="w-full md:w-1/3 space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <MapPin size={16} className="text-onukpa-blue" /> To
              </label>
              <select className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-onukpa-blue/50 appearance-none font-medium text-slate-800 min-h-[56px]">
                <option>Kumasi (Adum)</option>
                <option>Accra (Circle)</option>
                <option>Tamale</option>
                <option>Cape Coast</option>
              </select>
            </div>

            <div className="w-full md:w-1/4 space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Calendar size={16} className="text-onukpa-orange" /> Date
              </label>
              <input type="date" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-onukpa-orange/50 font-medium text-slate-800 min-h-[56px]" />
            </div>

            <button type="submit" className="w-full md:w-auto p-4 bg-onukpa-orange text-white rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center min-h-[56px]">
              <Search size={24} />
              <span className="md:hidden ml-2 font-bold text-lg">Search Routes</span>
            </button>
          </form>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">Why Ride with Onukpa Express?</h2>
            <p className="text-slate-600 text-lg font-sans">We've reimagined student transportation to give you peace of mind on every journey back home or to campus.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-onukpa-orange mb-6">
                <CreditCard size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">Student-Friendly Prices</h3>
              <p className="text-slate-600 font-sans">Affordable rates tailored for university students. No hidden station fees or bargaining required.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-onukpa-blue mb-6">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">Guaranteed Departures</h3>
              <p className="text-slate-600 font-sans">We leave on time, every time. Say goodbye to waiting hours for the bus to get full at the station.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">Safe & Comfortable</h3>
              <p className="text-slate-600 font-sans">Modern, air-conditioned buses with verified professional drivers to ensure you arrive safely.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Routes */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-2">Popular Campus Routes</h2>
              <p className="text-slate-600 font-sans text-lg">Book early to secure your preferred seat.</p>
            </div>
            <Link to="/routes" className="flex items-center gap-2 text-onukpa-blue font-medium hover:text-onukpa-orange transition-colors">
              View all routes <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {routes.map((route, i) => (
              <motion.div 
                key={route.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={route.image} alt={`${route.from} to ${route.to}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-onukpa-blue shadow-sm">
                    {route.price}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-medium text-slate-500">{route.date}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    <span className="text-sm font-medium text-onukpa-orange flex items-center gap-1">
                      <Users size={14} /> {route.spots} spots left
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-6 flex-1">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-onukpa-blue"></div>
                      <div className="w-0.5 h-8 bg-slate-200"></div>
                      <div className="w-3 h-3 rounded-full border-2 border-onukpa-orange bg-white"></div>
                    </div>
                    <div className="flex flex-col justify-between h-full py-1">
                      <div className="font-heading font-bold text-slate-900">{route.from}</div>
                      <div className="font-heading font-bold text-slate-900">{route.to}</div>
                    </div>
                  </div>

                  <Link 
                    to="/book" 
                    className="w-full py-4 sm:py-3.5 bg-slate-50 hover:bg-onukpa-blue hover:text-white text-onukpa-blue rounded-xl font-bold sm:font-medium text-center transition-colors border border-slate-200 hover:border-onukpa-blue min-h-[56px] flex items-center justify-center"
                  >
                    Select Seat
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-onukpa-blue">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />
           </svg>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Ready for your next trip?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 font-sans">
            Join thousands of students who trust Onukpa Express for their inter-city and campus travels.
          </p>
          <Link 
            to="/book" 
            className="inline-block px-10 py-5 bg-onukpa-orange text-white rounded-full font-bold text-lg shadow-xl shadow-orange-500/20 hover:bg-orange-600 hover:scale-105 transition-all"
          >
            Book Your Journey Now
          </Link>
        </div>
      </section>
    </div>
  );
}

import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Calendar, MapPin, Map, ShieldCheck, Zap, Star } from "lucide-react";
import { useState } from "react";

const popularRoutes = [
  { id: 1, from: "Accra Mall", to: "Legon Campus", price: "GHS 15", duration: "25 min" },
  { id: 2, from: "Madina Zongo", to: "UPSA", price: "GHS 10", duration: "15 min" },
  { id: 3, from: "Circle", to: "Ashesi University", price: "GHS 45", duration: "1h 10m" },
];

export function Home() {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  return (
    <div className="flex flex-col flex-grow">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden bg-blue-950">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1741637335289-c99652d3155f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjB3YWxraW5nfGVufDF8fHx8MTc3MzQxMTA2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="University students walking"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-blue-950/80"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          {/* Hero Copy */}
          <div className="flex-1 text-center lg:text-left text-white max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-semibold tracking-wide uppercase shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                The #1 Student Transport
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
                Skip the Queue. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  Catch Your Ride.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Book secure, comfortable shuttles to and from Ghanaian university campuses. Smart routing, guaranteed seats, zero stress.
              </p>
              
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/booking"
                  className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-1 hover:shadow-orange-500/40 flex items-center gap-2"
                >
                  Book Now <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/routes"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-semibold backdrop-blur-sm transition-all"
                >
                  View Routes
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Quick Booking Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md lg:ml-auto"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl shadow-blue-900/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-orange-500/30 transition-colors"></div>
              
              <h3 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-orange-400" />
                Quick Search
              </h3>

              <div className="space-y-4 relative">
                <div className="absolute left-6 top-10 bottom-12 w-0.5 bg-white/20 z-0"></div>
                
                <div className="relative z-10">
                  <label className="block text-sm font-medium text-slate-300 mb-1">Pick up from</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                    <input
                      type="text"
                      placeholder="e.g. Accra Mall"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                  </div>
                </div>

                <div className="relative z-10 pt-2">
                  <label className="block text-sm font-medium text-slate-300 mb-1">Drop off at</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                    <input
                      type="text"
                      placeholder="e.g. Legon Campus"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                    />
                  </div>
                </div>

                <Link
                  to="/booking"
                  className="block w-full bg-blue-600 hover:bg-blue-500 text-white text-center py-3.5 rounded-xl font-semibold shadow-md mt-6 transition-colors border border-blue-400/50"
                >
                  Find Available Shuttles
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-display font-bold text-blue-950 mb-4">Why Choose Onukpa Express?</h2>
            <p className="text-slate-600 text-lg">We understand student life. Our service is designed to be affordable, reliable, and entirely stress-free.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-blue-950 mb-3">Instant Booking</h3>
              <p className="text-slate-600 leading-relaxed">Book your seat in seconds. No more waiting in long queues at trot-tro stations. Just tap, book, and go.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-blue-950 mb-3">Secure & Safe</h3>
              <p className="text-slate-600 leading-relaxed">Verified drivers, real-time tracking, and well-maintained vehicles ensure you get to campus safely.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <Map className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-blue-950 mb-3">Smart Routes</h3>
              <p className="text-slate-600 leading-relaxed">Optimized routing specifically for university nodes. We get you there faster by skipping the unnecessary stops.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Routes section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-display font-bold text-blue-950 mb-4">Popular Campus Routes</h2>
              <p className="text-slate-600 text-lg">The most frequently booked routes by students across Accra.</p>
            </div>
            <Link to="/routes" className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-2 group">
              See all routes <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRoutes.map((route) => (
              <div key={route.id} className="group relative bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:border-orange-200 hover:bg-orange-50 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-semibold text-slate-700">{route.from}</span>
                    </div>
                    <div className="w-0.5 h-6 bg-slate-200 ml-4"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="font-semibold text-slate-700">{route.to}</span>
                    </div>
                  </div>
                  <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm font-bold text-blue-950">
                    {route.price}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <span className="text-sm text-slate-500 font-medium">Est. {route.duration}</span>
                  <Link to="/booking" className="text-sm font-semibold text-blue-600 group-hover:text-orange-600 transition-colors flex items-center gap-1">
                    Book Seat <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Break / Image section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1761760178065-f45ba583a014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidXMlMjB0cmFuc3BvcnR8ZW58MXx8fHwxNzczNDExMDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Modern Transport Bus"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-950/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 to-transparent"></div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-xl text-white">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">Comfortable Rides for Your Daily Commute</h2>
            <p className="text-lg text-slate-300 mb-8">Modern fleets equipped with air conditioning, WiFi, and spacious seating to make your journey to campus a breeze.</p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-blue-900 bg-slate-300 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Student Avatar" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-orange-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="font-medium">4.9/5 from 2,000+ students</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

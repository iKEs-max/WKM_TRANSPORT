import { MapPin, Bus, Clock } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";

const allRoutes = [
  { id: 1, from: "Accra Mall", to: "Legon Campus", price: "GHS 15", duration: "25 min", frequency: "Every 15 mins", status: "Active" },
  { id: 2, from: "Madina Zongo", to: "UPSA", price: "GHS 10", duration: "15 min", frequency: "Every 10 mins", status: "Active" },
  { id: 3, from: "Circle", to: "Ashesi University", price: "GHS 45", duration: "1h 10m", frequency: "Every 2 hours", status: "Scheduled" },
  { id: 4, from: "Kasoa", to: "UCC Campus", price: "GHS 55", duration: "2h 30m", frequency: "Twice daily", status: "Scheduled" },
  { id: 5, from: "Tema Comm 1", to: "Central University", price: "GHS 20", duration: "40 min", frequency: "Every 30 mins", status: "Active" },
  { id: 6, from: "Adenta", to: "Valley View Uni", price: "GHS 12", duration: "20 min", frequency: "Every 20 mins", status: "Active" },
];

export function RoutesPage() {
  return (
    <div className="flex-grow bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-blue-950 mb-6"
          >
            Schedules & <span className="text-orange-500">Routes</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Find the perfect route to your campus. We operate across all major university hubs in the country, providing safe and reliable transport daily.
          </motion.p>
        </div>

        {/* Routes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allRoutes.map((route, i) => (
            <motion.div 
              key={route.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all flex flex-col h-full"
            >
              <div className="flex justify-between items-center mb-6">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  route.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {route.status}
                </span>
                <span className="text-xl font-bold text-blue-950">{route.price}</span>
              </div>

              <div className="flex-grow space-y-4 mb-8">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-600 flex-shrink-0"></div>
                    <div className="w-0.5 h-10 bg-slate-200"></div>
                    <div className="w-4 h-4 rounded-full bg-orange-100 border-2 border-orange-500 flex-shrink-0"></div>
                  </div>
                  <div className="flex flex-col justify-between py-0.5">
                    <div className="font-semibold text-slate-800">{route.from}</div>
                    <div className="font-semibold text-slate-800">{route.to}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  <Clock className="w-4 h-4" /> {route.duration}
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  <Bus className="w-4 h-4" /> {route.frequency}
                </div>
              </div>

              <Link 
                to="/booking" 
                className="w-full text-center py-3 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl font-semibold transition-colors mt-auto border border-blue-100 hover:border-blue-600"
              >
                Book This Route
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { motion } from "motion/react";
import { Link } from "react-router";
import { Search, MapPin, Calendar, Users, Filter, ArrowRightLeft, X } from "lucide-react";
import { useState } from "react";
import { Drawer } from "vaul";

export function RoutesPage() {
  const [filter, setFilter] = useState("All");

  const routes = [
    {
      id: 1,
      from: "Legon Campus (UG)",
      to: "KNUST, Kumasi",
      price: "150 GHS",
      date: "Fri, Oct 12",
      time: "08:00 AM",
      spots: 12,
      type: "Inter-city",
      bus: "VIP Coach",
      duration: "4h 30m"
    },
    {
      id: 2,
      from: "UCC Campus",
      to: "Accra Mall",
      price: "100 GHS",
      date: "Sat, Oct 13",
      time: "10:00 AM",
      spots: 5,
      type: "Inter-city",
      bus: "Sprinter Plus",
      duration: "2h 45m"
    },
    {
      id: 3,
      from: "KNUST Campus",
      to: "Tamale",
      price: "250 GHS",
      date: "Sun, Oct 14",
      time: "06:00 AM",
      spots: 24,
      type: "Long Distance",
      bus: "Executive Coach",
      duration: "8h 00m"
    },
    {
      id: 4,
      from: "UPSA",
      to: "Kumasi (Adum)",
      price: "150 GHS",
      date: "Mon, Oct 15",
      time: "09:00 AM",
      spots: 18,
      type: "Inter-city",
      bus: "VIP Coach",
      duration: "4h 45m"
    },
    {
      id: 5,
      from: "University of Ghana",
      to: "Cape Coast",
      price: "90 GHS",
      date: "Fri, Oct 19",
      time: "14:00 PM",
      spots: 3,
      type: "Inter-city",
      bus: "Sprinter Plus",
      duration: "2h 30m"
    }
  ];

  const filteredRoutes = filter === "All" ? routes : routes.filter(r => r.type === filter);

  const FilterContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="space-y-6">
      {!isMobile && (
        <div className="flex items-center gap-2 mb-6 text-onukpa-blue font-heading font-bold text-lg">
          <Filter size={20} /> Filters
        </div>
      )}
      
      <div>
        <h4 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wider">Route Type</h4>
        <div className="space-y-3">
          {["All", "Inter-city", "Long Distance"].map((type) => (
            <label key={type} className="flex items-center gap-4 p-2 -m-2 cursor-pointer group rounded-lg hover:bg-slate-50 transition-colors">
              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${filter === type ? 'bg-onukpa-orange border-onukpa-orange' : 'border-slate-300 group-hover:border-onukpa-orange'}`}>
                {filter === type && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
              </div>
              <span className={`text-base ${filter === type ? 'font-medium text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-slate-100" />

      <div>
        <h4 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wider">Departure Date</h4>
        <input 
          type="date" 
          className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-base text-slate-700 focus:outline-none focus:ring-2 focus:ring-onukpa-blue/20 min-h-[48px]" 
        />
      </div>

      <button 
        onClick={() => setFilter("All")}
        className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors text-base min-h-[48px]"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="flex flex-col w-full bg-[#F8FAFC] min-h-screen">
      {/* Page Header */}
      <section className="bg-onukpa-blue pt-12 pb-24 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-onukpa-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Find Your Route</h1>
          <p className="text-white/80 font-sans text-lg max-w-2xl">
            Browse our scheduled departures across all major university campuses and cities in Ghana.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 md:px-6 -mt-12 relative z-20 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Button */}
          <div className="lg:hidden w-full">
            <Drawer.Root>
              <Drawer.Trigger asChild>
                <button className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center gap-3 font-heading font-bold text-lg text-onukpa-blue min-h-[56px] hover:border-onukpa-orange transition-colors">
                  <Filter size={24} /> Filter Routes
                </button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-slate-900/40 z-50 backdrop-blur-sm" />
                <Drawer.Content className="bg-white flex flex-col rounded-t-[2rem] h-[80vh] mt-24 fixed bottom-0 left-0 right-0 z-50">
                  <div className="p-4 bg-white rounded-t-[2rem] flex-1 overflow-y-auto">
                    <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-slate-300 mb-6" />
                    
                    <div className="flex items-center justify-between mb-8 px-2">
                      <h2 className="text-2xl font-heading font-bold text-slate-900">Filters</h2>
                      <Drawer.Close asChild>
                        <button className="p-2 -m-2 text-slate-400 hover:text-slate-600">
                          <X size={24} />
                        </button>
                      </Drawer.Close>
                    </div>

                    <div className="px-2">
                      <FilterContent isMobile={true} />
                    </div>

                    <div className="mt-8 px-2 pb-6">
                      <Drawer.Close asChild>
                        <button className="w-full py-4 bg-onukpa-blue text-white rounded-xl font-bold text-lg min-h-[56px] shadow-lg shadow-blue-900/20">
                          Show Results
                        </button>
                      </Drawer.Close>
                    </div>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>

          {/* Desktop Sidebar Filter */}
          <div className="hidden lg:block w-1/4">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 sticky top-24">
              <FilterContent />
            </div>
          </div>

          {/* Results List */}
          <div className="w-full lg:w-3/4 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-2">
              <h2 className="text-xl font-bold font-heading text-slate-800">Available Rides ({filteredRoutes.length})</h2>
              <div className="flex items-center gap-2 text-sm text-slate-500 bg-white p-2 md:p-0 rounded-lg md:bg-transparent shadow-sm md:shadow-none border border-slate-100 md:border-none">
                <span className="hidden md:inline">Sort by:</span>
                <select className="bg-transparent font-medium text-slate-800 outline-none w-full md:w-auto min-h-[36px] flex-1">
                  <option>Earliest Departure</option>
                  <option>Lowest Price</option>
                  <option>Available Seats</option>
                </select>
              </div>
            </div>

            {filteredRoutes.map((route, i) => (
              <motion.div 
                key={route.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-3xl p-5 md:p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group flex flex-col md:flex-row gap-6 md:items-center justify-between"
              >
                {/* Route Info */}
                <div className="flex-1 flex flex-col w-full">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <div className="bg-orange-50 text-onukpa-orange px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
                      <Calendar size={14} />
                      {route.date}
                    </div>
                    <span className="font-bold text-slate-700 bg-slate-50 px-3 py-1 rounded-full">{route.time}</span>
                  </div>
                  
                  {/* Destktop layout: horizontal, Mobile layout: fully stacked with icon */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full">
                    <div className="font-heading font-bold text-xl md:text-lg text-slate-900 w-full sm:w-40 md:truncate">{route.from}</div>
                    
                    {/* Visual Connector */}
                    <div className="flex items-center gap-3 text-slate-300 w-full sm:w-auto sm:flex-1 py-2 sm:py-0">
                      <div className="w-3 h-3 rounded-full border-2 border-onukpa-blue shrink-0 sm:hidden"></div>
                      <div className="h-[2px] w-full bg-slate-200 rounded-full flex-1 hidden sm:block"></div>
                      <ArrowRightLeft size={18} className="text-onukpa-blue shrink-0 hidden sm:block" />
                      <div className="h-8 w-[2px] bg-slate-200 rounded-full sm:hidden ml-1"></div>
                      <div className="h-[2px] w-full bg-slate-200 rounded-full flex-1 hidden sm:block"></div>
                    </div>
                    
                    <div className="flex items-center gap-3 sm:gap-0 w-full sm:w-auto">
                      <div className="w-3 h-3 rounded-full border-2 border-onukpa-orange shrink-0 sm:hidden"></div>
                      <div className="font-heading font-bold text-xl md:text-lg text-slate-900 w-full sm:w-40 md:truncate sm:text-right">{route.to}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-6 text-sm text-slate-500 bg-slate-50/50 p-3 rounded-xl w-full">
                    <span className="flex items-center gap-1.5 font-medium"><MapPin size={16} className="text-slate-400" /> {route.duration}</span>
                    <div className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block"></div>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Users size={16} className={route.spots < 10 ? 'text-red-500' : 'text-slate-400'} /> 
                      <span className={route.spots < 10 ? 'text-red-500 font-bold' : ''}>{route.spots} seats left</span>
                    </span>
                    <div className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block"></div>
                    <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600">{route.bus}</span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex flex-col w-full md:w-auto justify-between md:items-end gap-5 md:border-l border-slate-100 md:pl-8 pt-6 md:pt-0 border-t md:border-t-0 mt-2 md:mt-0">
                  <div className="flex flex-row md:flex-col justify-between items-center md:items-end w-full">
                    <div className="text-sm text-slate-500 font-medium mb-0 md:mb-1">Price per seat</div>
                    <div className="text-3xl font-bold font-heading text-onukpa-blue">{route.price}</div>
                  </div>
                  <Link 
                    to="/book" 
                    className="w-full md:w-auto px-8 py-4 md:py-3.5 bg-onukpa-orange hover:bg-orange-600 text-white rounded-xl font-bold text-lg md:text-base transition-colors shadow-lg shadow-orange-500/20 text-center flex items-center justify-center min-h-[56px]"
                  >
                    Select Seat
                  </Link>
                </div>
              </motion.div>
            ))}

            {filteredRoutes.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border-2 border-slate-100 border-dashed">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4">
                  <Filter size={24} />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-800 mb-2">No routes found</h3>
                <p className="text-slate-500 font-medium text-lg mb-6">We couldn't find any trips matching your criteria.</p>
                <button 
                  onClick={() => setFilter("All")}
                  className="px-6 py-3 bg-onukpa-blue text-white rounded-xl font-medium shadow-sm hover:bg-blue-900 transition-colors min-h-[48px]"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

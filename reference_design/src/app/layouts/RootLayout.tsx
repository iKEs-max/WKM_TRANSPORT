import { Outlet, Link, useLocation } from "react-router";
import { Bus, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function RootLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Routes", path: "/routes" },
    { name: "Book a Seat", path: "/booking" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
              <Bus className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-blue-900">
              Onukpa<span className="text-orange-500">Express</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                  location.pathname === link.path ? "text-orange-500" : "text-slate-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/booking"
              className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md shadow-blue-900/20 hover:shadow-lg hover:-translate-y-0.5"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-blue-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white border-b border-slate-200"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium p-2 rounded-lg ${
                    location.pathname === link.path
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-blue-900 text-white px-5 py-3 rounded-xl text-center font-semibold mt-2 shadow-md shadow-blue-900/20"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      <footer className="bg-blue-950 text-slate-300 py-12 border-t border-blue-900">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                <Bus className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Onukpa<span className="text-orange-500">Express</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">
              The premier student transport booking service for Ghanaian universities. Fast, reliable, and secure rides to campus.
            </p>
          </div>
          <div>
            <h4 className="text-white font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
              <li><Link to="/routes" className="hover:text-orange-400 transition-colors">Routes & Schedules</Link></li>
              <li><Link to="/booking" className="hover:text-orange-400 transition-colors">Book a Seat</Link></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Legon Campus, Accra</li>
              <li>support@onukpaexpress.com</li>
              <li>+233 55 123 4567</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-blue-900/50 text-sm text-center text-slate-500">
          © {new Date().getFullYear()} Onukpa Express. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

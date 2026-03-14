import { Outlet, Link, useLocation } from "react-router";
import { Menu, X, Bus, ChevronRight, MapPin, Calendar, Phone, Mail, Instagram, Twitter, Facebook } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function RootLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Routes", path: "/routes" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-[#F8FAFC]">
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-md shadow-sm py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-onukpa-blue flex items-center justify-center text-white group-hover:bg-onukpa-orange transition-colors">
                <Bus size={24} className="group-hover:-rotate-12 transition-transform" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-onukpa-blue">
                Onukpa<span className="text-onukpa-orange">Express</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={`font-medium transition-colors hover:text-onukpa-orange ${
                    location.pathname === link.path ? "text-onukpa-orange" : "text-slate-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/book" 
                className="bg-onukpa-orange hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-lg shadow-orange-500/20"
              >
                Book Now
              </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-slate-800 p-3 -mr-3 flex items-center justify-center min-h-[44px] min-w-[44px]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className="block py-4 text-2xl font-heading font-medium text-onukpa-blue border-b border-slate-100 w-full"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/book" 
                className="bg-onukpa-blue text-white text-center py-4 rounded-xl font-medium mt-6 w-full flex items-center justify-center gap-2 min-h-[56px]"
              >
                Book Your Seat <ChevronRight size={20} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col pt-20">
        <Outlet />
      </main>

      <footer className="bg-onukpa-blue text-white pt-16 pb-8 mt-auto">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-onukpa-blue">
                  <Bus size={24} />
                </div>
                <span className="font-heading text-xl font-bold tracking-tight text-white">
                  Onukpa<span className="text-onukpa-orange">Express</span>
                </span>
              </Link>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Making student transportation across Ghanaian universities reliable, comfortable, and affordable.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-onukpa-orange transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-onukpa-orange transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-onukpa-orange transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-heading text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-slate-300 hover:text-onukpa-orange transition-colors">Home</Link></li>
                <li><Link to="/routes" className="text-slate-300 hover:text-onukpa-orange transition-colors">Popular Routes</Link></li>
                <li><Link to="/book" className="text-slate-300 hover:text-onukpa-orange transition-colors">Book a Seat</Link></li>
                <li><a href="#" className="text-slate-300 hover:text-onukpa-orange transition-colors">Track Bus</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-300 hover:text-onukpa-orange transition-colors">FAQ</a></li>
                <li><a href="#" className="text-slate-300 hover:text-onukpa-orange transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-slate-300 hover:text-onukpa-orange transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-300 hover:text-onukpa-orange transition-colors">Refund Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-300">
                  <MapPin size={20} className="text-onukpa-orange shrink-0 mt-0.5" />
                  <span>Legon Campus, UG<br />Accra, Ghana</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Phone size={20} className="text-onukpa-orange shrink-0" />
                  <span>+233 55 123 4567</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Mail size={20} className="text-onukpa-orange shrink-0" />
                  <span>hello@onukpaexpress.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Onukpa Express. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Built for Ghanaian Students 🇬🇭</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

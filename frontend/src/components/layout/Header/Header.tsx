import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Navigation } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { useAuthStore } from '@/store/auth.store';
import { Logo } from '@/components/common/Logo/Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/common/Button/Button';
import { ThemeSwitcher } from '@/components/common/ThemeSwitcher/ThemeSwitcher';
import { useSettingsStore } from '@/store/settings.store';

const NAV_LINKS = [
  { name: 'Home',   path: ROUTES.HOME      },
  { name: 'Routes', path: ROUTES.ROUTES    },
  { name: 'Track',  path: ROUTES.TRACK_RIDE },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout, user } = useAuthStore();
  const { settings } = useSettingsStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header 
        className={`fixed left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
          isScrolled 
            ? "top-4 mx-auto w-[calc(100%-2rem)] max-w-5xl rounded-full border border-white/10 bg-white/70 backdrop-blur-2xl shadow-2xl py-2" 
            : "top-0 w-full bg-transparent py-6"
        }`}
      >
        <div className={`container mx-auto px-6 flex items-center justify-between ${isScrolled ? 'max-w-none' : 'max-w-7xl'}`}>
          {/* Logo */}
          <Link to={ROUTES.HOME} className="transition-transform active:scale-95 flex-shrink-0 flex items-center gap-3">
            <Logo size={isScrolled ? 24 : 28} />
            <span className={`font-display font-bold tracking-tight ${isScrolled ? 'text-lg text-slate-900' : 'text-xl text-onukpa-blue-dark'}`}>
              {settings?.siteName || 'Onukpa Express'}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className={`hidden md:flex items-center transition-all duration-500 ${isScrolled ? 'gap-6' : 'gap-10'}`}>
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`group relative text-sm font-bold transition-all hover:text-onukpa-orange ${
                  location.pathname === link.path ? "text-onukpa-orange" : isScrolled ? "text-slate-800" : "text-slate-600"
                }`}
              >
                {link.name === 'Track' && <Navigation size={14} className="inline mr-1.5 -mt-0.5" />}
                {link.name}
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-onukpa-orange rounded-full"
                  />
                )}
            </Link>
            ))}
            
            <div className="h-6 w-[1px] bg-slate-200 mx-2" />
            <ThemeSwitcher />
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {user?.role === 'ADMIN' && (
                  <Link to={ROUTES.ADMIN_DASHBOARD}>
                    <Button variant="glass" size="sm" className="hidden lg:flex items-center gap-2">
                       <Navigation size={14} className="text-onukpa-orange" /> Admin Portal
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={logout}>
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to={ROUTES.ADMIN_LOGIN}>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-onukpa-blue font-bold">
                    Admin
                  </Button>
                </Link>
                <Link to={ROUTES.BOOK_RIDE}>
                  <Button variant="primary" size="md">
                    Book Now
                  </Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-onukpa-blue-dark p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            className="fixed inset-0 z-40 bg-white pt-28 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className="block text-3xl font-display font-bold text-onukpa-blue-dark active:text-onukpa-orange transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-6 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">Personalize Aesthetic</span>
                <ThemeSwitcher />
              </div>
              
              <Link to={ROUTES.BOOK_RIDE}>
                <Button variant="primary" size="lg" fullWidth className="mt-8">
                  Book Your Seat <ChevronRight size={20} className="ml-2" />
                </Button>
              </Link>
              
              {!isAuthenticated && (
                <Link to={ROUTES.ADMIN_LOGIN} className="text-center mt-12 text-slate-400 font-medium text-sm">
                  Management Portal
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

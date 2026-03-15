import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Route, 
  ClipboardList, 
  Settings,
  LogOut,
  ChevronRight,
  X
} from 'lucide-react';
import { useUIStore } from '@/store/ui.store';
import { ROUTES } from '@/config/routes';
import { useAuthStore } from '@/store/auth.store';
import { Logo } from '@/components/common/Logo/Logo';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminSidebar: React.FC = () => {
  const { logout, user } = useAuthStore();
  const { isSidebarOpen, setSidebarOpen } = useUIStore();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: ROUTES.ADMIN_DASHBOARD, end: true },
    { label: 'Routes', icon: Route, path: ROUTES.ADMIN_ROUTES },
    { label: 'Bookings', icon: ClipboardList, path: ROUTES.ADMIN_BOOKINGS },
    { label: 'Settings', icon: Settings, path: ROUTES.ADMIN_SETTINGS },
  ];

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-onukpa-blue-dark/80 backdrop-blur-2xl border-r border-white/10
        transition-transform duration-500 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-8 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo size={28} variant="light" />
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white transition-colors"
              title="Close Sidebar"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => window.innerWidth <= 1024 && setSidebarOpen(false)}
                className={({ isActive }) => `
                  group flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all relative overflow-hidden
                  ${isActive 
                    ? 'bg-onukpa-orange text-white shadow-lg shadow-onukpa-orange/20' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                `}
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={20} className="relative z-10" />
                    <span className="font-bold text-sm relative z-10">{item.label}</span>
                    <ChevronRight size={14} className={`ml-auto transition-transform ${isActive ? 'rotate-90' : 'group-hover:translate-x-1'} relative z-10 opacity-40`} />
                    
                    {/* Active Indicator Glow */}
                    {isActive && (
                      <motion.div 
                        layoutId="active-pill"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-onukpa-orange to-orange-600"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 bg-black/20">
            <div className="flex items-center gap-4 mb-6 px-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-onukpa-orange to-orange-600 flex items-center justify-center text-white font-bold text-xl shadow-lg border border-white/10">
                {user?.firstName?.[0] || 'A'}
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-white text-sm truncate">{user?.firstName || 'Admin User'}</p>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Administrator</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold text-sm hover:bg-rose-500 hover:text-white transition-all active:scale-95 group"
            >
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

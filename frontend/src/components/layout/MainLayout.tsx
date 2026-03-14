import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { PageTransition } from '@/components/common/PageTransition/PageTransition';

export const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};

import { AdminSidebar } from '@/pages/Admin/AdminSidebar';
import { Menu } from 'lucide-react';
import { useUIStore } from '@/store/ui.store';
import { Logo } from '@/components/common/Logo/Logo';

export const DashboardLayout: React.FC = () => {
  const { toggleSidebar } = useUIStore();

  return (
    <div className="flex h-screen overflow-hidden bg-onukpa-blue-dark relative">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-onukpa-orange/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-onukpa-blue/10 rounded-full blur-[120px] -ml-64 -mb-64"></div>

      <AdminSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden relative z-10">
        <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-xl border-b border-white/10">
          <Logo size={24} className="brightness-0 invert" />
          <span className="font-display font-bold text-white tracking-widest uppercase text-xs">Admin Console</span>
          <button 
            className="p-2 text-white hover:bg-white/10 rounded-xl transition-colors" 
            onClick={toggleSidebar} 
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-10 lg:p-12 custom-scrollbar">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

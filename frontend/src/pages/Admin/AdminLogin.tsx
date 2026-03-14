import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Shield, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/config/routes';
import { authService } from '@/services/auth.service';
import { Logo } from '@/components/common/Logo/Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/common/Button/Button';

export const AdminLogin: React.FC = () => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { user, tokens } = await authService.login({ email, password });
      setAuth(user, tokens);
      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (err: any) {
      console.error('[Admin Login Error]', err);
      const message = err.response?.data?.message || err.message || 'Invalid credentials. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 md:p-8 overflow-hidden transition-colors duration-700" style={{ backgroundColor: 'var(--color-bg, oklch(18% 0.04 260))' }}>
      {/* Authentic Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/authentic/campus_life.png" 
          className="w-full h-full object-cover grayscale opacity-20 mix-blend-overlay scale-110" 
          alt="" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-onukpa-blue-dark)] via-[var(--color-onukpa-blue-dark)]/90 to-transparent"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl"
      >
        {/* Left Branding Side */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-white/5 border-r border-white/10 relative overflow-hidden group">
           {/* Animated Glows */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-onukpa-orange/10 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-onukpa-orange/20 transition-colors duration-1000"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-onukpa-blue/20 rounded-full blur-[100px] -ml-32 -mb-32"></div>

           <div className="relative z-10">
              <Logo size={40} variant="light" className="mb-12" />
              <div className="space-y-6">
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl font-display font-bold text-white leading-tight"
                >
                  Management <br />
                  <span className="text-onukpa-orange">Excellence.</span>
                </motion.h1>
                <p className="text-lg text-slate-300 font-medium leading-relaxed max-w-sm">
                  The central hub for navigating Ghana's most reliable student transport network.
                </p>
              </div>
           </div>

           <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-400 tracking-widest uppercase">
                 <Shield size={14} className="text-onukpa-orange" /> Certified Administrator
              </div>
           </div>
        </div>

        {/* Right Form Side */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
           <div className="lg:hidden mb-12">
              <Logo size={32} />
           </div>

           <div className="mb-10">
              <h2 className="text-3xl font-display font-bold text-white mb-3">Admin Sign In</h2>
              <p className="text-slate-400 font-medium leading-relaxed">Enter your secure credentials to access the bridge.</p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Secure Email</label>
                 <div className="relative group">
                    <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-onukpa-orange transition-colors" />
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@onukpaexpress.com"
                      className="w-full bg-white/5 border-2 border-white/10 py-4.5 pl-14 pr-6 rounded-2xl focus:outline-none focus:border-onukpa-orange focus:ring-4 focus:ring-onukpa-orange/5 transition-all text-white font-medium"
                      required
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Encrypted Password</label>
                 <div className="relative group">
                    <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-onukpa-orange transition-colors" />
                    <input 
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="w-full bg-white/5 border-2 border-white/10 py-4.5 pl-14 pr-14 rounded-2xl focus:outline-none focus:border-onukpa-orange focus:ring-4 focus:ring-onukpa-orange/5 transition-all text-white font-medium"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                       {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                 </div>
              </div>

              <AnimatePresence>
                 {error && (
                   <motion.div 
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: 'auto' }}
                     exit={{ opacity: 0, height: 0 }}
                     className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-bold p-4 rounded-xl flex items-center gap-3"
                   >
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>
                      {error}
                   </motion.div>
                 )}
              </AnimatePresence>

              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                fullWidth 
                disabled={isLoading}
                className="h-16 rounded-[1.25rem] relative overflow-hidden group"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Shield size={20} /> Access Control Center <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
           </form>

           <div className="mt-12 text-center">
              <p className="text-slate-500 text-sm font-medium">
                 © {new Date().getFullYear()} Onukpa Express Ride Management Systems. <br />
                 Unauthorized access is strictly prohibited.
              </p>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

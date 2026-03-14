import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Save, Lock, Loader2, Globe, Shield, CreditCard, Activity } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { adminService } from '@/services/admin.service';
import { authService } from '@/services/auth.service';
import type { GlobalSettings } from '@/types/admin.types';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsFormData extends GlobalSettings {}

interface PasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export const AdminSettings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<SettingsFormData>();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
  } = useForm<PasswordFormData>();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await adminService.getSettings();
        reset(data);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, [reset]);

  const onSubmit = async (data: SettingsFormData) => {
    setIsSaving(true);
    setSettingsMessage(null);
    try {
      await adminService.updateSettings(data);
      setSettingsMessage({ type: 'success', text: 'System configuration synchronized successfully.' });
    } catch (error) {
      setSettingsMessage({ type: 'error', text: 'Failed to synchronize settings. Network rejection.' });
    } finally {
      setIsSaving(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Access keys do not match.' });
      return;
    }

    setIsChangingPassword(true);
    setPasswordMessage(null);
    try {
      await authService.changePassword(data.newPassword);
      setPasswordMessage({ type: 'success', text: 'Security key rotated successfully.' });
      resetPassword();
    } catch (error) {
      setPasswordMessage({ type: 'error', text: 'Failed to rotate access keys.' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-4 animate-pulse">
        <Loader2 className="w-12 h-12 text-onukpa-orange animate-spin" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Decrypting settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-12 pb-32">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
        <div className="space-y-1">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight"
          >
            System <span className="text-onukpa-orange">Architecture.</span>
          </motion.h1>
          <p className="text-slate-500 font-medium text-sm">Fine-tune global parameters and security protocols</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {/* ── Global Settings ── */}
        <section className="space-y-6">
           <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-onukpa-orange rounded-full"></div>
              <h2 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-2">
                 <Globe size={18} className="text-onukpa-orange" /> Core Parameters
              </h2>
           </div>

           <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              
              <AnimatePresence>
                {settingsMessage && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`mb-8 p-4 rounded-xl border text-sm font-bold flex items-center gap-3 ${
                      settingsMessage.type === 'success' 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                        : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${settingsMessage.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                    {settingsMessage.text}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Brand Identity</label>
                       <input className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white font-bold focus:outline-none focus:border-onukpa-orange transition-all placeholder:text-slate-700" {...register('siteName')} placeholder="Onukpa Express Ride" />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Logistics Support Email</label>
                       <input type="email" className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white font-bold focus:outline-none focus:border-onukpa-orange transition-all placeholder:text-slate-700" {...register('contactEmail')} placeholder="support@onukpaexpressride.com" />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Dispatch Hotline</label>
                       <input type="text" className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white font-bold focus:outline-none focus:border-onukpa-blue transition-all" placeholder="+233XXXXXXXXX" {...register('contactPhone')} />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Direct WhatsApp Hub</label>
                       <input type="text" className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white font-bold focus:outline-none focus:border-onukpa-blue transition-all" placeholder="+233XXXXXXXXX" {...register('whatsappNumber')} />
                    </div>
                 </div>

                 <div className="space-y-6 pt-6 border-t border-white/5">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                       <Activity size={14} className="text-onukpa-orange" /> Social Matrix
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Facebook URL</label>
                          <input type="url" className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white font-medium focus:outline-none focus:border-onukpa-blue transition-all" {...register('facebookUrl')} />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Twitter (X) URL</label>
                          <input type="url" className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white font-medium focus:outline-none focus:border-onukpa-blue transition-all" {...register('twitterUrl')} />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Instagram URL</label>
                          <input type="url" className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white font-medium focus:outline-none focus:border-onukpa-blue transition-all" {...register('instagramUrl')} />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-6 pt-6 border-t border-white/5">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                       <CreditCard size={14} className="text-emerald-400" /> Financial & Regional
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Operating Currency</label>
                          <select className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white font-bold focus:outline-none appearance-none" {...register('defaultCurrency')} title="Select default currency">
                             <option value="GHS">GHS (Ghana Cedi)</option>
                             <option value="USD">USD (US Dollar)</option>
                          </select>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Payment Infrastructure</label>
                          <select className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white font-bold focus:outline-none appearance-none" {...register('paymentProvider')} title="Select payment provider">
                             <option value="hubtel">Hubtel Africa</option>
                             <option value="paystack">Paystack</option>
                             <option value="stripe">Stripe Global</option>
                          </select>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Inventory Max Allocation</label>
                          <input type="number" min={1} max={50} className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white font-bold focus:outline-none focus:border-onukpa-orange transition-all" {...register('maxSeatsPerBooking', { valueAsNumber: true })} />
                       </div>

                       <div className="flex items-center pt-8">
                          <label className="flex items-center gap-4 cursor-pointer group">
                             <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all group-hover:bg-white/5`}>
                                <input type="checkbox" className="hidden" {...register('enableEmailNotifications')} />
                                <div className="w-3 h-3 rounded-sm bg-onukpa-orange opacity-0 check-indicator transition-opacity" style={{ opacity: 'var(--indicator-opacity, 0)' }}></div>
                             </div>
                             <style dangerouslySetInnerHTML={{ __html: `input:checked + .check-indicator { --indicator-opacity: 1 !important; }` }} />
                             <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Enable Real-time Email Sync</span>
                          </label>
                       </div>
                    </div>
                 </div>

                 <div className="pt-8">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg"
                      isLoading={isSaving} 
                      className="rounded-2xl px-12 group"
                    >
                      <Save size={18} className="group-hover:-translate-y-0.5 transition-transform" /> Synchronize System
                    </Button>
                 </div>
              </form>
           </div>
        </section>

        {/* ── Security ── */}
        <section className="space-y-6">
           <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-onukpa-blue rounded-full"></div>
              <h2 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-2">
                 <Shield size={18} className="text-onukpa-blue" /> Security Protocol
              </h2>
           </div>

           <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-onukpa-blue/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
              
              <AnimatePresence>
                {passwordMessage && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`mb-8 p-4 rounded-xl border text-sm font-bold flex items-center gap-3 ${
                      passwordMessage.type === 'success' 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                        : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${passwordMessage.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                    {passwordMessage.text}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">New Access Key</label>
                       <div className="relative group">
                          <Lock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-onukpa-orange transition-colors" />
                          <input 
                            type="password" 
                            className="w-full bg-white/5 border border-white/10 pl-14 pr-6 py-4 rounded-2xl text-white font-bold focus:outline-none focus:border-onukpa-orange transition-all" 
                            {...registerPassword('newPassword', { required: true, minLength: 6 })} 
                            placeholder="••••••••"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Verify Access Key</label>
                       <div className="relative group">
                          <Lock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-onukpa-orange transition-colors" />
                          <input 
                            type="password" 
                            className="w-full bg-white/5 border border-white/10 pl-14 pr-6 py-4 rounded-2xl text-white font-bold focus:outline-none focus:border-onukpa-orange transition-all" 
                            {...registerPassword('confirmPassword', { required: true })} 
                            placeholder="••••••••"
                          />
                       </div>
                    </div>
                 </div>

                 <div>
                    <Button 
                      type="submit" 
                      variant="glass" 
                      size="lg"
                      isLoading={isChangingPassword}
                      className="rounded-2xl px-12 group hover:bg-onukpa-blue hover:text-white"
                    >
                      <Lock size={18} className="group-hover:rotate-12 transition-transform" /> Rotate Secure Keys
                    </Button>
                 </div>
              </form>
           </div>
        </section>
      </div>

      <div className="mt-12 text-center">
         <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em]">Integrated Management Environment v4.2</p>
      </div>
    </div>
  );
};

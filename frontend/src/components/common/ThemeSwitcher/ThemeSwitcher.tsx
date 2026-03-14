import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Sun, Moon, Sparkles, Trophy, Leaf } from 'lucide-react';
import { useTheme, Theme } from '@/context/ThemeContext';

const THEME_OPTIONS: { id: Theme; label: string; icon: React.ReactNode; color: string; shadowColor: string }[] = [
  { id: 'bright',        label: 'Elite Bright',    icon: <Sun size={14} />,      color: 'bg-blue-500',   shadowColor: 'rgba(59, 130, 246, 0.5)' },
  { id: 'midnight-gold', label: 'Midnight Gold', icon: <Trophy size={14} />,   color: 'bg-[#EAB308]',  shadowColor: 'rgba(234, 179, 8, 0.6)' },
  { id: 'emerald-city',  label: 'Emerald City',  icon: <Leaf size={14} />,     color: 'bg-[#10B981]',  shadowColor: 'rgba(16, 185, 129, 0.6)' },
  { id: 'sunset',        label: 'Solar Sunset',  icon: <Sparkles size={14} />, color: 'bg-orange-500', shadowColor: 'rgba(249, 115, 22, 0.6)' },
  { id: 'dark',          label: 'Deep Moon',    icon: <Moon size={14} />,     color: 'bg-slate-800',  shadowColor: 'rgba(30, 41, 59, 0.6)' },
  { id: 'light',         label: 'Classic',      icon: <Palette size={14} />,  color: 'bg-slate-200',  shadowColor: 'rgba(148, 163, 184, 0.3)' },
];

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const currentTheme = THEME_OPTIONS.find(t => t.id === theme) || THEME_OPTIONS[0];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className="group flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-slate-600 hover:text-onukpa-blue hover:border-onukpa-blue/40 transition-all shadow-sm active:shadow-inner"
        title="Cycle Aesthetic"
      >
        <motion.div 
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          className={`w-3 h-3 rounded-full ${currentTheme.color} group-hover:animate-pulse`} 
          style={{ boxShadow: `0 0 12px ${currentTheme.shadowColor}` }}
        />
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] hidden lg:block min-w-[90px] text-left">
           {currentTheme.label}
        </span>
        <Palette size={16} className="group-hover:rotate-12 transition-transform text-slate-400 group-hover:text-onukpa-orange" />
      </motion.button>
    </div>
  );
};

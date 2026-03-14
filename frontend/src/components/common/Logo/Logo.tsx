import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
}

export const Logo: React.FC<LogoProps> = ({ size = 24, className = "", variant = 'auto' }) => {
  const isDark = variant === 'dark';
  const isLight = variant === 'light';
  
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div 
        className={`rounded-xl overflow-hidden bg-white/5 flex items-center justify-center group-hover:bg-onukpa-orange/10 transition-all duration-500 shadow-lg ${isLight ? 'shadow-white/10' : 'shadow-onukpa-blue/5'} group-hover:shadow-onukpa-orange/10`}
        style={{ width: size + 16, height: size + 16 }}
      >
        <img 
          src="/images/logo.png" 
          alt="Onukpa Express Ride" 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <span className={`font-display font-bold tracking-tight transition-colors ${
        isLight ? 'text-white' : isDark ? 'text-onukpa-blue' : 'text-onukpa-blue dark:text-white'
      }`} style={{ fontSize: size }}>
        Onukpa<span className="text-onukpa-orange">Express</span> <span className={`${isLight ? 'text-white/60' : 'text-onukpa-blue/60'} group-hover:text-onukpa-orange transition-colors`}>Ride</span>
      </span>
    </div>
  );
};

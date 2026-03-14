import { useSettingsStore } from '@/store/settings.store';

interface LogoProps {
  size?: number;
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  hideText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 24, className = "", variant = 'auto', hideText = false }) => {
  const isDark = variant === 'dark';
  const isLight = variant === 'light';
  const { settings } = useSettingsStore();

  const siteName = settings?.siteName || 'Onukpa Express Ride';
  // Split name for styling: first word normally, rest with accent
  const words = siteName.split(' ');
  const firstWord = words[0];
  const remainingText = words.slice(1).join(' ');
  
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div 
        className={`rounded-xl overflow-hidden bg-white/5 flex items-center justify-center group-hover:bg-onukpa-orange/10 transition-all duration-500 shadow-lg ${isLight ? 'shadow-white/10' : 'shadow-onukpa-blue/5'} group-hover:shadow-onukpa-orange/10`}
        style={{ width: size + 16, height: size + 16 }}
      >
        <img 
          src="/images/logo.png" 
          alt={siteName} 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      {!hideText && (
        <span className={`font-display font-bold tracking-tight transition-colors ${
          isLight ? 'text-white' : isDark ? 'text-onukpa-blue' : 'text-onukpa-blue dark:text-white'
        }`} style={{ fontSize: size }}>
          {firstWord}<span className="text-onukpa-orange">{remainingText}</span>
        </span>
      )}
    </div>
  );
};

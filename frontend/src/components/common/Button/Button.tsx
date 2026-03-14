import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading, 
    leftIcon, 
    rightIcon, 
    children, 
    fullWidth,
    disabled,
    ...props 
  }, ref) => {
    
    const variants = {
      primary: 'bg-onukpa-orange text-white shadow-glow hover:bg-onukpa-orange-dark',
      secondary: 'bg-onukpa-blue text-white hover:bg-onukpa-blue-dark',
      outline: 'bg-transparent border-2 border-slate-200 text-slate-700 hover:border-onukpa-orange hover:text-onukpa-orange',
      ghost: 'bg-transparent text-slate-600 hover:bg-slate-50',
      glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-10 py-4 text-base',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.96 }}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        disabled={disabled || isLoading}
        className={clsx(
          'relative inline-flex items-center justify-center font-bold transition-colors rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...(props as any)}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

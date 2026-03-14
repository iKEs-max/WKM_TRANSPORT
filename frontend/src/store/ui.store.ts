import { create } from 'zustand';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

interface UIState {
  isSidebarOpen: boolean;
  theme: 'light' | 'dark' | 'sunset' | 'bright';
  toasts: Toast[];
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'sunset' | 'bright') => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

let toastCounter = 0;

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  theme: (() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wkm-theme');
      if (saved && ['light', 'dark', 'sunset', 'bright'].includes(saved)) {
        return saved as 'light' | 'dark' | 'sunset' | 'bright';
      }
    }
    return 'bright';
  })(),
  toasts: [],

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),

  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wkm-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
    set({ theme });
  },

  addToast: (toast) => {
    const id = `toast-${++toastCounter}`;
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      }, duration);
    }
  },

  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

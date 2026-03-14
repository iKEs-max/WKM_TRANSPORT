import { create } from 'zustand';
import { settingsService } from '@/services/settings.service';
import type { GlobalSettings } from '@/types/admin.types';

interface SettingsState {
  settings: GlobalSettings | null;
  isLoading: boolean;
  error: string | null;
  fetchSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  isLoading: false,
  error: null,
  fetchSettings: async () => {
    set({ isLoading: true, error: null });
    try {
      const settings = await settingsService.getPublicSettings();
      set({ settings, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch settings', isLoading: false });
    }
  },
}));

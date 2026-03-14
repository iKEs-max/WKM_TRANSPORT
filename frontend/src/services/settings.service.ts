import api from './api';
import { GlobalSettings } from '@/types/admin.types';

const getPublicSettings = async (): Promise<GlobalSettings> => {
  const response = await api.get('/admin/public');
  // Backend returns { success: true, data: { ... } }
  return response.data.data;
};

export const settingsService = {
  getPublicSettings,
};

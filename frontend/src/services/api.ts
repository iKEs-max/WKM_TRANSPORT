import axios from 'axios';
import { API_CONFIG } from '../config/api.config';
import { useAuthStore } from '../store/auth.store';

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().tokens?.access?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized globally
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Don't redirect if we are already on a login page or trying to login
      const isLoginRequest = originalRequest.url?.includes('/auth/login');
      const isLoginPage = window.location.pathname.includes('/login');
      
      if (isLoginRequest || isLoginPage) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      
      // Clear auth and redirect based on context
      useAuthStore.getState().logout();
      
      const isAdminPath = window.location.pathname.startsWith('/admin');
      window.location.href = isAdminPath ? '/admin/login' : '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

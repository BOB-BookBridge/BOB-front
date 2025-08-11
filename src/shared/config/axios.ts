import axios, { InternalAxiosRequestConfig } from 'axios';

type Cfg = InternalAxiosRequestConfig & { _retry?: boolean };

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let refreshInFlight: Promise<void> | null = null;
const isRefresh = (url?: string) => url?.includes('/auth/token/refresh');

axiosInstance.interceptors.response.use(
  (r) => r,
  async (error) => {
    if (!error.response) return Promise.reject(error);

    const code = error.response.data?.code as string | undefined;
    const cfg = (error.config || {}) as Cfg;

    if (isRefresh(cfg.url) || cfg._retry) return Promise.reject(error);

    const nonLogin = code === 'E001';
    const tryRefresh = code === 'E002';
    console.log(code);
    if (nonLogin) {
      return;
    } else if (!tryRefresh) {
      return Promise.reject(error);
    }

    cfg._retry = true;
    if (!refreshInFlight) {
      refreshInFlight = axiosInstance.post('/auth/token/refresh').then(() => {
        console.log('refresh');
      });
      refreshInFlight.finally(() => (refreshInFlight = null));
    }

    try {
      await refreshInFlight;
      return axiosInstance(cfg);
    } catch {
      return Promise.reject(error);
    }
  },
);

export default axiosInstance;

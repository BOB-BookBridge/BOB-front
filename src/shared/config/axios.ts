import axios, { InternalAxiosRequestConfig } from 'axios';

type Cfg = InternalAxiosRequestConfig & { _retry?: boolean };

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  paramsSerializer: (params) => {
    const query = Object.entries(params)
      .flatMap(([key, value]) => {
        if (value === undefined || value === null) return [];

        if (Array.isArray(value)) {
          return value.map((v) => `${key}=${encodeURIComponent(v)}`);
        }

        return `${key}=${encodeURIComponent(value)}`;
      })
      .join('&');

    return query;
  },
});

let refreshInFlight: Promise<void> | null = null;
const isRefresh = (url?: string) => url?.includes('/auth/token/refresh');
const isAuthRequest = (url?: string) =>
  url?.includes('/login') || url?.includes('/signup');

axiosInstance.interceptors.response.use(
  (r) => r,
  async (error) => {
    if (!error.response) return Promise.reject(error);

    const title = error.response.data?.title as string | undefined;
    const cfg = (error.config || {}) as Cfg;
    if (isAuthRequest(cfg.url)) return Promise.reject(error);
    if (isRefresh(cfg.url) || cfg._retry) return Promise.reject(error);

    const nonLogin = title === 'AUTHENTICATION_FAILED';
    const tryRefresh = title === 'ACCESS_TOKEN_EXPIRED';

    if (nonLogin || !tryRefresh) {
      return Promise.reject(error);
    }

    cfg._retry = true;
    if (!refreshInFlight) {
      refreshInFlight = axiosInstance
        .post('/auth/token/refresh')
        .then(() => {})
        .catch((err) => {
          window.location.href = '/login';
          return Promise.reject(err);
        })
        .finally(() => {
          refreshInFlight = null;
        });
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

import axios from 'axios';
import { getToken } from '../utils/storage';

const DEFAULT_BASE = 'http://localhost:3001';

// PUBLIC_INTERFACE
export const createApiClient = () => {
  /** Creates a configured axios instance with baseURL and interceptors. */
  const baseURL = process.env.REACT_APP_API_BASE_URL || DEFAULT_BASE;
  const client = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false
  });

  client.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    (err) => {
      // Graceful placeholder handling for unimplemented endpoints
      if (!err.response) {
        return Promise.reject(new Error('Network error. Please check backend availability.'));
      }
      return Promise.reject(err);
    }
  );

  return client;
};

const api = createApiClient();
export default api;

// PUBLIC_INTERFACE
export const setAuthToken = (token) => {
  /** Updates default Authorization header for the axios instance. */
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import api, { setAuthToken } from '../services/api';
import { clearAuth, getAuth, saveAuth } from '../utils/storage';

export const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Auth provider that manages JWT token, user info, and persistence. */
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // load from storage
  useEffect(() => {
    const saved = getAuth();
    if (saved?.token) {
      setToken(saved.token);
      setUser(saved.user || null);
      setAuthToken(saved.token);
    } else {
      setAuthToken(null);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      // Placeholder endpoint; backend integration to be wired later
      const res = await api.post('/auth/login', { email, password });
      const data = res.data;
      setToken(data.token);
      setUser(data.user);
      saveAuth({ token: data.token, user: data.user });
      setAuthToken(data.token);
      return { success: true };
    } catch (e) {
      return { success: false, error: e?.response?.data?.detail || e.message };
    }
  }, []);

  const register = useCallback(async (payload) => {
    try {
      const res = await api.post('/auth/register', payload);
      const data = res.data;
      setToken(data.token);
      setUser(data.user);
      saveAuth({ token: data.token, user: data.user });
      setAuthToken(data.token);
      return { success: true };
    } catch (e) {
      return { success: false, error: e?.response?.data?.detail || e.message };
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    clearAuth();
    setAuthToken(null);
  }, []);

  const value = useMemo(() => ({
    user,
    token,
    isAuthenticated: !!token,
    isAdmin: !!user?.is_admin,
    login,
    register,
    logout,
    loading
  }), [user, token, login, register, logout, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

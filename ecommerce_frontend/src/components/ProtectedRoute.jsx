import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// PUBLIC_INTERFACE
export default function ProtectedRoute({ children, adminOnly = false }) {
  /** Route guard for authenticated and optional admin-only access. */
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="container" style={{ padding: 24 }}>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}

// src/routes/RequireAuth.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RequireAuth({ children }) {
  const { user, ready } = useAuth();
  const location = useLocation();

  if (!ready) return null;                 // or a spinner/skeleton
  if (!user) return <Navigate to="/rescues" replace state={{ from: location }} />;
  return children;
}

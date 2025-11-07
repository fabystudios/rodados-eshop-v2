import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';

export default function AdminProtectedRoute({ children }) {
  const { isAuthenticated, isAdmin, loading, user } = useAuth();
  const location = useLocation();

  // Debug
  console.log('🔐 AdminProtectedRoute:', {
    loading,
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
    user
  });

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated()) {
    console.log('❌ No autenticado, redirigiendo a /login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin()) {
    console.log('❌ No es admin, redirigiendo a /');
    return <Navigate to="/" replace />;
  }

  console.log('✅ Acceso permitido al dashboard');
  return children;
}

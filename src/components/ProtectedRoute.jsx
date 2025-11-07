// src/components/ProtectedRoute.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from './Login';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children, fallback }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);

  // Mostrar loading mientras se verifica autenticación
  if (loading) {
    return fallback || null;
  }

  // Si está autenticado, mostrar el contenido protegido
  if (isAuthenticated()) {
    return children;
  }

  // Si no está autenticado y ya se activó el login, mostrar modal
  if (showLogin) {
    return (
      <>
        {children}
        <Login 
          onClose={() => setShowLogin(false)}
          onLoginSuccess={() => setShowLogin(false)}
        />
      </>
    );
  }

  // Función para activar el login (será llamada por el botón COMPRAR)
  const requireAuth = () => {
    setShowLogin(true);
  };

  // Pasar la función requireAuth al children a través de React.cloneElement
  return React.cloneElement(children, { requireAuth });
};

export default ProtectedRoute;
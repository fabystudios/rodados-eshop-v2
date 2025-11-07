// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un token en localStorage al cargar
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error al cargar usuario:", error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    // Validación básica
    if (!username || !password || password.length < 3) {
      console.log('❌ Login failed: invalid credentials');
      return false;
    }

    // Usuario admin especial
    const isAdminUser = username.toLowerCase() === 'admin';
    
    const userData = {
      username,
      email: `${username}@example.com`,
      id: Date.now(),
      role: isAdminUser ? 'admin' : 'user'
    };
    const token = `token-${Date.now()}`;
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser(userData);
    
    console.log('✅ Login successful:', userData);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const isAdmin = () => {
    const result = user?.role === 'admin';
    return result;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isAdmin,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
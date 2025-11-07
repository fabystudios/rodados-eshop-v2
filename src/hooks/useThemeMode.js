// src/hooks/useThemeMode.js
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode debe usarse dentro de ThemeProvider');
  }
  return context;
};
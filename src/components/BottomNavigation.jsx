// src/components/BottomNavigation.jsx
import React from "react";
import { 
  Box,
  Paper,
  Badge,
  Fab,
  IconButton,
  Typography,
  useTheme
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useCarrito } from "../contexts/CarritoContext";
import { useAuth } from "../contexts/AuthContext";

export default function BottomNavigation({ onCartClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { getCartCount } = useCarrito();
  const { isAdmin, isAuthenticated, logout } = useAuth();

  // Debug: Log para verificar que el componente renderiza
  console.log('✅ BottomNavigation rendering:', {
    isAdmin: isAdmin(),
    cartCount: getCartCount(),
    pathname: location.pathname
  });

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const NavButton = ({ icon, label, path, onClick }) => {
    const active = isActive(path);
    return (
      <Box
        onClick={onClick || (() => navigate(path))}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          color: active 
            ? (theme.palette.mode === 'dark' ? '#bb86fc' : '#4CAF50')
            : (theme.palette.mode === 'dark' ? '#b0b0b0' : '#666666'),
          '&:active': {
            transform: 'scale(0.95)'
          }
        }}
      >
        <IconButton
          size="small"
          sx={{
            color: 'inherit',
            transition: 'transform 0.3s ease',
            transform: active ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          {icon}
        </IconButton>
        <Typography
          variant="caption"
          sx={{
            fontSize: '0.65rem',
            fontWeight: active ? 700 : 500,
            mt: 0.5
          }}
        >
          {label}
        </Typography>
      </Box>
    );
  };

  // Versión ADMIN (con logout en lugar de nosotros)
  if (isAdmin()) {
    return (
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'space-around',
          alignItems: 'center',
          height: 65,
          background: theme.palette.mode === 'dark'
            ? 'rgba(30, 30, 30, 0.98)'
            : 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: `2px solid ${theme.palette.mode === 'dark' ? '#bb86fc' : '#4CAF50'}`,
          boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
          pb: 'env(safe-area-inset-bottom)'
        }}
        elevation={8}
      >
        <NavButton icon={<HomeIcon />} label="Inicio" path="/" />
        <NavButton icon={<CategoryIcon />} label="Productos" path="/productos" />
        <NavButton 
          icon={<AdminPanelSettingsIcon sx={{ color: '#FFD700' }} />} 
          label="Admin" 
          path="/admin" 
        />
        <NavButton 
          icon={<LogoutIcon sx={{ color: '#ff6b6b' }} />} 
          label="Salir" 
          path="/"
          onClick={(e) => {
            e.preventDefault();
            logout();
            navigate('/');
          }}
        />
      </Paper>
    );
  }

  // Versión USUARIO (con carrito central destacado tipo Atom)
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        display: { xs: 'flex', md: 'none' },
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        background: theme.palette.mode === 'dark'
          ? 'rgba(30, 30, 30, 0.98)'
          : 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        borderTop: `2px solid ${theme.palette.mode === 'dark' ? '#bb86fc' : '#4CAF50'}`,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
        pb: 'env(safe-area-inset-bottom)'
      }}
      elevation={8}
    >
      <NavButton icon={<HomeIcon />} label="Inicio" path="/" />
      <NavButton icon={<CategoryIcon />} label="Productos" path="/productos" />
      
      {/* Carrito Central Destacado tipo Atom */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mx: 2
        }}
      >
        <Badge
          badgeContent={getCartCount()}
          sx={{
            '& .MuiBadge-badge': {
              background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              minWidth: 22,
              height: 22,
              borderRadius: '11px',
              border: '2px solid white',
              boxShadow: '0 2px 8px rgba(255, 107, 107, 0.5)',
              animation: getCartCount() > 0 ? 'pulse 2s infinite' : 'none',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.1)' },
                '100%': { transform: 'scale(1)' }
              }
            }
          }}
        >
          <Fab
            onClick={onCartClick}
            sx={{
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #7c4dff 0%, #4a148c 100%)'
                : 'linear-gradient(135deg, #4CAF50 0%, #2e7d32 100%)',
              color: 'white',
              width: 56,
              height: 56,
              boxShadow: theme.palette.mode === 'dark'
                ? '0 8px 24px rgba(124, 77, 255, 0.4)'
                : '0 8px 24px rgba(76, 175, 80, 0.4)',
              transform: 'translateY(-8px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-12px) scale(1.05)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 12px 32px rgba(124, 77, 255, 0.6)'
                  : '0 12px 32px rgba(76, 175, 80, 0.6)',
              },
              '&:active': {
                transform: 'translateY(-6px) scale(0.95)'
              }
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: 28 }} />
          </Fab>
        </Badge>
        <Typography
          variant="caption"
          sx={{
            fontSize: '0.65rem',
            fontWeight: 700,
            color: theme.palette.mode === 'dark' ? '#bb86fc' : '#4CAF50',
            mt: -0.5
          }}
        >
          Carrito
        </Typography>
      </Box>

      <NavButton icon={<InfoIcon />} label="Nosotros" path="/nosotros" />
      
      {/* Botón Login/Logout */}
      {isAuthenticated() ? (
        <NavButton 
          icon={<LogoutIcon sx={{ color: '#ff6b6b' }} />} 
          label="Salir" 
          path="/"
          onClick={(e) => {
            e.preventDefault();
            logout();
            navigate('/');
          }}
        />
      ) : (
        <NavButton 
          icon={<LoginIcon />} 
          label="Login" 
          path="/login"
        />
      )}
    </Paper>
  );
}
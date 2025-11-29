import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../contexts/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import logoPpal from "../assets/logo-ppal.png";
import logoBackup from "../assets/logo-backup.png";
import textoMarca from "../assets/texto-marca.png";
import { useCarrito } from "../contexts/CarritoContext";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function Header({ onCartClick }) {
  const theme = useTheme();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { getCartCount } = useCarrito();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserIconClick = () => {
    if (isAuthenticated()) {
      logout();
      navigate("/");
    } else {
      navigate("/login"); // ← Redirige a la página de login
    }
  };

  const navItems = [
    { text: "Inicio", path: "/" },
    { text: "Productos", path: "/productos" },
    { text: "Nosotros", path: "/nosotros" },
  ];

  // Agregar Admin al menú si es administrador
  const menuItems = isAdmin()
    ? [...navItems, { text: "Admin", path: "/admin", icon: <AdminPanelSettingsIcon /> }]
    : navItems;

  const drawer = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, #1a237e 0%, #0d47a1 100%)"
            : "linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header del drawer */}
      <Box
        sx={{
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #7c4dff 0%, #4a148c 100%)"
              : "linear-gradient(135deg, #59f720 0%, #108e1c 100%)",
          p: 3,
          position: "relative",
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        {/* Botón cerrar X igual que el carrito */}
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "white",
            bgcolor: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.3)",
            width: 36,
            height: 36,
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.2)",
              transform: "scale(1.1)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>

        <Box
          component="img"
          src={logoPpal}
          alt="MiTienda Logo"
          onError={(e) => {
            e.target.src = logoBackup;
          }}
          sx={{
            height: 65,
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))",
            transition: "transform 0.4s",
            cursor: "pointer",
            "&:hover": {
              animation: "swingMobile 0.7s",
            },
            "@keyframes swingMobile": {
              "20%": { transform: "rotate(15deg)" },
              "40%": { transform: "rotate(-10deg)" },
              "60%": { transform: "rotate(5deg)" },
              "80%": { transform: "rotate(-5deg)" },
              "100%": { transform: "rotate(0deg)" },
            },
          }}
        />
      </Box>

      {/* Theme Toggle - Movido ARRIBA de la lista */}
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        p: 2,
        borderBottom: theme.palette.mode === 'dark'
          ? "1px solid rgba(255, 255, 255, 0.1)"
          : "1px solid #dee2e6",
      }}>
        <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
          Tema:
        </Typography>
        <ThemeToggle size="medium" />
      </Box>

      {/* Lista de navegación */}
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              mx: 2,
              mb: 1,
              borderRadius: "12px",
              background:
                location.pathname === item.path
                  ? theme.palette.mode === "dark"
                    ? "linear-gradient(90deg, #7c4dff, #4a148c)"
                    : item.text === "Admin"
                      ? "linear-gradient(90deg, #FFD700, #FFA000)"
                      : "linear-gradient(90deg, #59f720, #108e1c)"
                  : "transparent",
              color:
                location.pathname === item.path
                  ? "white"
                  : item.text === "Admin"
                    ? "#FFD700"
                    : theme.palette.mode === "dark"
                    ? "#ffffff"
                    : "#333333",
              transition: "all 0.3s ease",
              "&:hover": {
                background:
                  location.pathname === item.path
                    ? theme.palette.mode === "dark"
                      ? "linear-gradient(90deg, #7c4dff, #4a148c)"
                      : "linear-gradient(90deg, #59f720, #108e1c)"
                    : theme.palette.mode === "dark"
                    ? "rgba(124, 77, 255, 0.1)"
                    : "rgba(89, 247, 32, 0.1)",
                transform: "translateX(8px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 4px 12px rgba(124, 77, 255, 0.2)"
                    : "0 4px 12px rgba(89, 247, 32, 0.2)",
              },
              "& .MuiListItemIcon-root": {
                color:
                  location.pathname === item.path
                    ? "white"
                    : theme.palette.mode === "dark"
                    ? "#7c4dff"
                    : "#59f720",
              },
            }}
          >
            {item.icon && (
              <ListItemIcon
                sx={{
                  minWidth: "40px",
                  transition: "transform 0.3s ease",
                  color: item.text === "Admin" ? "#FFD700" : "inherit"
                }}
              >
                {item.icon}
              </ListItemIcon>
            )}
            {item.text === "Inicio" && !item.icon && (
              <ListItemIcon
                sx={{
                  minWidth: "40px",
                  transition: "transform 0.3s ease",
                }}
              >
                <HomeIcon sx={{ fontSize: 24 }} />
              </ListItemIcon>
            )}
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: location.pathname === item.path ? "bold" : "500",
                fontSize: "1.1rem",
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Footer del drawer - SIN theme toggle */}
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          borderTop: theme.palette.mode === 'dark'
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid #dee2e6",
          background: theme.palette.mode === 'dark'
            ? "rgba(26, 35, 126, 0.9)"
            : "rgba(255,255,255,0.7)",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontWeight: 500
          }}
        >
          Rodados eShop © 2025
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        component="nav" // ← Semántica
        role="navigation" // ← ARIA
        aria-label="Navegación principal" // ← ARIA
        sx={{
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #7c4dff 0%, #4a148c 100%)"
              : "linear-gradient(135deg, #59f720 0%, #108e1c 100%)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 20px rgba(124, 77, 255, 0.3)"
              : "0 4px 20px rgba(0, 102, 255, 0.3)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo izquierda */}
          <Box
            component={Link}
            to="/"
            aria-label="Ir a página de inicio" // ← ARIA
            sx={{
              display: "flex",
              alignItems: "center",
              transition: "transform 0.4s",
              "&:hover img": {
                animation: "swing 0.7s",
              },
              "@keyframes swing": {
                "20%": { transform: "rotate(15deg)" },
                "40%": { transform: "rotate(-10deg)" },
                "60%": { transform: "rotate(5deg)" },
                "80%": { transform: "rotate(-5deg)" },
                "100%": { transform: "rotate(0deg)" },
              },
            }}
          >
            <Box
              component="img"
              src={logoPpal}
              alt="MiTienda Logo"
              sx={{ height: { xs: 50, sm: 80 } }}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", sm: "flex" },
              justifyContent: "left",
              px: { xs: 1, sm: 2 },
              py: 1,
              transition: "filter 0.2s",
              "&:hover": { filter: "brightness(1.3)" },
              cursor: "pointer",
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Box
              component="img"
              src={textoMarca}
              alt="Marca"
              sx={{ height: { xs: 30, sm: 50 } }}
            />
          </Box>

          {/* Menú escritorio derecha */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  borderBottom: location.pathname === item.path ? "3px solid #ff9800" : "none",
                  borderRadius: 0,
                  fontWeight: location.pathname === item.path ? "bold" : "normal",
                }}
              >
                {item.text === "Inicio" ? <HomeIcon sx={{ fontSize: 25 }} /> : item.text}
              </Button>
            ))}

            {/* Theme Toggle - Desktop */}
            <ThemeToggle color="inherit" />

            {/* Indicador de usuario - Desktop */}
            {isAuthenticated() && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mx: 1 }}>
                <PersonIcon sx={{ color: 'white', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                  {user.username}
                </Typography>
              </Box>
            )}

            {/* Botón Admin - Solo para administradores */}
            {isAdmin() && (
              <Button
                component={Link}
                to="/admin"
                startIcon={<AdminPanelSettingsIcon />}
                sx={{
                  color: '#FFD700',
                  fontWeight: 'bold',
                  border: '2px solid #FFD700',
                  borderRadius: '8px',
                  px: 2,
                  '&:hover': {
                    background: 'rgba(255, 215, 0, 0.1)',
                    borderColor: '#FFA000'
                  }
                }}
              >
                Admin
              </Button>
            )}

            {/* Carrito - Desktop */}
            <Badge
              badgeContent={getCartCount()}
              sx={{
                "& .MuiBadge-badge": {
                  background: "linear-gradient(45deg, #ff1744, #d50000)",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "0.75rem",
                  minWidth: "20px",
                  height: "20px",
                  borderRadius: "10px",
                  border: "2px solid white",
                  boxShadow: "0 2px 6px rgba(255, 23, 68, 0.4)",
                  animation: getCartCount() > 0 ? "cartPulse 2s infinite" : "none",
                  "@keyframes cartPulse": {
                    "0%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.15)" },
                    "100%": { transform: "scale(1)" }
                  }
                }
              }}
            >
              <IconButton 
                color="inherit" 
                onClick={onCartClick}
                aria-label={`Abrir carrito con ${getCartCount()} productos`} // ← ARIA
              >
                <ShoppingCartIcon />
              </IconButton>
            </Badge>

            {/* Botón Logout - Desktop */}
            {isAuthenticated() && (
              <IconButton
                color="inherit"
                onClick={() => { logout(); navigate("/"); }}
                aria-label={`Cerrar sesión de ${user?.username}`} // ← ARIA
                title="Cerrar sesión"
              >
                <LogoutIcon />
              </IconButton>
            )}

            {/* Botón Login - Solo si NO está autenticado */}
            {!isAuthenticated() && (
              <IconButton
                color="inherit"
                onClick={() => navigate("/login")}
                sx={{
                  ml: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
                title="Iniciar sesión"
              >
                <PersonIcon />
              </IconButton>
            )}
          </Box>

          {/* Menú móvil */}
          <Box sx={{ display: { xs: "flex", sm: "none" }, gap: 1, alignItems: 'center' }}>
            {/* Indicador de usuario móvil - Solo nombre si está logueado */}
            {isAuthenticated() && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  maxWidth: '80px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {user?.username?.split(' ')[0]}
              </Typography>
            )}
            
            {/* Menú hamburguesa */}
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            boxShadow: "-8px 0 24px rgba(0,0,0,0.15)",
            border: "none"
          }
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

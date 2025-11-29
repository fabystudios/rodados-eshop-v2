// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { HelmetProvider } from 'react-helmet-async'; // ← Agregar
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CarritoProvider } from "./contexts/CarritoContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CartWithAuth from "./components/CartWithAuth";
import BottomNavigation from "./components/BottomNavigation";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

// Pages
import Home from "./pages/home";
import Products from "./pages/products";       
import ProductDetail from "./pages/productDetails"; 
import About from "./pages/about";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

// Componente interno que puede usar useAuth
function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <Router>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header onCartClick={() => setCartOpen(true)} />

        <Box component="main" flexGrow={1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/productos/:categoria" element={<Products />} />
            <Route path="/productos/:categoria/:id" element={<ProductDetail />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Footer />
        </Box>

        <BottomNavigation onCartClick={() => setCartOpen(true)} />

        <CartWithAuth
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        />

        <Box 
          sx={{ 
            height: { xs: '85px', md: 0 },
            display: { xs: 'block', md: 'none' },
            flexShrink: 0
          }} 
        />
      </Box>
    </Router>
  );
}

// Componente principal con providers
export default function App() {
  return (
    <HelmetProvider> {/* ← Envolver todo */}
      <ThemeProvider>
        <AuthProvider>
          <CarritoProvider>
            <AppContent />
          </CarritoProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

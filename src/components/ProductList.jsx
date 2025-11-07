import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Badge,
  useTheme,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import "../styles/ProductList.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import spinnerImage from "/assets/spinner.png";
import errorImage from "/assets/desconectado.png";

// Estilos MD3 para Card y Button - Glassmorphism como Home
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  background: theme.palette.mode === 'dark' 
    ? 'rgba(30, 30, 30, 0.95)' 
    : 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(255, 255, 255, 0.1)'
    : '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(255, 255, 255, 0.1)'
    : '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: "all 0.3s ease",
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  "&:hover": {
    transform: "translateY(-5px) scale(1.02)",
    boxShadow: theme.palette.mode === 'dark'
      ? '0 20px 40px rgba(255, 255, 255, 0.15)'
      : '0 20px 40px rgba(0, 0, 0, 0.15)',
  },
}));



export default function ProductList({ onAddToCart, cartItems = [], categoryFilter = 'todo' }) {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://68362e14664e72d28e401640.mockapi.io/producto")
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar productos");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Inicialmente mostrar todos
        setError("");
      })
      .catch((err) => {
        setError("Error al cargar productos. Intenta nuevamente más tarde.");
        setProducts([]);
        setFilteredProducts([]);
        console.error("Error al cargar productos:", err);      
      });
  }, []);

  // Filtrar productos según la categoría seleccionada
  useEffect(() => {
    if (categoryFilter === 'todo' || categoryFilter === 'Todos') {
      setFilteredProducts(products);
    } else {
      const filterCategory = categoryFilter.trim().toLowerCase();
      const filtered = products.filter(product => {
        // Soportar ambas propiedades: categoria y category
        const prodCat = (
          product.categoria ||
          product.category ||
          product.Category ||
          product.Categoria ||
          ''
        ).trim().toLowerCase();

        // Debug: ver qué categorías tiene cada producto
        // Puedes quitar este log luego de probar
        console.log('Filtro:', filterCategory, 'Producto:', product.name, 'Categoria:', prodCat);

        return prodCat === filterCategory;
      });
      setFilteredProducts(filtered);
    }
  }, [products, categoryFilter]);

  // Función para obtener la cantidad de un producto en el carrito
  const getCartQuantity = (productId) => {
    const cartItem = cartItems.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      {error ? (
        <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
          <img
            src={errorImage}
            alt="Error de conexión"
            style={{ width: 150, marginBottom: 20, display: "inline-block" }}
          />
          <Typography variant="h6" sx={{ 
            mb: 2, 
            color: theme.palette.error.main,
            textShadow: theme.palette.mode === 'dark'
              ? "2px 2px 8px rgba(0,0,0,0.5)"
              : "2px 2px 8px rgba(0,0,0,0.18)"
          }}>
            {error}
          </Typography>
        </Box>
      ) : filteredProducts.length === 0 ? (
        <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
          <Typography variant="h6" sx={{ 
            mb: 2, 
            color: theme.palette.mode === 'dark' ? '#bb86fc' : 'inherit',
            textShadow: theme.palette.mode === 'dark'
              ? "2px 2px 8px rgba(0,0,0,0.5)"
              : "2px 2px 8px rgba(0,0,0,0.18)"
          }}>
            Cargando productos...
          </Typography>
          <img
            src={spinnerImage}
            alt="Cargando"
            style={{ width: 150,  display: "inline-block" }}
          />
        </Box>
      ) : (
        filteredProducts.map((product) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={product.id}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Badge
              badgeContent={getCartQuantity(product.id)}
              sx={{
                "& .MuiBadge-badge": {
                  background: "linear-gradient(45deg, #ff6b6b, #ee5a24)",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  minWidth: "24px",
                  height: "24px",
                  borderRadius: "12px",
                  border: "2px solid white",
                  boxShadow: "0 2px 8px rgba(255, 107, 107, 0.4)",
                  animation: getCartQuantity(product.id) > 0 ? "pulse 2s infinite" : "none",
                  "@keyframes pulse": {
                    "0%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.1)" },
                    "100%": { transform: "scale(1)" }
                  }
                }
              }}
            >
              <StyledCard
                sx={{
                  width: 260,
                  height: 380,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
              <Box sx={{ 
                height: 200, 
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(135deg, #8e6c88 0%, #b8a3b8 50%, #d4c2d4 100%)'
                  : '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <CardMedia
                  component="img"
                  image={product.image || "https://via.placeholder.com/200"}
                  alt={product.name}
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    p: 2,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                />
              </Box>
              <CardContent sx={{ 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 180, // Altura fija para el contenido
                p: 2
              }}>
                <Box sx={{ height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="h6" sx={{ 
                    mb: 1, 
                    fontWeight: 'bold',
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
                    fontSize: '1rem',
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {product.name}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: '#4CAF50',
                      fontSize: '1.2rem'
                    }}
                  >
                    ${product.price}
                  </Typography>
                </Box>
                <Stack spacing={1.5} sx={{ mt: 'auto' }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    component={Link}
                    to={`/productos/${product.category?.toLowerCase() === 'adult' ? 'adultos' : product.category?.toLowerCase() || 'general'}/${product.id}`}
                    sx={{
                      borderColor: '#1976d2',
                      color: '#1976d2',
                      borderWidth: 2,
                      borderRadius: '15px',
                      py: 0.8,
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      '&:hover': {
                        borderWidth: 2,
                        borderColor: '#1976d2',
                        background: 'rgba(25, 118, 210, 0.1)',
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    Ver Detalles
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => onAddToCart(product)}
                    sx={{
                      background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                      borderRadius: '15px',
                      py: 0.8,
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #388E3C, #66BB6A)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(76, 175, 80, 0.4)'
                      }
                    }}
                  >
                    Agregar al Carrito
                  </Button>
                </Stack>
              </CardContent>
            </StyledCard>
            </Badge>
          </Grid>
        ))
      )}
    </Grid>
  );
}
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StyledButton from "../components/StyledButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCarrito } from "../contexts/CarritoContext"; // ← Cambiado a "contexts"
import Chip from "@mui/material/Chip";

import {
  Box,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
  Badge,
  IconButton,
  useTheme,
  Container,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Cart from "../components/Cart";

export default function ProductDetail() {
  const { id } = useParams();
  const theme = useTheme();
  const [product, setProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  
  // Usar el contexto del carrito en lugar de props
  const {
    cartItems,
    addToCart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart
  } = useCarrito();

  // Función para obtener la cantidad de un producto en el carrito
  const getCartQuantity = (productId) => {
    const cartItem = cartItems.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  useEffect(() => {
    fetch(`https://68362e14664e72d28e401640.mockapi.io/producto/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Producto recibido:", data); // <-- Agrego para ver el prod que traigo
        setProduct(data);
      })
      .catch((err) => console.error("Error al cargar producto:", err));
  }, [id]);

  if (!product) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Box textAlign="center">
          <CircularProgress sx={{ 
            color: theme.palette.mode === 'dark' ? '#bb86fc' : '#1976d2',
            mb: 2 
          }} />
          <Typography sx={{
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333'
          }}>Cargando detalle...</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
        : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)'
    }}>
      <Container maxWidth="md" sx={{ pt: 4, pb: 6 }}>
        {/* Botón cerrar adaptado al tema */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton 
            onClick={() => window.history.back()}
            sx={{
              bgcolor: theme.palette.mode === 'dark' 
                ? "rgba(255,255,255,0.1)" 
                : "rgba(255,255,255,0.8)",
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
              border: theme.palette.mode === 'dark' 
                ? "1px solid rgba(255,255,255,0.2)" 
                : "1px solid rgba(0,0,0,0.1)",
              backdropFilter: 'blur(10px)',
              width: 40,
              height: 40,
              "&:hover": {
                bgcolor: theme.palette.mode === 'dark' 
                  ? "rgba(255,255,255,0.2)" 
                  : "rgba(255,255,255,0.9)",
                transform: "scale(1.05)",
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 16px rgba(255,255,255,0.1)'
                  : '0 4px 16px rgba(0,0,0,0.1)'
              },
              transition: "all 0.3s ease"
            }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            p: { xs: 3, sm: 4 },
            gap: { xs: 3, md: 4 },
            borderRadius: 3,
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
          }}
        >
          <Badge
            badgeContent={getCartQuantity(product.id)}
            sx={{
              "& .MuiBadge-badge": {
                background: "linear-gradient(45deg, #ff6b6b, #ee5a24)",
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
                minWidth: "28px",
                height: "28px",
                borderRadius: "14px",
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
            <Box sx={{
              width: { xs: "100%", md: 300 },
              height: { xs: 250, md: 300 },
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, #8e6c88 0%, #b8a3b8 50%, #d4c2d4 100%)'
                : '#f5f5f5',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              mr: { md: 3 },
            }}>
              <CardMedia
                component="img"
                image={product.image || "https://via.placeholder.com/300"}
                alt={product.name}
                sx={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  objectFit: "contain",
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
            </Box>
          </Badge>

          <Box flex={1} display="flex" flexDirection="column" justifyContent="center">
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              gutterBottom
              sx={{
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
                textShadow: theme.palette.mode === 'dark'
                  ? '0px 2px 8px rgba(0,0,0,0.5)'
                  : 'none'
              }}
            >
              {product.name}
            </Typography>
            {/* Chip de categoría debajo del nombre */}
              <Typography> 
                {console.log("Categoria:", product.category)}
            {product.category && (
              <Chip
                label={product.category}
                size="medium"
                sx={{
                  mb: 2,
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(187, 134, 252, 0.2)'
                    : 'rgba(76, 175, 80, 0.1)',
                  color: theme.palette.mode === 'dark' ? '#bb86fc' : '#2e7d32',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              />
            )}
            </Typography> 
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{
                color: '#4CAF50',
                fontWeight: 'bold',
                mb: 2
              }}
            >
              ${product.price}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4,
                color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#666666',
                lineHeight: 1.6
              }}
            >
              {product.descripcion || "Este producto no tiene descripción disponible."}
            </Typography>

          <Box sx={{ mt: 4 }}>
            <StyledButton
              variant="contained"
              onClick={() => addToCart(product)}
              fullWidth
              sx={{
                mt: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                py: { xs: 1.5, sm: 1.2 }, // Más padding en móvil
                fontSize: { xs: "1rem", sm: "0.95rem" }, // Font más grande en móvil
                fontWeight: "600",
                background: "linear-gradient(135deg, #4CAF50 0%, #45a049 50%, #2e7d32 100%)",
                color: "#fff",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(76, 175, 80, 0.4)",
                // Efectos hover y active unificados
                "@media (hover: hover)": {
                  "&:hover": {
                    background: "linear-gradient(135deg, #66bb6a 0%, #4caf50 50%, #388e3c 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(76, 175, 80, 0.5)",
                    "& .icon-cart": {
                      animation: "cartBounce 0.6s ease-in-out"
                    },
                    "&::before": {
                      transform: "translateX(100%)"
                    }
                  }
                },
                // Efecto active para móvil (touch) - forzando color original
                "&:active": {
                  background: "linear-gradient(135deg, #4CAF50 0%, #45a049 50%, #2e7d32 100%) !important",
                  transform: "scale(0.98)",
                  boxShadow: "0 2px 10px rgba(76, 175, 80, 0.3)",
                  "& .icon-cart": {
                    animation: "cartBounce 0.4s ease-in-out"
                  }
                },
                // Forzar colores después del click
                "&:focus": {
                  background: "linear-gradient(135deg, #4CAF50 0%, #45a049 50%, #2e7d32 100%) !important"
                },
                "&:focus-visible": {
                  background: "linear-gradient(135deg, #4CAF50 0%, #45a049 50%, #2e7d32 100%) !important"
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  transition: "transform 0.6s ease",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "@keyframes cartBounce": {
                  "0%": { transform: "scale(1)" },
                  "25%": { transform: "scale(1.2) rotate(-5deg)" },
                  "50%": { transform: "scale(1.1) rotate(5deg)" },
                  "75%": { transform: "scale(1.15) rotate(-2deg)" },
                  "100%": { transform: "scale(1)" }
                }
              }}
              startIcon={
                <AddShoppingCartIcon
                  className="icon-cart"
                  sx={{
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                    transition: "all 0.3s ease",
                    fontSize: { xs: "1.2rem", sm: "1rem" } // Ícono más grande en móvil
                  }}
                />
              }
            >
              Agregar al Carrito
            </StyledButton>
          </Box>
        </Box>
      </Card>



        {/* Drawer del carrito */}
        <Cart
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          removeItem={removeItem}
          clearCart={clearCart}
        />
      </Container>
    </Box>
  );
}

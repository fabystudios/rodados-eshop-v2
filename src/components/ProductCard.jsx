import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Badge,
  useTheme,
  Button
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useCarrito } from "../contexts/CarritoContext";

export default function ProductCard({ product }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCarrito();

  const getCartQuantity = (productId) => {
    const cartItem = cartItems.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <Badge
      badgeContent={getCartQuantity(product.id)}
      aria-label={`${getCartQuantity(product.id)} unidades en el carrito`} // ← ARIA
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
          boxShadow: "0 2px 8px rgba(255, 107, 107, 0.4)"
        }
      }}
    >
      <Card
        component="article" // ← Semántica
        aria-label={`Producto: ${product.name}`} // ← ARIA
        sx={{
          height: 450,
          display: "flex",
          flexDirection: "column",
          background: theme.palette.mode === "dark"
            ? "rgba(30, 30, 30, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: theme.palette.mode === "dark"
            ? "1px solid rgba(187, 134, 252, 0.2)"
            : "1px solid rgba(76, 175, 80, 0.2)",
          borderRadius: 3,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: theme.palette.mode === "dark"
              ? "0 12px 40px rgba(187, 134, 252, 0.3)"
              : "0 12px 40px rgba(76, 175, 80, 0.3)"
          }
        }}
      >
        {/* Imagen */}
        <Box
          sx={{
            height: 200,
            background: theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #7c4dff 0%, #9c27b0 50%, #673ab7 100%)"
              : "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}
        >
          <CardMedia
            component="img"
            image={product.image || "https://via.placeholder.com/200"}
            alt={`Imagen de ${product.name}`} // ← ALT descriptivo
            sx={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              p: 2
            }}
          />
        </Box>

        {/* Contenido */}
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              p: 2
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.mode === "dark" ? "#ffffff" : "#333333",
                fontWeight: "bold",
                mb: 1,
                height: "2.2em", // ajustado para 2 líneas con lineHeight reducido
                lineHeight: 1.1, // menor interlineado
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical"
              }}
            >
              {product.name}
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
              <Chip
                label={`$${parseFloat(product.price).toFixed(2)}`}
                sx={{
            background: "linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem"
                }}
              />
              {product.categoria && (
                <Chip
            label={product.categoria}
            size="small"
            sx={{
              background: theme.palette.mode === "dark"
                ? "rgba(187, 134, 252, 0.2)"
                : "rgba(76, 175, 80, 0.1)",
              color: theme.palette.mode === "dark" ? "#bb86fc" : "#2e7d32",
              fontWeight: 600
            }}
                />
              )}
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: theme.palette.mode === "dark" ? "#b0b0b0" : "#666666",
                mb: 2,
                height: "3.6em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical"
              }}
            >
              {product.descripcion || "Sin descripción"}
            </Typography>

            {/* Botones */}
          <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<VisibilityIcon />}
              onClick={() => navigate(`/productos/${product.category || 'general'}/${product.id}`)}
              aria-label={`Ver detalles de ${product.name}`} // ← ARIA
              sx={{
                borderColor: theme.palette.mode === "dark" ? "#bb86fc" : "#4CAF50",
                color: theme.palette.mode === "dark" ? "#bb86fc" : "#4CAF50",
                "&:hover": {
                  borderColor: theme.palette.mode === "dark" ? "#7c4dff" : "#2e7d32",
                  background: theme.palette.mode === "dark"
                    ? "rgba(187, 134, 252, 0.1)"
                    : "rgba(76, 175, 80, 0.1)"
                }
              }}
            >
              Ver
            </Button>
            <Button
              variant="contained"
              fullWidth
              startIcon={<AddShoppingCartIcon />}
              onClick={() => addToCart(product)}
              aria-label={`Agregar ${product.name} al carrito`} // ← ARIA
              sx={{
                background: "linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #66BB6A 0%, #81C784 100%)"
                }
              }}
            >
              Agregar
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Badge>
  );
}


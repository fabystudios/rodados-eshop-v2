// src/pages/Products.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Button,
  ButtonGroup,
  Fade,
  useTheme
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ProductList from "../components/ProductList";
import ProductCard from "../components/ProductCard";
import { useCarrito } from "../contexts/CarritoContext";
import { categoryManager } from "../utils/categoryManager";

const API_URL = "https://68362e14664e72d28e401640.mockapi.io/producto";

export default function Products() {
  const { categoria } = useParams();
  const theme = useTheme();
  const { addToCart, cartItems } = useCarrito();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoria || "Todos");

  // Obtener categorías dinámicamente
  const categorias = ['Todos', ...categoryManager.getCategories()];

  // Cargar productos
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setLoading(false);
      });
  }, []);

  // Filtrar productos por categoría y búsqueda
  useEffect(() => {
    let result = products;

    // Filtrar por categoría
    if (selectedCategory !== "Todos") {
      result = result.filter(
        (product) => product.categoria === selectedCategory
      );
    }

    // Filtrar por búsqueda
    if (searchTerm.trim() !== "") {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.descripcion && product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, searchTerm]);

  // Actualizar categoría desde URL
  useEffect(() => {
    if (categoria) {
      setSelectedCategory(categoria);
    }
  }, [categoria]);

  const handleCategoryChange = (newCategory) => {
    if (newCategory === 'Todos') {
      navigate('/productos');
    } else {
      navigate(`/productos/${newCategory}`);
    }
  };

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'kids': return 'Productos para Niños';
      case 'adultos': return 'Productos para Adultos';
      default: return 'Todos los Productos';
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
        : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Header con título */}
        <Typography
          variant="h3"
          sx={{
            color: theme.palette.mode === "dark" ? "#ffffff" : "#333333",
            fontWeight: "bold",
            mb: 1,
            textAlign: "center",
            textShadow: theme.palette.mode === "dark"
              ? "0 2px 10px rgba(0,0,0,0.5)"
              : "none"
          }}
        >
          Nuestros Productos
        </Typography>
        
        <Typography
          variant="subtitle1"
          sx={{
            color: theme.palette.mode === "dark" ? "#b0b0b0" : "#666666",
            textAlign: "center",
            mb: 4
          }}
        >
          {selectedCategory !== "Todos" 
            ? `Mostrando: ${selectedCategory}` 
            : "Todos los productos disponibles"}
        </Typography>

        {/* Barra de búsqueda */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            mb: 3,
            background: theme.palette.mode === "dark"
              ? "rgba(30, 30, 30, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            border: theme.palette.mode === "dark"
              ? "1px solid rgba(187, 134, 252, 0.2)"
              : "1px solid rgba(76, 175, 80, 0.2)",
            borderRadius: 3
          }}
        >
          <TextField
            fullWidth
            placeholder="Buscar productos por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: theme.palette.mode === "dark" ? "#bb86fc" : "#4CAF50",
                      fontSize: 28
                    }}
                  />
                </InputAdornment>
              )
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: theme.palette.mode === "dark" ? "#ffffff" : "#333333",
                fontSize: "1.1rem",
                "& fieldset": {
                  borderColor: theme.palette.mode === "dark"
                    ? "rgba(187, 134, 252, 0.3)"
                    : "rgba(76, 175, 80, 0.3)",
                  borderWidth: 2
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.mode === "dark" ? "#bb86fc" : "#4CAF50"
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.mode === "dark" ? "#bb86fc" : "#4CAF50"
                }
              }
            }}
          />
        </Paper>

        {/* Filtros por categoría */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            mb: 4,
            background: theme.palette.mode === "dark"
              ? "rgba(30, 30, 30, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            border: theme.palette.mode === "dark"
              ? "1px solid rgba(187, 134, 252, 0.2)"
              : "1px solid rgba(76, 175, 80, 0.2)",
            borderRadius: 3
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <FilterListIcon
              sx={{
                color: theme.palette.mode === "dark" ? "#bb86fc" : "#4CAF50",
                fontSize: 28
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.mode === "dark" ? "#ffffff" : "#333333",
                fontWeight: 600
              }}
            >
              Filtrar por categoría:
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            {categorias.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setSelectedCategory(cat)}
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  px: 2,
                  py: 2.5,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  background: selectedCategory === cat
                    ? theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #7c4dff 0%, #4a148c 100%)"
                      : "linear-gradient(135deg, #4CAF50 0%, #2e7d32 100%)"
                    : theme.palette.mode === "dark"
                      ? "rgba(187, 134, 252, 0.1)"
                      : "rgba(76, 175, 80, 0.1)",
                  color: selectedCategory === cat
                    ? "#ffffff"
                    : theme.palette.mode === "dark"
                      ? "#bb86fc"
                      : "#2e7d32",
                  border: selectedCategory === cat
                    ? "2px solid transparent"
                    : theme.palette.mode === "dark"
                      ? "2px solid rgba(187, 134, 252, 0.3)"
                      : "2px solid rgba(76, 175, 80, 0.3)",
                  boxShadow: selectedCategory === cat
                    ? theme.palette.mode === "dark"
                      ? "0 4px 12px rgba(124, 77, 255, 0.4)"
                      : "0 4px 12px rgba(76, 175, 80, 0.4)"
                    : "none",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: theme.palette.mode === "dark"
                      ? "0 6px 16px rgba(124, 77, 255, 0.3)"
                      : "0 6px 16px rgba(76, 175, 80, 0.3)"
                  }
                }}
              />
            ))}
          </Box>
        </Paper>

        {/* Contador de resultados */}
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.mode === "dark" ? "#b0b0b0" : "#666666",
            mb: 3,
            textAlign: "center",
            fontWeight: 500
          }}
        >
          {loading
            ? "Cargando productos..."
            : `${filteredProducts.length} producto${filteredProducts.length !== 1 ? "s" : ""} encontrado${filteredProducts.length !== 1 ? "s" : ""}`}
        </Typography>

        {/* Grid de productos */}
        <Fade in={!loading} timeout={600}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)"
              },
              gap: 3,
              width: "100%"
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </Box>
        </Fade>

        {/* Mensaje cuando no hay resultados */}
        {!loading && filteredProducts.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 8
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.mode === "dark" ? "#b0b0b0" : "#666666",
                mb: 2
              }}
            >
              😔 No se encontraron productos
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.mode === "dark" ? "#808080" : "#999999"
              }}
            >
              Intenta con otra búsqueda o categoría
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

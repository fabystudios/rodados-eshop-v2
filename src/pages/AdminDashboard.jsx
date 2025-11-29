import React, { useState, useEffect } from 'react';
import nopeImg from "../assets/nope.png";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  useTheme,
  Chip,
  Fab,
  Tooltip,
  TextField,
  InputAdornment,
  Paper,
  Button,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CategoryIcon from '@mui/icons-material/Category';
import ProductForm from '../components/ProductForm';
import CategoryManager from '../components/CategoryManager';
import { useAuth } from '../contexts/AuthContext';
import { categoryManager } from '../utils/categoryManager';

const API_URL = 'https://68362e14664e72d28e401640.mockapi.io/producto';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [stats, setStats] = useState({ total: 0, avgPrice: 0, totalValue: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [categories, setCategories] = useState([]);
  const theme = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    calculateStats();
    filterProducts();
  }, [products, searchTerm, selectedCategory]);

  const loadCategories = () => {
    setCategories(['Todos', ...categoryManager.getCategories()]);
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let result = products;

    // Filtrar por categoría
    if (selectedCategory !== 'Todos') {
      result = result.filter(p => {
        const prodCat = (p.category || '').trim().toLowerCase();
        const filterCat = selectedCategory.trim().toLowerCase();
        
        console.log(`🔍 Comparando: "${p.name}" categoria="${prodCat}" vs filtro="${filterCat}"`);
        
        return prodCat === filterCat;
      });
    }

    // Filtrar por búsqueda
    if (searchTerm.trim() !== '') {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    console.log(`📊 Resultados: ${result.length} de ${products.length} productos`);
    setFilteredProducts(result);
  };

  const calculateStats = () => {
    const total = products.length;
    const totalValue = products.reduce((sum, p) => sum + parseFloat(p.price || 0), 0);
    const avgPrice = total > 0 ? totalValue / total : 0;
    setStats({ total, avgPrice, totalValue });
  };

  const handleAddProduct = async (productData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });
      if (response.ok) {
        loadProducts();
        setOpenDialog(false);
      } else {
        console.error('❌ Error al crear producto:', response.status);
        alert('Error al crear el producto. Intenta nuevamente.'); // ← Mensaje al usuario
      }
    } catch (error) {
      console.error('❌ Error de red:', error);
      alert('Error de conexión. Verifica tu red e intenta nuevamente.'); // ← Mensaje al usuario
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpenDialog(true);
  };

  const handleUpdateProduct = async (productData) => {
    try {
      // Normaliza la propiedad a 'category'
      const dataToSend = { 
        ...productData, 
        category: productData.category || productData.categoria 
      };
      delete dataToSend.categoria;

      // PUT a MockAPI
      const response = await fetch(`${API_URL}/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        loadProducts(); // Recargar lista
        setOpenDialog(false);
        setEditingProduct(null);
        console.log('✅ Producto actualizado correctamente');
      } else {
        console.error('❌ Error al actualizar producto:', response.status);
      }
    } catch (error) {
      console.error('❌ Error de red al actualizar:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) {
          loadProducts();
          console.log('✅ Producto eliminado correctamente');
        } else {
          console.error('❌ Error al eliminar producto:', response.status);
          alert('Error al eliminar el producto. Intenta nuevamente.');
        }
      } catch (error) {
        console.error('❌ Error de red al eliminar:', error);
        alert('Error de conexión. Verifica tu red e intenta nuevamente.');
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
        py: 4
      }}
    >
      <Container maxWidth="xl" sx={{ pt: 4, pb: 6 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
              fontWeight: 'bold',
              mb: 1,
              textShadow: theme.palette.mode === 'dark'
                ? '0 2px 10px rgba(0,0,0,0.5)'
                : 'none'
            }}
          >
            Panel de Administración
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: theme.palette.mode === 'dark' ? '#b0b0b0' : '#666666' }}
          >
            Bienvenido, {user?.username || 'Admin'}
          </Typography>
        </Box>

        {/* Stats Cards - Centradas y del mismo tamaño */}
        <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#ffffff',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                height: '100%',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <CardContent sx={{ width: '100%', textAlign: 'center', py: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <InventoryIcon sx={{ fontSize: 48, opacity: 0.8 }} />
                  <Box>
                    <Typography variant="h3" fontWeight="bold">
                      {stats.total}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
                      Total Productos
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                  : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: '#ffffff',
                boxShadow: '0 8px 32px rgba(240, 147, 251, 0.3)',
                height: '100%',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <CardContent sx={{ width: '100%', textAlign: 'center', py: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <TrendingUpIcon sx={{ fontSize: 48, opacity: 0.8 }} />
                  <Box>
                    <Typography variant="h3" fontWeight="bold">
                      ${stats.avgPrice.toFixed(2)}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
                      Precio Promedio
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                  : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: '#ffffff',
                boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)',
                height: '100%',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <CardContent sx={{ width: '100%', textAlign: 'center', py: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <AttachMoneyIcon sx={{ fontSize: 48, opacity: 0.8 }} />
                  <Box>
                    <Typography variant="h3" fontWeight="bold">
                      ${stats.totalValue.toFixed(2)}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
                      Valor Total
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Barra de búsqueda y filtros */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            background: theme.palette.mode === 'dark'
              ? 'rgba(30, 30, 30, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: theme.palette.mode === 'dark'
              ? '1px solid rgba(187, 134, 252, 0.2)'
              : '1px solid rgba(76, 175, 80, 0.2)',
            borderRadius: 3
          }}
        >
          {/* Búsqueda */}
          <TextField
            fullWidth
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: theme.palette.mode === 'dark' ? '#bb86fc' : '#4CAF50' }} />
                </InputAdornment>
              )
            }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333'
              }
            }}
          />
          {/* Filtros por categoría */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <FilterListIcon sx={{ color: theme.palette.mode === 'dark' ? '#bb86fc' : '#4CAF50' }} />
            <Typography variant="h6" sx={{ color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333' }}>
              Filtrar por categoría:
            </Typography>
            <Button
              size="small"
              startIcon={<CategoryIcon />}
              onClick={() => setOpenCategoryDialog(true)}
              sx={{
                ml: 'auto',
                color: theme.palette.mode === 'dark' ? '#bb86fc' : '#4CAF50',
                border: '1px solid #FFD700',
                '&:hover': { background: 'rgba(255, 215, 0, 0.1)' }
              }}
            >
              Gestionar Categorías
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setSelectedCategory(cat)}
                sx={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: selectedCategory === cat
                    ? theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #7c4dff 0%, #4a148c 100%)'
                      : 'linear-gradient(135deg, #4CAF50 0%, #2e7d32 100%)'
                    : theme.palette.mode === 'dark'
                      ? 'rgba(187, 134, 252, 0.1)'
                      : 'rgba(76, 175, 80, 0.1)',
                  color: selectedCategory === cat ? '#ffffff' : 'inherit'
                }}
              />
            ))}
          </Box>
          {/* Contador de resultados */}
          <Typography
            variant="body2"
            sx={{ color: theme.palette.mode === 'dark' ? '#b0b0b0' : '#666666', textAlign: 'center' }}
          >
            Mostrando {filteredProducts.length} de {products.length} productos
          </Typography>
          {filteredProducts.length === 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
                color: theme.palette.mode === 'dark' ? '#b0b0b0' : '#666666',
                textAlign: 'center'
              }}
            >
              <img
                src={nopeImg}
                alt="No products"
                style={{
                  width: 120,
                  maxWidth: '60%',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: theme.palette.mode === 'dark' ? 'brightness(0.95)' : 'none'
                }}
              />
              <Typography
                variant="h6"
                sx={{ color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333', fontWeight: 600 }}
              >
                No se encontraron productos en esta categoría
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? '#b0b0b0' : '#666666' }}>
                Ajusta los filtros o agrega nuevos productos.
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Products Grid - CSS Grid para cards perfectamente iguales */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: 3,
            width: '100%'
          }}
        >
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              sx={{
                width: '100%',
                height: 500, // ← Altura FIJA uniforme
                display: 'flex',
                flexDirection: 'column',
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.98) 0%, rgba(20, 20, 20, 0.95) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 250, 0.95) 100%)',
                backdropFilter: 'blur(10px)',
                border: theme.palette.mode === 'dark'
                  ? '1px solid rgba(187, 134, 252, 0.2)'
                  : '1px solid rgba(76, 175, 80, 0.2)',
                borderRadius: 3,
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 20px rgba(187, 134, 252, 0.15)'
                  : '0 4px 20px rgba(76, 175, 80, 0.15)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 12px 40px rgba(187, 134, 252, 0.3)'
                    : '0 12px 40px rgba(76, 175, 80, 0.3)',
                  '&::before': {
                    opacity: 1
                  }
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(90deg, #bb86fc, #7c4dff, #6200ea)'
                    : 'linear-gradient(90deg, #4CAF50, #81C784, #66BB6A)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }
              }}
            >
              {/* Imagen - 200px fijos */}
              <Box
                sx={{
                  height: 200,
                  flexShrink: 0,
                  position: 'relative',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #3a1c71 0%, #3f2b96 50%, #7c4dff 100%)'
                    : 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={product.image || 'https://via.placeholder.com/200'}
                  alt={product.name}
                  style={{
                    maxWidth: '85%',
                    maxHeight: '85%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))'
                  }}
                />
              </Box>
              {/* Contenido - flex-grow */}
              <CardContent
                sx={{
                  flexGrow: 1,
                  p: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
              >
                {/* Título - 2 líneas máximo */}
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#1a1a1a',
                    fontWeight: 700,
                    fontSize: '1rem',
                    lineHeight: 1.3,
                    height: '2.6em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    mb: 1.5
                  }}
                >
                  {product.name}
                </Typography>
                {/* Precio y Categoría */}
                <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap', minHeight: 32 }}>
                  <Chip
                    label={`$${parseFloat(product.price || 0).toFixed(2)}`}
                    sx={{
                      background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      height: 32
                    }}
                  />
                  {product.category && (
                    <Chip
                      label={product.category}
                      size="small"
                      sx={{
                        background: theme.palette.mode === 'dark'
                          ? 'rgba(187, 134, 252, 0.2)'
                          : 'rgba(76, 175, 80, 0.1)',
                        color: theme.palette.mode === 'dark' ? '#bb86fc' : '#2e7d32',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        height: 24
                      }}
                    />
                  )}
                </Box>
                {/* Descripción - 3 líneas máximo */}
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#b0b0b0' : '#666666',
                    fontSize: '0.875rem',
                    lineHeight: 1.4,
                    height: '4.2em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    mb: 1.5
                  }}
                >
                  {product.descripcion || 'Sin descripción disponible'}
                </Typography>
              </CardContent>
              {/* Botones - 70px fijos al final */}
              <Box
                sx={{
                  height: 70,
                  flexShrink: 0,
                  p: 2,
                  display: 'flex',
                  gap: 1.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTop: theme.palette.mode === 'dark'
                    ? '1px solid rgba(255,255,255,0.08)'
                    : '1px solid rgba(0,0,0,0.08)',
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(0,0,0,0.2)'
                    : 'rgba(255,255,255,0.5)'
                }}
              >
                <Tooltip title="Editar" arrow>
                  <IconButton
                    onClick={() => handleEdit(product)}
                    sx={{
                      bgcolor: theme.palette.mode === 'dark'
                        ? 'rgba(33, 150, 243, 0.15)'
                        : 'rgba(33, 150, 243, 0.1)',
                      color: '#2196F3',
                      width: 42,
                      height: 42,
                      '&:hover': {
                        bgcolor: '#2196F3',
                        color: '#fff',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar" arrow>
                  <IconButton
                    onClick={() => handleDeleteProduct(product.id)}
                    sx={{
                      bgcolor: theme.palette.mode === 'dark'
                        ? 'rgba(244, 67, 54, 0.15)'
                        : 'rgba(244, 67, 54, 0.1)',
                      color: '#f44336',
                      width: 42,
                      height: 42,
                      '&:hover': {
                        bgcolor: '#f44336',
                        color: '#fff',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Card>
          ))}
        </Box>

        {/* FAB Button para agregar producto */}
        <Tooltip title="Agregar Producto">
          <Fab
            color="primary"
            onClick={() => setOpenDialog(true)}
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                transform: 'scale(1.1)',
                boxShadow: '0 12px 40px rgba(102, 126, 234, 0.6)'
              }
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>

        {/* Dialog Form Producto */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
            onCancel={handleCloseDialog}
          />
        </Dialog>

        {/* Dialog Gestión de Categorías */}
        <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)} maxWidth="sm" fullWidth>
          <CategoryManager
            onClose={() => {
              setOpenCategoryDialog(false);
              loadCategories();
            }}
          />
        </Dialog>
      </Container>
    </Box>
  );
}

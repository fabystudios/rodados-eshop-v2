import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  useTheme,
  Grid,
  InputAdornment,
  MenuItem
} from '@mui/material';
import StyledButton from './StyledButton';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ImageIcon from '@mui/icons-material/Image';
import { categoryManager } from '../utils/categoryManager';

export default function ProductForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    descripcion: '',
    categoria: ''
  });
  const theme = useTheme();

  // Obtener categorías dinámicamente
  const categorias = categoryManager.getCategories();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        image: product.image || '',
        descripcion: product.descripcion || '',
        categoria: product.categoria || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
          fontWeight: 'bold',
          mb: 3
        }}
      >
        {product ? 'Editar Producto' : 'Nuevo Producto'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre del Producto"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
                  '& fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#bb86fc' : '#1976d2',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#666666',
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Precio"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon sx={{ color: theme.palette.mode === 'dark' ? '#4CAF50' : '#2e7d32' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
                  '& fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#bb86fc' : '#1976d2',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#666666',
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Categoría"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
                  '& fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#bb86fc' : '#1976d2',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#666666',
                },
              }}
            >
              {categorias.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="URL de Imagen"
              name="image"
              value={formData.image}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ImageIcon sx={{ color: theme.palette.mode === 'dark' ? '#bb86fc' : '#1976d2' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
                  '& fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#bb86fc' : '#1976d2',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#666666',
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              multiline
              rows={4}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
                  '& fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#bb86fc' : '#1976d2',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#666666',
                },
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <StyledButton
            type="submit"
            variant="contained"
            fullWidth
            startIcon={<SaveIcon />}
            sx={{
              background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 50%, #2e7d32 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #66bb6a 0%, #4caf50 50%, #388e3c 100%)',
              }
            }}
          >
            Guardar
          </StyledButton>
          <StyledButton
            variant="outlined"
            fullWidth
            startIcon={<CancelIcon />}
            onClick={onCancel}
            sx={{
              borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.23)',
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
              '&:hover': {
                borderColor: '#d32f2f',
                bgcolor: 'rgba(211, 47, 47, 0.1)',
                color: '#d32f2f'
              }
            }}
          >
            Cancelar
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
}

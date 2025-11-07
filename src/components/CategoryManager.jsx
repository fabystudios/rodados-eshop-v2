import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  useTheme,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RestoreIcon from '@mui/icons-material/Restore';
import CloseIcon from '@mui/icons-material/Close';
import { categoryManager } from '../utils/categoryManager';

export default function CategoryManager({ onClose }) {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const theme = useTheme();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    setCategories(categoryManager.getCategories());
  };

  const handleAdd = () => {
    if (newCategory.trim()) {
      const updated = categoryManager.addCategory(newCategory);
      setCategories(updated);
      setNewCategory('');
    }
  };

  const handleDelete = (category) => {
    if (window.confirm(`¿Eliminar categoría "${category}"?`)) {
      const updated = categoryManager.removeCategory(category);
      setCategories(updated);
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Restaurar categorías por defecto?')) {
      const updated = categoryManager.resetCategories();
      setCategories(updated);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Gestionar Categorías
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Agregar nueva categoría */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Nueva categoría..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)'
          }}
        >
          Agregar
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Lista de categorías */}
      <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
        Categorías actuales ({categories.length}):
      </Typography>
      <List sx={{ maxHeight: 300, overflow: 'auto' }}>
        {categories.map((cat, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleDelete(cat)} color="error">
                <DeleteIcon />
              </IconButton>
            }
            sx={{
              border: theme.palette.mode === 'dark'
                ? '1px solid rgba(255,255,255,0.1)'
                : '1px solid rgba(0,0,0,0.1)',
              borderRadius: 2,
              mb: 1
            }}
          >
            <ListItemText primary={cat} />
          </ListItem>
        ))}
      </List>

      {/* Botón restaurar */}
      <Button
        fullWidth
        variant="outlined"
        startIcon={<RestoreIcon />}
        onClick={handleReset}
        sx={{ mt: 2 }}
      >
        Restaurar categorías por defecto
      </Button>
    </Box>
  );
}

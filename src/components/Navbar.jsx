import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Card,
  TextField,
  Typography,
  Container,
  Alert,
  useTheme,
  InputAdornment,
  IconButton
} from '@mui/material';
import StyledButton from '../components/StyledButton';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor, complete todos los campos');
      return;
    }

    const success = login(username, password);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            p: 4,
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
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
              fontWeight: 'bold',
              mb: 3
            }}
          >
            Iniciar Sesión
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: theme.palette.mode === 'dark' ? '#bb86fc' : '#1976d2' }} />
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

            <TextField
              fullWidth
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: theme.palette.mode === 'dark' ? '#bb86fc' : '#1976d2' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#666666' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
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

            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<LoginIcon />}
              sx={{
                mt: 3,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 50%, #0d47a1 100%)',
                boxShadow: '0 4px 15px rgba(25, 118, 210, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 50%, #1565c0 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(25, 118, 210, 0.5)',
                },
              }}
            >
              Ingresar
            </StyledButton>

            <Typography
              align="center"
              sx={{
                mt: 2,
                color: theme.palette.mode === 'dark' ? '#b0b0b0' : '#666666',
                fontSize: '0.875rem'
              }}
            >
              Ingrese cualquier usuario y contraseña para continuar
            </Typography>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
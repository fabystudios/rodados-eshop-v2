// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Badge,
  useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import mascotaImage from "../assets/images/mascota2.png";
import spinnerImage from "../assets/spinner.png";
import StarIcon from "@mui/icons-material/Star";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCarrito } from "../contexts/CarritoContext";
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const { addToCart, cartItems } = useCarrito();
  const navigate = useNavigate();
  const theme = useTheme();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const features = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
      title: "Envío Gratis",
      description: "En compras mayores a $15,000"
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#2196F3' }} />,
      title: "Compra Segura",
      description: "Protección total de tus datos"
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40, color: '#FF9800' }} />,
      title: "Atención 24/7",
      description: "Soporte técnico especializado"
    }
  ];

  // Cargar productos destacados de la API
  useEffect(() => {
    fetch("https://68362e14664e72d28e401640.mockapi.io/producto")
      .then((res) => res.json())
      .then((data) => {
        // Seleccionar 3 productos aleatorios
        const shuffled = data.sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 3));
      })
      .catch((err) => console.error("Error al cargar productos destacados:", err));
  }, []);

  // Función para obtener la cantidad de un producto en el carrito
  const getCartQuantity = (productId) => {
    const cartItem = cartItems.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <>
      <Helmet>
        <title>Rodados eShop - Tu tienda de bicicletas, motos y scooters</title>
        <meta 
          name="description" 
          content="Bienvenido a Rodados eShop. Encuentra las mejores bicicletas, motos, scooters y accesorios. Calidad excepcional y servicio personalizado."
        />
        <meta name="keywords" content="rodados, bicicletas, motos, scooters, tienda online, Argentina" />
        <meta property="og:title" content="Rodados eShop - Tu tienda online" />
        <meta property="og:description" content="Bicicletas, motos y scooters de calidad" />
        <link rel="canonical" href="https://tu-dominio.com/" />
      </Helmet>

      <Box sx={{ 
        minHeight: '100vh',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)'
      }}>
        {/* Hero Section */}
        <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 8 }, pb: 6 }}>
          <Grid 
            container 
            spacing={{ xs: 2, md: 2 }} 
            alignItems="center" 
            justifyContent="center" // ← Agregado
            sx={{ minHeight: { md: '500px' } }}
          >
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                textAlign: { xs: 'center', md: 'left' },
                pr: { md: 1 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: { xs: 'center', md: 'flex-start' }, // ← Agregado
                height: '100%'
              }}>
                <Chip 
                  label="🎉 ¡Ofertas Especiales!"
                  sx={{ 
                    mb: 2,
                    background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                    color: 'white',
                    fontWeight: 'bold',
                    animation: 'pulse 2s infinite',
                    alignSelf: { xs: 'center', md: 'flex-start' }
                  }}
                />
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '2.5rem', lg: '3.5rem' },
                    fontWeight: 'bold',
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(45deg, #bb86fc, #7c4dff, #6200ea)'
                      : 'linear-gradient(45deg, #1976d2, #42a5f5, #7c4dff)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                    lineHeight: 1.1,
                    textAlign: { xs: 'center', md: 'left' } // ← Agregado
                  }}
                >
                  Rodados eShop
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#424242',
                    mb: 3,
                    fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.1rem', lg: '1.4rem' },
                    lineHeight: 1.2,
                    fontWeight: 500,
                    textAlign: { xs: 'center', md: 'left' } // ← Agregado
                  }}
                >
                  Tu destino premium
                  <br />
                  para rodados y accesorios
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: theme.palette.mode === 'dark' ? '#b0b0b0' : '#666',
                    mb: 4,
                    fontSize: { xs: '0.95rem', sm: '1rem', md: '0.9rem', lg: '1rem' },
                    lineHeight: 1.3,
                    textAlign: { xs: 'center', md: 'left' } // ← Agregado
                  }}
                >
                  Calidad excepcional y servicio personalizado.
                </Typography>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2}
                  sx={{ width: { xs: '100%', sm: 'auto' } }} // ← Agregado
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => navigate('/productos')}
                    sx={{
                      background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                      boxShadow: '0 8px 16px rgba(76, 175, 80, 0.3)',
                      borderRadius: '25px',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      width: { xs: '100%', sm: 'auto' }, // ← Agregado
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 24px rgba(76, 175, 80, 0.4)',
                        background: 'linear-gradient(45deg, #388E3C, #66BB6A)'
                      }
                    }}
                  >
                    Ver Productos
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/nosotros')}
                    sx={{
                      borderColor: '#1976d2',
                      color: '#1976d2',
                      borderWidth: 2,
                      borderRadius: '25px',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      width: { xs: '100%', sm: 'auto' }, // ← Agregado
                      '&:hover': {
                        borderWidth: 2,
                        borderColor: '#1976d2',
                        background: 'rgba(25, 118, 210, 0.1)',
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    Conocer Más
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                textAlign: 'center',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                minHeight: { xs: 300, sm: 350 }, // ← Agregado: altura mínima
                px: { xs: 2, md: 3 }
              }}>
                <Box sx={{
                  position: 'relative',
                  display: 'inline-block',
                  animation: 'float 3s ease-in-out infinite',
                  width: '100%', // ← Agregado
                  maxWidth: { xs: 280, sm: 320, md: 350, lg: 400, xl: 420 }
                }}>
                  <Box
                    component="img"
                    src={mascotaImage}
                    alt="Mascota Rodados"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: 'block', // ← Agregado
                      margin: '0 auto', // ← Agregado
                      filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Typography 
            variant="h3" 
            textAlign="center" 
            sx={{ 
              mb: 5,
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 'bold',
              color: theme.palette.mode === 'dark' ? '#bb86fc' : '#1976d2'
            }}
          >
            ¿Por qué elegirnos?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
                <Card sx={{
                  textAlign: 'center',
                  p: 3,
                  width: '100%',
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(30, 30, 30, 0.9)'
                    : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  border: theme.palette.mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 8px 32px rgba(255, 255, 255, 0.1)'
                    : '0 8px 32px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 20px 40px rgba(255, 255, 255, 0.15)'
                      : '0 20px 40px rgba(0, 0, 0, 0.15)'
                  }
                }}>
                  <CardContent sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                  }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ 
                      mb: 1, 
                      fontWeight: 'bold', 
                      color: theme.palette.mode === 'dark' ? '#bb86fc' : '#1976d2'
                    }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: theme.palette.mode === 'dark' ? '#b0b0b0' : '#666'
                    }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Featured Products Section */}
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Typography 
            variant="h3" 
            textAlign="center" 
            sx={{ 
              mb: 5,
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 'bold',
              color: theme.palette.mode === 'dark' ? '#bb86fc' : '#1976d2'
            }}
          >
            Productos Destacados
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {featuredProducts.length === 0 ? (
              <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
                <Typography variant="h6" sx={{ 
                  mb: 2, 
                  color: theme.palette.mode === 'dark' ? '#b0b0b0' : '#666'
                }}>
                  Cargando productos destacados...
                </Typography>
                <img
                  src={spinnerImage}
                  alt="Cargando"
                  style={{ width: 100, height: "auto", opacity: 0.7 }}
                />
              </Box>
            ) : (
              featuredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id} sx={{ 
                  display: 'flex', 
                  justifyContent: 'center' 
                }}>
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
                    <Card sx={{
                      width: { xs: '280px', sm: '260px', md: '280px' },
                      minWidth: { xs: '280px', sm: '260px', md: '280px' },
                      maxWidth: { xs: '280px', sm: '260px', md: '280px' },
                      background: theme.palette.mode === 'dark' 
                        ? 'rgba(30, 30, 30, 0.95)' 
                        : 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '20px',
                      border: theme.palette.mode === 'dark'
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 8px 32px rgba(255, 255, 255, 0.1)'
                        : '0 8px 32px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-5px) scale(1.02)',
                        boxShadow: theme.palette.mode === 'dark'
                          ? '0 20px 40px rgba(255, 255, 255, 0.15)'
                          : '0 20px 40px rgba(0, 0, 0, 0.15)'
                      }
                    }}>
                      <Box sx={{ 
                        height: 200, 
                        background: theme.palette.mode === 'dark' 
                          ? 'linear-gradient(135deg, #7c4dff 0%, #9c27b0 50%, #673ab7 100%)'
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
                        flex: 1,
                        justifyContent: 'space-between',
                        p: 3
                      }}>
                        <Box>
                          <Typography variant="h6" sx={{ 
                            mb: 1, 
                            fontWeight: 'bold',
                            color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333'
                          }}>
                            {product.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                            <StarIcon sx={{ color: '#FFD700', fontSize: 20, mr: 0.5 }} />
                            <Typography variant="body2" sx={{ 
                              color: theme.palette.mode === 'dark' ? '#cccccc' : '#666666'
                            }}>
                              {product.rating || '4.5'}
                            </Typography>
                          </Box>
                          <Typography 
                            variant="h5" 
                            sx={{ 
                              fontWeight: 'bold', 
                              color: '#4CAF50',
                              mb: 3
                            }}
                          >
                            ${product.price}
                          </Typography>
                        </Box>
                        <Stack spacing={2}>
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => navigate(`/productos/${product.id}`)}
                            sx={{
                              borderColor: '#1976d2',
                              color: '#1976d2',
                              borderWidth: 2,
                              borderRadius: '15px',
                              py: 1,
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
                            onClick={() => addToCart(product)}
                            sx={{
                              background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                              borderRadius: '15px',
                              py: 1,
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
                    </Card>
                  </Badge>
                </Grid>
              ))
            )}
          </Grid>
        </Container>

        {/* Call to Action Section */}
        <Box sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #6200ea, #7c4dff, #9c27b0)'
            : 'linear-gradient(135deg, #1976d2, #42a5f5, #7c4dff)',
          py: 8,
          mt: 6
        }}>
          <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', color: 'white' }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 'bold'
                }}
              >
                ¡No te pierdas nuestras ofertas!
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: '1.1rem', md: '1.3rem' }
                }}
              >
                Suscríbete y recibe descuentos exclusivos en tu email
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/productos')}
                sx={{
                  background: 'white',
                  color: theme.palette.mode === 'dark' ? '#6200ea' : '#1976d2',
                  borderRadius: '25px',
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  '&:hover': {
                    background: '#f5f5f5',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.3)'
                  }
                }}
              >
                Explorar Catálogo
              </Button>
            </Box>
          </Container>
        </Box>

        <style jsx global>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </Box>
    </>
  );
}



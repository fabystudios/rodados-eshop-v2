// src/components/CartWithAuth.jsx
import React, { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Cart from './Cart';
import Login from './Login';
import Checkout from '../pages/Checkout';
import { useCarrito } from "../contexts/CarritoContext";

const CartWithAuth = ({ 
  open, 
  onClose 
}) => {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const { cartItems, increaseQty, decreaseQty, removeItem, clearCart } = useCarrito();

  // Función que se ejecuta cuando se hace click en COMPRAR
  const handlePurchaseClick = useCallback(() => {
    if (isAuthenticated()) {
      setShowCheckout(true);
    } else {
      setShowLogin(true);
    }
  }, [isAuthenticated]);

  // Cuando se loguea exitosamente, ir directo al checkout
  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowCheckout(true);
  };

  // Cerrar checkout
  const handleCheckoutClose = () => {
    setShowCheckout(false);
  };

  // Función global para el botón COMPRAR en Cart.jsx
  React.useEffect(() => {
    window.handlePurchase = handlePurchaseClick;
    return () => {
      delete window.handlePurchase;
    };
  }, [handlePurchaseClick]);

  return (
    <>
      <Cart
        open={open}
        onClose={onClose}
        items={cartItems}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        removeItem={removeItem}
        clearCart={clearCart}
      />
      
      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      
      {showCheckout && (
        <Checkout 
          cartItems={cartItems}
          clearCart={clearCart}
          onClose={handleCheckoutClose}
        />
      )}
    </>
  );
};

export default CartWithAuth;
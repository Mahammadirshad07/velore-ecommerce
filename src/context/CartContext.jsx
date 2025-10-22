import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    const savedCart = localStorage.getItem('veloreCart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        } else {
          console.warn('Invalid cart data, clearing...');
          localStorage.removeItem('veloreCart');
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error parsing cart data, clearing...', error);
        localStorage.removeItem('veloreCart');
        setCartItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('veloreCart', JSON.stringify(cartItems));
  }, [cartItems]);


  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem('veloreCart', '[]');
  };

 
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

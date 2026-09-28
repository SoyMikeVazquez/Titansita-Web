"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  if (typeof price === 'string') {
    const cleaned = price.replace(/[^0-9.]/g, '');
    return parseFloat(cleaned) || 0;
  }
  return 0;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('titansita_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('titansita_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const normalizedPrice = parsePrice(product.price);
    const normalizedImage = product.image || product.image_url || 'titansita_whey_1785429188484.png';
    const normalizedProduct = {
      ...product,
      price: normalizedPrice,
      image: normalizedImage
    };

    setCartItems(prev => {
      const existing = prev.find(item => item.id === normalizedProduct.id);
      if (existing) {
        return prev.map(item => 
          item.id === normalizedProduct.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...normalizedProduct, quantity: 1 }];
    });
    setIsCartOpen(true); // Open cart when item is added
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartTotal = cartItems.reduce((total, item) => {
    const price = parsePrice(item.price);
    return total + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      isCartOpen,
      openCart,
      closeCart,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

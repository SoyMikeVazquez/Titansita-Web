"use client";

import React from 'react';
import { useCart } from '../context/CartContext';

export default function FloatingCart() {
  const { openCart, cartItems } = useCart();
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <button 
      onClick={openCart}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        backgroundColor: 'var(--accent)',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        zIndex: 900,
        transition: 'transform 0.2s',
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {totalItems > 0 && (
        <span style={{
          position: 'absolute',
          top: '-5px',
          right: '-5px',
          backgroundColor: '#ff4d4f',
          color: 'white',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          border: '2px solid white'
        }}>
          {totalItems}
        </span>
      )}
    </button>
  );
}

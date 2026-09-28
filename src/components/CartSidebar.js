"use client";

import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import styles from './CartSidebar.module.css';

export default function CartSidebar() {
  const { isCartOpen, closeCart, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  return (
    <>
      <div 
        className={`${styles.overlay} ${isCartOpen ? styles.overlayOpen : ''}`} 
        onClick={closeCart}
      />
      <div className={`${styles.sidebar} ${isCartOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Tu Carrito</h2>
          <button className={styles.closeButton} onClick={closeCart}>&times;</button>
        </div>

        <div className={styles.content}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Tu carrito está vacío.</p>
              <button className="btn-secondary" onClick={closeCart} style={{ marginTop: '1rem' }}>Seguir Comprando</button>
            </div>
          ) : (
            <>
              <div className={styles.cartItems}>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div 
                      className={styles.itemImage} 
                      style={{ backgroundImage: `url('/images/${item.image || item.image_url || 'titansita_whey_1785429188484.png'}')` }}
                    />
                    <div className={styles.itemDetails}>
                      <h4 className={styles.itemName}>{item.name}</h4>
                      <p className={styles.itemPrice}>
                        ${(typeof item.price === 'number' ? item.price : parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0).toFixed(2)}
                      </p>
                      
                      <div className={styles.quantityControls}>
                        <button 
                          className={styles.qtyButton}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          className={styles.qtyButton}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button 
                          className={styles.removeButton}
                          onClick={() => removeFromCart(item.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout Form */}
              <div className={styles.checkoutSection}>
                <h3 className={styles.checkoutTitle}>Datos de Envío y Pago</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert("Procesando pago..."); }}>
                  <div className={styles.formGroup}>
                    <input type="text" placeholder="Nombre completo" className={styles.input} required />
                  </div>
                  <div className={styles.formGroup}>
                    <input type="email" placeholder="Correo electrónico" className={styles.input} required />
                  </div>
                  <div className={styles.formGroup}>
                    <input type="text" placeholder="Dirección de envío" className={styles.input} required />
                  </div>
                  <div className={styles.row}>
                    <div className={styles.formGroup} style={{ flex: 2 }}>
                      <input type="text" placeholder="Número de Tarjeta" className={styles.input} required />
                    </div>
                    <div className={styles.formGroup} style={{ flex: 1 }}>
                      <input type="text" placeholder="MM/AA" className={styles.input} required />
                    </div>
                    <div className={styles.formGroup} style={{ flex: 1 }}>
                      <input type="text" placeholder="CVC" className={styles.input} required />
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button 
              className={styles.checkoutBtn}
              onClick={() => alert("Función de pago en construcción para el demo.")}
            >
              Pagar Pedido
            </button>
          </div>
        )}
      </div>
    </>
  );
}

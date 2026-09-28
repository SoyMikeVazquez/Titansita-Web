"use client";

import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { openCart } = useCart();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        TITAN<span>SITA</span>
      </Link>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Inicio</Link>
        <Link href="/productos" className={styles.navLink}>Tienda</Link>
        <button 
          onClick={openCart} 
          className={styles.navLink} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Carrito
        </button>
      </nav>
    </header>
  );
}

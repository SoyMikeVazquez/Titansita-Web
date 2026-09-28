"use client";

import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        Titán<span>sita</span>
      </Link>
      <div className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>Inicio</Link>
        <Link href="/productos" className={styles.navLink}>Productos</Link>
      </div>
    </nav>
  );
}

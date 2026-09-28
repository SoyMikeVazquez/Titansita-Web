"use client";

import React, { useState, useEffect, useMemo } from 'react';
import styles from './page.module.css';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

const CATEGORIES = ["Todos", "Proteínas", "Pre-Entrenos", "Aminoácidos", "Rendimiento", "Quemadores"];

export default function ProductosPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "Todos") return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <div className={styles.pageContainer}>
      
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 'bold' }}>
            &larr; Volver al Inicio
          </Link>
        </div>
        <h2 className={styles.sidebarTitle}>Categorías</h2>
        <ul className={styles.categoryList}>
          {CATEGORIES.map(category => (
            <li key={category} className={styles.categoryItem}>
              <button
                className={`${styles.categoryButton} ${activeCategory === category ? styles.categoryActive : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Catálogo de Productos</h1>
          <p className={styles.subtitle}>
            {activeCategory === "Todos" 
              ? "Explora nuestra selección completa de suplementos premium." 
              : `Mostrando productos para: ${activeCategory}`}
          </p>
        </div>

        {loading ? (
          <p>Cargando catálogo...</p>
        ) : filteredProducts.length === 0 ? (
          <p>No se encontraron productos en esta categoría o la base de datos está vacía.</p>
        ) : (
          <div className={styles.productGrid}>
            {filteredProducts.map(product => (
              <div key={product.id} className={styles.productCard}>
                <div 
                  className={styles.productImage} 
                  style={{ backgroundImage: `url('/images/${product.image_url || 'titansita_whey_1785429188484.png'}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                <div className={styles.productInfo}>
                  <span className={styles.productCategory}>{product.category}</span>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productPrice}>${product.price}</p>
                  
                  <button 
                    type="button"
                    className={styles.buyButton}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

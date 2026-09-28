"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const { addToCart } = useCart();

  // Intersection Observer for fade/slide animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero} style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Parallax Background */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '120%', 
          backgroundImage: "url('/images/fondo_hero_v2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.4}px)`, zIndex: 0
        }} />
        
        {/* Parallax Midground (Red Smoke) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '120%', 
          backgroundImage: "url('/images/parallax_mid_red_1785432759669.png')", backgroundSize: 'cover', backgroundPosition: 'center',
          mixBlendMode: 'screen', opacity: 0.4,
          transform: `translateY(${scrollY * 0.2}px)`, zIndex: 1
        }} />

        {/* Parallax Foreground (Smoke) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '120%', 
          backgroundImage: "url('/images/parallax_fg_1785432345541.png')", backgroundSize: 'cover', backgroundPosition: 'center',
          mixBlendMode: 'screen', opacity: 0.6,
          transform: `translateY(${scrollY * -0.1}px)`, zIndex: 2
        }} />

        {/* Overlay to ensure text readability */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 3
        }} />

        <div className={`container ${styles.heroContent} fade-in delay-100`} style={{ transform: `translateY(${scrollY * 0.5}px)`, zIndex: 4, position: 'relative', color: '#fff' }}>
          <h1 className={styles.heroTitle}>
            Despierta tu <span style={{ color: 'var(--accent)' }}>Titán</span> Interior
          </h1>
          <p className={styles.heroSubtitle} style={{ color: '#eaeaea' }}>
            Entrenamiento profesional, nutrición deportiva y asesoría premium para alcanzar tu máximo potencial.
          </p>
          <button className="btn-primary">Empieza Hoy</button>
        </div>
      </section>

      {/* Business Explanation */}
      <section className={`container ${styles.section}`}>
        <div className={styles.businessGrid}>
          <div className="slide-up">
            <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '2rem' }}>
              Sobre Titansita
            </h2>
            <div className={styles.businessText}>
              <p>
                Soy Titansita, entrenadora profesional apasionada por transformar vidas a través del movimiento, 
                la disciplina y la suplementación adecuada.
              </p>
              <p>
                Mi método no solo se trata de levantar peso, sino de construir un estilo de vida inquebrantable. 
                Con años de experiencia, he diseñado programas y seleccionado los mejores productos para que 
                alcances tu mejor versión.
              </p>
            </div>
            <button className="btn-secondary" style={{ marginTop: '1.5rem' }}>Conoce Más</button>
          </div>
          <div className="fade-in delay-200">
            {/* Trainer Image */}
            <div style={{ width: '100%', height: '500px', backgroundColor: 'var(--muted)', borderRadius: '10px', backgroundImage: "url('/images/fotoprimeraseccion.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <h2 className={`${styles.sectionTitle} slide-up`}>Suplementos Premium</h2>
          <div className={styles.productsContainer}>
            {/* Mock Products */}
            {[
              { id: 1, name: "Titansita Whey Protein", price: "$49.99", image: "titansita_whey_1785432048349.png" },
              { id: 2, name: "Pre-Workout Explosive", price: "$35.00", image: "titansita_preworkout_1785432058051.png" },
              { id: 3, name: "BCAA Recovery", price: "$29.99", image: "titansita_bcaa_1785432067120.png" },
              { id: 4, name: "Creatine Monohydrate", price: "$25.00", image: "titansita_creatine_1785432076711.png" },
              { id: 5, name: "Fat Burner Pro", price: "$39.99", image: "titansita_fatburner_1785432084108.png" }
            ].map((product, i) => (
              <div key={product.id} className={`${styles.productCard} fade-in delay-${(i + 1) * 100}`}>
                <div className={styles.productImage} style={{ backgroundImage: `url('/images/${product.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <h3 className={styles.productTitle}>{product.name}</h3>
                <p className={styles.productPrice}>{product.price}</p>
                <button 
                  type="button"
                  className="btn-outline" 
                  style={{ width: '100%' }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Comprar
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="/productos" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Ver todos los productos
            </a>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className={`container ${styles.section}`}>
        <h2 className={`${styles.sectionTitle} slide-up`}>Lo que dicen mis clientes</h2>
        <div className={styles.reviewsGrid}>
          {[
            { name: "Laura M.", text: "Desde que entré a las asesorías de Titansita, mi energía y cuerpo cambiaron por completo. ¡Los suplementos son increíbles!" },
            { name: "Carlos G.", text: "La app es súper intuitiva y el seguimiento de Titansita no tiene igual. Vale cada centavo de la inversión." },
            { name: "Ana P.", text: "La mejor decisión que he tomado. He logrado mis objetivos en tiempo récord gracias a su profesionalismo." }
          ].map((review, i) => (
            <div key={i} className={`${styles.reviewCard} slide-up delay-${(i + 1) * 100}`}>
              <div className={styles.reviewStars}>★★★★★</div>
              <p className={styles.reviewText}>"{review.text}"</p>
              <p className={styles.reviewAuthor}>- {review.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* App Download Section */}
      <section className={styles.appDownloadFullWidth}>
        <div className={`container ${styles.appDownloadGrid}`}>
          <div className="slide-up">
            <h2 className={styles.appDownloadTitle} style={{ textAlign: 'left' }}>Lleva tu entrenamiento a donde vayas</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', opacity: 0.9 }}>
              Descarga la App de Workout exclusiva y accede a rutinas, planes de nutrición y seguimiento en tiempo real.
            </p>
            <button className="btn-primary" style={{ backgroundColor: 'white', color: 'var(--foreground)' }}>
              Descargar App (Próximamente)
            </button>
          </div>
          <div className="fade-in delay-200" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ 
              width: '100%', maxWidth: '380px', height: '520px', 
              backgroundImage: "url('/images/app_phone_real.png')", 
              backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
              filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.6))'
            }}></div>
          </div>
        </div>
      </section>

      {/* Closing Sales Section */}
      <section className={`container ${styles.section}`}>
        <div className={`${styles.closingSales} slide-up delay-200`}>
          <h2 className={styles.sectionTitle} style={{ marginBottom: '2rem' }}>¿Lista para dar el siguiente paso?</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)', marginBottom: '3rem' }}>
            Únete a mis asesorías 1 a 1 y construyamos juntos ese cambio que siempre has buscado. Cupos limitados.
          </p>
          <button className="btn-primary" style={{ padding: '1.5rem 3rem', fontSize: '1.25rem' }}>
            Quiero mi Asesoría Personalizada
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container fade-in delay-100">
          <div className={styles.footerLogo}>TITANSITA</div>
          <div className={styles.footerLinks}>
            <a href="#">Inicio</a>
            <a href="#">Suplementos</a>
            <a href="#">Asesorías</a>
            <a href="#">Contacto</a>
          </div>
          <p className={styles.footerCopyright}>
            © {new Date().getFullYear()} Titansita. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}

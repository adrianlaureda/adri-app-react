import { useEffect, useRef, useState } from 'react';
import { WaveEffect } from '../components/WaveEffect';
import styles from './Home.module.css';

// Iconos SVG para el carrusel
const IconPictos = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const IconLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconGrid = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="9" y1="21" x2="9" y2="9"/>
  </svg>
);

const IconText = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 7V4h16v3"/>
    <path d="M9 20h6"/>
    <path d="M12 4v16"/>
  </svg>
);

// Datos del carrusel
const RECURSOS = [
  { id: 'pictos', title: 'Pictos', icon: IconPictos, href: '/pictos', available: true },
  { id: 'acortador', title: 'Acortador', icon: IconLink, href: '/acortador', available: true },
  { id: 'pasapalabra', title: 'Pasapalabra', icon: IconClock, href: null, available: false },
  { id: 'escape', title: 'Escape Room', icon: IconLock, href: null, available: false },
  { id: 'tabu', title: 'Tabú', icon: IconGrid, href: null, available: false },
  { id: 'ortografia', title: 'Ortografía', icon: IconText, href: null, available: false },
];

export function Home() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Detectar cambios de tema
  useEffect(() => {
    const updateTheme = () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'light' ? 'light' : 'dark');
    };
    updateTheme();

    // Observar cambios en el atributo data-theme
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  // Animación automática del carrusel
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5;
    let animationId: number;

    const animate = () => {
      scrollAmount += scrollSpeed;
      if (scrollAmount >= carousel.scrollWidth / 2) {
        scrollAmount = 0;
      }
      carousel.scrollLeft = scrollAmount;
      animationId = requestAnimationFrame(animate);
    };

    // Pausar al hacer hover
    const pauseScroll = () => cancelAnimationFrame(animationId);
    const resumeScroll = () => { animationId = requestAnimationFrame(animate); };

    carousel.addEventListener('mouseenter', pauseScroll);
    carousel.addEventListener('mouseleave', resumeScroll);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      carousel.removeEventListener('mouseenter', pauseScroll);
      carousel.removeEventListener('mouseleave', resumeScroll);
    };
  }, []);

  return (
    <main className={styles.page}>
      {/* Sección del efecto de ondas */}
      <section className={styles.heroSection}>
        <WaveEffect theme={theme} />
      </section>

      {/* Carrusel de recursos en la parte inferior */}
      <section className={styles.carouselSection}>
        <p className={styles.carouselLabel}>Herramientas educativas</p>
        <div className={styles.carouselWrapper}>
          <div ref={carouselRef} className={styles.carousel}>
            {/* Duplicar items para scroll infinito */}
            {[...RECURSOS, ...RECURSOS].map((recurso, index) => (
              recurso.available && recurso.href ? (
                // Apps estáticas usan <a> para forzar recarga completa
                <a
                  key={`${recurso.id}-${index}`}
                  href={recurso.href}
                  className={styles.carouselItem}
                >
                  <span className={styles.itemIcon}><recurso.icon /></span>
                  <span className={styles.itemTitle}>{recurso.title}</span>
                </a>
              ) : (
                <div
                  key={`${recurso.id}-${index}`}
                  className={`${styles.carouselItem} ${styles.disabled}`}
                >
                  <span className={styles.itemIcon}><recurso.icon /></span>
                  <span className={styles.itemTitle}>{recurso.title}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

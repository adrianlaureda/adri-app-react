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

const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const IconTheater = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="9" cy="9" r="7"/>
    <circle cx="15" cy="15" r="7"/>
    <path d="M6.5 7.5c.5-.5 1.5-.5 2 0"/>
    <path d="M10.5 7.5c.5-.5 1.5-.5 2 0"/>
    <path d="M7 11c.5.5 2 1 3.5 0"/>
    <path d="M12.5 13.5c.5-.5 1.5-.5 2 0"/>
    <path d="M16.5 13.5c.5-.5 1.5-.5 2 0"/>
    <path d="M13 17c.5.5 2 1 3.5 0"/>
  </svg>
);

const IconWheel = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="3"/>
    <line x1="12" y1="2" x2="12" y2="9"/>
    <line x1="12" y1="15" x2="12" y2="22"/>
    <line x1="2" y1="12" x2="9" y2="12"/>
    <line x1="15" y1="12" x2="22" y2="12"/>
  </svg>
);

// Datos del carrusel
const RECURSOS = [
  { id: 'pictos', title: 'Pictos', icon: IconPictos, href: '/pictos', available: true },
  { id: 'acortador', title: 'Acortador', icon: IconLink, href: '/acortador', available: true },
  { id: 'pasapalabra', title: 'Pasapalabra', icon: IconClock, href: '/pasapalabra', available: true },
  { id: 'escape', title: 'Escape Room', icon: IconLock, href: '/escape', available: true },
  { id: 'tabu', title: 'Tabú', icon: IconGrid, href: '/tabu', available: true },
  { id: 'cazador', title: 'Cazador', icon: IconTarget, href: '/cazador', available: true },
  { id: 'ortografia', title: 'Ortografía', icon: IconText, href: 'https://docs.google.com/presentation/d/1EQBXlCPrh8doL-SM2q-oxEWivtXqWJ8g6glaKfxIapc/present', available: true, external: true },
  { id: 'improvisacion', title: 'Improvisación', icon: IconTheater, href: '/improvisacion', available: true },
  { id: 'ruleta', title: 'Ruleta', icon: IconWheel, href: '/ruleta', available: true },
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
            {[...RECURSOS, ...RECURSOS].map((recurso, index) => {
              const isExternal = 'external' in recurso && recurso.external;
              return recurso.available && recurso.href ? (
                <a
                  key={`${recurso.id}-${index}`}
                  href={recurso.href}
                  className={styles.carouselItem}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

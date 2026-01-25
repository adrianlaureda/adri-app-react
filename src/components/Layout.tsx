import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import styles from './Layout.module.css';

// Iconos SVG
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });
  const [scrolled, setScrolled] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // Aplicar tema al montar y cuando cambie
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <Link to="/" className={styles.logo}>
          <Logo size={44} />
        </Link>
        <nav className={styles.nav}>
          <Link
            to="/proyectos"
            className={`${styles.navLink} ${isActive('/proyectos') ? styles.active : ''}`}
          >
            Proyectos
          </Link>
          <Link
            to="/formacion"
            className={`${styles.navLink} ${isActive('/formacion') ? styles.active : ''}`}
          >
            Formación
          </Link>
          <Link
            to="/recursos"
            className={`${styles.navLink} ${isActive('/recursos') ? styles.active : ''}`}
          >
            Recursos
          </Link>
        </nav>
      </header>

      <button
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label="Cambiar tema"
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* Botón de contacto - esquina superior izquierda */}
      <button
        className={styles.contactButton}
        onClick={() => setShowContact(true)}
        aria-label="Ver información de contacto"
      >
        <MailIcon />
      </button>

      {/* Modal de contacto */}
      {showContact && (
        <div className={styles.modalOverlay} onClick={() => setShowContact(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setShowContact(false)}
              aria-label="Cerrar"
            >
              <CloseIcon />
            </button>
            <div className={styles.modalContent}>
              <h2 className={styles.modalName}>Adrián Laureda León</h2>
              <p className={styles.modalRole}>
                Docente de Lengua Castellana y Literatura en Galicia.
              </p>
              <p className={styles.modalEmail}>
                Correo: adrianlaureda@edu.xunta.gal
              </p>
              <a
                href="mailto:adrianlaureda@edu.xunta.gal"
                className={styles.modalButton}
              >
                Contactar
              </a>
            </div>
          </div>
        </div>
      )}

      {children}
    </>
  );
}

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

      {children}
    </>
  );
}

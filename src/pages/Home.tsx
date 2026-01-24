import { useEffect, useState } from 'react';
import { WaveEffect } from '../components/WaveEffect';
import styles from './Home.module.css';

export function Home() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Detectar tema inicial
    const checkTheme = () => {
      setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
    };

    checkTheme();

    // Observar cambios de tema
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.hero}>
      <WaveEffect isDark={isDark} />

      {/* Gradiente superior */}
      <div className={styles.gradientTop} />

      {/* Gradiente inferior con navegación se puede añadir si se quiere */}
    </main>
  );
}

import styles from './Proyectos.module.css';

// Iconos SVG
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

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 17L17 7M17 7H7M17 7V17"/>
  </svg>
);

const PROYECTOS = [
  {
    name: 'Pictos',
    href: '/pictos',
    icon: IconPictos,
    description: 'Convierte texto en secuencias de pictogramas ARASAAC. Herramienta esencial para crear materiales de comunicación aumentativa.',
    tags: ['ARASAAC', 'Accesibilidad', 'CAA']
  },
  {
    name: 'URL Shortener',
    href: '/acortador',
    icon: IconLink,
    description: 'Acortador de URLs con códigos personalizados y estadísticas de uso. Perfecto para compartir recursos con enlaces memorables.',
    tags: ['URLs', 'Estadísticas', 'Admin']
  }
];

export function Proyectos() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={`${styles.header} animate-fade-in-up`}>
          <h1 className={styles.title}>Proyectos</h1>
          <p className={styles.subtitle}>
            Herramientas diseñadas para simplificar tareas educativas
          </p>
        </header>

        <section className={`${styles.grid} animate-fade-in-up animate-delay-1`}>
          {PROYECTOS.map((proyecto) => (
            <a key={proyecto.name} href={proyecto.href} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <proyecto.icon />
                </div>
                <div className={styles.cardArrow}>
                  <IconArrow />
                </div>
              </div>
              <h2 className={styles.cardName}>{proyecto.name}</h2>
              <p className={styles.cardDesc}>{proyecto.description}</p>
              <div className={styles.cardTags}>
                {proyecto.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}

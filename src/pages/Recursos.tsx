import styles from './Recursos.module.css';

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

const RECURSOS = [
  {
    id: 'pictos',
    title: 'Pictos',
    description: 'Convierte texto en pictogramas ARASAAC para crear materiales de comunicación aumentativa',
    icon: IconPictos,
    href: '/pictos',
    available: true
  },
  {
    id: 'acortador',
    title: 'URL Shortener',
    description: 'Acortador de enlaces con códigos personalizados y estadísticas de uso',
    icon: IconLink,
    href: '/acortador',
    available: true
  },
  {
    id: 'pasapalabra',
    title: 'Pasapalabra',
    description: 'Generador de roscos tipo Pasapalabra para repasar vocabulario en clase',
    icon: IconClock,
    href: '/pasapalabra',
    available: true
  },
  {
    id: 'escape',
    title: 'Escape Room',
    description: 'Crea escape rooms digitales con pistas y enigmas para tu alumnado',
    icon: IconLock,
    href: '/escape',
    available: true
  },
  {
    id: 'tabu',
    title: 'Tabú',
    description: 'Generador de tarjetas de Tabú para trabajar vocabulario de forma lúdica',
    icon: IconGrid,
    href: '/tabu',
    available: true
  },
  {
    id: 'ortografia',
    title: 'Ortografía',
    description: 'Presentación interactiva de ortografía para detectar errores en redes sociales',
    icon: IconText,
    href: 'https://docs.google.com/presentation/d/1EQBXlCPrh8doL-SM2q-oxEWivtXqWJ8g6glaKfxIapc/present',
    available: true,
    external: true
  }
];

export function Recursos() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={`${styles.header} animate-fade-in-up`}>
          <h1 className={styles.title}>Recursos</h1>
          <p className={styles.subtitle}>
            Herramientas y juegos educativos para el aula
          </p>
        </header>

        <section className={`${styles.grid} animate-fade-in-up animate-delay-1`}>
          {RECURSOS.map((recurso) => {
            const cardContent = (
              <>
                <div className={styles.cardIcon}>
                  <recurso.icon />
                </div>
                <h2 className={styles.cardTitle}>{recurso.title}</h2>
                <p className={styles.cardDesc}>{recurso.description}</p>
                <span className={styles.cardTag}>
                  {recurso.available ? 'Disponible' : 'Próximamente'}
                </span>
              </>
            );

            if (recurso.available && recurso.href) {
              const isExternal = 'external' in recurso && recurso.external;
              return (
                <a
                  key={recurso.id}
                  href={recurso.href}
                  className={styles.card}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div
                key={recurso.id}
                className={`${styles.card} ${styles.comingSoon}`}
              >
                {cardContent}
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}

import styles from './Formacion.module.css';

// Iconos SVG
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

// Iconos para contenidos
const IconContent = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

const IconAutomation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const IconAnalysis = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);

// Cursos/formaciones
const CURSOS = [
  {
    id: 'tadega',
    name: 'Curso TADEGA',
    description: 'Formación completa sobre inteligencia artificial aplicada al aula para docentes de secundaria.',
    status: 'activo',
  },
  {
    id: 'illaverde',
    name: 'PFPP Illa Verde',
    description: 'Plan de Formación Permanente del Profesorado en el IES Illa Verde.',
    status: 'activo',
  },
  {
    id: 'figueroa',
    name: 'PFPP A Figueroa',
    description: 'Plan de Formación Permanente del Profesorado en el IES A Figueroa.',
    status: 'activo',
  },
];

const CONTENIDOS = [
  { name: 'Generación de contenidos', icon: IconContent },
  { name: 'Automatización de tareas', icon: IconAutomation },
  { name: 'Análisis y evaluación', icon: IconAnalysis },
];

export function Formacion() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={`${styles.header} animate-fade-in-up`}>
          <h1 className={styles.title}>Formación</h1>
          <p className={styles.subtitle}>
            Cursos prácticos sobre inteligencia artificial aplicada al aula
          </p>
        </header>

        <section className={`${styles.grid} animate-fade-in-up animate-delay-1`}>
          {CURSOS.map((curso) => (
            <div key={curso.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <IconUsers />
                </div>
                <span className={styles.cardStatus}>
                  <IconCalendar /> En curso
                </span>
              </div>
              <h2 className={styles.cardName}>{curso.name}</h2>
              <p className={styles.cardDesc}>{curso.description}</p>
            </div>
          ))}
        </section>

        <section className={`${styles.topics} animate-fade-in-up animate-delay-2`}>
          <h2 className={styles.topicsTitle}>Contenidos</h2>
          <div className={styles.topicsGrid}>
            {CONTENIDOS.map(item => (
              <div key={item.name} className={styles.topic}>
                <div className={styles.topicIcon}>
                  <item.icon />
                </div>
                <span className={styles.topicName}>{item.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

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

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const TEMAS = [
  'Introducción a la IA',
  'ChatGPT para docentes',
  'Generación de imágenes',
  'Automatización de tareas',
  'Evaluación con IA',
  'Creación de materiales'
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

        <section className={`${styles.comingSoon} animate-fade-in-up animate-delay-1`}>
          <div className={styles.comingSoonIcon}>
            <IconCalendar />
          </div>
          <p className={styles.comingSoonText}>Próximamente</p>
        </section>

        <section className={`${styles.topics} animate-fade-in-up animate-delay-2`}>
          <h2 className={styles.topicsTitle}>Temas previstos</h2>
          <div className={styles.topicsGrid}>
            {TEMAS.map(tema => (
              <div key={tema} className={styles.topic}>
                <div className={styles.topicCheck}>
                  <IconCheck />
                </div>
                <span className={styles.topicName}>{tema}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

# CLAUDE.md — adri-app-react (Portfolio Personal)

## Descripción

Web personal/portfolio de Adri. Diseño minimalista con efectos visuales (Three.js, Framer Motion). Secciones: Home, Formación, Proyectos, Recursos.

## Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Animaciones:** Framer Motion + Three.js (WaveEffect)
- **Routing:** React Router v7
- **Estilos:** CSS Modules
- **Despliegue:** Cloudflare Pages (wrangler.jsonc, SPA mode)

## Comandos

```bash
npm run dev        # Servidor local Vite
npm run build      # Build producción
npm run lint       # ESLint
npx wrangler pages deploy dist  # Desplegar
```

## Estructura

```
src/
  main.tsx             # Entry point con Router
  App.tsx              # Layout principal
  components/
    Layout.tsx         # Shell con navegación
    Logo.tsx           # Logo SVG
    WaveEffect.tsx     # Efecto Three.js en background
  pages/
    Home.tsx           # Landing con presentación
    Formacion.tsx      # Formación académica
    Proyectos.tsx      # Portfolio de proyectos
    Recursos.tsx       # Recursos útiles
  styles/              # Estilos globales
```

## Convenciones

- CSS Modules (`*.module.css`) para cada componente/página
- Diseño siguiendo `adri-style` (minimalista, tema dual, Inter, espaciado generoso)
- Animaciones sutiles con Framer Motion (entrada de elementos, transiciones de página)
- Three.js solo para el efecto de fondo (WaveEffect), no para contenido interactivo
- Mobile-first responsive

// Logo triangular (prisma 3D visto desde arriba)
interface LogoProps {
  size?: number;
}

export function Logo({ size = 48 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      style={{ color: 'var(--text)' }}
    >
      {/* Triángulo base */}
      <polygon
        points="50,5 95,82 5,82"
        fill="currentColor"
      />
      {/* Líneas internas que crean efecto 3D */}
      <line
        x1="50" y1="56"
        x2="50" y2="5"
        stroke="var(--bg)"
        strokeWidth="4"
      />
      <line
        x1="50" y1="56"
        x2="95" y2="82"
        stroke="var(--bg)"
        strokeWidth="4"
      />
      <line
        x1="50" y1="56"
        x2="5" y2="82"
        stroke="var(--bg)"
        strokeWidth="4"
      />
    </svg>
  );
}

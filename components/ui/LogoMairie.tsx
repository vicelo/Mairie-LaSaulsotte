interface LogoMairieProps {
  className?: string;
  /** Si true, applique currentColor pour un rendu monochrome */
  monochrome?: boolean;
}

/**
 * Logo SVG de la mairie de La Saulsotte.
 * Utilise la palette officielle (#2a6010 vert, #f89522 accent).
 * En mode monochrome, hérite de currentColor pour le footer.
 */
export function LogoMairie({ className = "h-8 w-8", monochrome = false }: LogoMairieProps) {
  const fill1 = monochrome ? "currentColor" : "#2a6010";
  const fill2 = monochrome ? "currentColor" : "#f89522";
  const fill3 = monochrome ? "currentColor" : "#d4edbc";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
      role="img"
    >
      {/* Fond arrondi */}
      <rect width="64" height="64" rx="12" fill={fill3} />

      {/* Fronton mairie stylisé */}
      <polygon points="32,6 8,22 56,22" fill={fill1} />

      {/* Corps du bâtiment */}
      <rect x="12" y="22" width="40" height="26" fill={fill1} />

      {/* Porte centrale */}
      <rect x="26" y="34" width="12" height="14" rx="6" fill={fill3} />

      {/* Fenêtres */}
      <rect x="14" y="27" width="8" height="7" rx="2" fill={fill3} />
      <rect x="42" y="27" width="8" height="7" rx="2" fill={fill3} />

      {/* Lanterne / accent */}
      <circle cx="32" cy="17" r="3" fill={fill2} />

      {/* Marches */}
      <rect x="8" y="48" width="48" height="4" rx="2" fill={fill1} />
      <rect x="4" y="52" width="56" height="4" rx="2" fill={fill2} />
    </svg>
  );
}

interface LogoMairieProps {
  className?: string;
  /** Rendu en une seule teinte, héritée de currentColor. */
  monochrome?: boolean;
}

/**
 * Logo SVG de la mairie de La Saulsotte.
 * Utilise la palette officielle (#2a6010 vert, #f89522 accent).
 *
 * En monochrome, la silhouette est découpée par un masque plutôt que
 * repeinte : appliquer currentColor à toutes les formes, fond et
 * découpes compris, aplatissait le dessin en un carré uni.
 */
export function LogoMairie({ className = "h-8 w-8", monochrome = false }: LogoMairieProps) {
  // Identifiant fixe : une page n'affiche qu'un logo monochrome, et deux
  // masques identiques resteraient de toute façon interchangeables.
  const masqueId = "logo-mairie-silhouette";

  if (monochrome) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        <mask id={masqueId}>
          {/* Blanc = conservé, noir = découpé */}
          <rect width="64" height="64" fill="black" />
          <polygon points="32,6 8,22 56,22" fill="white" />
          <rect x="12" y="22" width="40" height="26" fill="white" />
          <circle cx="32" cy="17" r="3" fill="black" />
          <rect x="26" y="34" width="12" height="14" rx="6" fill="black" />
          <rect x="14" y="27" width="8" height="7" rx="2" fill="black" />
          <rect x="42" y="27" width="8" height="7" rx="2" fill="black" />
          <rect x="8" y="48" width="48" height="4" rx="2" fill="white" />
          <rect x="4" y="52" width="56" height="4" rx="2" fill="white" />
        </mask>
        <rect width="64" height="64" fill="currentColor" mask={`url(#${masqueId})`} />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Fond arrondi */}
      <rect width="64" height="64" rx="12" fill="#d4edbc" />

      {/* Fronton mairie stylisé */}
      <polygon points="32,6 8,22 56,22" fill="#2a6010" />

      {/* Corps du bâtiment */}
      <rect x="12" y="22" width="40" height="26" fill="#2a6010" />

      {/* Porte centrale */}
      <rect x="26" y="34" width="12" height="14" rx="6" fill="#d4edbc" />

      {/* Fenêtres */}
      <rect x="14" y="27" width="8" height="7" rx="2" fill="#d4edbc" />
      <rect x="42" y="27" width="8" height="7" rx="2" fill="#d4edbc" />

      {/* Lanterne / accent */}
      <circle cx="32" cy="17" r="3" fill="#f89522" />

      {/* Marches */}
      <rect x="8" y="48" width="48" height="4" rx="2" fill="#2a6010" />
      <rect x="4" y="52" width="56" height="4" rx="2" fill="#f89522" />
    </svg>
  );
}

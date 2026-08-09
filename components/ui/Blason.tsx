interface BlasonProps {
  className?: string;
  /**
   * Variante posée sur un aplat vert : l'écu, vert lui aussi, y disparaîtrait.
   * Le champ passe alors en crème et le filet en vert.
   */
  surFondSombre?: boolean;
  /**
   * Expose le blason aux lecteurs d'écran.
   *
   * Décoratif par défaut : il accompagne partout le nom de la commune écrit
   * juste à côté, et l'annoncer ferait entendre deux fois la même chose.
   */
  informatif?: boolean;
}

/**
 * Blason de La Saulsotte.
 *
 * La commune n'a pas de blason officiel : ce dessin est une création
 * graphique, reprise du handoff « Chemin de craie ». Il ne s'agit pas d'un
 * symbole héraldique enregistré et il peut être remplacé.
 *
 * Le SVG est inline plutôt que chargé depuis public/ : il évite une requête
 * supplémentaire et permet d'en changer les couleurs selon le fond.
 */
export function Blason({
  className = "h-14 w-11",
  surFondSombre = false,
  informatif = false,
}: BlasonProps) {
  const champ = surFondSombre ? "#E9E3D2" : "#2E4034";
  const filet = surFondSombre ? "#2E4034" : "#7E8F7C";
  const tige = surFondSombre ? "#46554A" : "#D8CDB4";
  const epis = surFondSombre ? "#8A4227" : "#B5643C";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 64"
      className={className}
      {...(informatif
        ? { role: "img", "aria-label": "Blason de La Saulsotte" }
        : { "aria-hidden": true, focusable: false })}
    >
      <path d="M2 2 H48 V34 Q48 52 25 62 Q2 52 2 34 Z" fill={champ} />
      <path d="M7 7 H43 V33 Q43 47 25 55 Q7 47 7 33 Z" fill="none" stroke={filet} strokeWidth="1" />
      <line x1="25" y1="47" x2="25" y2="16" stroke={tige} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M25 40 Q18 35 17 28 Q22 31 25 38 Z" fill={epis} />
      <path d="M25 33 Q19 28 19 22 Q23 25 25 31 Z" fill={epis} opacity="0.85" />
      <path d="M25 26 Q20 21 21 16 Q24 19 25 24 Z" fill={epis} opacity="0.65" />
      <path d="M25 40 Q32 35 33 28 Q28 31 25 38 Z" fill={epis} />
      <path d="M25 33 Q31 28 31 22 Q27 25 25 31 Z" fill={epis} opacity="0.85" />
      <path d="M25 26 Q30 21 29 16 Q26 19 25 24 Z" fill={epis} opacity="0.65" />
    </svg>
  );
}

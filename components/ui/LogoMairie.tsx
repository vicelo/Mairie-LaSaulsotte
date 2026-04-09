interface LogoMairieProps {
  monochrome?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export function LogoMairie({ monochrome = false, className, width, height }: LogoMairieProps) {
  const shieldFill = monochrome ? "#1a1a1a" : "#2a6010";
  const shieldInner = monochrome ? "#000000" : "#1e4a0c";
  const stemColor = monochrome ? "#444444" : "#4a8a20";
  const leafColor = monochrome ? "#1a1a1a" : "#f89522";
  const textSecondary = monochrome ? "#1a1a1a" : "#555555";
  const textPrimary = monochrome ? "#1a1a1a" : "#2a6010";
  const accentLine = monochrome ? "#1a1a1a" : "#f89522";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 72"
      role="img"
      aria-label="Mairie de La Saulsotte"
      className={className}
      width={width}
      height={height}
    >
      <title>Mairie de La Saulsotte</title>

      {/* Blason — fond du bouclier */}
      <path d="M6 4 L44 4 L44 34 Q44 54 25 62 Q6 54 6 34 Z" fill={shieldFill} />
      {/* Intérieur du bouclier */}
      <path d="M11 9 L39 9 L39 34 Q39 50 25 57 Q11 50 11 34 Z" fill={shieldInner} />

      {/* Motif saule stylisé — tige */}
      <line
        x1="25"
        y1="52"
        x2="25"
        y2="14"
        stroke={stemColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Feuilles gauche */}
      <path d="M25 44 Q17 38 16 30 Q21 34 25 42Z" fill={leafColor} />
      <path d="M25 36 Q18 30 18 23 Q22 27 25 34Z" fill={leafColor} opacity="0.85" />
      <path d="M25 27 Q19 22 20 16 Q23 19 25 25Z" fill={leafColor} opacity="0.6" />
      {/* Feuilles droite */}
      <path d="M25 44 Q33 38 34 30 Q29 34 25 42Z" fill={leafColor} />
      <path d="M25 36 Q32 30 32 23 Q28 27 25 34Z" fill={leafColor} opacity="0.85" />
      <path d="M25 27 Q31 22 30 16 Q27 19 25 25Z" fill={leafColor} opacity="0.6" />

      {/* "MAIRIE DE" */}
      <text
        x="58"
        y="26"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="11"
        fontWeight="400"
        letterSpacing="3"
        fill={textSecondary}
      >
        MAIRIE DE
      </text>

      {/* "La Saulsotte" */}
      <text
        x="56"
        y="50"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="22"
        fontWeight="700"
        fill={textPrimary}
      >
        La Saulsotte
      </text>

      {/* Ligne décorative */}
      <line
        x1="56"
        y1="57"
        x2="276"
        y2="57"
        stroke={accentLine}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

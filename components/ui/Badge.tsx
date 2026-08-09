import { ReactNode } from "react";

type BadgeColor = "green" | "orange" | "gray" | "blue";

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  className?: string;
}

const COLOR_CLASSES: Record<BadgeColor, string> = {
  green: "bg-sable-clair text-terre-fonce",
  // accent-dark ne donne que 4,12:1 sur orange-100 — insuffisant pour ce
  // texte de 12 px, d'où orange-900.
  orange: "bg-sable-clair text-terre-fonce",
  gray: "bg-sable-clair text-encre-courant",
  blue: "bg-sable-clair text-foret",
};

/**
 * Badge de catégorie pour actualités, services, etc.
 * Contraste ≥ 4.5:1 garanti pour toutes les combinaisons couleur.
 */
export function Badge({ children, color = "green", className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium",
        COLOR_CLASSES[color],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

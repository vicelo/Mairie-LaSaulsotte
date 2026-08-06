import { ReactNode } from "react";

type BadgeColor = "green" | "orange" | "gray" | "blue";

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  className?: string;
}

const COLOR_CLASSES: Record<BadgeColor, string> = {
  green: "bg-primary-100 text-primary",
  // accent-dark ne donne que 4,12:1 sur orange-100 — insuffisant pour ce
  // texte de 12 px, d'où orange-900.
  orange: "bg-orange-100 text-orange-900",
  gray: "bg-gray-100 text-gray-700",
  blue: "bg-blue-100 text-blue-700",
};

/**
 * Badge de catégorie pour actualités, services, etc.
 * Contraste ≥ 4.5:1 garanti pour toutes les combinaisons couleur.
 */
export function Badge({ children, color = "green", className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        COLOR_CLASSES[color],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

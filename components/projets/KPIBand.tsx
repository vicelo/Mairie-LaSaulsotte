import { Projet, ProjetStatut } from "@/content/projets";

interface KPIBandProps {
  projets: Projet[];
}

function count(projets: Projet[], statut: ProjetStatut) {
  return projets.filter((p) => p.statut === statut).length;
}

const KPI_ITEMS = [
  { label: "Total", getValue: (p: Projet[]) => p.length, color: "text-gray-700" },
  { label: "En cours", getValue: (p: Projet[]) => count(p, "en_cours"), color: "text-blue-700" },
  { label: "Bloqués", getValue: (p: Projet[]) => count(p, "bloque"), color: "text-accent-dark" },
  { label: "Terminés", getValue: (p: Projet[]) => count(p, "termine"), color: "text-primary" },
];

export function KPIBand({ projets }: KPIBandProps) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {KPI_ITEMS.map(({ label, getValue, color }) => (
        <div
          key={label}
          className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm"
        >
          <p className={`text-3xl font-bold ${color}`}>{getValue(projets)}</p>
          <p className="mt-1 text-sm text-gray-500">{label}</p>
        </div>
      ))}
    </div>
  );
}

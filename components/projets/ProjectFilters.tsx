"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ProjetCategorie, ProjetStatut, CATEGORIE_LABELS, STATUT_LABELS } from "@/content/projets";

const STATUTS: Array<{ value: ProjetStatut | ""; label: string }> = [
  { value: "", label: "Tous les statuts" },
  { value: "en_cours", label: STATUT_LABELS.en_cours },
  { value: "bloque", label: STATUT_LABELS.bloque },
  { value: "termine", label: STATUT_LABELS.termine },
  { value: "planifie", label: STATUT_LABELS.planifie },
];

const CATEGORIES: Array<{ value: ProjetCategorie | ""; label: string }> = [
  { value: "", label: "Toutes les catégories" },
  { value: "travaux", label: CATEGORIE_LABELS.travaux },
  { value: "numerique", label: CATEGORIE_LABELS.numerique },
  { value: "environnement", label: CATEGORIE_LABELS.environnement },
  { value: "social", label: CATEGORIE_LABELS.social },
];

export function ProjectFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") ?? "";
  const currentCat = searchParams.get("cat") ?? "";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/projets?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <div>
        <label htmlFor="filter-status" className="sr-only">
          Filtrer par statut
        </label>
        <select
          id="filter-status"
          value={currentStatus}
          onChange={(e) => updateParam("status", e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {STATUTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-cat" className="sr-only">
          Filtrer par catégorie
        </label>
        <select
          id="filter-cat"
          value={currentCat}
          onChange={(e) => updateParam("cat", e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

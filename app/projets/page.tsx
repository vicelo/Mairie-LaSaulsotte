import { Suspense } from "react";
import type { Metadata } from "next";
import { PROJETS } from "@/content/projets";
import { KPIBand } from "@/components/projets/KPIBand";
import { ProjectFilters } from "@/components/projets/ProjectFilters";
import { ProjectList } from "@/components/projets/ProjectList";

export const metadata: Metadata = {
  title: "Suivi des projets communaux — Mairie de La Saulsotte",
  description:
    "Tableau de bord des projets en cours, planifiés et terminés de la commune de La Saulsotte (Aube).",
};

export default function ProjetsPage() {
  const updatedDate = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main id="main-content" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-gray-500">
        <ol className="flex items-center gap-2">
          <li>
            <a
              href="/"
              className="rounded text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Accueil
            </a>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="font-medium text-gray-700">
            Projets communaux
          </li>
        </ol>
      </nav>

      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Suivi des projets communaux</h1>
        <p className="mt-1 text-sm text-gray-500">Mis à jour le {updatedDate}</p>
      </div>

      {/* KPI */}
      <KPIBand projets={PROJETS} />

      {/* Filtres */}
      <Suspense fallback={null}>
        <ProjectFilters />
      </Suspense>

      {/* Résultats */}
      <Suspense fallback={null}>
        <ProjectList projets={PROJETS} />
      </Suspense>
    </main>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import { PROJETS } from "@/content/projets";
import { KPIBand } from "@/components/projets/KPIBand";
import { ProjectCard } from "@/components/projets/ProjectCard";
import { ProjectFilters } from "@/components/projets/ProjectFilters";
import type { ProjetStatut, ProjetCategorie } from "@/content/projets";

export const metadata: Metadata = {
  title: "Suivi des projets communaux — Mairie de La Saulsotte",
  description:
    "Tableau de bord des projets en cours, planifiés et terminés de la commune de La Saulsotte (Aube).",
};

interface ProjetsPageProps {
  searchParams: Promise<{ status?: string; cat?: string }>;
}

export default async function ProjetsPage({ searchParams }: ProjetsPageProps) {
  const { status, cat } = await searchParams;

  const filtered = PROJETS.filter((p) => {
    if (status && p.statut !== (status as ProjetStatut)) return false;
    if (cat && p.categorie !== (cat as ProjetCategorie)) return false;
    return true;
  });

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
      {filtered.length === 0 ? (
        <p className="py-10 text-center text-gray-500">
          Aucun projet ne correspond aux filtres sélectionnés.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filtered.map((projet) => (
            <ProjectCard key={projet.id} projet={projet} />
          ))}
        </div>
      )}
    </main>
  );
}

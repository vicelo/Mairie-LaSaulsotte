"use client";

import { useSearchParams } from "next/navigation";
import { type Projet, type ProjetStatut, type ProjetCategorie } from "@/content/projets";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
  projets: Projet[];
}

export function ProjectList({ projets }: ProjectListProps) {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? "";
  const cat = searchParams.get("cat") ?? "";

  const filtered = projets.filter((p) => {
    if (status && p.statut !== (status as ProjetStatut)) return false;
    if (cat && p.categorie !== (cat as ProjetCategorie)) return false;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <p className="py-10 text-center text-gray-500">
        Aucun projet ne correspond aux filtres sélectionnés.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {filtered.map((projet) => (
        <ProjectCard key={projet.id} projet={projet} />
      ))}
    </div>
  );
}

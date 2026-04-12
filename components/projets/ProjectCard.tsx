import Link from "next/link";
import { Projet, ProjetStatut, STATUT_LABELS, CATEGORIE_LABELS } from "@/content/projets";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "./ProgressBar";

type BadgeColor = "green" | "orange" | "gray" | "blue";

const STATUT_COLOR: Record<ProjetStatut, BadgeColor> = {
  en_cours: "blue",
  bloque: "orange",
  termine: "green",
  planifie: "gray",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { month: "short", year: "numeric" });
}

interface ProjectCardProps {
  projet: Projet;
}

export function ProjectCard({ projet }: ProjectCardProps) {
  const isTermine = projet.statut === "termine";
  const isBloque = projet.statut === "bloque";

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge color={STATUT_COLOR[projet.statut]}>{STATUT_LABELS[projet.statut]}</Badge>
        <Badge color="gray">{CATEGORIE_LABELS[projet.categorie]}</Badge>
      </div>

      {/* Titre + description */}
      <div>
        <h3 className="text-base font-semibold leading-snug text-gray-900">{projet.titre}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-600">{projet.description}</p>
      </div>

      {/* Barre de progression */}
      <ProgressBar value={projet.avancement} bloque={isBloque} />

      {/* Prochaine étape */}
      {!isTermine && projet.prochaineEtape && (
        <div className="rounded-lg bg-primary-100 p-3 text-sm text-primary">
          <span className="font-medium">📌 Prochaine étape : </span>
          {projet.prochaineEtape}
        </div>
      )}

      {/* Blocage */}
      {isBloque && projet.blocage && (
        <div
          role="alert"
          className="rounded-lg border border-orange-200 bg-orange-50 p-3 text-sm text-accent-dark"
        >
          <span className="font-medium">⚠ Blocage : </span>
          {projet.blocage}
        </div>
      )}

      {/* Métadonnées + lien */}
      <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
        <div className="flex flex-col gap-0.5">
          <span>Responsable : {projet.responsable}</span>
          <span>Échéance : {formatDate(projet.dateEcheance)}</span>
        </div>
        <Link
          href={`/projets/${projet.slug}`}
          className="rounded text-sm font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Voir le détail →
        </Link>
      </div>
    </article>
  );
}

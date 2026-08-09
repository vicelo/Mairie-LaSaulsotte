import donnees from "@/content/donnees-publiques.json";

/**
 * Données publiques de l'État concernant la commune.
 *
 * Le fichier JSON est produit par `npm run donnees:actualiser` et versionné :
 * la compilation ne dépend d'aucun appel réseau. Ne jamais le modifier à la
 * main — la prochaine actualisation écraserait la correction.
 *
 * Sources : geo.api.gouv.fr et georisques.gouv.fr.
 */

export interface Risque {
  /** Code Gaspar de la famille de risque. */
  code: string;
  libelle: string;
  /** Déclinaisons du risque recensées sur la commune. */
  precisions: string[];
}

export interface CatastropheNaturelle {
  libelle: string;
  /** Dates au format JJ/MM/AAAA, telles que publiées. */
  debut: string;
  fin: string;
  publicationJo: string;
}

export const DONNEES_PUBLIQUES = donnees as {
  /** Date de la dernière évolution constatée, au format AAAA-MM-JJ. */
  actualiseLe: string;
  commune: {
    codeInsee: string;
    nom: string;
    population: number;
    superficieKm2: number;
  };
  risques: Risque[];
  catastrophesNaturelles: CatastropheNaturelle[];
};

/** Date d'actualisation en toutes lettres, pour l'afficher aux visiteurs. */
export function actualiseLeEnFrancais(): string {
  const [annee, mois, jour] = DONNEES_PUBLIQUES.actualiseLe.split("-").map(Number);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(Date.UTC(annee, mois - 1, jour)));
}

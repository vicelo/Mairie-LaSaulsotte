export type ProjetStatut = "en_cours" | "bloque" | "termine" | "planifie";
export type ProjetCategorie = "travaux" | "numerique" | "environnement" | "social";

export interface Projet {
  id: string;
  slug: string;
  titre: string;
  description: string;
  statut: ProjetStatut;
  categorie: ProjetCategorie;
  avancement: number; // 0-100
  prochaineEtape?: string;
  blocage?: string;
  responsable: string;
  dateDebut: string; // ISO date
  dateEcheance: string; // ISO date
}

export const PROJETS: Projet[] = [
  {
    id: "p1",
    slug: "renovation-salle-polyvalente",
    titre: "Rénovation de la salle polyvalente",
    description:
      "Mise aux normes thermiques et accessibilité PMR de la salle polyvalente du village.",
    statut: "en_cours",
    categorie: "travaux",
    avancement: 65,
    prochaineEtape: "Dépôt du dossier de subvention DETR en préfecture",
    responsable: "M. Dupont",
    dateDebut: "2024-03-01",
    dateEcheance: "2025-06-30",
  },
  {
    id: "p2",
    slug: "refonte-site-internet",
    titre: "Refonte du site internet municipal",
    description:
      "Création d'un site accessible, responsive et conforme RGAA pour améliorer les services en ligne.",
    statut: "en_cours",
    categorie: "numerique",
    avancement: 80,
    prochaineEtape: "Recette finale et mise en production",
    responsable: "Service communication",
    dateDebut: "2024-01-15",
    dateEcheance: "2025-04-30",
  },
  {
    id: "p3",
    slug: "amenagement-aire-jeux",
    titre: "Aménagement aire de jeux — Parc municipal",
    description:
      "Installation de nouveaux équipements de jeux inclusifs pour les enfants de 3 à 12 ans.",
    statut: "bloque",
    categorie: "social",
    avancement: 30,
    prochaineEtape: "Relance du fournisseur retenu après levée du blocage",
    blocage:
      "Fournisseur principal en liquidation judiciaire — relance de l'appel d'offres nécessaire",
    responsable: "Mme Martin",
    dateDebut: "2024-06-01",
    dateEcheance: "2025-09-01",
  },
];

export const STATUT_LABELS: Record<ProjetStatut, string> = {
  en_cours: "En cours",
  bloque: "Bloqué",
  termine: "Terminé",
  planifie: "Planifié",
};

export const CATEGORIE_LABELS: Record<ProjetCategorie, string> = {
  travaux: "Travaux & construction",
  numerique: "Numérique & services en ligne",
  environnement: "Environnement",
  social: "Social & vie locale",
};

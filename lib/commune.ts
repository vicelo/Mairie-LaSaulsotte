/**
 * Données officielles de la commune de La Saulsotte.
 *
 * Source unique de vérité : toute coordonnée ou horaire affiché sur le site
 * doit venir d'ici, jamais d'une valeur recopiée dans une page. Une mairie
 * change ses horaires ; il ne doit y avoir qu'un seul endroit à corriger.
 *
 * Sources : site officiel lasaulsotte.fr (rubrique « Infos mairie »),
 * annuaire de l'administration (lannuaire.service-public.gouv.fr), INSEE.
 * Vérifié le 07/08/2026.
 */

export const COMMUNE = {
  nom: "La Saulsotte",
  nomComplet: "Commune de La Saulsotte",
  departement: "Aube",
  departementNumero: "10",
  region: "Grand Est",
  codePostal: "10400",
  codeInsee: "10367",
  population: 677,
  populationAnnee: 2023,
  superficieKm2: 18.93,
  altitudeMin: 62,
  altitudeMax: 191,
  intercommunalite: "Communauté de communes du Nogentais",
  canton: "Nogent-sur-Seine",
  arrondissement: "Nogent-sur-Seine",
  gentile: "Saulsottiens, Saulsottiennes",
} as const;

export const MAIRIE = {
  adresse: "10, rue Pavée",
  codePostal: "10400",
  ville: "La Saulsotte",
  telephone: "03 25 39 82 28",
  /** Format tel: pour les liens cliquables. */
  telephoneLien: "+33325398228",
  email: "contact.mairie@lasaulsotte.fr",
  siteWeb: "https://lasaulsotte.fr",
} as const;

/** Adresse postale sur une seule ligne. */
export const ADRESSE_COMPLETE = `${MAIRIE.adresse}, ${MAIRIE.codePostal} ${MAIRIE.ville}`;

export interface Creneau {
  jours: string;
  horaire: string;
  /** Ce qui est ouvert sur ce créneau : secrétariat, régie, élus… */
  precision?: string;
}

/**
 * Horaires d'ouverture officiels.
 * Source : lasaulsotte.fr, rubrique « Infos mairie » — « Votre Mairie vous
 * accueille / Secrétariat et régie de recettes ».
 */
export const HORAIRES: Creneau[] = [
  { jours: "Lundi", horaire: "16h00 – 19h00", precision: "Secrétariat et régie de recettes" },
  { jours: "Mercredi", horaire: "16h00 – 19h00", precision: "Secrétariat et régie de recettes" },
  { jours: "Jeudi", horaire: "16h00 – 18h00", precision: "Secrétariat" },
  { jours: "Samedi", horaire: "10h00 – 12h00", precision: "Permanence des élus" },
];

/** Version courte pour les phrases en ligne. */
export const HORAIRES_RESUME =
  "lundi et mercredi de 16h à 19h, jeudi de 16h à 18h, samedi de 10h à 12h (permanence des élus)";

/**
 * Patrimoine protégé au titre des monuments historiques.
 * Source : base Mérimée / Wikipédia.
 */
export const PATRIMOINE = [
  {
    nom: "Église Saint-Ferréol",
    epoque: "XIIIe, XVIe et XVIIIe siècles",
    protection: "Inscrite monument historique en 1990",
    lieu: "Bourg",
  },
  {
    nom: "Menhir de la Pierre Aiguë",
    epoque: "Néolithique",
    protection: "Inscrit monument historique en 1993",
    lieu: "La Saulsotte",
  },
  {
    nom: "Pigeonnier de Courtioux",
    epoque: "XVe siècle",
    protection: "Inscrit monument historique en 1990",
    lieu: "Hameau de Courtioux",
  },
  {
    nom: "Chapelle Sainte-Madeleine",
    epoque: "XIIe et 2e quart du XIIIe siècle",
    protection: "Inscrite monument historique en 1930",
    lieu: "Hameau de Resson",
  },
  {
    nom: "Chapelle Saint-Parres",
    epoque: "—",
    protection: "Édifice communal",
    lieu: "Hameau de Liours",
  },
  {
    nom: "Chapelle Saint-Hubert",
    epoque: "—",
    protection: "Édifice communal",
    lieu: "La Saulsotte",
  },
] as const;

/** Hameaux et écarts de la commune. Source : Wikipédia / cadastre. */
export const HAMEAUX = [
  "Aroen",
  "Bourgogne",
  "Buisson de Ferrières",
  "la Calande",
  "Charmoy",
  "les Closiaux",
  "Corgive",
  "Courtioux",
  "La Dobuine",
  "Fouchères",
  "Frécul",
  "la Justice",
  "La Madeleine",
  "Liours",
  "Masure",
  "les Mez",
  "Minières",
  "Montarge",
  "Nouet",
  "Oiselet",
  "Resson",
  "Saint-Parre",
  "Salle",
  "Vauceray",
] as const;

/**
 * Normalisation des dates issues du frontmatter markdown.
 *
 * Selon la façon dont le champ est écrit, YAML le rend soit en chaîne
 * (`date: "2026-04-10"`), soit en objet Date (`date: 2026-04-10`, sans
 * guillemets — c'est ce que produit le CMS). Un `String(valeur).slice(0, 10)`
 * naïf donne alors "Tue Jun 28" au lieu de "2026-06-28", ce qui fausse
 * silencieusement tris et comparaisons.
 */

/** Convertit une valeur de frontmatter en date ISO `YYYY-MM-DD`, ou `""`. */
export function toIsoDate(valeur: unknown): string {
  if (!valeur) return "";

  if (valeur instanceof Date) {
    if (Number.isNaN(valeur.getTime())) return "";
    // Composantes UTC : YAML interprète `2026-06-28` comme minuit UTC, et les
    // composantes locales décaleraient d'un jour à l'ouest de Greenwich.
    const mois = String(valeur.getUTCMonth() + 1).padStart(2, "0");
    const jour = String(valeur.getUTCDate()).padStart(2, "0");
    return `${valeur.getUTCFullYear()}-${mois}-${jour}`;
  }

  return String(valeur).slice(0, 10);
}

/** Date du jour au format `YYYY-MM-DD`, en heure locale. */
export function aujourdhui(): string {
  const d = new Date();
  const mois = String(d.getMonth() + 1).padStart(2, "0");
  const jour = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mois}-${jour}`;
}

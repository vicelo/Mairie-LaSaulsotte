/**
 * Récupère les données publiques de l'État concernant la commune et les écrit
 * dans content/donnees-publiques.json.
 *
 * Le fichier produit est versionné plutôt qu'interrogé à la compilation : le
 * site se construit alors sans dépendre du réseau, une API indisponible ne
 * casse pas un déploiement, et chaque évolution des données apparaît comme un
 * diff relisible avant publication.
 *
 * Sources (aucune clé requise) :
 *  - geo.api.gouv.fr        population et superficie officielles
 *  - georisques.gouv.fr     risques recensés et arrêtés de catastrophe naturelle
 *
 * Lancement : npm run donnees:actualiser
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const CODE_INSEE = "10367";
const racine = join(dirname(fileURLToPath(import.meta.url)), "..");
const destination = join(racine, "content/donnees-publiques.json");

/** Récupère une URL en JSON, avec un délai maximal et un message d'erreur lisible. */
async function recuperer(url, description) {
  const controleur = new AbortController();
  const minuteur = setTimeout(() => controleur.abort(), 30_000);
  try {
    const reponse = await fetch(url, {
      signal: controleur.signal,
      headers: { "User-Agent": "site-mairie-lasaulsotte" },
    });
    if (!reponse.ok) {
      throw new Error(`${description} : HTTP ${reponse.status}`);
    }
    return await reponse.json();
  } catch (erreur) {
    throw new Error(
      `${description} injoignable — ${erreur.name === "AbortError" ? "délai dépassé" : erreur.message}`
    );
  } finally {
    clearTimeout(minuteur);
  }
}

/**
 * Regroupe les risques Gaspar par famille.
 *
 * L'API mêle dans une même liste les familles (codes à deux chiffres) et leurs
 * déclinaisons (trois chiffres, préfixées par le code de la famille). Les
 * afficher à plat donnerait « Inondation » et « Par une crue à débordement
 * lent » comme deux risques distincts.
 */
function regrouperRisques(detail) {
  const familles = detail.filter((r) => r.num_risque.length === 2);
  return familles.map((famille) => ({
    code: famille.num_risque,
    libelle: famille.libelle_risque_long,
    precisions: detail
      .filter((r) => r.num_risque.length > 2 && r.num_risque.startsWith(famille.num_risque))
      .map((r) => r.libelle_risque_long),
  }));
}

/** Convertit une date « JJ/MM/AAAA » en ISO, pour pouvoir trier. */
function versIso(dateFr) {
  const [j, m, a] = (dateFr ?? "").split("/");
  return j && m && a ? `${a}-${m}-${j}` : "";
}

const commune = await recuperer(
  `https://geo.api.gouv.fr/communes/${CODE_INSEE}?fields=nom,code,population,surface`,
  "geo.api.gouv.fr"
);

const risques = await recuperer(
  `https://georisques.gouv.fr/api/v1/gaspar/risques?code_insee=${CODE_INSEE}&page=1&page_size=100`,
  "Géorisques (risques)"
);

const catnat = await recuperer(
  `https://georisques.gouv.fr/api/v1/gaspar/catnat?code_insee=${CODE_INSEE}&page=1&page_size=100`,
  "Géorisques (catastrophes naturelles)"
);

const detailRisques = risques.data?.[0]?.risques_detail ?? [];
if (detailRisques.length === 0) {
  console.error("❌ Géorisques n'a renvoyé aucun risque : abandon plutôt qu'écrire une page vide.");
  process.exit(1);
}

const donnees = {
  // Renseigné après coup pour que deux exécutions sans changement produisent un
  // fichier identique, et n'encombrent pas l'historique d'un commit vide.
  actualiseLe: "",
  commune: {
    codeInsee: commune.code,
    nom: commune.nom,
    population: commune.population,
    /** L'API donne des hectares ; le site affiche des km². */
    superficieKm2: Math.round((commune.surface / 100) * 100) / 100,
  },
  risques: regrouperRisques(detailRisques),
  catastrophesNaturelles: (catnat.data ?? [])
    .map((c) => ({
      libelle: c.libelle_risque_jo,
      debut: c.date_debut_evt,
      fin: c.date_fin_evt,
      publicationJo: c.date_publication_jo,
      tri: versIso(c.date_debut_evt),
    }))
    .sort((a, b) => b.tri.localeCompare(a.tri))
    .map(({ tri: _tri, ...reste }) => reste),
};

// Ne réécrire la date que si le fond a changé, pour éviter un commit mensuel
// qui ne contiendrait qu'un horodatage.
const ancien = existsSync(destination) ? JSON.parse(readFileSync(destination, "utf8")) : null;
const memeContenu =
  ancien && JSON.stringify({ ...ancien, actualiseLe: "" }) === JSON.stringify(donnees);

donnees.actualiseLe = memeContenu ? ancien.actualiseLe : new Date().toISOString().slice(0, 10);

writeFileSync(destination, `${JSON.stringify(donnees, null, 2)}\n`, "utf8");

console.log(
  memeContenu
    ? "✓ Données inchangées depuis la dernière actualisation."
    : `✓ Données actualisées — ${donnees.commune.population} habitants, ` +
        `${donnees.risques.length} risques, ` +
        `${donnees.catastrophesNaturelles.length} arrêtés de catastrophe naturelle.`
);

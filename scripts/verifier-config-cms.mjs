/**
 * Vérifie que la configuration du CMS est exploitable.
 *
 * Une erreur de syntaxe dans config.yml ne casse pas le build : le site se
 * déploie normalement et seule l'interface /admin refuse de démarrer, avec
 * un laconique « The configuration file could not be parsed ». Le défaut
 * passe donc inaperçu jusqu'à ce que la mairie tente de publier.
 *
 * Le piège le plus courant est un deux-points suivi d'un espace dans une
 * valeur non guillemetée (« Exemple : 5 jours »), que YAML lit comme un
 * début de mapping.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { load } from "js-yaml";

const racine = join(dirname(fileURLToPath(import.meta.url)), "..");
const chemin = join(racine, "public/admin/config.yml");

let config;
try {
  config = load(readFileSync(chemin, "utf8"));
} catch (erreur) {
  console.error("❌ public/admin/config.yml est illisible :\n");
  console.error(erreur.message);
  console.error(
    "\nAstuce : entourez de guillemets toute valeur contenant « : » suivi d'un espace."
  );
  process.exit(1);
}

const erreurs = [];

if (!config?.backend?.name) erreurs.push("backend.name est absent");
if (!config?.backend?.repo) erreurs.push("backend.repo est absent");
if (!Array.isArray(config?.collections) || config.collections.length === 0) {
  erreurs.push("aucune collection n'est définie");
}

for (const collection of config.collections ?? []) {
  const nom = collection.name ?? "(sans nom)";
  if (!collection.folder && !collection.files) {
    erreurs.push(`collection « ${nom} » : ni folder ni files`);
  }
  if (!Array.isArray(collection.fields) || collection.fields.length === 0) {
    erreurs.push(`collection « ${nom} » : aucun champ`);
  }
  for (const champ of collection.fields ?? []) {
    if (!champ.name) erreurs.push(`collection « ${nom} » : un champ n'a pas de name`);
    if (!champ.widget)
      erreurs.push(`collection « ${nom} » : le champ « ${champ.name} » n'a pas de widget`);
  }
}

if (erreurs.length > 0) {
  console.error("❌ Configuration du CMS incomplète :");
  for (const erreur of erreurs) console.error(`   • ${erreur}`);
  process.exit(1);
}

const noms = config.collections.map((c) => c.name).join(", ");
console.log(`✓ Configuration CMS valide — ${config.collections.length} collections : ${noms}`);

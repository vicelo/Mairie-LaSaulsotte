import fs from "fs";
import path from "path";

import matter from "gray-matter";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Elu {
  slug: string;
  nom: string;
  fonction: string;
  /** Ordre d'affichage : 1 pour le maire, puis adjoints, puis conseillers. */
  ordre: number;
  /** Commission ou délégation, facultatif. */
  delegation?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CONTENT_DIR = path.join(process.cwd(), "content", "elus");

function parseEluFile(filePath: string): Elu {
  const { data } = matter(fs.readFileSync(filePath, "utf8"));
  return {
    slug: path.basename(filePath, ".md"),
    nom: data.nom ?? "",
    fonction: data.fonction ?? "",
    ordre: typeof data.ordre === "number" ? data.ordre : 99,
    delegation: data.delegation || undefined,
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Conseil municipal, du maire aux conseillers.
 *
 * Renvoie une liste vide tant que la mairie n'a pas saisi la composition :
 * la page bascule alors sur un encart invitant à se renseigner en mairie,
 * plutôt que d'afficher un conseil incomplet.
 */
export function getAllElus(): Elu[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parseEluFile(path.join(CONTENT_DIR, f)))
    .sort((a, b) => a.ordre - b.ordre || a.nom.localeCompare(b.nom, "fr"));
}

/** Le maire, s'il est renseigné. */
export function getMaire(): Elu | undefined {
  return getAllElus().find((e) => e.fonction.toLowerCase() === "maire");
}

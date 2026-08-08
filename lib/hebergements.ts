import fs from "fs";
import path from "path";

import matter from "gray-matter";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Hebergement {
  slug: string;
  nom: string;
  /** Meublé de tourisme, chambres d'hôtes, gîte… */
  type: string;
  description: string;
  adresse?: string;
  /** Nombre de personnes accueillies. */
  capacite?: number;
  /** Site de l'hébergeur ou page de réservation. */
  lien?: string;
  telephone?: string;
  /** Ordre d'affichage, croissant. */
  ordre: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CONTENT_DIR = path.join(process.cwd(), "content", "hebergements");

function parseHebergementFile(filePath: string): Hebergement {
  const { data } = matter(fs.readFileSync(filePath, "utf8"));
  return {
    slug: path.basename(filePath, ".md"),
    nom: data.nom ?? "",
    type: data.type ?? "",
    description: data.description ?? "",
    adresse: data.adresse || undefined,
    capacite: typeof data.capacite === "number" ? data.capacite : undefined,
    lien: data.lien || undefined,
    telephone: data.telephone || undefined,
    ordre: typeof data.ordre === "number" ? data.ordre : 99,
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Hébergements touristiques recensés sur la commune.
 *
 * Le recensement relève de la mairie : les hébergeurs qui souhaitent y
 * figurer s'adressent à elle, et la liste se remplit depuis l'espace
 * d'administration. Le tri est alphabétique à ordre égal, pour qu'aucun
 * hébergement ne se retrouve favorisé par défaut.
 */
export function getAllHebergements(): Hebergement[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parseHebergementFile(path.join(CONTENT_DIR, f)))
    .sort((a, b) => a.ordre - b.ordre || a.nom.localeCompare(b.nom, "fr"));
}

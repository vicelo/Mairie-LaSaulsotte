import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { aujourdhui, toIsoDate } from "./dates";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Annonce {
  id: string;
  texte: string;
  href?: string;
  /** Date à partir de laquelle l'annonce s'affiche (incluse). Vide = tout de suite. */
  dateDebut?: string;
  /** Dernier jour d'affichage (inclus). Vide = pas d'expiration. */
  dateFin?: string;
  /** Ordre d'affichage dans le bandeau, croissant. */
  ordre: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CONTENT_DIR = path.join(process.cwd(), "content", "annonces");

function parseAnnonceFile(filePath: string): Annonce {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  return {
    id: path.basename(filePath, ".md"),
    texte: data.texte ?? "",
    href: data.lien || undefined,
    dateDebut: toIsoDate(data.dateDebut) || undefined,
    dateFin: toIsoDate(data.dateFin) || undefined,
    ordre: typeof data.ordre === "number" ? data.ordre : 99,
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

/** Toutes les annonces, y compris celles hors de leur période d'affichage. */
export function getAllAnnonces(): Annonce[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parseAnnonceFile(path.join(CONTENT_DIR, f)))
    .sort((a, b) => a.ordre - b.ordre || a.id.localeCompare(b.id));
}

/**
 * Annonces à afficher aujourd'hui — une annonce dont la `dateFin` est passée
 * disparaît d'elle-même du bandeau, sans intervention en mairie.
 */
export function getAnnoncesActives(): Annonce[] {
  const today = aujourdhui();

  return getAllAnnonces().filter((a) => {
    if (a.dateDebut && a.dateDebut > today) return false;
    if (a.dateFin && a.dateFin < today) return false;
    return true;
  });
}

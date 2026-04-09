import fs from "fs";
import path from "path";

import matter from "gray-matter";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Demarche {
  id: string;
  title: string;
  description: string;
  category: string;
  delai?: string;
  documents?: string[];
  lienExterne?: string;
  content?: string;
}

export const CATEGORIES_DEMARCHES = [
  "Toutes",
  "État civil",
  "Urbanisme",
  "Élections",
  "Social",
  "Autres",
] as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CONTENT_DIR = path.join(process.cwd(), "content", "demarches");

function parseDemarcheFile(filePath: string): Demarche {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    id: data.id ?? path.basename(filePath, ".md"),
    title: data.title ?? "",
    description: data.description ?? "",
    category: data.category ?? "",
    delai: data.delai,
    documents: Array.isArray(data.documents) ? data.documents : undefined,
    lienExterne: data.lienExterne,
    content: content.trim() || undefined,
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function getAllDemarches(): Demarche[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((f) => parseDemarcheFile(path.join(CONTENT_DIR, f)))
    .sort((a, b) => a.title.localeCompare(b.title, "fr"));
}

export function getDemarcheById(id: string): Demarche | undefined {
  const filePath = path.join(CONTENT_DIR, `${id}.md`);
  if (!fs.existsSync(filePath)) return undefined;
  return parseDemarcheFile(filePath);
}

export function getDemarchesByCategory(category: string): Demarche[] {
  const all = getAllDemarches();
  if (category === "Toutes") return all;
  return all.filter((d) => d.category === category);
}

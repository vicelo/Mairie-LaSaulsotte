import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { toIsoDate } from "./dates";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Actualite {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
  content: string;
}

export const CATEGORIES = [
  "Toutes",
  "Vie municipale",
  "Travaux",
  "Environnement",
  "Culture",
  "Social",
  "Autres",
] as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CONTENT_DIR = path.join(process.cwd(), "content", "actualites");

function parseActualiteFile(filePath: string): Actualite {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, ".md");
  return {
    slug,
    title: data.title ?? "",
    excerpt: data.excerpt ?? "",
    date: toIsoDate(data.date),
    category: data.category ?? "",
    image: data.image,
    content: content.trim(),
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function getAllActualites(): Actualite[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((f) => parseActualiteFile(path.join(CONTENT_DIR, f)))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getActualiteBySlug(slug: string): Actualite | undefined {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;
  return parseActualiteFile(filePath);
}

export function getActualitesByCategory(category: string): Actualite[] {
  const all = getAllActualites();
  if (category === "Toutes") return all;
  return all.filter((a) => a.category === category);
}

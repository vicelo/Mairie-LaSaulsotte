import { MetadataRoute } from "next";

import { getAllActualites } from "@/lib/actualites";
import { MAIRIE } from "@/lib/commune";

const BASE_URL = MAIRIE.siteWeb;

/**
 * Pages statiques du site. Les pages légales sont volontairement absentes :
 * elles portent `robots: { index: false }` et n'ont pas à être proposées à
 * l'indexation.
 */
const PAGES = [
  { chemin: "", changeFrequency: "weekly", priority: 1 },
  { chemin: "/actualites", changeFrequency: "weekly", priority: 0.9 },
  { chemin: "/commune", changeFrequency: "monthly", priority: 0.8 },
  { chemin: "/demarches", changeFrequency: "monthly", priority: 0.8 },
  { chemin: "/elus", changeFrequency: "monthly", priority: 0.8 },
  { chemin: "/services", changeFrequency: "monthly", priority: 0.7 },
  { chemin: "/hebergements", changeFrequency: "monthly", priority: 0.7 },
  { chemin: "/prevention-risques", changeFrequency: "yearly", priority: 0.6 },
  { chemin: "/urbanisme", changeFrequency: "monthly", priority: 0.7 },
  { chemin: "/vie-locale", changeFrequency: "monthly", priority: 0.7 },
  { chemin: "/contact", changeFrequency: "yearly", priority: 0.6 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = PAGES.map((p) => ({
    url: `${BASE_URL}${p.chemin}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const actualiteRoutes: MetadataRoute.Sitemap = getAllActualites().map((a) => ({
    url: `${BASE_URL}/actualites/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...actualiteRoutes];
}

import { MetadataRoute } from "next";

import { MAIRIE } from "@/lib/commune";

/**
 * La présence d'un basePath signale un déploiement en sous-répertoire,
 * c'est-à-dire la pré-production. Elle doit rester hors des moteurs de
 * recherche : son contenu n'est pas validé par la mairie et serait
 * référencé comme s'il émanait du site officiel.
 */
const estPreproduction = Boolean(process.env.BASE_PATH);

export default function robots(): MetadataRoute.Robots {
  if (estPreproduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${MAIRIE.siteWeb}/sitemap.xml`,
  };
}

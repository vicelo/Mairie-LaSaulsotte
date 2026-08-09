import type { Metadata } from "next";
import { Libre_Baskerville, Karla } from "next/font/google";
import "./globals.css";
import { COMMUNE, HORAIRES, MAIRIE } from "@/lib/commune";

/**
 * Polices de la direction « Chemin de craie ».
 *
 * `next/font/google` les télécharge à la compilation et les sert depuis le
 * domaine du site : aucune requête du visiteur vers Google, ce qui écarte le
 * transfert d'adresse IP que la CNIL sanctionne sur les sites publics.
 */
const policeTitres = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--police-titres",
  display: "swap",
});

const policeTexte = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--police-texte",
  display: "swap",
});

/**
 * Pré-production (déploiement en sous-répertoire) : le robots.txt seul ne
 * suffit pas à écarter une page déjà connue des moteurs, d'où la directive
 * noindex portée par chaque page. Voir aussi app/robots.ts.
 */
const estPreproduction = Boolean(process.env.BASE_PATH);

export const metadata: Metadata = {
  metadataBase: new URL(MAIRIE.siteWeb),
  title: {
    default: `Mairie de ${COMMUNE.nom}`,
    template: `%s | Mairie de ${COMMUNE.nom}`,
  },
  description:
    "Site officiel de la mairie de La Saulsotte — informations municipales, démarches administratives et actualités du village.",
  keywords: ["La Saulsotte", "mairie", "commune", "Aube", "10", "village"],
  authors: [{ name: `Mairie de ${COMMUNE.nom}` }],
  robots: estPreproduction ? { index: false, follow: false } : { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: `Mairie de ${COMMUNE.nom}`,
    images: [
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: `Logo Mairie de ${COMMUNE.nom}`,
      },
    ],
  },
};

/** Correspondance des jours vers le vocabulaire Schema.org. */
const JOURS_SCHEMA: Record<string, string> = {
  Lundi: "Monday",
  Mardi: "Tuesday",
  Mercredi: "Wednesday",
  Jeudi: "Thursday",
  Vendredi: "Friday",
  Samedi: "Saturday",
  Dimanche: "Sunday",
};

/** « 16h00 – 19h00 » → { opens: "16:00", closes: "19:00" } */
function horairesSchema(horaire: string) {
  const [debut, fin] = horaire.split("–").map((h) => h.trim().replace("h", ":"));
  return { opens: debut, closes: fin };
}

/**
 * Données structurées de l'établissement.
 *
 * Les horaires sont dérivés de lib/commune : recopiés à la main, ils
 * annonçaient encore une ouverture le vendredi et une fermeture à 19h30,
 * horaires que Google reprend tels quels dans ses résultats.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GovernmentBuilding",
  name: `Mairie de ${COMMUNE.nom}`,
  url: MAIRIE.siteWeb,
  telephone: "+33-3-25-39-82-28",
  email: MAIRIE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: MAIRIE.adresse,
    addressLocality: MAIRIE.ville,
    postalCode: MAIRIE.codePostal,
    addressCountry: "FR",
  },
  openingHoursSpecification: HORAIRES.map((creneau) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: JOURS_SCHEMA[creneau.jours] ?? creneau.jours,
    ...horairesSchema(creneau.horaire),
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${policeTitres.variable} ${policeTexte.variable}`}>
      <body className="bg-creme font-sans text-encre-courant antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

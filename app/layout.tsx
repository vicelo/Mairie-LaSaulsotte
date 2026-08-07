import type { Metadata } from "next";
import "./globals.css";

/**
 * Pré-production (déploiement en sous-répertoire) : le robots.txt seul ne
 * suffit pas à écarter une page déjà connue des moteurs, d'où la directive
 * noindex portée par chaque page. Voir aussi app/robots.ts.
 */
const estPreproduction = Boolean(process.env.BASE_PATH);

export const metadata: Metadata = {
  metadataBase: new URL("https://lasaulsotte.fr"),
  title: {
    default: "Mairie de La Saulsotte",
    template: "%s | Mairie de La Saulsotte",
  },
  description:
    "Site officiel de la mairie de La Saulsotte — informations municipales, démarches administratives et actualités du village.",
  keywords: ["La Saulsotte", "mairie", "commune", "Aube", "10", "village"],
  authors: [{ name: "Mairie de La Saulsotte" }],
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
    siteName: "Mairie de La Saulsotte",
    images: [
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: "Logo Mairie de La Saulsotte",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GovernmentBuilding",
  name: "Mairie de La Saulsotte",
  url: "https://lasaulsotte.fr",
  telephone: "+33-3-25-39-82-28",
  address: {
    "@type": "PostalAddress",
    streetAddress: "10 Rue Pavée",
    addressLocality: "La Saulsotte",
    postalCode: "10400",
    addressCountry: "FR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Wednesday"],
      opens: "16:00",
      closes: "19:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday"],
      opens: "16:00",
      closes: "18:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:30",
      closes: "11:30",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

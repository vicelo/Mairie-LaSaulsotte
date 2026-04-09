import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mairie-lasaulsotte.fr"),
  title: {
    default: "Mairie de La Saulsotte",
    template: "%s | Mairie de La Saulsotte",
  },
  description:
    "Site officiel de la mairie de La Saulsotte — informations municipales, démarches administratives et actualités du village.",
  keywords: ["La Saulsotte", "mairie", "commune", "Aube", "10", "village"],
  authors: [{ name: "Mairie de La Saulsotte" }],
  robots: { index: true, follow: true },
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
  url: "https://www.mairie-lasaulsotte.fr",
  telephone: "+33-3-25-21-82-11",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 Grande Rue",
    addressLocality: "La Saulsotte",
    postalCode: "10150",
    addressCountry: "FR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "12:00",
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

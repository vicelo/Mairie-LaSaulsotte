import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Mairie de La Saulsotte",
    template: "%s | Mairie de La Saulsotte",
  },
  description:
    "Site officiel de la mairie de La Saulsotte — informations municipales, démarches administratives et actualités du village.",
  keywords: ["La Saulsotte", "mairie", "commune", "Aube", "10", "village"],
  authors: [{ name: "Mairie de La Saulsotte" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Mairie de La Saulsotte",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

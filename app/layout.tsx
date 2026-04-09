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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
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

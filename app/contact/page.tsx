import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez la mairie de La Saulsotte : formulaire en ligne, coordonnées, horaires d'ouverture et plan d'accès.",
  openGraph: {
    title: "Contact — Mairie de La Saulsotte",
    description:
      "Contactez la mairie de La Saulsotte : formulaire en ligne, coordonnées, horaires d'ouverture et plan d'accès.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}

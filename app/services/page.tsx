import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — Mairie de La Saulsotte",
  description: "Découvrez les services proposés par la mairie de La Saulsotte aux habitants.",
};

const SERVICES = [
  {
    titre: "Démarches administratives",
    description: "État civil, urbanisme, certificats et autorisations.",
    href: "/demarches",
    icone: "📋",
  },
  {
    titre: "Vie locale",
    description: "Associations, sports, culture et événements locaux.",
    href: "/vie-locale",
    icone: "🏡",
  },
  {
    titre: "Urbanisme",
    description: "Permis de construire, déclarations préalables, PLU.",
    href: "/urbanisme",
    icone: "🏗️",
  },
  {
    titre: "Contact & horaires",
    description: "Coordonnées de la mairie et horaires d'ouverture.",
    href: "/contact",
    icone: "📞",
  },
];

export default function ServicesPage() {
  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Services" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Services</h1>
        <p className="mt-2 text-gray-600">
          La mairie de La Saulsotte met à disposition des habitants un ensemble de services de
          proximité.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {SERVICES.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:border-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <div className="mb-3 text-3xl" aria-hidden="true">
              {s.icone}
            </div>
            <h2 className="font-semibold text-gray-900 group-hover:text-primary">{s.titre}</h2>
            <p className="mt-1 text-sm text-gray-600">{s.description}</p>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}

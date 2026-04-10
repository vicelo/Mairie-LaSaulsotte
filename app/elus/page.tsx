import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Vos Élus — Mairie de La Saulsotte",
  description: "Retrouvez les élus municipaux de La Saulsotte : maire et conseil municipal.",
};

const ELUS = [
  { nom: "Jean-Pierre Martin", fonction: "Maire", depuis: "2020" },
  { nom: "Marie Dupont", fonction: "1ère Adjointe", depuis: "2020" },
  { nom: "Paul Renard", fonction: "2ème Adjoint", depuis: "2020" },
  { nom: "Sophie Bernard", fonction: "Conseillère municipale", depuis: "2020" },
  { nom: "Luc Morel", fonction: "Conseiller municipal", depuis: "2020" },
  { nom: "Claire Simon", fonction: "Conseillère municipale", depuis: "2020" },
];

export default function ElusPage() {
  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Vos Élus" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Vos Élus</h1>
        <p className="mt-2 text-gray-600">
          Le conseil municipal de La Saulsotte est composé de 11 élus issus des élections
          municipales de 2020.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ELUS.map((elu) => (
          <div key={elu.nom} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary">
              {elu.nom
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <h2 className="mt-3 font-semibold text-gray-900">{elu.nom}</h2>
            <p className="text-sm text-primary">{elu.fonction}</p>
            <p className="mt-1 text-xs text-gray-500">En mandat depuis {elu.depuis}</p>
          </div>
        ))}
      </div>

      <div className="bg-primary-50 mt-8 rounded-xl border border-primary-100 p-4 text-sm text-primary-700">
        <strong>Note :</strong> Les informations sur les élus sont en cours de finalisation et
        seront complétées avant la mise en production.
      </div>
    </PageLayout>
  );
}

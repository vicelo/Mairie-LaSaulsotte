import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "La Commune — Mairie de La Saulsotte",
  description:
    "Découvrez La Saulsotte : histoire, géographie et vie locale de cette commune de l'Aube.",
};

export default function CommunePage() {
  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "La Commune" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">La Commune</h1>
        <p className="mt-2 text-gray-600">
          La Saulsotte est une commune de l&apos;Aube (10), département de la région Grand Est,
          comptant environ 150 habitants.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">Présentation</h2>
          <p className="text-gray-700">
            Située dans la plaine champenoise, La Saulsotte est un village rural à taille humaine.
            Code postal : <strong>10150</strong>. La commune fait partie de la communauté de
            communes de l&apos;Orvin et de l&apos;Ardusson.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">Chiffres clés</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
              <dt className="font-medium text-gray-700">Population</dt>
              <dd className="text-gray-900">~150 habitants</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
              <dt className="font-medium text-gray-700">Superficie</dt>
              <dd className="text-gray-900">8,6 km²</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
              <dt className="font-medium text-gray-700">Département</dt>
              <dd className="text-gray-900">Aube (10)</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-gray-700">Région</dt>
              <dd className="text-gray-900">Grand Est</dd>
            </div>
          </dl>
        </section>
      </div>

      <div className="bg-primary-50 mt-8 rounded-xl border border-primary-100 p-4 text-sm text-primary-700">
        <strong>Note :</strong> Cette page est en cours de développement. Des informations
        complémentaires (histoire, patrimoine, associations) seront ajoutées prochainement.
      </div>
    </PageLayout>
  );
}

import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Mairie de La Saulsotte",
  description:
    "Politique de confidentialité et traitement des données personnelles du site de la Mairie de La Saulsotte.",
  robots: { index: false },
};

export default function ConfidentialitePage() {
  return (
    <PageLayout>
      <Breadcrumb
        items={[{ label: "Accueil", href: "/" }, { label: "Politique de confidentialité" }]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Politique de confidentialité</h1>
        <p className="mt-2 text-gray-600">
          La Mairie de La Saulsotte, en tant que responsable de traitement, s&apos;engage à protéger
          vos données personnelles conformément au Règlement général sur la protection des données
          (RGPD) et à la loi Informatique et Libertés.
        </p>
      </div>

      <div className="space-y-6">
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Responsable du traitement</h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="font-medium text-gray-700">Organisme</dt>
              <dd className="text-gray-900">Mairie de La Saulsotte</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Adresse</dt>
              <dd className="text-gray-900">10 Rue Pavée, 10400 La Saulsotte</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Contact</dt>
              <dd className="text-gray-900">
                <a href="mailto:sg.mairie@lasaulsotte.fr" className="text-primary hover:underline">
                  sg.mairie@lasaulsotte.fr
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Données collectées</h2>
          <p className="mb-3 text-sm text-gray-700">
            Ce site collecte uniquement les données que vous nous transmettez volontairement via le
            formulaire de contact :
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
            <li>Nom et prénom</li>
            <li>Adresse électronique</li>
            <li>Objet et contenu du message</li>
          </ul>
          <p className="mt-3 text-sm text-gray-700">
            Aucun cookie publicitaire ou de traçage tiers n&apos;est utilisé sur ce site.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Finalité et base légale du traitement
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-2 pr-4 text-left font-semibold text-gray-700">Finalité</th>
                  <th className="pb-2 pr-4 text-left font-semibold text-gray-700">Base légale</th>
                  <th className="pb-2 text-left font-semibold text-gray-700">Durée</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2 pr-4 text-gray-900">Réponse aux demandes de contact</td>
                  <td className="py-2 pr-4 text-gray-700">
                    Mission de service public (art. 6.1.e RGPD)
                  </td>
                  <td className="py-2 text-gray-700">3 ans</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-gray-900">Statistiques de navigation anonymes</td>
                  <td className="py-2 pr-4 text-gray-700">Intérêt légitime (art. 6.1.f RGPD)</td>
                  <td className="py-2 text-gray-700">13 mois</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Vos droits</h2>
          <p className="mb-3 text-sm text-gray-700">
            Conformément au RGPD, vous disposez des droits suivants sur vos données :
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
            <li>Droit d&apos;accès (art. 15)</li>
            <li>Droit de rectification (art. 16)</li>
            <li>Droit à l&apos;effacement (art. 17)</li>
            <li>Droit à la limitation du traitement (art. 18)</li>
            <li>Droit d&apos;opposition (art. 21)</li>
          </ul>
          <p className="mt-3 text-sm text-gray-700">
            Pour exercer ces droits, contactez-nous par courriel à{" "}
            <a href="mailto:sg.mairie@lasaulsotte.fr" className="text-primary hover:underline">
              sg.mairie@lasaulsotte.fr
            </a>{" "}
            en joignant une copie de votre pièce d&apos;identité. Vous pouvez également adresser une
            réclamation à la{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              CNIL
            </a>
            .
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Cookies</h2>
          <p className="text-sm text-gray-700">
            Ce site n&apos;utilise pas de cookies publicitaires ou de traçage. Des cookies
            techniques strictement nécessaires au bon fonctionnement du site peuvent être déposés.
            Ils ne nécessitent pas votre consentement.
          </p>
        </section>

        <p className="text-xs text-gray-400">Dernière mise à jour : 12 avril 2026.</p>
      </div>
    </PageLayout>
  );
}

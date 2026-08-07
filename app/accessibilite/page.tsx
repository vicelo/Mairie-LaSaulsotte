import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Accessibilité",
  description:
    "Déclaration d'accessibilité du site officiel de la Mairie de La Saulsotte, conforme au RGAA 4.1.",
};

export default function AccessibilitePage() {
  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Accessibilité" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Déclaration d&apos;accessibilité</h1>
        <p className="mt-2 text-gray-600">
          La Mairie de La Saulsotte s&apos;engage à rendre son site internet accessible conformément
          à l&apos;article 47 de la loi n° 2005-102 du 11 février 2005.
        </p>
      </div>

      <div className="space-y-6">
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">État de conformité</h2>
          <p className="mb-3 text-sm text-gray-700">
            Le site <strong>lasaulsotte.fr</strong> est <strong>partiellement conforme</strong> au
            référentiel général d&apos;amélioration de l&apos;accessibilité (RGAA) version 4.1, en
            raison des non-conformités listées ci-dessous.
          </p>
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Niveau d&apos;accessibilité : <strong>partiellement conforme RGAA 4.1</strong>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Technologies utilisées</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
            <li>HTML5 / CSS3</li>
            <li>JavaScript (React 18, Next.js 14)</li>
            <li>Tailwind CSS</li>
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Non-conformités et dérogations
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
            <li>
              Les documents mis à disposition en téléchargement (comptes rendus, règlements,
              formulaires) sont susceptibles de ne pas être entièrement accessibles.
            </li>
            <li>
              Les contenus provenant de services tiers intégrés au site ne sont pas maîtrisés par la
              commune et peuvent présenter des non-conformités.
            </li>
            <li>
              Le site n&apos;a pas encore fait l&apos;objet d&apos;un audit complet des 106 critères
              du RGAA 4.1 par un prestataire spécialisé.
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Établissement de cette déclaration
          </h2>
          <p className="mb-3 text-sm text-gray-700">
            Cette déclaration a été établie le <strong>7 août 2026</strong>.
          </p>
          <p className="mb-3 text-sm text-gray-700">
            Les vérifications réalisées à cette date ont porté sur : la structure des titres et des
            en-têtes, les alternatives textuelles des images, les contrastes de couleur du texte
            (mesurés automatiquement sur l&apos;ensemble des pages), la navigation au clavier, la
            présence d&apos;un lien d&apos;évitement, la langue de la page, ainsi que le rendu aux
            largeurs mobile, tablette et bureau.
          </p>
          <p className="text-sm text-gray-700">
            Ces vérifications ne remplacent pas un audit d&apos;accessibilité complet, qui reste à
            réaliser.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Signaler un problème</h2>
          <p className="mb-3 text-sm text-gray-700">
            Si vous rencontrez un obstacle à l&apos;accès à un contenu ou une fonctionnalité du
            site, vous pouvez nous contacter :
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              Par courriel :{" "}
              <a
                href="mailto:contact.mairie@lasaulsotte.fr"
                className="text-primary hover:underline"
              >
                contact.mairie@lasaulsotte.fr
              </a>
            </li>
            <li>
              Par téléphone :{" "}
              <a href="tel:+33325398228" className="text-primary hover:underline">
                03 25 39 82 28
              </a>
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Voies de recours</h2>
          <p className="text-sm text-gray-700">
            Si vous n&apos;obtenez pas de réponse rapide, vous pouvez contacter le{" "}
            <a
              href="https://www.defenseurdesdroits.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Défenseur des droits
            </a>{" "}
            (gratuit, en ligne ou par courrier).
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Déclaration établie le 12 avril 2026. Mise à jour prévue annuellement.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}

import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Mentions légales — Mairie de La Saulsotte",
  description: "Mentions légales du site officiel de la Mairie de La Saulsotte (Aube, 10400).",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Mentions légales" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mentions légales</h1>
        <p className="mt-2 text-gray-600">
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
          l&apos;économie numérique, il est précisé ci-après l&apos;identité des différents
          intervenants dans le cadre de la réalisation et du suivi de ce site.
        </p>
      </div>

      <div className="space-y-6">
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Éditeur du site</h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-medium text-gray-700">Dénomination</dt>
              <dd className="text-gray-900">Mairie de La Saulsotte</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Adresse</dt>
              <dd className="text-gray-900">10 Rue Pavée, 10400 La Saulsotte</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Téléphone</dt>
              <dd className="text-gray-900">
                <a href="tel:+33325398228" className="text-primary hover:underline">
                  03 25 39 82 28
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Courriel</dt>
              <dd className="text-gray-900">
                <a href="mailto:sg.mairie@lasaulsotte.fr" className="text-primary hover:underline">
                  sg.mairie@lasaulsotte.fr
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Directeur de la publication</dt>
              <dd className="text-gray-900">Gérard DELORME, Maire de La Saulsotte</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Hébergement</h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-medium text-gray-700">Hébergeur</dt>
              <dd className="text-gray-900">Vercel Inc.</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Adresse</dt>
              <dd className="text-gray-900">
                340 Pine Street, Suite 1300 — San Francisco, CA 94104, États-Unis
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Site web</dt>
              <dd className="text-gray-900">
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  vercel.com
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Propriété intellectuelle</h2>
          <p className="text-sm text-gray-700">
            L&apos;ensemble du contenu de ce site (textes, images, vidéos) est la propriété de la
            Mairie de La Saulsotte ou de ses partenaires. Toute reproduction, représentation,
            modification ou adaptation, totale ou partielle, est interdite sans l&apos;accord
            préalable écrit de la mairie.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Données personnelles</h2>
          <p className="text-sm text-gray-700">
            Les informations relatives à la collecte et au traitement des données personnelles sont
            détaillées dans notre{" "}
            <a href="/confidentialite" className="text-primary hover:underline">
              politique de confidentialité
            </a>
            .
          </p>
        </section>
      </div>
    </PageLayout>
  );
}

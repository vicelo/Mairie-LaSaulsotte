import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ADRESSE_COMPLETE, COMMUNE, MAIRIE } from "@/lib/commune";
import { TOUTES_LES_PHOTOS } from "@/lib/images";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site officiel de la Mairie de La Saulsotte (Aube, 10400).",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Mentions légales" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mentions légales</h1>
        <p className="mt-2 max-w-3xl text-gray-600">
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
              <dd className="text-gray-900">Mairie de {COMMUNE.nom}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Adresse</dt>
              <dd className="text-gray-900">{ADRESSE_COMPLETE}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Téléphone</dt>
              <dd className="text-gray-900">
                <a href={`tel:${MAIRIE.telephoneLien}`} className="text-primary hover:underline">
                  {MAIRIE.telephone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Courriel</dt>
              <dd className="text-gray-900">
                <a
                  href={`mailto:${MAIRIE.email}`}
                  className="break-all text-primary hover:underline"
                >
                  {MAIRIE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Directrice de la publication</dt>
              <dd className="text-gray-900">Michelle Monos, Maire de {COMMUNE.nom}</dd>
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
                  <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Propriété intellectuelle</h2>
          <p className="text-sm text-gray-700">
            Sauf mention contraire, les textes de ce site sont la propriété de la Mairie de{" "}
            {COMMUNE.nom}. Toute reproduction, représentation, modification ou adaptation, totale ou
            partielle, est soumise à l&apos;accord préalable écrit de la mairie.
          </p>
          <p className="mt-3 text-sm text-gray-700">
            Les photographies font exception : elles sont diffusées sous licence Creative Commons et
            restent la propriété de leurs auteurs, dans les conditions détaillées ci-dessous.
          </p>
        </section>

        {/* ── Crédits photographiques ────────────────────────────────── */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Crédits photographiques</h2>
          <p className="mb-4 text-sm text-gray-700">
            Les photographies illustrant ce site proviennent de Wikimedia Commons et sont diffusées
            sous licence Creative Commons Attribution — Partage dans les mêmes conditions. Leur
            réutilisation est libre, sous réserve de créditer l&apos;auteur et de conserver la même
            licence.
          </p>
          <ul role="list" className="divide-y divide-gray-100 text-sm">
            {TOUTES_LES_PHOTOS.map((photo) => (
              <li key={photo.src} className="py-3">
                <p className="font-medium text-gray-900">{photo.legende}</p>
                <p className="mt-1 text-gray-600">
                  © {photo.auteur} —{" "}
                  <a
                    href={photo.licenceUrl}
                    target="_blank"
                    rel="noopener noreferrer license"
                    className="text-primary hover:underline"
                  >
                    {photo.licence}
                    <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
                  </a>{" "}
                  —{" "}
                  <a
                    href={photo.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    source
                    <span className="sr-only">
                      {" "}
                      de la photographie « {photo.legende} » (s&apos;ouvre dans un nouvel onglet)
                    </span>
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Données personnelles</h2>
          <p className="text-sm text-gray-700">
            Les informations relatives à la collecte et au traitement des données personnelles sont
            détaillées dans notre{" "}
            <Link href="/confidentialite" className="text-primary hover:underline">
              politique de confidentialité
            </Link>
            .
          </p>
        </section>
      </div>
    </PageLayout>
  );
}

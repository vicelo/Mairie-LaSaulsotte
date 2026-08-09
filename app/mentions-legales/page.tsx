import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ADRESSE_COMPLETE, COMMUNE, MAIRIE } from "@/lib/commune";
import { getMaire } from "@/lib/elus";
import { TOUTES_LES_PHOTOS } from "@/lib/images";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site officiel de la Mairie de La Saulsotte (Aube, 10400).",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  const maire = getMaire();

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Mentions légales" }]} />

      <div className="mb-8">
        <h1 className="text-[34px] leading-[1.1] nav:text-[52px]">Mentions légales</h1>
        <p className="mt-2 max-w-3xl text-encre-courant">
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
          l&apos;économie numérique, il est précisé ci-après l&apos;identité des différents
          intervenants dans le cadre de la réalisation et du suivi de ce site.
        </p>
      </div>

      <div className="space-y-6">
        <section className="border border-sable bg-surface p-6">
          <h2 className="mb-4 text-[22px]">Éditeur du site</h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-medium text-encre-courant">Dénomination</dt>
              <dd className="text-encre">Mairie de {COMMUNE.nom}</dd>
            </div>
            <div>
              <dt className="font-medium text-encre-courant">Adresse</dt>
              <dd className="text-encre">{ADRESSE_COMPLETE}</dd>
            </div>
            <div>
              <dt className="font-medium text-encre-courant">Téléphone</dt>
              <dd className="text-encre">
                <a
                  href={`tel:${MAIRIE.telephoneLien}`}
                  className="text-terre-fonce hover:underline"
                >
                  {MAIRIE.telephone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-encre-courant">Courriel</dt>
              <dd className="text-encre">
                <a
                  href={`mailto:${MAIRIE.email}`}
                  className="break-all text-terre-fonce hover:underline"
                >
                  {MAIRIE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-encre-courant">Direction de la publication</dt>
              <dd className="text-encre">
                {maire ? `${maire.nom}, ${maire.fonction.toLowerCase()}` : "Le maire"} de{" "}
                {COMMUNE.nom}
              </dd>
            </div>
          </dl>
        </section>

        <section className="border border-sable bg-surface p-6">
          <h2 className="mb-4 text-[22px]">Hébergement</h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-medium text-encre-courant">Hébergeur</dt>
              <dd className="text-encre">Vercel Inc.</dd>
            </div>
            <div>
              <dt className="font-medium text-encre-courant">Adresse</dt>
              <dd className="text-encre">
                340 Pine Street, Suite 1300 — San Francisco, CA 94104, États-Unis
              </dd>
            </div>
            <div>
              <dt className="font-medium text-encre-courant">Site web</dt>
              <dd className="text-encre">
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terre-fonce hover:underline"
                >
                  vercel.com
                  <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <section className="border border-sable bg-surface p-6">
          <h2 className="mb-4 text-[22px]">Propriété intellectuelle</h2>
          <p className="text-sm text-encre-courant">
            Sauf mention contraire, les textes de ce site sont la propriété de la Mairie de{" "}
            {COMMUNE.nom}. Toute reproduction, représentation, modification ou adaptation, totale ou
            partielle, est soumise à l&apos;accord préalable écrit de la mairie.
          </p>
          <p className="mt-3 text-sm text-encre-courant">
            Les photographies font exception : elles sont diffusées sous licence Creative Commons et
            restent la propriété de leurs auteurs, dans les conditions détaillées ci-dessous.
          </p>
        </section>

        {/* ── Crédits photographiques ────────────────────────────────── */}
        <section className="border border-sable bg-surface p-6">
          <h2 className="mb-4 text-[22px]">Crédits photographiques</h2>
          <p className="mb-4 text-sm text-encre-courant">
            Les photographies illustrant ce site proviennent de Wikimedia Commons et sont diffusées
            sous licence Creative Commons Attribution — Partage dans les mêmes conditions. Leur
            réutilisation est libre, sous réserve de créditer l&apos;auteur et de conserver la même
            licence.
          </p>
          <ul role="list" className="divide-y divide-sable-clair text-sm">
            {TOUTES_LES_PHOTOS.map((photo) => (
              <li key={photo.src} className="py-3">
                <p className="font-medium text-encre">{photo.legende}</p>
                <p className="mt-1 text-encre-courant">
                  © {photo.auteur} —{" "}
                  <a
                    href={photo.licenceUrl}
                    target="_blank"
                    rel="noopener noreferrer license"
                    className="text-terre-fonce hover:underline"
                  >
                    {photo.licence}
                    <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
                  </a>{" "}
                  —{" "}
                  <a
                    href={photo.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terre-fonce hover:underline"
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

        <section className="border border-sable bg-surface p-6">
          <h2 className="mb-4 text-[22px]">Données personnelles</h2>
          <p className="text-sm text-encre-courant">
            Les informations relatives à la collecte et au traitement des données personnelles sont
            détaillées dans notre{" "}
            <Link href="/confidentialite" className="text-terre-fonce hover:underline">
              politique de confidentialité
            </Link>
            .
          </p>
        </section>
      </div>
    </PageLayout>
  );
}

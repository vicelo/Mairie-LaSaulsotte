import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { HORAIRES_RESUME, MAIRIE } from "@/lib/commune";

export const metadata: Metadata = {
  title: "Vos Élus",
  description:
    "Le conseil municipal de La Saulsotte, issu des élections municipales de mars 2026, et les permanences des élus.",
  openGraph: {
    title: "Vos Élus — Mairie de La Saulsotte",
    description: "Le conseil municipal de La Saulsotte et les permanences des élus.",
  },
};

/**
 * Composition du conseil municipal.
 *
 * Seul le nom du maire est publié tant que la mairie n'a pas transmis la
 * liste nominative issue du renouvellement de mars 2026 : mieux vaut une
 * information partielle qu'une liste périmée présentée comme actuelle.
 * Sources concordantes pour le maire : annuaire des mairies, Wikipédia.
 */
const MAIRE = {
  nom: "Michelle Monos",
  fonction: "Maire",
  depuis: "15 mars 2026",
};

const CONSEIL = {
  effectif: 15,
  femmes: 8,
  hommes: 7,
  scrutin: "Élections municipales des 15 et 22 mars 2026",
};

export default function ElusPage() {
  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Vos Élus" }]} />

      <h1 className="mb-3 text-3xl font-bold text-gray-900">Vos Élus</h1>
      <p className="mb-10 max-w-2xl text-gray-600">
        Le conseil municipal de La Saulsotte compte {CONSEIL.effectif} élus, issus du scrutin de
        mars 2026. Il se réunit régulièrement en séance publique.
      </p>

      {/* ── Le maire ──────────────────────────────────────────────────── */}
      <section aria-labelledby="maire-titre" className="mb-10">
        <h2 id="maire-titre" className="mb-6 text-2xl font-bold text-gray-800">
          Le maire
        </h2>
        <div className="max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-lg font-semibold text-gray-900">{MAIRE.nom}</p>
          <p className="text-sm font-medium text-primary">{MAIRE.fonction}</p>
          <p className="mt-2 text-sm text-gray-500">En fonction depuis le {MAIRE.depuis}</p>
        </div>
      </section>

      {/* ── Le conseil municipal ──────────────────────────────────────── */}
      <section aria-labelledby="conseil-titre" className="mb-10">
        <h2 id="conseil-titre" className="mb-6 text-2xl font-bold text-gray-800">
          Le conseil municipal
        </h2>

        <dl className="mb-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-3 rounded-xl border border-gray-200 bg-white p-6 sm:grid-cols-2">
          <div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
            <dt className="text-sm font-medium text-gray-700">Nombre d&apos;élus</dt>
            <dd className="text-sm text-gray-900">{CONSEIL.effectif}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
            <dt className="text-sm font-medium text-gray-700">Répartition</dt>
            <dd className="text-sm text-gray-900">
              {CONSEIL.femmes} femmes, {CONSEIL.hommes} hommes
            </dd>
          </div>
          <div className="flex justify-between gap-4 sm:col-span-2">
            <dt className="text-sm font-medium text-gray-700">Scrutin</dt>
            <dd className="text-right text-sm text-gray-900">{CONSEIL.scrutin}</dd>
          </div>
        </dl>

        <div className="max-w-2xl rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-gray-800">
          <p className="font-semibold">Liste nominative en cours d&apos;actualisation</p>
          <p className="mt-1">
            La composition détaillée du conseil municipal (adjoints et conseillers) est en cours de
            mise à jour à la suite du renouvellement de mars 2026. Elle est consultable en mairie,
            ou par téléphone au{" "}
            <a
              href={`tel:${MAIRIE.telephoneLien}`}
              className="rounded underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {MAIRIE.telephone}
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── Permanences ───────────────────────────────────────────────── */}
      <section aria-labelledby="permanences-titre">
        <h2 id="permanences-titre" className="mb-6 text-2xl font-bold text-gray-800">
          Rencontrer vos élus
        </h2>
        <p className="max-w-2xl text-gray-700">
          Une permanence des élus se tient <strong>le samedi de 10h à 12h</strong> en mairie. Le
          secrétariat vous accueille par ailleurs {HORAIRES_RESUME}.
        </p>
        <p className="mt-4 max-w-2xl text-gray-700">
          Pour une demande précise, vous pouvez également{" "}
          <Link
            href="/contact"
            className="rounded text-primary underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            écrire à la mairie
          </Link>
          .
        </p>
      </section>
    </PageLayout>
  );
}

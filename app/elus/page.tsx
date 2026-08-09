import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { HORAIRES_RESUME, MAIRIE } from "@/lib/commune";
import { getAllElus } from "@/lib/elus";

export const metadata: Metadata = {
  title: "Vos Élus",
  description:
    "Le conseil municipal de La Saulsotte, issu des élections municipales de mars 2026, et les permanences des élus.",
  openGraph: {
    title: "Vos Élus — Mairie de La Saulsotte",
    description: "Le conseil municipal de La Saulsotte et les permanences des élus.",
  },
};

const CONSEIL = {
  effectif: 15,
  femmes: 8,
  hommes: 7,
  scrutin: "Élections municipales des 15 et 22 mars 2026",
};

export default function ElusPage() {
  const elus = getAllElus();
  // La composition n'est complète que lorsque tous les sièges sont saisis
  // dans le CMS ; en deçà, on l'annonce plutôt que de laisser croire à un
  // conseil de trois membres.
  const compositionComplete = elus.length >= CONSEIL.effectif;

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Vos Élus" }]} />

      <h1 className="mb-4 text-[34px] leading-[1.1] nav:text-[52px]">Vos Élus</h1>
      <p className="mb-10 max-w-2xl text-encre-courant">
        Le conseil municipal de La Saulsotte compte {CONSEIL.effectif} élus, issus du scrutin de
        mars 2026. Il se réunit régulièrement en séance publique.
      </p>

      {/* ── Composition ───────────────────────────────────────────────── */}
      <section aria-labelledby="composition-titre" className="mb-10">
        <h2 id="composition-titre" className="mb-6 text-[26px] nav:text-[34px]">
          {compositionComplete ? "Le conseil municipal" : "Le maire"}
        </h2>

        {elus.length > 0 ? (
          <ul role="list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {elus.map((elu) => (
              <li key={elu.slug} className="border border-sable bg-surface p-5 shadow-sm">
                <p className="font-semibold text-encre">{elu.nom}</p>
                <p className="text-sm font-medium text-terre-fonce">{elu.fonction}</p>
                {elu.delegation && (
                  <p className="mt-1 text-sm text-encre-courant">{elu.delegation}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-encre-courant">
            La composition du conseil municipal est consultable en mairie.
          </p>
        )}

        {!compositionComplete && (
          <div className="mt-6 max-w-2xl border border-terre bg-sable-clair p-4 text-sm text-encre">
            <p className="font-semibold">Liste nominative en cours d&apos;actualisation</p>
            <p className="mt-1">
              La composition détaillée du conseil municipal (adjoints et conseillers) est en cours
              de mise à jour à la suite du renouvellement de mars 2026. Elle est consultable en
              mairie, ou par téléphone au{" "}
              <a
                href={`tel:${MAIRIE.telephoneLien}`}
                className="rounded underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
              >
                {MAIRIE.telephone}
              </a>
              .
            </p>
          </div>
        )}
      </section>

      {/* ── Chiffres du conseil ───────────────────────────────────────── */}
      <section aria-labelledby="chiffres-titre" className="mb-10">
        <h2 id="chiffres-titre" className="mb-6 text-[26px] nav:text-[34px]">
          Le conseil en chiffres
        </h2>
        <dl className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-3 border border-sable bg-surface p-6 sm:grid-cols-2">
          <div className="flex justify-between gap-4 border-b border-sable-clair pb-2">
            <dt className="text-sm font-medium text-encre-courant">Nombre d&apos;élus</dt>
            <dd className="text-sm text-encre">{CONSEIL.effectif}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-sable-clair pb-2">
            <dt className="text-sm font-medium text-encre-courant">Répartition</dt>
            <dd className="text-sm text-encre">
              {CONSEIL.femmes} femmes, {CONSEIL.hommes} hommes
            </dd>
          </div>
          <div className="flex justify-between gap-4 sm:col-span-2">
            <dt className="text-sm font-medium text-encre-courant">Scrutin</dt>
            <dd className="text-right text-sm text-encre">{CONSEIL.scrutin}</dd>
          </div>
        </dl>
      </section>

      {/* ── Permanences ───────────────────────────────────────────────── */}
      <section aria-labelledby="permanences-titre">
        <h2 id="permanences-titre" className="mb-6 text-[26px] nav:text-[34px]">
          Rencontrer vos élus
        </h2>
        <p className="max-w-2xl text-encre-courant">
          Une permanence des élus se tient <strong>le samedi de 10h à 12h</strong> en mairie. Le
          secrétariat vous accueille par ailleurs {HORAIRES_RESUME}.
        </p>
        <p className="mt-4 max-w-2xl text-encre-courant">
          Pour une demande précise, vous pouvez également{" "}
          <Link
            href="/contact"
            className="rounded text-terre-fonce underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
          >
            écrire à la mairie
          </Link>
          .
        </p>
      </section>
    </PageLayout>
  );
}

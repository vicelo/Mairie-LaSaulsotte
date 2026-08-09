import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { COMMUNE, MAIRIE } from "@/lib/commune";
import { getAllHebergements } from "@/lib/hebergements";

export const metadata: Metadata = {
  title: "Hébergements",
  description:
    "Les hébergements touristiques de La Saulsotte : meublés de tourisme et chambres d'hôtes pour séjourner dans la commune, à proximité de Nogent-sur-Seine.",
  openGraph: {
    title: "Hébergements — Mairie de La Saulsotte",
    description: "Où séjourner à La Saulsotte : les hébergements recensés par la commune.",
  },
};

export default function HebergementsPage() {
  const hebergements = getAllHebergements();

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Hébergements" }]} />

      <h1 className="mb-4 text-[34px] leading-[1.1] nav:text-[52px]">Hébergements</h1>
      <p className="mb-10 max-w-2xl text-encre-courant">
        Vous souhaitez séjourner à {COMMUNE.nom} ou y loger vos proches ? Voici les hébergements
        touristiques recensés sur la commune.
      </p>

      {/* ── Liste ─────────────────────────────────────────────────────── */}
      <section aria-labelledby="liste-titre" className="mb-12">
        <h2 id="liste-titre" className="sr-only">
          Hébergements recensés
        </h2>

        {hebergements.length > 0 ? (
          <ul role="list" className="grid gap-6 sm:grid-cols-2">
            {hebergements.map((h) => (
              <li
                key={h.slug}
                className="flex flex-col border border-sable bg-surface p-5 shadow-sm"
              >
                <h3 className="font-semibold text-encre">{h.nom}</h3>
                {h.type && <p className="mt-0.5 text-sm font-medium text-terre-fonce">{h.type}</p>}

                <p className="mt-3 flex-1 text-sm text-encre-courant">{h.description}</p>

                <dl className="mt-4 space-y-1 text-sm text-encre-courant">
                  {h.adresse && (
                    <div className="flex gap-2">
                      <dt className="font-medium text-encre-courant">Adresse :</dt>
                      <dd>{h.adresse}</dd>
                    </div>
                  )}
                  {h.capacite && (
                    <div className="flex gap-2">
                      <dt className="font-medium text-encre-courant">Capacité :</dt>
                      <dd>
                        {h.capacite} personne{h.capacite > 1 ? "s" : ""}
                      </dd>
                    </div>
                  )}
                  {h.telephone && (
                    <div className="flex gap-2">
                      <dt className="font-medium text-encre-courant">Téléphone :</dt>
                      <dd>
                        <a
                          href={`tel:${h.telephone.replace(/[^+\d]/g, "")}`}
                          className="rounded text-terre-fonce underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
                        >
                          {h.telephone}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>

                {h.lien && (
                  <p className="mt-4">
                    <a
                      href={h.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded text-sm font-medium text-terre-fonce underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
                    >
                      Voir les disponibilités
                      <span className="sr-only">
                        {" "}
                        de {h.nom} (s&apos;ouvre dans un nouvel onglet)
                      </span>
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-encre-courant">
            Aucun hébergement n&apos;est recensé pour le moment. Renseignez-vous en mairie.
          </p>
        )}
      </section>

      {/* ── Se faire recenser ─────────────────────────────────────────── */}
      <section aria-labelledby="recensement-titre" className="mb-12">
        <h2 id="recensement-titre" className="mb-4 text-[26px] nav:text-[34px]">
          Vous louez un hébergement sur la commune ?
        </h2>
        <div className="max-w-2xl border border-sable bg-sable-clair p-5 text-sm text-terre-fonce">
          <p>
            Cette liste est tenue par la mairie. Pour y figurer, adressez-vous au secrétariat, par
            téléphone au{" "}
            <a
              href={`tel:${MAIRIE.telephoneLien}`}
              className="rounded underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
            >
              {MAIRIE.telephone}
            </a>
            , ou en{" "}
            <Link
              href="/contact"
              className="rounded underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
            >
              écrivant à la mairie
            </Link>
            .
          </p>
          <p className="mt-3">
            La location d&apos;un meublé de tourisme fait par ailleurs l&apos;objet d&apos;une
            déclaration en mairie.
          </p>
        </div>
      </section>

      {/* ── Découvrir la commune ──────────────────────────────────────── */}
      <section aria-labelledby="decouvrir-titre">
        <h2 id="decouvrir-titre" className="mb-4 text-[26px] nav:text-[34px]">
          Découvrir la commune
        </h2>
        <p className="max-w-2xl text-encre-courant">
          {COMMUNE.nom} et ses hameaux comptent plusieurs édifices remarquables — l&apos;église
          Saint-Ferréol, le menhir de la Pierre Aiguë, le pigeonnier de Courtioux et la chapelle de
          Resson. À découvrir sur la page{" "}
          <Link
            href="/commune"
            className="rounded text-terre-fonce underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
          >
            La Commune
          </Link>
          .
        </p>
      </section>
    </PageLayout>
  );
}

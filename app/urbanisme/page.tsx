import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Urbanisme",
  description:
    "Plan Local d'Urbanisme, permis de construire, déclarations préalables et informations sur l'urbanisme à La Saulsotte.",
  openGraph: {
    title: "Urbanisme — Mairie de La Saulsotte",
    description:
      "Consultez le PLU, les règles d'urbanisme et les démarches pour vos projets de construction à La Saulsotte.",
  },
};

const PERMIS = [
  {
    id: "permis-construire",
    title: "Permis de construire",
    badge: { label: "Obligatoire", color: "orange" as const },
    description:
      "Obligatoire pour toute construction nouvelle de plus de 20 m² de surface plancher ou emprise au sol, ou pour les travaux modifiant l'aspect extérieur d'une construction.",
    delai: "2 à 3 mois",
    cerfa: "13406*13",
    lien: "https://www.service-public.fr/particuliers/vosdroits/F1986",
  },
  {
    id: "declaration-prealable",
    title: "Déclaration préalable de travaux",
    badge: { label: "Fréquent", color: "blue" as const },
    description:
      "Pour les travaux de faible importance : extension entre 5 et 20 m², modification de façade, construction d'un abri de jardin inférieur à 20 m², pose de panneaux solaires…",
    delai: "1 mois",
    cerfa: "13703*12 ou 13404*13",
    lien: "https://www.service-public.fr/particuliers/vosdroits/F17578",
  },
  {
    id: "certificat-urbanisme",
    title: "Certificat d'urbanisme",
    badge: { label: "Informatif", color: "gray" as const },
    description:
      "Document renseignant sur les règles d'urbanisme applicables à un terrain. Il en existe deux types : informatif (CUa) et opérationnel (CUb, pour un projet précis).",
    delai: "1 mois (CUa) ou 2 mois (CUb)",
    cerfa: "13410*07",
    lien: "https://www.service-public.fr/particuliers/vosdroits/F1633",
  },
  {
    id: "permis-demolir",
    title: "Permis de démolir",
    badge: { label: "Obligatoire", color: "orange" as const },
    description:
      "Requis pour les démolitions totales ou partielles d'un bâtiment soumis à protection (zones de protection du patrimoine, bâtiments inscrits ou classés).",
    delai: "2 mois",
    cerfa: "13405*11",
    lien: "https://www.service-public.fr/particuliers/vosdroits/F1986",
  },
];

const PLU_ZONES = [
  {
    code: "UA",
    label: "Zone urbaine centre-bourg",
    description: "Tissu bâti dense constituant le cœur du village. Hauteur maximale : R+1+combles.",
  },
  {
    code: "UB",
    label: "Zone urbaine périphérique",
    description:
      "Secteur résidentiel plus diffus en périphérie du bourg. Recul de 5 m en limite de voie.",
  },
  {
    code: "A",
    label: "Zone agricole",
    description:
      "Terres agricoles à préserver. Seules les constructions nécessaires à l'exploitation agricole sont autorisées.",
  },
  {
    code: "N",
    label: "Zone naturelle",
    description:
      "Espaces naturels sensibles à protéger. Les constructions nouvelles sont en principe interdites.",
  },
];

export default function UrbanismePage() {
  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Urbanisme" }]} />

      <h1 className="mb-8 text-3xl font-bold text-gray-900">Urbanisme</h1>

      {/* ── PLU ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="plu-titre" className="mb-12">
        <h2 id="plu-titre" className="mb-2 text-2xl font-bold text-gray-800">
          Plan Local d&apos;Urbanisme (PLU)
        </h2>
        <p className="mb-6 text-gray-600">
          Le PLU définit les règles d&apos;utilisation des sols sur l&apos;ensemble du territoire
          communal. Il fixe les zones constructibles, les règles de gabarit, de recul et
          d&apos;aspect des constructions.
        </p>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PLU_ZONES.map((zone) => (
            <div
              key={zone.code}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-1 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {zone.code}
                </span>
                <span className="font-semibold text-gray-900">{zone.label}</span>
              </div>
              <p className="text-sm text-gray-600">{zone.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-md border border-primary bg-white px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Télécharger le PLU (PDF)
          </a>
          <a
            href="https://www.geoportail.gouv.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Consulter sur Géoportail
            <span className="sr-only">(s&apos;ouvre dans un nouvel onglet)</span>
          </a>
        </div>
      </section>

      {/* ── Démarches d'urbanisme ────────────────────────────────────── */}
      <section aria-labelledby="demarches-titre" className="mb-12">
        <h2 id="demarches-titre" className="mb-6 text-2xl font-bold text-gray-800">
          Autorisations d&apos;urbanisme
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PERMIS.map((permis) => (
            <article
              key={permis.id}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900">{permis.title}</h3>
                <Badge color={permis.badge.color}>{permis.badge.label}</Badge>
              </div>
              <p className="mb-4 flex-1 text-sm text-gray-600">{permis.description}</p>
              <dl className="mb-4 space-y-1 text-sm">
                <div className="flex gap-2">
                  <dt className="font-medium text-gray-600">Délai :</dt>
                  <dd className="text-gray-700">{permis.delai}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-gray-600">Formulaire :</dt>
                  <dd className="text-gray-700">Cerfa n° {permis.cerfa}</dd>
                </div>
              </dl>
              <a
                href={permis.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded text-sm font-medium text-primary underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                En savoir plus sur service-public.fr
                <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
              </a>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-primary-100 bg-primary-100 p-4 text-sm text-primary">
          Les dossiers doivent être déposés en mairie en <strong>2 exemplaires</strong>. Un accusé
          de réception vous sera remis immédiatement. Pour tout conseil préalable, contactez le
          service urbanisme au{" "}
          <a
            href="tel:+33325700000"
            className="rounded underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            03 25 70 00 00
          </a>
          .
        </div>
      </section>

      {/* ── Déclaration d'achèvement ─────────────────────────────────── */}
      <section aria-labelledby="achevement-titre">
        <h2 id="achevement-titre" className="mb-4 text-2xl font-bold text-gray-800">
          Déclaration d&apos;achèvement des travaux
        </h2>
        <p className="mb-4 text-gray-600">
          À la fin de vos travaux, vous devez déposer une{" "}
          <strong>
            Déclaration Attestant l&apos;Achèvement et la Conformité des Travaux (DAACT)
          </strong>{" "}
          en mairie dans un délai de 90 jours. Ce document clôture votre autorisation
          d&apos;urbanisme.
        </p>
        <a
          href="https://www.service-public.fr/particuliers/vosdroits/F1972"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded text-sm font-medium text-primary underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          En savoir plus sur la DAACT
          <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
        </a>
      </section>
    </PageLayout>
  );
}

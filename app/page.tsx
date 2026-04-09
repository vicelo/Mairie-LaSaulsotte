import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BannerAnnonce } from "@/components/ui/BannerAnnonce";
import { Card } from "@/components/ui/Card";

// ─── SEO ────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Mairie de La Saulsotte — Commune de l'Aube (10)",
  description:
    "Site officiel de la mairie de La Saulsotte, commune de l'Aube (10), 150 habitants. Retrouvez les informations pratiques, les actualités et les services aux habitants.",
  openGraph: {
    title: "Mairie de La Saulsotte — Commune de l'Aube (10)",
    description:
      "Site officiel de la mairie de La Saulsotte. Informations pratiques, actualités et services aux habitants.",
    locale: "fr_FR",
    type: "website",
  },
};

// ─── Mock data ───────────────────────────────────────────────────────────────

const ANNONCES = [
  {
    id: "1",
    texte: "Conseil municipal le 15 avril 2026 à 19h00 — Salle des fêtes",
    href: "/actualites/conseil-municipal-avril-2026",
  },
  {
    id: "2",
    texte: "Collecte des déchets verts : jeudi 18 avril — Prévoir vos sacs avant 7h00",
  },
  {
    id: "3",
    texte: "La mairie sera fermée le vendredi 18 avril (Vendredi Saint)",
  },
];

const ACTUALITES = [
  {
    slug: "conseil-municipal-avril-2026",
    title: "Conseil municipal — avril 2026",
    excerpt:
      "Le prochain conseil municipal se tiendra le mardi 15 avril à 19h00 en salle des fêtes. L'ordre du jour complet est disponible en mairie.",
    date: "2026-04-09",
    category: "Vie municipale",
  },
  {
    slug: "travaux-rue-de-la-paix",
    title: "Travaux rue de la Paix : point d'avancement",
    excerpt:
      "Les travaux de réfection de la voirie progressent conformément au calendrier prévu. Fin des travaux estimée à fin mai 2026. Merci de votre compréhension.",
    date: "2026-04-05",
    category: "Travaux",
  },
  {
    slug: "collecte-dechets-verts-printemps",
    title: "Collecte des déchets verts : nouvelles dates",
    excerpt:
      "Retrouvez le calendrier mis à jour de la collecte des déchets verts pour le printemps 2026. Les ramassages ont lieu le jeudi matin avant 7h00.",
    date: "2026-04-01",
    category: "Environnement",
  },
];

const ACCES_RAPIDES = [
  {
    label: "Démarches",
    href: "/services/demarches",
    icon: (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
        />
      </svg>
    ),
  },
  {
    label: "PLU",
    href: "/services/plu",
    icon: (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
        />
      </svg>
    ),
  },
  {
    label: "Eau potable",
    href: "/services/eau-potable",
    icon: (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3c-4.97 4.97-6 8.17-6 10.5a6 6 0 0012 0C18 11.17 16.97 7.97 12 3z"
        />
      </svg>
    ),
  },
  {
    label: "État civil",
    href: "/services/etat-civil",
    icon: (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
        />
      </svg>
    ),
  },
  {
    label: "Permis & urbanisme",
    href: "/services/urbanisme",
    icon: (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
  },
  {
    label: "Contact",
    href: "/contact",
    icon: (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Bandeau annonces — pleine largeur */}
      <BannerAnnonce annonces={ANNONCES} />

      <main id="contenu-principal" tabIndex={-1} className="flex-1">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="hero-titre"
          className="relative isolate overflow-hidden bg-primary"
        >
          {/* Illustration SVG du village */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/village.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            loading="eager"
          />

          {/* Dégradé bas de hero */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/50 to-primary/80"
          />

          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                Site officiel
              </p>
              <h1
                id="hero-titre"
                className="mt-3 text-4xl font-bold leading-tight text-white sm:text-5xl"
              >
                Commune de La Saulsotte
              </h1>
              <p className="mt-3 text-lg text-primary-100/90">Aube (10) — 150 habitants</p>

              {/* CTAs rapides */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact#horaires"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-accent px-6 py-3 text-base font-medium text-white transition-colors duration-150 hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                >
                  Horaires mairie
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white bg-white px-6 py-3 text-base font-medium text-primary transition-colors duration-150 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Contact
                </Link>
                <Link
                  href="/services/urgences"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white bg-white px-6 py-3 text-base font-medium text-primary transition-colors duration-150 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Urgences
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Horaires de la mairie ─────────────────────────────────────── */}
        <section id="horaires" aria-labelledby="horaires-titre" className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm sm:p-8">
              <h2 id="horaires-titre" className="text-xl font-bold text-primary">
                Horaires de la mairie
              </h2>

              <dl className="mt-5 space-y-2 text-sm text-gray-700">
                <div className="flex justify-between gap-4 border-b border-gray-200 pb-2">
                  <dt className="font-medium">Lundi – Vendredi</dt>
                  <dd>9h00 – 12h00</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-gray-200 pb-2">
                  <dt className="font-medium">Lundi &amp; Mercredi</dt>
                  <dd>14h00 – 17h00</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-medium">Samedi &amp; Dimanche</dt>
                  <dd className="text-gray-500">Fermé</dd>
                </div>
              </dl>

              <div className="mt-5 space-y-2 border-t border-gray-200 pt-5 text-sm">
                <p>
                  <span className="font-medium text-gray-600">Tél. :</span>{" "}
                  <a
                    href="tel:+33325700000"
                    className="rounded text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {/* TODO: vérifier numéro réel de la mairie de La Saulsotte */}
                    03 25 70 00 00
                  </a>
                </p>
                <p>
                  <span className="font-medium text-gray-600">Email :</span>{" "}
                  <a
                    href="mailto:mairie@lasaulsotte.fr"
                    className="rounded text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {/* TODO: confirmer l'adresse email officielle */}
                    mairie@lasaulsotte.fr
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Actualités ───────────────────────────────────────────────── */}
        <section aria-labelledby="actualites-titre" className="bg-gray-50 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <h2 id="actualites-titre" className="text-2xl font-bold text-gray-900">
                Actualités
              </h2>
              <Link
                href="/actualites"
                aria-label="Voir toutes les actualités"
                className="rounded text-sm font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Voir toutes les actualités →
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ACTUALITES.map((actu) => (
                <Card
                  key={actu.slug}
                  title={actu.title}
                  excerpt={actu.excerpt}
                  date={actu.date}
                  category={actu.category}
                  href={`/actualites/${actu.slug}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Accès rapides ─────────────────────────────────────────────── */}
        <section aria-labelledby="acces-titre" className="bg-white py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="acces-titre" className="text-2xl font-bold text-gray-900">
              Accès rapides
            </h2>

            <ul role="list" className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {ACCES_RAPIDES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-5 text-center transition-all hover:border-primary hover:bg-primary-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <span className="text-primary transition-transform duration-200 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

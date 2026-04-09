import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Vie locale",
  description: "Associations, école, services de proximité et vie associative de La Saulsotte.",
  openGraph: {
    title: "Vie locale — Mairie de La Saulsotte",
    description:
      "Découvrez les associations, l'école et les services de proximité de La Saulsotte.",
  },
};

const ASSOCIATIONS = [
  {
    nom: "Comité des fêtes de La Saulsotte",
    description:
      "Organisation des événements festifs du village : fête annuelle, repas de fin d'année, animations saisonnières.",
    contact: "comite.fetes@lasaulsotte.fr",
  },
  {
    nom: "Club de pétanque « La Boule Saulsottoise »",
    description:
      "Pratique de la pétanque pour tous niveaux. Concours organisés régulièrement. Séances le mercredi soir et le samedi après-midi.",
    contact: "petanque@lasaulsotte.fr",
  },
  {
    nom: "Association des anciens combattants",
    description:
      "Entretien de la mémoire et célébration des commémorations nationales. Organisation du repas annuel des anciens.",
    contact: "",
  },
  {
    nom: "Jardins partagés",
    description:
      "Gestion des parcelles de jardins communaux. Attribution de parcelles aux habitants volontaires.",
    contact: "jardins@lasaulsotte.fr",
  },
];

const SERVICES = [
  {
    titre: "École primaire",
    icone: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>
    ),
    description:
      "L'école primaire Émile Renard accueille les élèves de CP au CM2. Cantine et garderie périscolaire disponibles.",
    adresse: "Rue de l'École, La Saulsotte",
    contact: "03 25 70 00 10",
  },
  {
    titre: "Salle des fêtes",
    icone: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
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
    description:
      "Location de la salle des fêtes pour vos événements privés ou associatifs. Capacité 100 personnes assises, cuisine équipée.",
    adresse: "Place de la Mairie, La Saulsotte",
    contact: "03 25 70 00 00",
  },
  {
    titre: "Bibliothèque municipale",
    icone: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
    description:
      "Fond de 2 000 ouvrages accessible aux habitants. Prêt gratuit sur présentation d'une pièce d'identité. Ouverte le samedi matin.",
    adresse: "Annexe de la mairie, La Saulsotte",
    contact: "03 25 70 00 00",
  },
  {
    titre: "Terrain de sport",
    icone: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
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
    description:
      "Terrain multisports communal : foot, basket, volley. Accès libre, éclairé jusqu'à 22h00. Vestiaires disponibles sur demande.",
    adresse: "Chemin des Sports, La Saulsotte",
    contact: "",
  },
];

const TRANSPORTS = [
  {
    ligne: "Ligne 201",
    trajet: "La Saulsotte — Nogent-sur-Seine",
    horaires: "3 allers-retours par jour scolaire",
    operateur: "Transports de l'Aube",
  },
  {
    ligne: "TAD — Transport à la demande",
    trajet: "Desserte des communes rurales",
    horaires: "Sur réservation 24h à l'avance",
    operateur: "Communauté de communes",
  },
];

export default function VieLocalePage() {
  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Vie locale" }]} />

      <h1 className="mb-8 text-3xl font-bold text-gray-900">Vie locale</h1>

      {/* ── Services ──────────────────────────────────────────────────── */}
      <section aria-labelledby="services-titre" className="mb-12">
        <h2 id="services-titre" className="mb-6 text-2xl font-bold text-gray-800">
          Services communaux
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <article
              key={service.titre}
              className="flex gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="mt-0.5 shrink-0 text-primary">{service.icone}</div>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900">{service.titre}</h3>
                <p className="mb-2 text-sm text-gray-600">{service.description}</p>
                {service.adresse && <p className="text-xs text-gray-500">📍 {service.adresse}</p>}
                {service.contact && (
                  <p className="text-xs text-gray-500">
                    Tél.{" "}
                    <a
                      href={`tel:+33${service.contact.replace(/^0/, "").replace(/ /g, "")}`}
                      className="rounded text-primary underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {service.contact}
                    </a>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Associations ──────────────────────────────────────────────── */}
      <section aria-labelledby="asso-titre" className="mb-12">
        <h2 id="asso-titre" className="mb-6 text-2xl font-bold text-gray-800">
          Associations
        </h2>
        <p className="mb-4 text-gray-600">
          La commune compte plusieurs associations actives. Pour les rejoindre ou obtenir plus
          d&apos;informations, contactez directement chaque association ou renseignez-vous en
          mairie.
        </p>
        <ul
          role="list"
          className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white"
        >
          {ASSOCIATIONS.map((asso) => (
            <li key={asso.nom} className="px-5 py-4">
              <h3 className="mb-1 font-semibold text-gray-900">{asso.nom}</h3>
              <p className="mb-2 text-sm text-gray-600">{asso.description}</p>
              {asso.contact && (
                <a
                  href={`mailto:${asso.contact}`}
                  className="rounded text-sm text-primary underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {asso.contact}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-4 rounded-xl border border-primary-100 bg-primary-100 p-4 text-sm text-primary">
          Vous souhaitez créer une association ou déclarer votre association en mairie ?{" "}
          <Link
            href="/contact"
            className="rounded underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Contactez-nous
          </Link>
          .
        </div>
      </section>

      {/* ── Transports ────────────────────────────────────────────────── */}
      <section aria-labelledby="transport-titre">
        <h2 id="transport-titre" className="mb-6 text-2xl font-bold text-gray-800">
          Transports en commun
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Ligne</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Trajet</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Horaires</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Opérateur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {TRANSPORTS.map((t) => (
                <tr key={t.ligne} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{t.ligne}</td>
                  <td className="px-4 py-3 text-gray-700">{t.trajet}</td>
                  <td className="px-4 py-3 text-gray-700">{t.horaires}</td>
                  <td className="px-4 py-3 text-gray-600">{t.operateur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Pour les horaires détaillés, consultez le site du{" "}
          <a
            href="https://www.aube.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Conseil Départemental de l&apos;Aube
            <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
          </a>
          .
        </p>
      </section>
    </PageLayout>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { COMMUNE, MAIRIE } from "@/lib/commune";
import { DONNEES_PUBLIQUES, actualiseLeEnFrancais } from "@/lib/donnees-publiques";

export const metadata: Metadata = {
  title: "Prévention et risques",
  description:
    "Les risques naturels et technologiques recensés sur la commune de La Saulsotte, les arrêtés de catastrophe naturelle et les bons réflexes en cas d'alerte.",
  openGraph: {
    title: "Prévention et risques — Mairie de La Saulsotte",
    description: "Risques recensés sur la commune et conduite à tenir en cas d'alerte.",
  },
};

/**
 * Conduite à tenir, d'après les consignes nationales de sécurité civile.
 * Volontairement générales : les consignes propres à un événement sont
 * diffusées au moment de l'alerte par la préfecture et la mairie.
 */
const REFLEXES = [
  {
    titre: "Se mettre à l'abri",
    texte:
      "Rejoindre un bâtiment en dur, fermer portes et fenêtres, couper ventilation et climatisation.",
  },
  {
    titre: "S'informer",
    texte:
      "Écouter la radio (France Bleu Champagne-Ardenne) et consulter les consignes des autorités. Ne pas se fier aux rumeurs.",
  },
  {
    titre: "Ne pas aller chercher ses enfants à l'école",
    texte:
      "Les équipes éducatives les mettent à l'abri sur place. Se déplacer, c'est s'exposer et gêner les secours.",
  },
  {
    titre: "Libérer les lignes",
    texte:
      "Ne téléphoner qu'en cas d'urgence vitale, pour laisser les réseaux disponibles aux secours.",
  },
];

const NUMEROS = [
  { numero: "112", libelle: "Numéro d'urgence européen" },
  { numero: "18", libelle: "Sapeurs-pompiers" },
  { numero: "15", libelle: "SAMU" },
  { numero: "17", libelle: "Police et gendarmerie" },
  { numero: "114", libelle: "Urgences pour les personnes sourdes ou malentendantes (par SMS)" },
];

export default function PreventionRisquesPage() {
  const { risques, catastrophesNaturelles } = DONNEES_PUBLIQUES;

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Prévention et risques" }]} />

      <h1 className="mb-3 text-3xl font-bold text-gray-900">Prévention et risques</h1>
      <p className="mb-10 max-w-3xl text-gray-600">
        Chaque commune informe ses habitants des risques majeurs auxquels son territoire est exposé.
        Les informations ci-dessous proviennent de Géorisques, le service public de référence, et
        concernent {COMMUNE.nom} dans son ensemble : elles ne signifient pas que chaque habitation
        est exposée.
      </p>

      {/* ── Risques recensés ──────────────────────────────────────────── */}
      <section aria-labelledby="risques-titre" className="mb-12">
        <h2 id="risques-titre" className="mb-6 text-2xl font-bold text-gray-800">
          Risques recensés sur la commune
        </h2>

        <ul role="list" className="grid gap-4 sm:grid-cols-2">
          {risques.map((risque) => (
            <li
              key={risque.code}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h3 className="font-semibold text-gray-900">{risque.libelle}</h3>
              {risque.precisions.length > 0 && (
                <ul role="list" className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                  {risque.precisions.map((precision) => (
                    <li key={precision}>{precision}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-sm text-gray-500">
          Source :{" "}
          <a
            href={`https://www.georisques.gouv.fr/mes-risques/connaitre-les-risques-pres-de-chez-moi/rapport?city=${COMMUNE.codeInsee}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Géorisques — rapport complet pour {COMMUNE.nom}
            <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
          </a>
          . Données relevées le {actualiseLeEnFrancais()}.
        </p>
      </section>

      {/* ── Arrêtés de catastrophe naturelle ──────────────────────────── */}
      <section aria-labelledby="catnat-titre" className="mb-12">
        <h2 id="catnat-titre" className="mb-6 text-2xl font-bold text-gray-800">
          Arrêtés de catastrophe naturelle
        </h2>
        <p className="mb-4 max-w-2xl text-gray-600">
          {catastrophesNaturelles.length} arrêtés de reconnaissance de l&apos;état de catastrophe
          naturelle ont concerné la commune. Ils conditionnent l&apos;indemnisation des dommages par
          les assurances.
        </p>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
            <caption className="sr-only">
              Arrêtés de catastrophe naturelle concernant {COMMUNE.nom}
            </caption>
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">
                  Nature
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">
                  Période
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">
                  Publication au Journal officiel
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {catastrophesNaturelles.map((c) => (
                <tr key={`${c.libelle}-${c.debut}-${c.publicationJo}`} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.libelle}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {c.debut === c.fin ? c.debut : `du ${c.debut} au ${c.fin}`}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{c.publicationJo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Les bons réflexes ─────────────────────────────────────────── */}
      <section aria-labelledby="reflexes-titre" className="mb-12">
        <h2 id="reflexes-titre" className="mb-6 text-2xl font-bold text-gray-800">
          Les bons réflexes en cas d&apos;alerte
        </h2>
        <ul role="list" className="grid gap-4 sm:grid-cols-2">
          {REFLEXES.map((reflexe) => (
            <li
              key={reflexe.titre}
              className="rounded-xl border border-primary-100 bg-primary-100/50 p-5"
            >
              <h3 className="font-semibold text-primary">{reflexe.titre}</h3>
              <p className="mt-1 text-sm text-gray-700">{reflexe.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Numéros d'urgence ─────────────────────────────────────────── */}
      <section aria-labelledby="urgences-titre" className="mb-12">
        <h2 id="urgences-titre" className="mb-6 text-2xl font-bold text-gray-800">
          Numéros d&apos;urgence
        </h2>
        <dl className="grid max-w-2xl gap-x-8 gap-y-3 rounded-xl border border-gray-200 bg-white p-6 sm:grid-cols-2">
          {NUMEROS.map((n) => (
            <div key={n.numero} className="flex gap-3 border-b border-gray-100 pb-2">
              <dt className="font-bold text-primary">{n.numero}</dt>
              <dd className="text-sm text-gray-700">{n.libelle}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── S'informer ────────────────────────────────────────────────── */}
      <section aria-labelledby="informer-titre">
        <h2 id="informer-titre" className="mb-6 text-2xl font-bold text-gray-800">
          S&apos;informer en temps réel
        </h2>
        <p className="mb-4 max-w-2xl text-gray-700">
          En période d&apos;alerte, consultez directement les services officiels, qui font foi :
        </p>
        <ul role="list" className="max-w-2xl space-y-2 text-gray-700">
          <li>
            <a
              href="https://vigilance.meteofrance.fr/fr/aube"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded text-primary underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Vigilance Météo-France pour l&apos;Aube
              <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.vigicrues.gouv.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded text-primary underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Vigicrues — surveillance des cours d&apos;eau
              <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.aube.gouv.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded text-primary underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Préfecture de l&apos;Aube
              <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
            </a>
          </li>
        </ul>

        <p className="mt-6 max-w-2xl text-gray-700">
          Pour toute question sur les risques concernant votre habitation, ou pour consulter les
          documents de prévention, contactez la mairie au{" "}
          <a
            href={`tel:${MAIRIE.telephoneLien}`}
            className="rounded text-primary underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {MAIRIE.telephone}
          </a>{" "}
          ou consultez la page{" "}
          <Link
            href="/urbanisme"
            className="rounded text-primary underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Urbanisme
          </Link>
          .
        </p>
      </section>
    </PageLayout>
  );
}

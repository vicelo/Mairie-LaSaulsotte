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

      <h1 className="mb-4 text-[34px] leading-[1.1] nav:text-[52px]">Prévention et risques</h1>
      <p className="mb-10 max-w-3xl text-encre-courant">
        Chaque commune informe ses habitants des risques majeurs auxquels son territoire est exposé.
        Les informations ci-dessous proviennent de Géorisques, le service public de référence, et
        concernent {COMMUNE.nom} dans son ensemble : elles ne signifient pas que chaque habitation
        est exposée.
      </p>

      {/* ── Risques recensés ──────────────────────────────────────────── */}
      <section aria-labelledby="risques-titre" className="mb-12">
        <h2 id="risques-titre" className="mb-6 text-[26px] nav:text-[34px]">
          Risques recensés sur la commune
        </h2>

        <ul role="list" className="grid gap-4 sm:grid-cols-2">
          {risques.map((risque) => (
            <li key={risque.code} className="border border-sable bg-surface p-5 shadow-sm">
              <h3 className="font-semibold text-encre">{risque.libelle}</h3>
              {risque.precisions.length > 0 && (
                <ul
                  role="list"
                  className="mt-2 list-disc space-y-1 pl-5 text-sm text-encre-courant"
                >
                  {risque.precisions.map((precision) => (
                    <li key={precision}>{precision}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-sm text-encre-secondaire">
          Source :{" "}
          <a
            href={`https://www.georisques.gouv.fr/mes-risques/connaitre-les-risques-pres-de-chez-moi/rapport?city=${COMMUNE.codeInsee}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
          >
            Géorisques — rapport complet pour {COMMUNE.nom}
            <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
          </a>
          . Données relevées le {actualiseLeEnFrancais()}.
        </p>
      </section>

      {/* ── Arrêtés de catastrophe naturelle ──────────────────────────── */}
      <section aria-labelledby="catnat-titre" className="mb-12">
        <h2 id="catnat-titre" className="mb-6 text-[26px] nav:text-[34px]">
          Arrêtés de catastrophe naturelle
        </h2>
        <p className="mb-4 max-w-2xl text-encre-courant">
          {catastrophesNaturelles.length} arrêtés de reconnaissance de l&apos;état de catastrophe
          naturelle ont concerné la commune. Ils conditionnent l&apos;indemnisation des dommages par
          les assurances.
        </p>

        <div className="overflow-x-auto border border-sable">
          <table className="min-w-full divide-y divide-sable bg-surface text-sm">
            <caption className="sr-only">
              Arrêtés de catastrophe naturelle concernant {COMMUNE.nom}
            </caption>
            <thead>
              <tr className="bg-surface">
                <th scope="col" className="px-4 py-3 text-left font-semibold text-encre-courant">
                  Nature
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-encre-courant">
                  Période
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-encre-courant">
                  Publication au Journal officiel
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sable-clair">
              {catastrophesNaturelles.map((c) => (
                <tr key={`${c.libelle}-${c.debut}-${c.publicationJo}`} className="hover:bg-surface">
                  <td className="px-4 py-3 font-medium text-encre">{c.libelle}</td>
                  <td className="px-4 py-3 text-encre-courant">
                    {c.debut === c.fin ? c.debut : `du ${c.debut} au ${c.fin}`}
                  </td>
                  <td className="px-4 py-3 text-encre-courant">{c.publicationJo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Les bons réflexes ─────────────────────────────────────────── */}
      <section aria-labelledby="reflexes-titre" className="mb-12">
        <h2 id="reflexes-titre" className="mb-6 text-[26px] nav:text-[34px]">
          Les bons réflexes en cas d&apos;alerte
        </h2>
        <ul role="list" className="grid gap-4 sm:grid-cols-2">
          {REFLEXES.map((reflexe) => (
            <li key={reflexe.titre} className="border border-sable bg-sable-clair/50 p-5">
              <h3 className="font-semibold text-terre-fonce">{reflexe.titre}</h3>
              <p className="mt-1 text-sm text-encre-courant">{reflexe.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Numéros d'urgence ─────────────────────────────────────────── */}
      <section aria-labelledby="urgences-titre" className="mb-12">
        <h2 id="urgences-titre" className="mb-6 text-[26px] nav:text-[34px]">
          Numéros d&apos;urgence
        </h2>
        <dl className="grid max-w-2xl gap-x-8 gap-y-3 border border-sable bg-surface p-6 sm:grid-cols-2">
          {NUMEROS.map((n) => (
            <div key={n.numero} className="flex gap-3 border-b border-sable-clair pb-2">
              <dt className="font-bold text-terre-fonce">{n.numero}</dt>
              <dd className="text-sm text-encre-courant">{n.libelle}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── S'informer ────────────────────────────────────────────────── */}
      <section aria-labelledby="informer-titre">
        <h2 id="informer-titre" className="mb-6 text-[26px] nav:text-[34px]">
          S&apos;informer en temps réel
        </h2>
        <p className="mb-4 max-w-2xl text-encre-courant">
          En période d&apos;alerte, consultez directement les services officiels, qui font foi :
        </p>
        <ul role="list" className="max-w-2xl space-y-2 text-encre-courant">
          <li>
            <a
              href="https://vigilance.meteofrance.fr/fr/aube"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded text-terre-fonce underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
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
              className="rounded text-terre-fonce underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
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
              className="rounded text-terre-fonce underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
            >
              Préfecture de l&apos;Aube
              <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
            </a>
          </li>
        </ul>

        <p className="mt-6 max-w-2xl text-encre-courant">
          Pour toute question sur les risques concernant votre habitation, ou pour consulter les
          documents de prévention, contactez la mairie au{" "}
          <a
            href={`tel:${MAIRIE.telephoneLien}`}
            className="rounded text-terre-fonce underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
          >
            {MAIRIE.telephone}
          </a>{" "}
          ou consultez la page{" "}
          <Link
            href="/urbanisme"
            className="rounded text-terre-fonce underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
          >
            Urbanisme
          </Link>
          .
        </p>
      </section>
    </PageLayout>
  );
}

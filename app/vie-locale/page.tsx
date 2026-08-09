import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { COMMUNE, MAIRIE } from "@/lib/commune";

export const metadata: Metadata = {
  title: "Vie locale",
  description:
    "Associations, école, accueil de loisirs et point lecture de La Saulsotte : les services et la vie associative de la commune.",
  openGraph: {
    title: "Vie locale — Mairie de La Saulsotte",
    description:
      "Les associations, l'école, l'accueil de loisirs et le point lecture de La Saulsotte.",
  },
};

/**
 * Associations recensées par la commune.
 * Source : lasaulsotte.fr, rubrique « Vie culturelle et associative ».
 * Les coordonnées de contact passent par la mairie, faute de contacts
 * publics publiés par les associations elles-mêmes.
 */
const ASSOCIATIONS = [
  {
    nom: "Familles Rurales",
    description:
      "Association familiale proposant des activités et des services aux habitants de la commune et des environs.",
  },
  {
    nom: "Les Casse-pieds de Pasquier",
    description: "Association de randonnée et d'animation locale.",
  },
  {
    nom: "Danse en ligne",
    description: "Cours et séances de danse en ligne ouverts aux habitants.",
  },
  {
    nom: "Association Artistique du Nogentais — Le Lavoir",
    description:
      "Activités artistiques et culturelles à l'échelle du Nogentais, avec un ancrage au Lavoir de La Saulsotte.",
  },
  {
    nom: "La Grange aux Histoires",
    description: "Association culturelle autour du conte, de la lecture et du patrimoine local.",
  },
  {
    nom: "Anciens Combattants",
    description:
      "Entretien du devoir de mémoire et organisation des commémorations nationales dans la commune.",
  },
  {
    nom: "Total Art",
    description: "Association artistique locale.",
  },
];

/**
 * Services à l'enfance et à l'éducation.
 * Source : lasaulsotte.fr, rubrique « Enfance Éducation ».
 */
const ENFANCE = [
  {
    titre: "École primaire",
    responsable: "Directrice : Céline Gorgerin",
    adresse: `10, rue Pavée, ${COMMUNE.codePostal} ${COMMUNE.nom}`,
    telephone: "03 25 39 18 23",
    telephoneLien: "+33325391823",
    email: "ce.0100515f@ac-reims.fr",
  },
  {
    titre: "Accueil collectif de mineurs (centre de loisirs)",
    responsable: "Directrice : Véronique Launay",
    adresse: `20, rue Pavée, ${COMMUNE.codePostal} ${COMMUNE.nom}`,
    telephone: "03 25 39 14 62",
    telephoneLien: "+33325391462",
    email: "centreloisirssaulsotte@orange.fr",
  },
];

export default function VieLocalePage() {
  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Vie locale" }]} />

      <h1 className="mb-4 text-[34px] leading-[1.1] nav:text-[52px]">Vie locale</h1>
      <p className="mb-10 max-w-2xl text-encre-courant">
        Les associations, l&apos;école, l&apos;accueil de loisirs et le point lecture qui font vivre
        la commune au quotidien.
      </p>

      {/* ── Enfance et éducation ──────────────────────────────────────── */}
      <section aria-labelledby="enfance-titre" className="mb-12">
        <h2 id="enfance-titre" className="mb-6 text-[26px] nav:text-[34px]">
          Enfance et éducation
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {ENFANCE.map((service) => (
            <article key={service.titre} className="border border-sable bg-surface p-5 shadow-sm">
              <h3 className="mb-1 font-semibold text-encre">{service.titre}</h3>
              <p className="mb-3 text-sm text-encre-courant">{service.responsable}</p>
              <address className="space-y-1 text-sm not-italic text-encre-courant">
                <p>{service.adresse}</p>
                <p>
                  Tél.{" "}
                  <a
                    href={`tel:${service.telephoneLien}`}
                    className="rounded text-terre-fonce underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
                  >
                    {service.telephone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${service.email}`}
                    className="break-all rounded text-terre-fonce underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
                  >
                    {service.email}
                  </a>
                </p>
              </address>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm text-encre-secondaire">
          Inscriptions scolaires, cantine, périscolaire et transports scolaires : renseignements en
          mairie.
        </p>
      </section>

      {/* ── Point lecture ─────────────────────────────────────────────── */}
      <section aria-labelledby="lecture-titre" className="mb-12">
        <h2 id="lecture-titre" className="mb-6 text-[26px] nav:text-[34px]">
          Point lecture
        </h2>
        <div className="border border-sable bg-surface p-5 shadow-sm">
          <p className="text-sm text-encre-courant">
            La commune dispose d&apos;un point lecture ouvert aux habitants, avec inscription
            possible pour les jeunes et les adultes. Pour connaître les horaires d&apos;ouverture au
            public et les modalités d&apos;inscription, contactez la mairie au{" "}
            <a
              href={`tel:${MAIRIE.telephoneLien}`}
              className="rounded text-terre-fonce underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
            >
              {MAIRIE.telephone}
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── Associations ──────────────────────────────────────────────── */}
      <section aria-labelledby="asso-titre" className="mb-12">
        <h2 id="asso-titre" className="mb-6 text-[26px] nav:text-[34px]">
          Associations
        </h2>
        <p className="mb-4 max-w-2xl text-encre-courant">
          La commune compte plusieurs associations actives. Pour les rejoindre ou obtenir leurs
          coordonnées, renseignez-vous en mairie.
        </p>
        <ul role="list" className="divide-y divide-sable border border-sable bg-surface">
          {ASSOCIATIONS.map((asso) => (
            <li key={asso.nom} className="px-5 py-4">
              <h3 className="mb-1 font-semibold text-encre">{asso.nom}</h3>
              <p className="text-sm text-encre-courant">{asso.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-4 border border-sable bg-sable-clair p-4 text-sm text-terre-fonce">
          Vous souhaitez créer une association ou déclarer votre association en mairie ?{" "}
          <Link
            href="/contact"
            className="rounded underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
          >
            Contactez-nous
          </Link>
          .
        </div>
      </section>

      {/* ── Vie intercommunale ────────────────────────────────────────── */}
      <section aria-labelledby="interco-titre">
        <h2 id="interco-titre" className="mb-6 text-[26px] nav:text-[34px]">
          Vie intercommunale
        </h2>
        <p className="max-w-2xl text-encre-courant">
          La Saulsotte fait partie de la{" "}
          <strong className="font-semibold text-encre">{COMMUNE.intercommunalite}</strong>, qui
          exerce des compétences en matière de développement économique, d&apos;aménagement du
          territoire et de services à la population. L&apos;office de tourisme du Nogentais informe
          par ailleurs sur les activités et le patrimoine du secteur.
        </p>
      </section>
    </PageLayout>
  );
}

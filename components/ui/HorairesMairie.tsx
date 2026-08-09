import { HORAIRES, MAIRIE, ADRESSE_COMPLETE } from "@/lib/commune";

interface HorairesMairieProps {
  /** Ajoute l'adresse, le téléphone et l'email sous les horaires. */
  avecCoordonnees?: boolean;
  /** Identifiant du titre, pour aria-labelledby côté appelant. */
  titleId?: string;
}

/**
 * Horaires d'ouverture de la mairie et coordonnées.
 *
 * Composant unique réutilisé partout où ces informations apparaissent, pour
 * qu'un changement d'horaire n'ait à être fait qu'à un seul endroit
 * (lib/commune.ts).
 */
export function HorairesMairie({ avecCoordonnees = true, titleId }: HorairesMairieProps) {
  return (
    <div className="border border-sable bg-surface p-6 shadow-sm sm:p-8">
      <h2 id={titleId} className="text-xl font-bold text-terre-fonce">
        Horaires de la mairie
      </h2>

      <dl className="mt-5 space-y-3 text-sm text-encre-courant">
        {HORAIRES.map((creneau) => (
          <div
            key={creneau.jours}
            className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-b border-sable pb-2 last:border-b-0"
          >
            <dt className="font-medium">{creneau.jours}</dt>
            <dd className="text-right">
              {creneau.horaire}
              {creneau.precision && (
                <span className="block text-xs font-normal text-encre-secondaire">
                  {creneau.precision}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-xs text-encre-secondaire">Fermée les mardi, vendredi et dimanche.</p>

      {avecCoordonnees && (
        <address className="mt-5 space-y-2 border-t border-sable pt-5 text-sm not-italic">
          <p>
            <span className="font-medium text-encre-courant">Adresse :</span> {ADRESSE_COMPLETE}
          </p>
          <p>
            <span className="font-medium text-encre-courant">Tél. :</span>{" "}
            <a
              href={`tel:${MAIRIE.telephoneLien}`}
              className="rounded text-terre-fonce hover:underline focus:outline-none focus:ring-2 focus:ring-terre-fonce"
            >
              {MAIRIE.telephone}
            </a>
          </p>
          <p>
            <span className="font-medium text-encre-courant">Courriel :</span>{" "}
            <a
              href={`mailto:${MAIRIE.email}`}
              className="break-all rounded text-terre-fonce hover:underline focus:outline-none focus:ring-2 focus:ring-terre-fonce"
            >
              {MAIRIE.email}
            </a>
          </p>
        </address>
      )}
    </div>
  );
}

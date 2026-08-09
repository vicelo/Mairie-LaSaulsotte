import Link from "next/link";
import { Blason } from "../ui/Blason";
import { COMMUNE, HORAIRES, MAIRIE } from "@/lib/commune";

const PLAN_DU_SITE = [
  { label: "Accueil", href: "/" },
  { label: "La Commune", href: "/commune" },
  { label: "Vos Élus", href: "/elus" },
  { label: "Services", href: "/services" },
  { label: "Démarches", href: "/demarches" },
  { label: "Hébergements", href: "/hebergements" },
  { label: "Prévention et risques", href: "/prevention-risques" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

const LIENS_LEGAUX = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Accessibilité", href: "/accessibilite" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
];

/** Pied de page : coordonnées, plan du site, liens légaux et horaires. */
export function Footer() {
  const annee = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-foret pb-[34px] pt-20 text-foret-texte" aria-label="Pied de page">
      <div className="contenu">
        <div className="grid grid-cols-1 gap-10 nav:grid-cols-4">
          {/* Coordonnées */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Blason className="h-[46px] w-9" surFondSombre />
              <span className="leading-tight">
                <span className="block font-serif text-lg text-foret-texteFort">
                  Mairie de {COMMUNE.nom}
                </span>
                <span className="block text-[11px] uppercase tracking-surtitre">
                  Mairie — {COMMUNE.departement}
                </span>
              </span>
            </div>
            <address className="space-y-1 text-sm not-italic leading-relaxed">
              <p>{MAIRIE.adresse}</p>
              <p>
                {MAIRIE.codePostal} {MAIRIE.ville}
              </p>
              <p className="pt-2">
                <a
                  href={`tel:${MAIRIE.telephoneLien}`}
                  className="underline underline-offset-2 hover:text-foret-texteFort focus:outline-none focus:ring-2 focus:ring-foret-texte"
                >
                  {MAIRIE.telephone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${MAIRIE.email}`}
                  className="break-all underline underline-offset-2 hover:text-foret-texteFort focus:outline-none focus:ring-2 focus:ring-foret-texte"
                >
                  {MAIRIE.email}
                </a>
              </p>
            </address>
          </div>

          {/* Plan du site */}
          <nav aria-label="Plan du site">
            <h2 className="surtitre-clair mb-4">Plan du site</h2>
            <ul className="space-y-2.5" role="list">
              {PLAN_DU_SITE.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    className="text-sm hover:text-foret-texteFort focus:outline-none focus:ring-2 focus:ring-foret-texte"
                  >
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Informations légales */}
          <nav aria-label="Informations légales">
            <h2 className="surtitre-clair mb-4">Informations légales</h2>
            <ul className="space-y-2.5" role="list">
              {LIENS_LEGAUX.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    className="text-sm hover:text-foret-texteFort focus:outline-none focus:ring-2 focus:ring-foret-texte"
                  >
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Horaires */}
          <div>
            <h2 className="surtitre-clair mb-4">Horaires</h2>
            <dl className="space-y-2.5 text-sm">
              {HORAIRES.map((creneau) => (
                <div key={creneau.jours} className="flex justify-between gap-4">
                  <dt>{creneau.jours}</dt>
                  <dd className="text-right">{creneau.horaire}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs">Fermée les mardi, vendredi et dimanche.</p>
          </div>
        </div>

        <p className="mt-14 border-t border-foret-filet pt-6 text-xs">
          © {annee} Mairie de {COMMUNE.nom} — Accessibilité : partiellement conforme RGAA 4.1
        </p>
      </div>
    </footer>
  );
}

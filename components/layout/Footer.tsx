import Link from "next/link";
import { LogoMairie } from "../ui/LogoMairie";

const PLAN_DU_SITE = [
  { label: "Accueil", href: "/" },
  { label: "La Commune", href: "/commune" },
  { label: "Vos Élus", href: "/elus" },
  { label: "Services", href: "/services" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

const LIENS_LEGAUX = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Accessibilité", href: "/accessibilite" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
];

/**
 * Footer du site mairie.
 * Inclut : plan du site, liens légaux, logo monochrome, adresse.
 */
export function Footer() {
  const annee = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50" aria-label="Pied de page">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo + adresse */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <LogoMairie className="h-10 w-10 text-gray-500" monochrome />
              <span className="text-sm font-semibold text-gray-700">Mairie de La Saulsotte</span>
            </div>
            <address className="text-sm not-italic leading-relaxed text-gray-500">
              Place de la Mairie
              <br />
              10 400 La Saulsotte
              <br />
              <a
                href="tel:+33325700000"
                className="rounded hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                03 25 70 00 00
              </a>
              <br />
              <a
                href="mailto:mairie@lasaulsotte.fr"
                className="rounded hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                mairie@lasaulsotte.fr
              </a>
            </address>
          </div>

          {/* Plan du site */}
          <nav aria-label="Plan du site">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Plan du site
            </h2>
            <ul className="space-y-2" role="list">
              {PLAN_DU_SITE.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    className="rounded text-sm text-gray-600 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Informations légales */}
          <nav aria-label="Informations légales">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Informations légales
            </h2>
            <ul className="space-y-2" role="list">
              {LIENS_LEGAUX.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    className="rounded text-sm text-gray-600 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Horaires */}
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Horaires d&apos;ouverture
            </h2>
            <dl className="space-y-1 text-sm text-gray-600">
              <div className="flex justify-between gap-4">
                <dt>Lun – Ven</dt>
                <dd>9h00 – 12h00</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Lun & Mer</dt>
                <dd>14h00 – 17h00</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Sam</dt>
                <dd>Fermé</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Barre de bas de page */}
        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
          © {annee} Mairie de La Saulsotte — Tous droits réservés.{" "}
          <span className="inline-block">Accessibilité : partiellement conforme RGAA 4.1</span>
        </div>
      </div>
    </footer>
  );
}

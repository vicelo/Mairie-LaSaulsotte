"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Blason } from "../ui/Blason";
import { COMMUNE, HORAIRES, MAIRIE } from "@/lib/commune";

const NAV_ITEMS = [
  { label: "Accueil", href: "/" },
  { label: "La Commune", href: "/commune" },
  { label: "Vos Élus", href: "/elus" },
  { label: "Services", href: "/services" },
  { label: "Hébergements", href: "/hebergements" },
  { label: "Actualités", href: "/actualites" },
];

/**
 * Retire le slash final d'un chemin, hors racine.
 *
 * Le site est servi en `trailingSlash: true` : l'URL est `/actualites/` alors
 * que les liens pointent vers `/actualites`. Sans normalisation, aucun lien
 * n'est jamais marqué comme page courante.
 */
function normaliserChemin(chemin: string): string {
  return chemin.length > 1 ? chemin.replace(/\/+$/, "") : chemin;
}

/** Créneau du jour, ou null si la mairie est fermée. */
function creneauDuJour(): string | null {
  const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const aujourdhui = jours[new Date().getDay()];
  return HORAIRES.find((c) => c.jours === aujourdhui)?.horaire ?? null;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const pathname = normaliserChemin(usePathname() ?? "/");

  // Le site est exporté en statique : l'ouverture du jour calculée à la
  // compilation figerait le jour du déploiement. Elle est donc déterminée
  // après l'hydratation, le rendu initial restant neutre.
  const [ouverture, setOuverture] = useState<string | null>(null);
  const [monte, setMonte] = useState(false);

  useEffect(() => {
    setOuverture(creneauDuJour());
    setMonte(true);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      {/* Lien d'évitement — premier élément focusable (RGAA 12.1) */}
      <a
        href="#contenu-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:bg-foret focus:px-4 focus:py-2 focus:text-creme focus:outline-none focus:ring-2 focus:ring-terre-fonce"
      >
        Aller au contenu principal
      </a>

      {/* ── Bandeau utilitaire ────────────────────────────────────────── */}
      <div className="hidden bg-foret text-[13px] text-foret-texte nav:block">
        <div className="contenu flex items-center justify-between py-2">
          <p>
            {monte
              ? ouverture
                ? `Mairie ouverte aujourd'hui de ${ouverture}`
                : "Mairie fermée aujourd'hui"
              : "Horaires d'ouverture de la mairie"}
          </p>
          <p className="flex items-center gap-6">
            <a
              href={`tel:${MAIRIE.telephoneLien}`}
              className="hover:text-foret-texteFort focus:outline-none focus:ring-2 focus:ring-foret-texte"
            >
              {MAIRIE.telephone}
            </a>
            <a
              href={`mailto:${MAIRIE.email}`}
              className="hover:text-foret-texteFort focus:outline-none focus:ring-2 focus:ring-foret-texte"
            >
              {MAIRIE.email}
            </a>
          </p>
        </div>
      </div>

      {/* ── En-tête ───────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-sable bg-creme">
        <nav
          ref={navRef}
          aria-label="Navigation principale"
          className="contenu flex items-center justify-between gap-6 py-4"
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 focus:outline-none focus:ring-2 focus:ring-terre-fonce focus:ring-offset-2 focus:ring-offset-creme"
            aria-label={`Mairie de ${COMMUNE.nom} — retour à l'accueil`}
          >
            <Blason className="h-[54px] w-[42px]" />
            <span className="leading-tight">
              <span className="block font-serif text-xl text-encre">{COMMUNE.nom}</span>
              <span className="block text-[11px] uppercase tracking-surtitre text-encre-secondaire">
                Mairie — {COMMUNE.departement}
              </span>
            </span>
          </Link>

          {/* Navigation bureau */}
          <ul className="hidden items-center gap-7 nav:flex" role="list">
            {NAV_ITEMS.map((item) => {
              const isCurrent = pathname === normaliserChemin(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`border-b-2 pb-1 text-[15px] transition-colors hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce ${
                      isCurrent
                        ? "border-terre text-terre-fonce"
                        : "border-transparent text-encre-courant"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/contact"
                aria-current={pathname === "/contact" ? "page" : undefined}
                className="bg-foret px-5 py-2.5 text-[15px] text-creme transition-colors hover:bg-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce focus:ring-offset-2 focus:ring-offset-creme"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Bouton menu, sous 900 px */}
          <button
            ref={hamburgerRef}
            type="button"
            aria-controls="menu-mobile"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="min-h-[44px] border border-sable px-4 py-2 text-sm text-encre-courant transition-colors hover:border-terre hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce nav:hidden"
          >
            {menuOpen ? "Fermer" : "Menu"}
          </button>
        </nav>

        {/* Menu déroulant mobile */}
        <div
          id="menu-mobile"
          hidden={!menuOpen}
          className={`border-t border-sable bg-creme nav:hidden ${menuOpen ? "block" : "hidden"}`}
        >
          <ul className="contenu flex flex-col py-2" role="list">
            {[...NAV_ITEMS, { label: "Contact", href: "/contact" }].map((item) => {
              const isCurrent = pathname === normaliserChemin(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`block border-b border-sable-clair py-3.5 text-base transition-colors hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce ${
                      isCurrent ? "text-terre-fonce" : "text-encre-courant"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </header>
    </>
  );
}

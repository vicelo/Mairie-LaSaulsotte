"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMairie } from "../ui/LogoMairie";

const NAV_ITEMS = [
  { label: "Accueil", href: "/" },
  { label: "La Commune", href: "/commune" },
  { label: "Vos Élus", href: "/elus" },
  { label: "Services", href: "/services" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

/**
 * Header principal du site.
 * - Navigation desktop avec liens
 * - Menu hamburger mobile entièrement accessible (RGAA)
 * - Focus piégé dans le menu mobile quand ouvert
 * - Skip link vers le contenu principal
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Ferme le menu sur Escape
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

  // Ferme le menu si clic hors du header
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      {/* Skip link — premier élément focusable de la page (RGAA 12.1) */}
      <a
        href="#contenu-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        Aller au contenu principal
      </a>

      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <nav
          ref={navRef}
          aria-label="Navigation principale"
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Mairie de La Saulsotte — Retour à l'accueil"
          >
            <LogoMairie className="h-10 w-10" />
            <span className="hidden text-sm font-semibold leading-tight text-primary sm:block">
              Mairie de
              <br />
              La Saulsotte
            </span>
          </Link>

          {/* Navigation desktop */}
          <ul className="hidden items-center gap-1 md:flex" role="list">
            {NAV_ITEMS.map((item) => {
              const isCurrent = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    className="rounded px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-primary-100 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Bouton hamburger mobile */}
          <button
            ref={hamburgerRef}
            type="button"
            aria-controls="menu-mobile"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 transition-colors hover:bg-primary-100 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 md:hidden"
          >
            <span className="sr-only">{menuOpen ? "Fermer" : "Menu"}</span>
            {menuOpen ? (
              /* Icône ✕ */
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              /* Icône ☰ */
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </nav>

        {/* Menu mobile déroulant */}
        <div
          id="menu-mobile"
          role="region"
          aria-label="Menu de navigation mobile"
          hidden={!menuOpen}
          className={`border-t border-gray-100 bg-white md:hidden ${menuOpen ? "block" : "hidden"}`}
        >
          <ul className="flex flex-col px-4 pb-4 pt-2" role="list">
            {NAV_ITEMS.map((item) => {
              const isCurrent = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded px-3 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-primary-100 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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

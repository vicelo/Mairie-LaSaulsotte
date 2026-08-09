"use client";

import { useEffect, useRef, useState } from "react";

interface Annonce {
  id: string;
  texte: string;
  href?: string;
  /** Premier jour d'affichage (YYYY-MM-DD). Vide = tout de suite. */
  dateDebut?: string;
  /** Dernier jour d'affichage (YYYY-MM-DD). Vide = pas d'expiration. */
  dateFin?: string;
}

interface BannerAnnonceProps {
  annonces: Annonce[];
  /** Vitesse de défilement en pixels par seconde (défaut: 60) */
  speed?: number;
}

/** Date du jour au format YYYY-MM-DD, en heure locale. */
function aujourdhui(): string {
  const d = new Date();
  const mois = String(d.getMonth() + 1).padStart(2, "0");
  const jour = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mois}-${jour}`;
}

function estActive(a: Annonce, jour: string): boolean {
  if (a.dateDebut && a.dateDebut > jour) return false;
  if (a.dateFin && a.dateFin < jour) return false;
  return true;
}

/**
 * Bandeau d'annonces animé — remplace le <marquee> obsolète.
 *
 * Accessibilité (RGAA) :
 * - Pause automatique si `prefers-reduced-motion: reduce`
 * - Bouton de pause/reprise visible
 * - Texte lisible par les lecteurs d'écran (aria-live="off" sur le bandeau animé,
 *   liste statique sr-only pour AT)
 * - Pas de pièges au clavier
 */
export function BannerAnnonce({ annonces: annoncesRecues, speed = 60 }: BannerAnnonceProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [annonces, setAnnonces] = useState(annoncesRecues);

  // Le site est exporté en statique : sans nouveau build, une annonce expirée
  // resterait affichée. On refiltre donc à l'affichage, une fois monté — après
  // l'hydratation, pour ne pas diverger du HTML rendu au build.
  useEffect(() => {
    const jour = aujourdhui();
    setAnnonces(annoncesRecues.filter((a) => estActive(a, jour)));
  }, [annoncesRecues]);

  // Détecte prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isPaused = paused || reducedMotion;

  if (!annonces.length) return null;

  // Calcul de la durée CSS selon la largeur estimée du texte
  // On duplique la liste pour un défilement infini fluide
  const texteTotal = annonces.map((a) => a.texte).join(" — ");
  const duree = Math.max(10, texteTotal.length / (speed / 10));

  return (
    <div className="relative overflow-hidden bg-sable-clair text-terre-fonce">
      {/* Liste statique pour lecteurs d'écran uniquement */}
      <ul className="sr-only" aria-label="Annonces de la mairie">
        {annonces.map((a) => (
          <li key={a.id}>{a.href ? <a href={a.href}>{a.texte}</a> : a.texte}</li>
        ))}
      </ul>

      {/* Bandeau animé — masqué aux AT */}
      <div
        aria-hidden="true"
        className="flex items-center gap-4 py-2 pl-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-terre-fonce">
          Annonces
        </span>

        <div className="relative flex-1 overflow-hidden">
          <ul
            ref={trackRef}
            className="flex whitespace-nowrap"
            style={{
              animation: isPaused ? "none" : `banniere-scroll ${duree}s linear infinite`,
            }}
          >
            {/* Deux copies pour la boucle seamless */}
            {[...annonces, ...annonces].map((a, i) => (
              <li
                key={`${a.id}-${i}`}
                className="mx-8 inline-flex items-center text-sm font-medium"
              >
                {a.href ? (
                  <a
                    href={a.href}
                    className="rounded hover:underline focus:outline-none focus:ring-2 focus:ring-terre-fonce"
                    tabIndex={-1} /* navigation clavier via la liste sr-only */
                  >
                    {a.texte}
                  </a>
                ) : (
                  a.texte
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bouton pause/lecture */}
      <button
        type="button"
        aria-label={isPaused ? "Reprendre le défilement" : "Mettre en pause le défilement"}
        aria-pressed={isPaused}
        onClick={() => setPaused((p) => !p)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-terre-fonce hover:bg-sable focus:outline-none focus:ring-2 focus:ring-terre-fonce"
      >
        {isPaused ? (
          /* ▶ play */
          <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        ) : (
          /* ⏸ pause */
          <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
          </svg>
        )}
      </button>

      {/* Keyframe CSS injectée via style tag */}
      <style>{`
        @keyframes banniere-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

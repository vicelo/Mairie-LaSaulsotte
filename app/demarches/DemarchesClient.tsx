"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { CATEGORIES_DEMARCHES } from "@/lib/demarches";
import type { Demarche } from "@/lib/demarches";

const CATEGORY_BADGE_COLORS: Record<string, "green" | "blue" | "orange" | "gray"> = {
  "État civil": "blue",
  Urbanisme: "orange",
  Élections: "green",
  Social: "gray",
  Autres: "gray",
};

interface Props {
  demarches: Demarche[];
}

export default function DemarchesClient({ demarches }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Toutes");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered =
    selectedCategory === "Toutes"
      ? demarches
      : demarches.filter((d) => d.category === selectedCategory);

  return (
    <>
      {/* Filtres */}
      <div role="group" aria-label="Filtrer par catégorie" className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES_DEMARCHES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            aria-pressed={selectedCategory === cat}
            className={[
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              selectedCategory === cat
                ? "border-primary bg-primary text-white"
                : "border-gray-300 bg-white text-gray-700 hover:border-primary hover:text-primary",
            ].join(" ")}
          >
            {cat}
          </button>
        ))}
      </div>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {filtered.length} {filtered.length > 1 ? "démarches affichées" : "démarche affichée"}
      </div>

      {/* Liste accordéon */}
      <dl className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
        {filtered.map((demarche) => {
          const isOpen = openId === demarche.id;
          const badgeColor = CATEGORY_BADGE_COLORS[demarche.category] ?? "gray";
          return (
            <div key={demarche.id}>
              <dt>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`demarche-${demarche.id}`}
                  onClick={() => setOpenId(isOpen ? null : demarche.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-medium text-gray-900">{demarche.title}</span>
                    <Badge color={badgeColor}>{demarche.category}</Badge>
                  </div>
                  <svg
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </dt>

              <dd
                id={`demarche-${demarche.id}`}
                hidden={!isOpen}
                className="border-t border-gray-100 bg-gray-50 px-5 py-4"
              >
                <p className="mb-4 text-sm text-gray-700">{demarche.description}</p>

                {demarche.delai && (
                  <p className="mb-3 text-sm">
                    <span className="font-medium text-gray-600">Délai : </span>
                    {demarche.delai}
                  </p>
                )}

                {demarche.documents && demarche.documents.length > 0 && (
                  <div className="mb-3">
                    <p className="mb-1 text-sm font-medium text-gray-600">
                      Documents nécessaires :
                    </p>
                    <ul className="ml-4 list-disc space-y-1 text-sm text-gray-700">
                      {demarche.documents.map((doc, i) => (
                        <li key={i}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {demarche.lienExterne && (
                  <a
                    href={demarche.lienExterne}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded text-sm font-medium text-primary underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    Plus d&apos;informations sur service-public.fr
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    <span className="sr-only">(s&apos;ouvre dans un nouvel onglet)</span>
                  </a>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </>
  );
}

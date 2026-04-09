"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { CATEGORIES } from "@/lib/actualites";
import type { Actualite } from "@/lib/actualites";

const ITEMS_PER_PAGE = 6;

interface Props {
  actualites: Actualite[];
}

export default function ActualitesClient({ actualites }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Toutes");
  const [page, setPage] = useState(1);

  const filtered =
    selectedCategory === "Toutes"
      ? actualites
      : actualites.filter((a) => a.category === selectedCategory);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  function handleCategoryChange(cat: string) {
    setSelectedCategory(cat);
    setPage(1);
  }

  return (
    <>
      <div role="group" aria-label="Filtrer par catégorie" className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleCategoryChange(cat)}
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

      {paginated.length === 0 ? (
        <p className="py-12 text-center text-gray-500">Aucune actualité dans cette catégorie.</p>
      ) : (
        <>
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {filtered.length} {filtered.length > 1 ? "actualités affichées" : "actualité affichée"}
          </div>

          <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((actu) => (
              <li key={actu.slug}>
                <Card
                  title={actu.title}
                  excerpt={actu.excerpt}
                  date={actu.date}
                  category={actu.category}
                  href={`/actualites/${actu.slug}`}
                />
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <nav
              aria-label="Pagination des actualités"
              className="mt-10 flex items-center justify-center gap-2"
            >
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Page précédente"
                className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Précédent
              </button>
              <span className="text-sm text-gray-600">
                Page {page} sur {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Page suivante"
                className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Suivant →
              </button>
            </nav>
          )}
        </>
      )}
    </>
  );
}

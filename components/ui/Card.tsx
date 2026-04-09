import Link from "next/link";
import Image from "next/image";
import { Badge } from "./Badge";

interface CardActualiteProps {
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  href: string;
  /** Chemin ou URL de l'image (optionnel) */
  imageSrc?: string;
  imageAlt?: string;
}

/**
 * Carte d'actualité.
 * Accessible : toute la carte est cliquable via un lien principal, pas de liens dupliqués.
 * Conforme RGAA 6.1 : le lien a un intitulé explicite via aria-label.
 */
export function Card({
  title,
  excerpt,
  date,
  category,
  href,
  imageSrc,
  imageAlt = "",
}: CardActualiteProps) {
  const dateFormatted = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image */}
      {imageSrc && (
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Métadonnées */}
        <div className="flex items-center gap-2">
          <time dateTime={date} className="text-xs text-gray-500">
            {dateFormatted}
          </time>
          {category && <Badge color="green">{category}</Badge>}
        </div>

        {/* Titre avec lien principal */}
        <h3 className="text-base font-semibold leading-snug text-gray-900">
          <Link
            href={href}
            aria-label={`Lire l'article : ${title}`}
            className="rounded after:absolute after:inset-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {title}
          </Link>
        </h3>

        {/* Extrait */}
        <p className="line-clamp-3 flex-1 text-sm text-gray-600">{excerpt}</p>

        {/* CTA */}
        <span
          aria-hidden="true"
          className="mt-auto text-sm font-medium text-primary group-hover:underline"
        >
          Lire la suite →
        </span>
      </div>
    </article>
  );
}

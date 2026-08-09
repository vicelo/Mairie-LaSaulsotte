import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BannerAnnonce } from "@/components/ui/BannerAnnonce";
import { getAnnoncesActives } from "@/lib/annonces";
import { getAllActualites } from "@/lib/actualites";
import { COMMUNE } from "@/lib/commune";
import { getAllDemarches } from "@/lib/demarches";
import { PHOTOS } from "@/lib/images";

/** Nombre d'actualités mises en avant en page d'accueil. */
const NB_ACTUALITES_HOME = 3;

/**
 * Démarches mises en avant dans le bandeau vert, dans cet ordre.
 *
 * Choisies pour être les plus demandées en mairie, et non les premières par
 * ordre alphabétique — qui donnaient trois actes d'état civil d'affilée.
 */
const DEMARCHES_EN_AVANT = [
  "acte-naissance",
  "inscription-listes-electorales",
  "declaration-travaux",
  "location-salle-fetes",
  "urbanisme",
];

/**
 * Illustrations de repli pour les actualités sans photo.
 *
 * Une seule image de repli produirait trois vignettes identiques côte à côte
 * en page d'accueil ; la rotation évite cet effet.
 */
const ILLUSTRATIONS_REPLI = [PHOTOS.village02, PHOTOS.courtioux01, PHOTOS.aireDeJeux];

export const metadata: Metadata = {
  title: "Mairie de La Saulsotte — Commune de l'Aube (10)",
  description:
    "Site officiel de la mairie de La Saulsotte, commune de l'Aube (10). Démarches, horaires, actualités et vie du village.",
  openGraph: {
    title: "Mairie de La Saulsotte — Commune de l'Aube (10)",
    description:
      "Le site de votre mairie : vos démarches, la vie du village et les informations pratiques.",
    locale: "fr_FR",
    type: "website",
  },
};

const ACCES_RAPIDES = [
  { label: "Démarches", detail: "État civil, urbanisme, inscriptions", href: "/demarches" },
  { label: "Horaires", detail: "Lundi, mercredi, jeudi, samedi", href: "/contact" },
  { label: "Actualités", detail: "Travaux, festivités, conseil", href: "/actualites" },
  { label: "Vos élus", detail: "Conseil municipal et permanences", href: "/elus" },
];

/** Date d'une actualité en « 12 juin », pour les cartes. */
function dateCourte(iso: string): string {
  if (!iso) return "";
  const [annee, mois, jour] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long" }).format(
    new Date(Date.UTC(annee, mois - 1, jour))
  );
}

export default function HomePage() {
  const annonces = getAnnoncesActives();
  const actualites = getAllActualites().slice(0, NB_ACTUALITES_HOME);
  // Les démarches retenues d'abord, dans l'ordre voulu ; complété si l'une
  // d'elles a été dépubliée depuis le CMS.
  const toutesDemarches = getAllDemarches();
  const demarches = [
    ...DEMARCHES_EN_AVANT.map((id) => toutesDemarches.find((d) => d.id === id)).filter(
      (d): d is NonNullable<typeof d> => Boolean(d)
    ),
    ...toutesDemarches.filter((d) => !DEMARCHES_EN_AVANT.includes(d.id)),
  ].slice(0, DEMARCHES_EN_AVANT.length);

  return (
    <div className="flex min-h-screen flex-col bg-creme">
      <Header />
      <BannerAnnonce annonces={annonces} />

      <main id="contenu-principal" tabIndex={-1} className="flex-1">
        {/* ── Héro ──────────────────────────────────────────────────────── */}
        <section aria-labelledby="hero-titre">
          <div className="relative h-[300px] w-full nav:h-[560px]">
            <Image
              src={PHOTOS.villagePanorama.src}
              alt={PHOTOS.villagePanorama.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="contenu">
            {/* Le bloc remonte sur la photo au-delà de 900 px ; en dessous il
                se pose simplement à la suite, comme prévu au handoff. */}
            <div className="relative max-w-[720px] border-t-[3px] border-terre bg-creme px-7 pb-8 pt-9 nav:-mt-[140px] nav:px-16 nav:pb-12 nav:pt-14">
              <p className="surtitre">
                Commune de l&apos;{COMMUNE.departement} — {COMMUNE.codePostal}
              </p>
              <h1
                id="hero-titre"
                className="mt-4 text-[34px] leading-[1.08] tracking-[-0.01em] nav:text-[58px]"
              >
                Bienvenue à
                <br />
                {COMMUNE.nom}
              </h1>
              <p className="mt-5 max-w-[62ch] text-[17px] leading-[1.65] text-encre-courant nav:text-[19px]">
                Le site de votre mairie : vos démarches, la vie du village et les informations
                pratiques, réunis en un seul endroit.
              </p>
            </div>
          </div>
        </section>

        {/* ── Accès rapides ─────────────────────────────────────────────── */}
        <section aria-labelledby="acces-titre" className="contenu pt-16 nav:pt-24">
          <h2 id="acces-titre" className="sr-only">
            Accès rapides
          </h2>
          {/* Le gap de 1 px sur fond sable dessine les filets entre tuiles. */}
          <ul
            role="list"
            className="grid gap-px border border-sable bg-sable etroit:grid-cols-2 nav:grid-cols-4"
          >
            {ACCES_RAPIDES.map((acces) => (
              <li key={acces.href} className="bg-surface transition-colors hover:bg-white">
                <Link
                  href={acces.href}
                  className="block h-full px-7 py-8 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-terre-fonce"
                >
                  <span className="block font-serif text-xl text-encre">{acces.label}</span>
                  <span className="mt-2 block text-sm text-encre-secondaire">{acces.detail}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ── La vie du village ─────────────────────────────────────────── */}
        {actualites.length > 0 && (
          <section aria-labelledby="actus-titre" className="contenu pt-[96px] nav:pt-[110px]">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-sable pb-5">
              <h2 id="actus-titre" className="text-[26px] nav:text-[34px]">
                La vie du village
              </h2>
              <Link
                href="/actualites"
                className="text-sm text-terre-fonce underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-terre-fonce"
              >
                Toutes les actualités →
              </Link>
            </div>

            <ul role="list" className="mt-9 grid gap-8 nav:grid-cols-3">
              {actualites.map((actu, index) => {
                const repli = ILLUSTRATIONS_REPLI[index % ILLUSTRATIONS_REPLI.length];
                return (
                  <li key={actu.slug}>
                    <article>
                      <Link
                        href={`/actualites/${actu.slug}`}
                        className="group block focus:outline-none focus:ring-2 focus:ring-terre-fonce"
                      >
                        <div className="relative h-[220px] w-full overflow-hidden bg-sable-clair">
                          <Image
                            src={actu.image ?? repli.src}
                            alt=""
                            fill
                            sizes="(max-width: 900px) 100vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                        <p className="surtitre mt-5">
                          {dateCourte(actu.date)}
                          {actu.category ? ` — ${actu.category}` : ""}
                        </p>
                        <h3 className="mt-2 text-[22px] leading-[1.3] text-encre group-hover:text-terre-fonce">
                          {actu.title}
                        </h3>
                        <p className="mt-3 text-[15px] leading-[1.7] text-encre-courant">
                          {actu.excerpt}
                        </p>
                      </Link>
                    </article>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* ── Bandeau démarches ─────────────────────────────────────────── */}
        <section
          aria-labelledby="demarches-titre"
          className="mt-[96px] bg-foret py-20 text-foret-texte nav:mt-[110px] nav:py-24"
        >
          <div className="contenu grid gap-12 nav:grid-cols-2 nav:gap-20">
            <div>
              <p className="surtitre-clair">Vos démarches</p>
              <h2
                id="demarches-titre"
                className="mt-4 text-[26px] text-foret-texteFort nav:text-[34px]"
              >
                Ce que vous pouvez faire sans vous déplacer
              </h2>
              <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.7]">
                La plupart des demandes courantes se préparent en ligne. Le secrétariat reste à
                votre disposition pour tout accompagnement.
              </p>
              <Link
                href="/demarches"
                className="mt-8 inline-block bg-terre-fonce px-6 py-3 text-[15px] text-white transition-colors hover:bg-terre-clair hover:text-encre focus:outline-none focus:ring-2 focus:ring-foret-texte focus:ring-offset-2 focus:ring-offset-foret"
              >
                Voir toutes les démarches
              </Link>
            </div>

            <ul role="list" className="self-center">
              {demarches.map((demarche) => (
                <li
                  key={demarche.id}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-foret-filet py-4 first:pt-0"
                >
                  <Link
                    href={`/demarches#${demarche.id}`}
                    className="text-[15px] text-foret-texteFort underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-foret-texte"
                  >
                    {demarche.title}
                  </Link>
                  <span className="text-[13px] text-foret-texte">{demarche.category}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Découvrir la commune ──────────────────────────────────────── */}
        <section aria-labelledby="decouvrir-titre" className="contenu py-20 nav:py-24">
          <div className="grid items-center gap-12 nav:grid-cols-2 nav:gap-16">
            <div className="relative h-[300px] w-full nav:h-[420px]">
              <Image
                src={PHOTOS.village01.src}
                alt={PHOTOS.village01.alt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="surtitre">Découvrir</p>
              <h2 id="decouvrir-titre" className="mt-4 text-[26px] nav:text-[34px]">
                Un village de plaine, entre Seine et grandes cultures
              </h2>
              <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.7] text-encre-courant">
                Situation, patrimoine, associations et vie quotidienne : tout ce qui fait le
                caractère de {COMMUNE.nom} et de ses {COMMUNE.population} habitants.
              </p>
              <Link
                href="/commune"
                className="mt-8 inline-block border border-foret px-6 py-3 text-[15px] text-foret transition-colors hover:bg-foret hover:text-creme focus:outline-none focus:ring-2 focus:ring-terre-fonce focus:ring-offset-2 focus:ring-offset-creme"
              >
                Découvrir la commune
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

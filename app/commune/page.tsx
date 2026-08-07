import type { Metadata } from "next";
import Image from "next/image";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { COMMUNE, HAMEAUX, PATRIMOINE } from "@/lib/commune";
import { PHOTOS } from "@/lib/images";

export const metadata: Metadata = {
  title: "La Commune",
  description:
    "Découvrez La Saulsotte : ses hameaux, son histoire depuis le Néolithique, son patrimoine classé et ses chiffres clés.",
  openGraph: {
    title: "La Commune — Mairie de La Saulsotte",
    description: "Histoire, hameaux et patrimoine de la commune de La Saulsotte, dans l'Aube.",
  },
};

const CHIFFRES = [
  { label: "Population", valeur: `${COMMUNE.population} habitants (${COMMUNE.populationAnnee})` },
  { label: "Superficie", valeur: `${COMMUNE.superficieKm2.toString().replace(".", ",")} km²` },
  { label: "Altitude", valeur: `${COMMUNE.altitudeMin} à ${COMMUNE.altitudeMax} m` },
  { label: "Code postal", valeur: COMMUNE.codePostal },
  { label: "Code INSEE", valeur: COMMUNE.codeInsee },
  { label: "Département", valeur: `${COMMUNE.departement} (${COMMUNE.departementNumero})` },
  { label: "Région", valeur: COMMUNE.region },
  { label: "Canton", valeur: COMMUNE.canton },
  { label: "Intercommunalité", valeur: COMMUNE.intercommunalite },
];

export default function CommunePage() {
  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "La Commune" }]} />

      <h1 className="mb-3 text-3xl font-bold text-gray-900">La Commune</h1>
      <p className="mb-8 max-w-3xl text-gray-600">
        Village rural de la plaine champenoise situé à sept kilomètres au nord de Nogent-sur-Seine,
        La Saulsotte s&apos;étend sur près de 19 km² et rassemble le bourg et ses nombreux hameaux.
      </p>

      {/* ── Photo d'illustration ──────────────────────────────────────── */}
      <figure className="mb-12">
        <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={PHOTOS.village01.src}
            alt={PHOTOS.village01.alt}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
        <figcaption className="mt-2 text-xs text-gray-500">
          {PHOTOS.village01.legende} — © {PHOTOS.village01.auteur}, {PHOTOS.village01.licence}
        </figcaption>
      </figure>

      {/* ── Chiffres clés ─────────────────────────────────────────────── */}
      <section aria-labelledby="chiffres-titre" className="mb-12">
        <h2 id="chiffres-titre" className="mb-6 text-2xl font-bold text-gray-800">
          Chiffres clés
        </h2>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-3 rounded-xl border border-gray-200 bg-white p-6 sm:grid-cols-2 lg:grid-cols-3">
          {CHIFFRES.map((c) => (
            <div key={c.label} className="flex justify-between gap-4 border-b border-gray-100 pb-2">
              <dt className="text-sm font-medium text-gray-700">{c.label}</dt>
              <dd className="text-right text-sm text-gray-900">{c.valeur}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Histoire ──────────────────────────────────────────────────── */}
      <section aria-labelledby="histoire-titre" className="mb-12">
        <h2 id="histoire-titre" className="mb-6 text-2xl font-bold text-gray-800">
          Histoire
        </h2>

        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="max-w-2xl space-y-4 text-gray-700">
            <h3 className="text-lg font-semibold text-gray-900">Une occupation très ancienne</h3>
            <p>
              Le territoire est occupé dès le Néolithique, comme en témoigne l&apos;érection du
              menhir de la Pierre Aiguë. La commune aurait autrefois compté jusqu&apos;à douze
              dolmens. Les fouilles ont livré des parures en coquilles de cardium et du mobilier de
              l&apos;âge du Bronze, aujourd&apos;hui conservés dans les collections régionales.
            </p>

            <h3 className="pt-2 text-lg font-semibold text-gray-900">Du Moyen Âge à nos jours</h3>
            <p>
              Au XIIe siècle, une famille féodale porte le nom de Saulsotte et le fief relève de
              Provins. Le hameau de Resson accueille une commanderie templière, dont subsiste la
              chapelle Sainte-Madeleine. À la fin du XVIIIe siècle, le territoire se répartit déjà
              entre six hameaux principaux.
            </p>
            <p>
              Le XIXe siècle a laissé trois lavoirs, aujourd&apos;hui restaurés, dont celui de
              Resson. Les anciens noms de la commune — <em>Sauceta</em>, <em>Saucette</em>,{" "}
              <em>La Sautrolles</em> en 1793, puis <em>Saint-Ferréol</em> en 1801 — dérivent de{" "}
              <em>salcea</em>, le saule.
            </p>
          </div>

          <figure className="lg:pt-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={PHOTOS.paruresCardium.src}
                alt={PHOTOS.paruresCardium.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2 text-xs text-gray-500">
              {PHOTOS.paruresCardium.legende} — © {PHOTOS.paruresCardium.auteur},{" "}
              {PHOTOS.paruresCardium.licence}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Patrimoine ────────────────────────────────────────────────── */}
      <section aria-labelledby="patrimoine-titre" className="mb-12">
        <h2 id="patrimoine-titre" className="mb-6 text-2xl font-bold text-gray-800">
          Patrimoine
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
            <caption className="sr-only">
              Édifices et monuments remarquables de La Saulsotte
            </caption>
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">
                  Édifice
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">
                  Époque
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">
                  Lieu
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">
                  Protection
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PATRIMOINE.map((p) => (
                <tr key={p.nom} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{p.nom}</td>
                  <td className="px-4 py-3 text-gray-700">{p.epoque}</td>
                  <td className="px-4 py-3 text-gray-700">{p.lieu}</td>
                  <td className="px-4 py-3 text-gray-600">{p.protection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Hameaux ───────────────────────────────────────────────────── */}
      <section aria-labelledby="hameaux-titre">
        <h2 id="hameaux-titre" className="mb-6 text-2xl font-bold text-gray-800">
          Les hameaux
        </h2>
        <p className="mb-6 max-w-2xl text-gray-600">
          La commune ne se limite pas à son bourg : elle rassemble {HAMEAUX.length} hameaux et
          écarts, dont Courtioux, Resson et Liours sont parmi les plus connus.
        </p>

        <figure className="mb-6">
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={PHOTOS.courtioux01.src}
              alt={PHOTOS.courtioux01.alt}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-2 text-xs text-gray-500">
            {PHOTOS.courtioux01.legende} — © {PHOTOS.courtioux01.auteur},{" "}
            {PHOTOS.courtioux01.licence}
          </figcaption>
        </figure>

        <ul role="list" className="flex flex-wrap gap-2">
          {HAMEAUX.map((hameau) => (
            <li
              key={hameau}
              className="rounded-full border border-primary-100 bg-primary-100 px-3 py-1 text-sm text-primary"
            >
              {hameau}
            </li>
          ))}
        </ul>
      </section>
    </PageLayout>
  );
}

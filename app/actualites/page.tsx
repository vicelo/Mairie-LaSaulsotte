import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getAllActualites } from "@/lib/actualites";
import ActualitesClient from "./ActualitesClient";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Toutes les actualités et informations municipales de la commune de La Saulsotte.",
  openGraph: {
    title: "Actualités — Mairie de La Saulsotte",
    description: "Toutes les actualités et informations municipales de la commune de La Saulsotte.",
  },
};

export default function ActualitesPage() {
  const actualites = getAllActualites();

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Actualités" }]} />

      <div className="mb-8">
        <h1 className="text-[34px] leading-[1.1] nav:text-[52px]">Actualités</h1>
        <p className="mt-2 text-encre-courant">
          Toutes les informations de la commune de La Saulsotte.
        </p>
      </div>

      <ActualitesClient actualites={actualites} />
    </PageLayout>
  );
}

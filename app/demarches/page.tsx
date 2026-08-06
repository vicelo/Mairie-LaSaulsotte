import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getAllDemarches } from "@/lib/demarches";
import { HORAIRES_RESUME, MAIRIE } from "@/lib/commune";
import DemarchesClient from "./DemarchesClient";

export const metadata: Metadata = {
  title: "Démarches administratives",
  description:
    "Retrouvez toutes les démarches administratives accessibles auprès de la mairie de La Saulsotte.",
  openGraph: {
    title: "Démarches administratives — Mairie de La Saulsotte",
    description:
      "Retrouvez toutes les démarches administratives accessibles auprès de la mairie de La Saulsotte.",
  },
};

export default function DemarchesPage() {
  const demarches = getAllDemarches();

  return (
    <PageLayout>
      <Breadcrumb
        items={[{ label: "Accueil", href: "/" }, { label: "Démarches administratives" }]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Démarches administratives</h1>
        <p className="mt-2 text-gray-600">
          Retrouvez toutes les démarches accessibles auprès de la mairie de La Saulsotte.
        </p>
      </div>

      {/* Encart info pratique */}
      <div className="mb-8 rounded-xl border border-primary-100 bg-primary-100 p-4 text-sm text-primary">
        <strong>Accueil en mairie :</strong> {HORAIRES_RESUME}. Tél.{" "}
        <a
          href={`tel:${MAIRIE.telephoneLien}`}
          className="rounded underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {MAIRIE.telephone}
        </a>
      </div>

      <DemarchesClient demarches={demarches} />
    </PageLayout>
  );
}

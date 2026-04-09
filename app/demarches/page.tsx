import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getAllDemarches } from "@/lib/demarches";
import DemarchesClient from "./DemarchesClient";

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
        <strong>Accueil en mairie :</strong> lundi au vendredi de 9h à 12h, lundi et mercredi de 14h
        à 17h. Tél.{" "}
        <a
          href="tel:+33325700000"
          className="rounded underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          03 25 70 00 00
        </a>
      </div>

      <DemarchesClient demarches={demarches} />
    </PageLayout>
  );
}

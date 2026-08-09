import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
  /** Bandeau pleine largeur inséré avant le contenu centré. */
  fullWidthBanner?: ReactNode;
  /**
   * Retire la largeur maximale et les marges verticales du contenu.
   * Réservé aux pages qui gèrent elles-mêmes leurs sections pleine largeur,
   * comme l'accueil et ses bandeaux verts.
   */
  pleineLargeur?: boolean;
}

/** Gabarit commun : en-tête, contenu, pied de page. */
export function PageLayout({ children, fullWidthBanner, pleineLargeur }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-creme">
      <Header />
      {fullWidthBanner && (
        <div className="w-full" aria-live="polite">
          {fullWidthBanner}
        </div>
      )}
      <main
        id="contenu-principal"
        className={pleineLargeur ? "flex-1" : "contenu flex-1 py-14 nav:py-20"}
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

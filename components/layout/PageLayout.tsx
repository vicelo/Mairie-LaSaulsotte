import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
  /** Affiche un bandeau pleine largeur avant le contenu centré */
  fullWidthBanner?: ReactNode;
}

/**
 * Layout de page standard : Header + contenu centré responsive + Footer.
 * Utilisé pour toutes les pages publiques du site.
 */
export function PageLayout({ children, fullWidthBanner }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {fullWidthBanner && (
        <div className="w-full" aria-live="polite">
          {fullWidthBanner}
        </div>
      )}
      <main
        id="contenu-principal"
        className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

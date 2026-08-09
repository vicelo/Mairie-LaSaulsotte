import type { Config } from "tailwindcss";

/**
 * Palette « Chemin de craie » — direction artistique du site.
 *
 * Cinq valeurs du handoff de design ne franchissent pas le seuil AA du RGAA
 * (4,5:1). Elles ne sont pas reprises telles quelles pour du texte ; le
 * remplacement retenu est indiqué en commentaire et provient du handoff
 * lui-même, ce qui préserve l'intention visuelle.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        /** Fond de page. */
        creme: "#F5F1E8",
        /** Cartes et surfaces claires posées sur le crème. */
        surface: "#FCFAF5",

        foret: {
          /** Bandeaux, pied de page, boutons pleins. Blanc dessus : 11,1:1. */
          DEFAULT: "#2E4034",
          /** Filets sur fond vert — décoratif, jamais du texte. */
          filet: "#46554A",
          /**
           * Texte clair sur fond vert : 6,1:1.
           * Remplace #8FA08E (3,99) et #9AA396 (4,24) du handoff.
           */
          texte: "#C6C0AE",
          /** Texte clair renforcé sur fond vert : 8,4:1. */
          texteFort: "#E9E3D2",
        },

        terre: {
          /**
           * Accent décoratif : filets, soulignés, bordures hautes.
           * 3,84:1 sur crème — à réserver aux éléments non textuels.
           */
          DEFAULT: "#B5643C",
          /**
           * Sur-titres, liens et fonds de bouton. 6,45:1 sur crème,
           * et 5,9:1 pour du blanc posé dessus.
           */
          fonce: "#8A4227",
          /** Survol des boutons. */
          clair: "#C97A50",
        },

        sable: {
          /** Bordures. */
          DEFAULT: "#D8CDB4",
          /** Filets internes, séparateurs de liste. */
          clair: "#E2DACA",
        },

        encre: {
          /** Titres et texte principal : 14:1 sur crème. */
          DEFAULT: "#1E241F",
          /** Texte courant : 7,95:1. */
          courant: "#4A4A40",
          /** Texte secondaire : 4,8:1. Ne pas éclaircir davantage. */
          secondaire: "#6E6A5C",
        },
      },

      fontFamily: {
        /** Titres. */
        serif: ["var(--police-titres)", "Libre Baskerville", "Georgia", "serif"],
        /** Texte courant et interface. */
        sans: ["var(--police-texte)", "Karla", "system-ui", "sans-serif"],
      },

      screens: {
        /** Point de rupture principal du handoff : navigation et grilles. */
        nav: "900px",
        /** Point de rupture secondaire : les grilles de 4 passent à 1 colonne. */
        etroit: "620px",
      },

      maxWidth: {
        /** Largeur de contenu du handoff. */
        contenu: "1140px",
      },

      letterSpacing: {
        /** Sur-titres et étiquettes en capitales. */
        surtitre: "0.16em",
      },

      borderRadius: {
        /** Boutons et champs. Le reste est à angle vif. */
        DEFAULT: "2px",
      },
    },
  },
  plugins: [],
};

export default config;

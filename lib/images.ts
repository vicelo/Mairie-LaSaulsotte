/**
 * Catalogue des photographies du site.
 *
 * Toutes proviennent de Wikimedia Commons sous licence Creative Commons
 * BY-SA, qui impose de créditer l'auteur et de nommer la licence. Les
 * attributions sont publiées sur /mentions-legales ; ne jamais afficher une
 * image d'ici sans que son entrée figure dans ce catalogue.
 */

export interface Photo {
  /** Chemin public de l'image. */
  src: string;
  /** Texte alternatif — décrit l'image, ne commence pas par « Photo de ». */
  alt: string;
  /** Légende affichable sous l'image. */
  legende: string;
  auteur: string;
  licence: string;
  licenceUrl: string;
  /** Page source sur Wikimedia Commons. */
  source: string;
}

export const PHOTOS = {
  villagePanorama: {
    src: "/images/commune/village-panorama.jpg",
    alt: "Vue générale du village de La Saulsotte entouré de champs",
    legende: "Le village de La Saulsotte",
    auteur: "Thor19",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.fr",
    source: "https://commons.wikimedia.org/wiki/File:La_Saulsotte_village.jpg",
  },
  village01: {
    src: "/images/commune/village-01.jpg",
    alt: "Rue et habitations du bourg de La Saulsotte",
    legende: "Le bourg de La Saulsotte",
    auteur: "François GOGLINS",
    licence: "CC BY-SA 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.fr",
    source: "https://commons.wikimedia.org/wiki/File:La_Saulsotte-FR-10-village-01.JPG",
  },
  village02: {
    src: "/images/commune/village-02.jpg",
    alt: "Vue panoramique du village de La Saulsotte",
    legende: "Panorama sur La Saulsotte",
    auteur: "François GOGLINS",
    licence: "CC BY-SA 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.fr",
    source: "https://commons.wikimedia.org/wiki/File:La_Saulsotte-FR-10-village-02.JPG",
  },
  courtioux01: {
    src: "/images/commune/courtioux-01.jpg",
    alt: "Maisons du hameau de Courtioux",
    legende: "Le hameau de Courtioux",
    auteur: "Pline",
    licence: "CC BY-SA 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.fr",
    source: "https://commons.wikimedia.org/wiki/File:Courtioux_DSC_0011.JPG",
  },
  courtioux02: {
    src: "/images/commune/courtioux-02.jpg",
    alt: "Vue du hameau de Courtioux et de ses environs",
    legende: "Courtioux, l'un des hameaux de la commune",
    auteur: "Pline",
    licence: "CC BY-SA 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.fr",
    source: "https://commons.wikimedia.org/wiki/File:Courtioux_DSC_0014.JPG",
  },
  aireDeJeux: {
    src: "/images/commune/aire-de-jeux.jpg",
    alt: "Aire de jeux communale de La Saulsotte",
    legende: "L'aire de jeux communale",
    auteur: "François GOGLINS",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.fr",
    source: "https://commons.wikimedia.org/wiki/File:La_Saulsotte-FR-10-aire_de_jeux-a1.jpg",
  },
  amphoreResson: {
    src: "/images/commune/amphore-resson.jpg",
    alt: "Amphore gallo-romaine du IIe siècle découverte à Resson",
    legende: "Amphore du IIe siècle découverte à Resson, musée d'Épernay",
    auteur: "G. Garitan",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.fr",
    source:
      "https://commons.wikimedia.org/wiki/File:Amphore_locale_IIe_s_la_saulsotte_resson_1007779.jpg",
  },
  paruresCardium: {
    src: "/images/commune/parures-cardium.jpg",
    alt: "Parures néolithiques en coquilles de cardium trouvées à La Saulsotte",
    legende: "Parures néolithiques en coquilles de cardium découvertes sur la commune",
    auteur: "G. Garitan",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.fr",
    source:
      "https://commons.wikimedia.org/wiki/File:Parures_coquilles_de_cardium_la_saulsotte_76503.jpg",
  },
} as const satisfies Record<string, Photo>;

/** Liste à plat, pour la page de crédits. */
export const TOUTES_LES_PHOTOS: Photo[] = Object.values(PHOTOS);

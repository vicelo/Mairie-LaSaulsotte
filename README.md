# Mairie de La Saulsotte — Site Web

Site officiel de la commune de La Saulsotte (10), refonte complète.

## Stack technique

| Outil          | Version         | Rôle                       |
| -------------- | --------------- | -------------------------- |
| Next.js        | 14 (App Router) | Framework React full-stack |
| TypeScript     | 5               | Typage statique            |
| Tailwind CSS   | 3               | Styles utilitaires         |
| ESLint         | 8               | Linting                    |
| Prettier       | 3               | Formatage                  |
| Husky          | 9               | Hooks Git                  |
| GitHub Actions | —               | CI/CD                      |

## Prérequis

- Node.js 20+
- npm 10+

## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Scripts disponibles

```bash
npm run dev          # Serveur de développement (hot reload)
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # ESLint
npm run lint:fix     # ESLint avec corrections automatiques
npm run format       # Prettier (écriture)
npm run format:check # Prettier (vérification)
```

## Structure du projet

```
.
├── app/                  # App Router Next.js
│   ├── layout.tsx        # Layout racine (métadonnées, polices)
│   ├── page.tsx          # Page d'accueil
│   └── globals.css       # Styles globaux + tokens CSS
├── components/           # Composants React réutilisables
│   ├── ui/               # Composants UI atomiques (boutons, cartes…)
│   ├── layout/           # Header, Footer, Navigation
│   └── sections/         # Sections de pages (Hero, Actualités…)
├── content/              # Contenu statique / CMS local
│   ├── actualites/       # Articles d'actualité (MDX)
│   ├── pages/            # Contenu des pages statiques
│   └── documents/        # Documents téléchargeables
├── lib/                  # Utilitaires et helpers
├── types/                # Types TypeScript partagés
└── public/               # Assets statiques
    ├── images/           # Photos et illustrations
    ├── icons/            # Icônes SVG
    └── fonts/            # Polices locales
```

## Palette de couleurs

| Token         | Valeur    | Usage                             |
| ------------- | --------- | --------------------------------- |
| `primary`     | `#2a6010` | Vert village — couleur principale |
| `primary-100` | `#d4edbc` | Vert clair — fonds, badges        |
| `accent`      | `#f89522` | Orange vif — CTA, accents         |
| `accent-dark` | `#c44e17` | Orange foncé — hover, survol      |

Utilisation dans les classes Tailwind :

```tsx
<button className="bg-primary text-white hover:bg-primary-700">
  Voir les démarches
</button>
<span className="bg-primary-100 text-primary">Nouveau</span>
<a className="text-accent hover:text-accent-dark">En savoir plus →</a>
```

## CI/CD

Le pipeline GitHub Actions (`.github/workflows/ci.yml`) exécute à chaque push/PR :

1. **Lint** — ESLint + vérification Prettier
2. **TypeScript** — `tsc --noEmit`
3. **Build** — `next build` (dépend du lint)

## Hébergement cible

OVH / Infomaniak (export statique ou Node.js). **Pas de Vercel.**

Pour un export statique :

```js
// next.config.mjs
const nextConfig = {
  output: "export",
};
```

## Accessibilité

Le projet vise la conformité **RGAA 4.1** (Référentiel Général d'Amélioration de l'Accessibilité).

- Langue déclarée : `lang="fr"`
- Contrastes conformes WCAG AA minimum
- Navigation clavier testée

## Contribution

1. Créer une branche : `git checkout -b feature/ma-fonctionnalite`
2. Committer : `git commit -m "feat: description"`
3. Pousser et ouvrir une Pull Request vers `main`

Le hook pre-commit vérifie automatiquement le lint et le formatage.

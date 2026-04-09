import { test, expect } from "@playwright/test";

/**
 * Tests E2E — Navigation complète et accessibilité de base
 */

const PAGES = [
  { path: "/", title: "Mairie de La Saulsotte" },
  { path: "/actualites", title: "Actualités" },
  { path: "/contact", title: "Contact" },
  { path: "/demarches", title: "Démarches" },
  { path: "/urbanisme", title: "Urbanisme" },
  { path: "/vie-locale", title: "Vie locale" },
];

test.describe("Navigation principale", () => {
  for (const page of PAGES) {
    test(`${page.path} — chargement et titre`, async ({ page: pw }) => {
      const response = await pw.goto(page.path);
      await expect(pw).toHaveTitle(new RegExp(page.title, "i"));
      expect(response?.status()).toBeLessThan(400);
    });
  }

  test("Accueil — pas d'erreurs console JS", async ({ page: pw }) => {
    const errors: string[] = [];
    pw.on("pageerror", (err) => errors.push(err.message));
    await pw.goto("/");
    // Utiliser domcontentloaded pour éviter le timeout dû au chargement d'iframes externes
    await pw.waitForLoadState("domcontentloaded");
    await pw.waitForTimeout(1000);
    expect(errors).toHaveLength(0);
  });

  test("Header — skip link présent et fonctionnel", async ({ page: pw }) => {
    await pw.goto("/");
    const skipLink = pw.locator('a[href="#contenu-principal"]');
    await expect(skipLink).toBeAttached();
  });

  test("Header — logo avec aria-label", async ({ page: pw }) => {
    await pw.goto("/");
    const logoLink = pw.locator('header a[aria-label*="Mairie"]').first();
    await expect(logoLink).toBeVisible();
  });

  test("Navigation desktop — liens accessibles", async ({ page: pw }) => {
    await pw.setViewportSize({ width: 1280, height: 800 });
    await pw.goto("/actualites");
    const navLinks = pw.locator("nav ul li a");
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("Menu hamburger mobile — accessible", async ({ page: pw }) => {
    await pw.setViewportSize({ width: 375, height: 812 });
    await pw.goto("/");
    const hamburger = pw.locator('button[aria-controls="menu-mobile"]');
    await expect(hamburger).toBeVisible();
    await expect(hamburger).toHaveAttribute("aria-expanded", "false");
    await hamburger.click();
    await expect(hamburger).toHaveAttribute("aria-expanded", "true");
    await expect(pw.locator("#menu-mobile")).toBeVisible();
    await hamburger.click();
    await expect(hamburger).toHaveAttribute("aria-expanded", "false");
  });

  test("Menu hamburger — fermeture avec Escape", async ({ page: pw }) => {
    await pw.setViewportSize({ width: 375, height: 812 });
    await pw.goto("/");
    const hamburger = pw.locator('button[aria-controls="menu-mobile"]');
    await hamburger.click();
    await expect(pw.locator("#menu-mobile")).toBeVisible();
    await pw.keyboard.press("Escape");
    await expect(pw.locator("#menu-mobile")).toBeHidden();
  });
});

test.describe("aria-current sur la page active", () => {
  test("Accueil — aria-current=page sur le lien actif", async ({ page: pw }) => {
    await pw.setViewportSize({ width: 1280, height: 800 });
    await pw.goto("/actualites");
    // Le lien Actualités doit avoir aria-current="page"
    const currentLink = pw.locator('nav a[aria-current="page"]');
    await expect(currentLink).toHaveCount(1);
    await expect(currentLink).toHaveText(/Actualités/i);
  });
});

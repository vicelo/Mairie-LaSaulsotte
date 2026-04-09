import { test, expect } from "@playwright/test";

/**
 * Tests E2E — Section Actualités (liste + articles)
 */

test.describe("Actualités — Liste", () => {
  test("Page liste accessible et titre correct", async ({ page }) => {
    const response = await page.goto("/actualites");
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/Actualités/i);
  });

  test("Au moins un article affiché", async ({ page }) => {
    await page.goto("/actualites");
    // Les articles sont sous forme de cartes/liens
    const articles = page.locator('main a[href^="/actualites/"]');
    const count = await articles.count();
    expect(count).toBeGreaterThan(0);
  });

  test("Liens vers les articles fonctionnels", async ({ page }) => {
    await page.goto("/actualites");
    const firstArticle = page.locator('main a[href^="/actualites/"]').first();
    const href = await firstArticle.getAttribute("href");
    expect(href).toBeTruthy();

    const response = await page.goto(href!);
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("h1")).toBeVisible();
  });
});

test.describe("Actualités — Articles individuels", () => {
  const knownSlugs = [
    "conseil-municipal-avril-2026",
    "travaux-rue-de-la-paix",
    "collecte-dechets-verts-printemps",
  ];

  for (const slug of knownSlugs) {
    test(`Article ${slug} — accessible`, async ({ page }) => {
      const response = await page.goto(`/actualites/${slug}`);
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator("h1")).toBeVisible();
    });
  }

  test("Article 404 — page d'erreur correcte", async ({ page }) => {
    const response = await page.goto("/actualites/article-qui-nexiste-pas");
    expect(response?.status()).toBe(404);
  });
});

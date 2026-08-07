import { readdirSync } from "node:fs";
import { join } from "node:path";

import { test, expect } from "@playwright/test";

/**
 * Tests E2E — Section Actualités (liste + articles)
 */

/**
 * Slugs lus dans content/actualites plutôt que recopiés ici.
 *
 * Une liste figée casse la CI dès qu'une actualité est dépubliée — ce qui
 * est le travail quotidien de la mairie, pas une régression.
 */
const slugsActualites = readdirSync(join(process.cwd(), "content", "actualites"))
  .filter((fichier) => fichier.endsWith(".md"))
  .map((fichier) => fichier.replace(/\.md$/, ""));

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
  test("Au moins une actualité est publiée", () => {
    expect(slugsActualites.length).toBeGreaterThan(0);
  });

  for (const slug of slugsActualites) {
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

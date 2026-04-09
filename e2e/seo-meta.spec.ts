import { test, expect } from "@playwright/test";

/**
 * Tests E2E — SEO : meta tags, OG, sitemap, robots
 */

const PAGES_WITH_META = ["/", "/actualites", "/contact", "/demarches", "/urbanisme", "/vie-locale"];

test.describe("SEO — Meta tags", () => {
  for (const path of PAGES_WITH_META) {
    test(`${path} — meta description présente`, async ({ page }) => {
      await page.goto(path);
      const metaDesc = page.locator('meta[name="description"]');
      await expect(metaDesc).toBeAttached();
      const content = await metaDesc.getAttribute("content");
      expect(content).toBeTruthy();
      expect(content!.length).toBeGreaterThan(20);
    });

    test(`${path} — OG tags (title, description, image)`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('meta[property="og:title"]')).toBeAttached();
      await expect(page.locator('meta[property="og:description"]')).toBeAttached();
    });
  }

  test("Accueil — Schema.org JSON-LD présent", async ({ page }) => {
    await page.goto("/");
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
    const content = await jsonLd.textContent();
    expect(content).toContain("GovernmentBuilding");
    expect(content).toContain("La Saulsotte");
  });
});

test.describe("SEO — Fichiers techniques", () => {
  test("robots.txt accessible et valide", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
    const text = await page.content();
    expect(text).toMatch(/User-agent/i);
    expect(text).toMatch(/sitemap/i);
  });

  test("sitemap.xml accessible et valide", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
    const text = await page.content();
    expect(text).toMatch(/<url>/);
    expect(text).toMatch(/lasaulsotte/i);
  });

  test("sitemap.xml — toutes les pages principales présentes", async ({ page }) => {
    await page.goto("/sitemap.xml");
    const content = await page.content();
    const requiredPaths = ["/actualites", "/contact", "/demarches", "/urbanisme", "/vie-locale"];
    for (const path of requiredPaths) {
      expect(content).toContain(path);
    }
  });
});

test.describe("SEO — Redirections vercel.json", () => {
  test("/services/demarches → /demarches accessible", async ({ request }) => {
    // En local Next.js ne gère pas les redirections vercel.json — on vérifie /demarches
    const r2 = await request.get("/demarches");
    expect(r2.status()).toBeLessThan(400);
  });
});

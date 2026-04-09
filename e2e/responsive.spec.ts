import { test, expect } from "@playwright/test";

/**
 * Tests E2E — Responsive (mobile, tablette, desktop)
 */

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablette", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
];

const MAIN_PAGES = ["/", "/actualites", "/contact", "/demarches"];

for (const viewport of VIEWPORTS) {
  test.describe(`Responsive — ${viewport.name} (${viewport.width}px)`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const path of MAIN_PAGES) {
      test(`${path} — rendu correct sur ${viewport.name}`, async ({ page }) => {
        const response = await page.goto(path);
        expect(response?.status()).toBeLessThan(400);
        await expect(page.locator("header")).toBeVisible();
        await expect(page.locator("main, [role=main]")).toBeVisible();
        await expect(page.locator("footer")).toBeVisible();
      });
    }

    // Tailwind md: = ≥ 768px → hamburger masqué à partir de 768px
    if (viewport.width < 768) {
      test("Menu hamburger visible sur mobile", async ({ page }) => {
        await page.goto("/");
        const hamburger = page.locator('button[aria-controls="menu-mobile"]');
        await expect(hamburger).toBeVisible();
        await hamburger.click();
        await expect(page.locator("#menu-mobile")).toBeVisible();
      });
    } else {
      test("Navigation desktop visible", async ({ page }) => {
        await page.goto("/");
        // Sur ≥768px, le bouton hamburger est masqué
        const hamburger = page.locator('button[aria-controls="menu-mobile"]');
        await expect(hamburger).toBeHidden();
      });
    }
  });
}

test.describe("Responsive — Pas de scroll horizontal", () => {
  for (const viewport of VIEWPORTS) {
    test(`Pas de débordement horizontal sur ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/");
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 1);
    });
  }
});

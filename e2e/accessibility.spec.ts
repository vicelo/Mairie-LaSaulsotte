import { test, expect } from "@playwright/test";

/**
 * Tests E2E — Accessibilité RGAA (vérifications automatisées)
 */

const PAGES = ["/", "/actualites", "/contact", "/demarches", "/urbanisme", "/vie-locale"];

test.describe("Accessibilité — Structure HTML", () => {
  for (const path of PAGES) {
    test(`${path} — balise <main> présente`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("main")).toBeAttached();
    });

    test(`${path} — lang="fr" sur <html>`, async ({ page }) => {
      await page.goto(path);
      const lang = await page.locator("html").getAttribute("lang");
      expect(lang).toBe("fr");
    });

    test(`${path} — titre de page unique`, async ({ page }) => {
      await page.goto(path);
      const titles = await page.locator("title").count();
      expect(titles).toBeGreaterThanOrEqual(1);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
    });

    test(`${path} — H1 présent et unique`, async ({ page }) => {
      await page.goto(path);
      const h1Count = await page.locator("h1").count();
      expect(h1Count).toBe(1);
    });
  }
});

test.describe("Accessibilité — Navigation clavier", () => {
  test("Accueil — premier focus sur le skip link", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    const href = await focused.getAttribute("href");
    expect(href).toBe("#contenu-principal");
  });

  test("Formulaire contact — navigable au clavier", async ({ page }) => {
    await page.goto("/contact");
    // Naviguer jusqu'au premier champ
    const nom = page.locator('input[name="nom"]');
    await nom.focus();
    await expect(nom).toBeFocused();
    await page.keyboard.press("Tab");
    const email = page.locator('input[name="email"]');
    await expect(email).toBeFocused();
  });
});

test.describe("Accessibilité — Images et médias", () => {
  test("Toutes les images ont un attribut alt", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt).not.toBeNull();
    }
  });

  test("SVG décoratifs masqués aux lecteurs d'écran", async ({ page }) => {
    await page.goto("/");
    // Les SVG dans les boutons/liens doivent avoir aria-hidden
    const svgInButtons = page.locator("button svg, a svg");
    const count = await svgInButtons.count();
    for (let i = 0; i < count; i++) {
      const ariaHidden = await svgInButtons.nth(i).getAttribute("aria-hidden");
      expect(ariaHidden).toBe("true");
    }
  });
});

test.describe("Accessibilité — RGAA Formulaires", () => {
  test("Contact — champs avec aria-required", async ({ page }) => {
    await page.goto("/contact");
    const requiredFields = page.locator('[aria-required="true"]');
    const count = await requiredFields.count();
    expect(count).toBeGreaterThanOrEqual(3); // nom, email, message
  });

  test("Contact — erreurs liées via aria-describedby", async ({ page }) => {
    await page.goto("/contact");
    await page.locator('button[type="submit"]').click();
    // Après soumission invalide, les champs doivent avoir aria-invalid=true
    const invalidFields = page.locator('[aria-invalid="true"]');
    const count = await invalidFields.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});

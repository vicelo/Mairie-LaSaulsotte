import { test, expect } from "@playwright/test";

/**
 * Tests E2E — Formulaire de contact
 */

test.describe("Formulaire de contact", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("Formulaire visible avec les champs obligatoires", async ({ page }) => {
    await expect(page.locator('input[name="nom"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("Labels associés aux champs", async ({ page }) => {
    const nomLabel = page.locator('label[for="nom"]');
    await expect(nomLabel).toBeVisible();
    const emailLabel = page.locator('label[for="email"]');
    await expect(emailLabel).toBeVisible();
    const messageLabel = page.locator('label[for="message"]');
    await expect(messageLabel).toBeVisible();
  });

  test("Validation — erreurs si formulaire vide", async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    // Les erreurs doivent apparaître
    await expect(page.locator("#nom-error")).toBeVisible();
    await expect(page.locator("#email-error")).toBeVisible();
    await expect(page.locator("#message-error")).toBeVisible();
  });

  test("Validation — erreur email invalide", async ({ page }) => {
    await page.fill('input[name="nom"]', "Jean Dupont");
    await page.fill('input[name="email"]', "email-invalide");
    await page.fill('textarea[name="message"]', "Test message");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator("#email-error")).toBeVisible();
    await expect(page.locator("#email-error")).toContainText(/valide/i);
  });

  test("Envoi réussi — confirmation affichée", async ({ page }) => {
    await page.fill('input[name="nom"]', "Jean Dupont");
    await page.fill('input[name="email"]', "jean.dupont@example.fr");
    await page.fill('textarea[name="message"]', "Bonjour, ceci est un test.");
    await page.locator('button[type="submit"]').click();
    // Attendre le message de succès (simulation 1.2s) — sélectionner la div de succès spécifiquement
    const successAlert = page.locator('section[aria-labelledby="formulaire-titre"] [role="alert"]');
    await expect(successAlert).toBeVisible({ timeout: 5000 });
    await expect(successAlert).toContainText(/envoyé/i);
  });

  test("Coordonnées présentes", async ({ page }) => {
    // Les liens coordonnées sont dans la section aside (plusieurs instances possibles en page + footer)
    const coordSection = page.locator('section[aria-labelledby="coordonnees-titre"]');
    await expect(coordSection.locator('a[href^="tel:"]')).toBeVisible();
    await expect(coordSection.locator('a[href^="mailto:"]')).toBeVisible();
  });

  test("Iframe carte avec titre accessibilité", async ({ page }) => {
    const iframe = page.locator("iframe[title]");
    await expect(iframe).toBeAttached();
    await expect(iframe).toHaveAttribute("title", /.+/);
  });
});

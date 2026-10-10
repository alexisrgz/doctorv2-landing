import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { allRoutes, gotoReady } from "./helpers";

// 1. axe: cero violaciones WCAG 2 A/AA en todas las rutas (móvil y desktop).
for (const route of [...allRoutes, "/ruta-inexistente"]) {
  test(`axe sin violaciones en ${route}`, async ({ page }) => {
    await gotoReady(page, route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const summary = results.violations.map(
      (violation) =>
        `${violation.id} (${violation.impact}): ${violation.help}\n` +
        violation.nodes.map((node) => `    ${node.target.join(" ")}`).join("\n"),
    );
    expect(summary, summary.join("\n")).toEqual([]);
  });
}

test("menú móvil: aria-expanded, foco dentro, Esc y aria-current", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "desktop", "Solo en móvil");
  await gotoReady(page, "/servicios");
  const toggle = page.getByRole("button", { name: "Abrir menú" });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  const dialog = page.locator("dialog[open]");
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await expect(dialog.getByRole("link", { name: "Servicios y chequeos" })).toHaveAttribute("aria-current", "page");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  await toggle.click();
  await page.locator("dialog[open]").getByRole("link", { name: "El doctor" }).click();
  await expect(page).toHaveURL(/\/el-doctor$/);
  await expect(page.locator("dialog[open]")).toHaveCount(0);
});

test("skip link y un solo h1 por página", async ({ page }) => {
  for (const route of allRoutes) {
    await gotoReady(page, route);
    await expect(page.locator("h1"), route).toHaveCount(1);
  }
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Saltar al contenido" })).toBeFocused();
});

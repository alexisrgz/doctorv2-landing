import { expect, test } from "@playwright/test";
import { gotoReady } from "./helpers";

test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Header de escritorio");
});

test("1099px: marca, Agendar cita y botón de menú; sin navegación en línea", async ({ page }) => {
  await page.setViewportSize({ width: 1099, height: 800 });
  await gotoReady(page, "/");
  const header = page.locator("header");
  await expect(header.getByRole("navigation", { name: "Principal" })).toBeHidden();
  await expect(header.getByRole("button", { name: "Abrir menú" })).toBeVisible();
  await expect(header.getByRole("link", { name: /Agendar cita/ })).toBeVisible();
});

for (const width of [1100, 1180, 1280]) {
  test(`${width}px: navegación en línea con etiquetas cortas, sin encimarse`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await gotoReady(page, "/ubicacion");
    const header = page.locator("header");
    const nav = header.getByRole("navigation", { name: "Principal" });
    await expect(nav).toBeVisible();
    await expect(header.getByRole("button", { name: "Abrir menú" })).toBeHidden();

    const labels = await nav.getByRole("link").allInnerTexts();
    expect(labels).toEqual(["Inicio", "Servicios", "El doctor", "Tu primera consulta", "Ubicación"]);
    // El nombre accesible conserva el nombre completo.
    await expect(nav.getByRole("link", { name: "Ubicación y contacto" })).toHaveAttribute("aria-current", "page");
    await expect(nav.getByRole("link", { name: "Servicios y chequeos" })).toBeVisible();

    // Una sola fila: marca, navegación y botón no se enciman.
    const brand = await header.getByRole("link").first().boundingBox();
    const navBox = await nav.boundingBox();
    const book = await header.getByRole("link", { name: /Agendar cita/ }).boundingBox();
    expect(brand!.x + brand!.width).toBeLessThanOrEqual(navBox!.x);
    expect(navBox!.x + navBox!.width).toBeLessThanOrEqual(book!.x);
    expect(Math.round((await header.boundingBox())!.height)).toBeLessThanOrEqual(73);
    const overflow = await header.evaluate((element) => element.scrollWidth > element.clientWidth);
    expect(overflow).toBe(false);
  });
}

test("menú móvil y footer conservan los nombres completos", async ({ page }) => {
  await page.setViewportSize({ width: 1099, height: 800 });
  await gotoReady(page, "/");
  await page.getByRole("button", { name: "Abrir menú" }).click();
  const menuLabels = await page.locator("dialog[open] nav").getByRole("link").allInnerTexts();
  expect(menuLabels).toContain("Servicios y chequeos");
  expect(menuLabels).toContain("Ubicación y contacto");
  await page.keyboard.press("Escape");
  const footerLabels = await page.locator("footer nav").getByRole("link").allInnerTexts();
  expect(footerLabels).toContain("Servicios y chequeos");
  expect(footerLabels).toContain("Ubicación y contacto");
});

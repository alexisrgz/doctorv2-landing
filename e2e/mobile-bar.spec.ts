import { expect, test } from "@playwright/test";
import { gotoReady, isMobileProject, serviceRoutes } from "./helpers";

test.beforeEach(({}, testInfo) => {
  test.skip(!isMobileProject(testInfo.project.name), "Barra fija: solo móvil (390×664 y 360×600)");
});

// Grupo B: barra del detalle de servicio.
for (const route of serviceRoutes) {
  test(`barra de servicio en ${route}: visible desde el inicio, sin truncar y con ícono de llamar completo`, async ({
    page,
  }) => {
    await gotoReady(page, route);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    const bar = page.getByTestId("mobile-bar");
    await expect(bar).toHaveAttribute("data-visible", "true");
    await expect(bar).toBeVisible();

    const line1 = page.getByTestId("mobile-bar-line1");
    await expect(line1).toHaveText(/^Agendar · /);
    const fits = await line1.evaluate((element) => element.scrollWidth <= element.clientWidth);
    expect(fits, "la primera línea no debe truncarse").toBe(true);
    expect(await line1.evaluate((element) => getComputedStyle(element).fontWeight)).toBe("700");
    expect(await page.getByTestId("mobile-bar-line2").evaluate((element) => getComputedStyle(element).fontSize)).toBe("14px");

    const call = page.getByTestId("mobile-bar-call");
    await expect(call).toHaveAttribute("aria-label", "Llamar");
    const callBox = await call.boundingBox();
    expect(Math.round(callBox?.width ?? 0)).toBe(52);
    expect(Math.round(callBox?.height ?? 0)).toBe(52);
    const icon = await call.locator("svg").boundingBox();
    expect(icon?.width ?? 0).toBeGreaterThanOrEqual(20);
    expect(icon?.height ?? 0).toBeGreaterThanOrEqual(20);
  });
}

test("la barra de servicio se oculta mientras el botón de la tarjeta se ve completo", async ({ page }) => {
  await gotoReady(page, "/servicios/consulta-general");
  const bar = page.getByTestId("mobile-bar");
  await expect(bar).toHaveAttribute("data-visible", "true");

  await page.getByTestId("service-book").evaluate((element) => element.scrollIntoView({ block: "center" }));
  await expect(bar).toHaveAttribute("data-visible", "false");
  await expect(bar).toBeHidden();

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(bar).toHaveAttribute("data-visible", "true");
});

test("barra de servicio: la segunda línea y el href cambian juntos con la variante", async ({ page }) => {
  await gotoReady(page, "/servicios/certificado-medico");
  const line2 = page.getByTestId("mobile-bar-line2");
  const link = page.getByTestId("mobile-service-book");
  await expect(line2).toHaveText("Escolar o laboral · $350");
  await page.getByTestId("variant-option").filter({ hasText: "Deportivo" }).click();
  await expect(line2).toHaveText("Deportivo · $450");
  const text = new URL((await link.getAttribute("href")) ?? "").searchParams.get("text");
  expect(text).toContain("Certificado médico (Deportivo)");
});

test("servicio de una sola variante: la segunda línea muestra duración y precio", async ({ page }) => {
  await gotoReady(page, "/servicios/seguimiento-cronico");
  await expect(page.getByTestId("mobile-bar-line1")).toHaveText("Agendar · Seguimiento crónico");
  await expect(page.getByTestId("mobile-bar-line2")).toHaveText("40 min · $750");
  const text = new URL((await page.getByTestId("mobile-service-book").getAttribute("href")) ?? "").searchParams.get("text");
  expect(text).toContain("Seguimiento de enfermedades crónicas");
});

// Grupo C: la barra se oculta mientras el CTA de cierre o el footer están en pantalla.
test("al final de la home la barra no es visible", async ({ page }) => {
  await gotoReady(page, "/");
  const bar = page.getByTestId("mobile-bar");

  // A mitad de página (hero fuera, cierre lejos) la barra está visible.
  await page.getByRole("heading", { name: "Quién te atiende" }).evaluate((element) => element.scrollIntoView({ block: "start" }));
  await expect(bar).toHaveAttribute("data-visible", "true");

  // Cuando el CTA de cierre entra al viewport, se oculta.
  await page.getByTestId("closing-cta").evaluate((element) => element.scrollIntoView({ block: "end" }));
  await expect(bar).toHaveAttribute("data-visible", "false");

  // Al final de la página (footer), sigue oculta.
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(bar).toHaveAttribute("data-visible", "false");
  await expect(bar).toBeHidden();

  // Al volver a subir, regresa sin mover el layout.
  const before = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.getByRole("heading", { name: "Quién te atiende" }).evaluate((element) => element.scrollIntoView({ block: "start" }));
  await expect(bar).toHaveAttribute("data-visible", "true");
  expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBe(before);
});

test("en el detalle de servicio la barra se oculta al llegar al footer", async ({ page }) => {
  await gotoReady(page, "/servicios/chequeo-basico");
  const bar = page.getByTestId("mobile-bar");
  await expect(bar).toHaveAttribute("data-visible", "true");
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(bar).toHaveAttribute("data-visible", "false");
});

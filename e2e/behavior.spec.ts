import { expect, test, type Page } from "@playwright/test";
import { getBookingHref } from "../src/lib/booking";
import { allRoutes, gotoReady, mazatlan } from "./helpers";

// 7. Estado de horario consistente en chip, tarjeta de ubicación, footer y tabla.
async function statesAt(page: Page, when: Date) {
  await page.clock.setFixedTime(when);
  await gotoReady(page, "/");
  const home = {
    chip: await page.getByTestId("hero-open-status").getAttribute("data-open-state"),
    chipText: await page.getByTestId("hero-open-status").innerText(),
    card: await page.getByTestId("location-open-status").getAttribute("data-open-state"),
    cardText: await page.getByTestId("location-open-status").innerText(),
    footer: await page.getByTestId("footer-open-status").getAttribute("data-open-state"),
  };
  await gotoReady(page, "/ubicacion");
  const table = page.getByTestId("hours-table");
  const location = {
    table: await table.getAttribute("data-open-state"),
    todayRows: await table.locator('tr[data-today="true"]').evaluateAll((rows) => rows.map((row) => row.getAttribute("data-day"))),
    card: await page.getByTestId("location-open-status").getAttribute("data-open-state"),
    schedule: await page.getByTestId("schedule-open-status").getAttribute("data-open-state"),
  };
  return { home, location };
}

test.describe("estado de horario", () => {
  test("martes 10:00: todo abierto y martes resaltado", async ({ page }) => {
    const { home, location } = await statesAt(page, mazatlan("2026-10-13T10:00:00"));
    expect([home.chip, home.card, home.footer, location.table, location.card, location.schedule]).toEqual(Array(6).fill("open"));
    expect(home.chipText).toContain("Abierto hoy hasta las 19:00");
    expect(home.cardText).toBe(home.chipText);
    expect(location.todayRows).toEqual(["2"]);
  });

  test("domingo: todo cerrado y domingo resaltado", async ({ page }) => {
    const { home, location } = await statesAt(page, mazatlan("2026-10-11T12:00:00"));
    expect([home.chip, home.card, home.footer, location.table, location.card, location.schedule]).toEqual(Array(6).fill("closed"));
    expect(home.chipText).toContain("Cerrado");
    expect(location.todayRows).toEqual(["0"]);
  });

  test("sábado 15:00: cerrado y abre el lunes", async ({ page }) => {
    const { home, location } = await statesAt(page, mazatlan("2026-10-10T15:00:00"));
    expect([home.chip, home.card, home.footer, location.table]).toEqual(Array(4).fill("closed"));
    expect(home.chipText).toContain("Abre el lunes a las 9:00");
    expect(home.cardText).toBe(home.chipText);
    expect(location.todayRows).toEqual(["6"]);
  });

  test("el servidor no decide el estado (sin hydration mismatch)", async ({ request }) => {
    const html = await (await request.get("/")).text();
    expect(html).toContain("Consultando horario…");
    expect(html).not.toContain("Abierto hoy hasta");
  });
});

// 8. Selector de variante: precio, etiqueta y mensaje cambian a la vez.
test("selector de variante actualiza precio, botón y WhatsApp a la vez", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  await gotoReady(page, "/servicios/consulta-general");
  const price = page.getByTestId("variant-price");
  const button = page.getByTestId("service-book");
  const mobileButton = page.getByTestId("mobile-service-book");
  const textParam = async (locator: typeof button) =>
    new URL((await locator.getAttribute("href")) ?? "").searchParams.get("text") ?? "";

  await expect(price).toHaveText("$700");
  await expect(button).toContainText("Primera consulta · $700");
  expect(await textParam(button)).toContain("Consulta general (Primera consulta)");

  await page.getByTestId("variant-option").filter({ hasText: "Consulta de seguimiento" }).click();

  await expect(price).toHaveText("$550");
  await expect(button).toContainText("Consulta de seguimiento · $550");
  await expect(mobileButton).toContainText("Consulta de seguimiento · $550");
  expect(await textParam(button)).toBe(
    "Hola, me gustaría agendar: Consulta general (Consulta de seguimiento). ¿Qué horarios tienen disponibles?",
  );
  expect(await textParam(mobileButton)).toBe(await textParam(button));
  expect(consoleErrors).toEqual([]);
});

// 9. Todos los enlaces de WhatsApp llevan mensaje y pasan por BookingLink.
test("enlaces de cita: mensaje presente y sin wa.me en modo internal", async ({ page }) => {
  for (const route of allRoutes) {
    await gotoReady(page, route);
    const links = await page.locator("a[href]").evaluateAll((anchors) =>
      anchors
        .filter((anchor) => anchor.getAttribute("href")?.startsWith("https://wa.me") || anchor.hasAttribute("data-booking"))
        .map((anchor) => ({
          href: anchor.getAttribute("href") ?? "",
          booking: anchor.hasAttribute("data-booking"),
          service: anchor.getAttribute("data-booking-service") ?? undefined,
          variant: anchor.getAttribute("data-booking-variant") ?? undefined,
          target: anchor.getAttribute("target"),
          rel: anchor.getAttribute("rel"),
        })),
    );
    expect(links.length, route).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.booking, `${route}: enlace de WhatsApp fuera de BookingLink`).toBe(true);
      const text = new URL(link.href).searchParams.get("text");
      expect(text?.length, `${route}: wa.me sin mensaje`).toBeGreaterThan(20);
      expect(link.target).toBe("_blank");
      expect(link.rel).toContain("noopener");
      // El mismo enlace, generado por la misma función, en modo "internal".
      expect(link.href).toBe(getBookingHref({ service: link.service, variant: link.variant }, "whatsapp"));
      expect(getBookingHref({ service: link.service, variant: link.variant }, "internal")).not.toContain("wa.me");
    }
  }
});

// 12. sitemap, robots y og:image responden.
test("sitemap, robots, og:image y 404", async ({ page, request, baseURL }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const route of allRoutes) expect(xml).toContain(`${route === "/" ? "" : route}</loc>`);

  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap:");

  for (const route of allRoutes) {
    await page.goto(route);
    const og = await page.locator('meta[property="og:image"]').first().getAttribute("content");
    expect(og, route).toBeTruthy();
    const local = new URL(new URL(og!).pathname + new URL(og!).search, baseURL).toString();
    const image = await request.get(local);
    expect(image.status(), `${route} -> ${local}`).toBe(200);
    expect(image.headers()["content-type"]).toContain("image/png");
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical, route).toMatch(new RegExp(`${route === "/" ? "/?" : route}$`));
  }

  const missing = await request.get("/servicios/no-existe");
  expect(missing.status()).toBe(404);
});

test("JSON-LD por página", async ({ page }) => {
  const types = async (route: string) => {
    await page.goto(route);
    return page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) => scripts.map((script) => JSON.parse(script.textContent ?? "{}")["@type"]));
  };
  expect(await types("/")).toContain("Physician");
  expect(await types("/ubicacion")).toEqual(expect.arrayContaining(["Physician", "BreadcrumbList"]));
  expect(await types("/servicios/chequeo-basico")).toEqual(expect.arrayContaining(["Service", "BreadcrumbList"]));
  expect(await types("/preguntas-frecuentes")).toEqual(expect.arrayContaining(["FAQPage", "BreadcrumbList"]));
});

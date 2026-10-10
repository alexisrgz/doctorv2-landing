import type { Page } from "@playwright/test";
import { services } from "../src/data/services";

export const staticRoutes = [
  "/",
  "/servicios",
  "/el-doctor",
  "/primera-consulta",
  "/ubicacion",
  "/preguntas-frecuentes",
  "/aviso-de-privacidad",
];

export const serviceRoutes = services.map((service) => `/servicios/${service.slug}`);

export const allRoutes = [...staticRoutes, ...serviceRoutes];

/** Mazatlán es UTC-7 todo el año. */
export const mazatlan = (iso: string) => new Date(`${iso}-07:00`);

/** Navega y espera fuentes y el cálculo del estado de horario en el cliente. */
export async function gotoReady(page: Page, path: string) {
  const response = await page.goto(path, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page
    .locator('[data-open-state="loading"]')
    .first()
    .waitFor({ state: "detached", timeout: 5_000 })
    .catch(() => undefined);
  return response;
}

export function isMobileProject(name: string) {
  return name.startsWith("mobile");
}

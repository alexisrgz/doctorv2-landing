// Capturas para revisión manual (criterio 13).
// Uso: con el sitio corriendo (npm run build && npm run start), `npm run screenshots [ruta...]`.
// Guarda en ./screenshots/{ancho}x{alto}-{ruta}.png
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const routes = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["/", "/servicios/consulta-general", "/ubicacion"];
// VIEWPORTS="360x600,768x1024" para otros tamaños (menos de 1024 se emula como táctil).
const viewports = (process.env.VIEWPORTS ?? "390x664,1280x800").split(",").map((spec) => {
  const [width, height] = spec.split("x").map(Number);
  const mobile = width < 1024;
  return { width, height, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile };
});
const fullPage = process.env.FULL !== "0";

mkdirSync("screenshots", { recursive: true });
const browser = await chromium.launch();
for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.deviceScaleFactor,
    isMobile: viewport.isMobile,
    hasTouch: viewport.hasTouch,
    reducedMotion: "reduce",
    locale: "es-MX",
    timezoneId: "America/Mazatlan",
  });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    const slug = route === "/" ? "inicio" : route.replace(/^\//, "").replace(/\//g, "_");
    const file = `screenshots/${viewport.width}x${viewport.height}-${slug}.png`;
    await page.screenshot({ path: file, fullPage });
    console.log(file);
  }
  await context.close();
}
await browser.close();

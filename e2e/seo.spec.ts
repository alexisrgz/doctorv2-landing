import { expect, test } from "@playwright/test";
import { getSiteUrl } from "../src/lib/site-url";
import { allRoutes } from "./helpers";

// Grupo A: todas las URLs absolutas salen de getSiteUrl().
// El build de la prueba corre con el mismo entorno que este proceso, así que comparten host.
const siteUrl = getSiteUrl();
const siteHost = new URL(siteUrl).host;

test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Metadatos: basta un proyecto");
});

test("canonical, og:url y og:image usan el host de getSiteUrl()", async ({ page }) => {
  for (const route of allRoutes) {
    await page.goto(route);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    const noSlash = (url: string) => url.replace(/\/$/, "");
    expect(noSlash(canonical ?? ""), route).toBe(noSlash(new URL(route, `${siteUrl}/`).toString()));
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
    expect(new URL(ogUrl ?? "").host, route).toBe(siteHost);
    const ogImage = await page.locator('meta[property="og:image"]').first().getAttribute("content");
    expect(new URL(ogImage ?? "").host, route).toBe(siteHost);
    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) => scripts.map((script) => script.textContent ?? "").join("\n"));
    const hosts = [...jsonLd.matchAll(/"(https?:\/\/[^"/]+)/g)]
      .map((match) => new URL(match[1]!).host)
      .filter((host) => !["schema.org", "www.google.com", "wa.me"].includes(host));
    expect(new Set(hosts), route).toEqual(new Set(hosts.length ? [siteHost] : []));
  }
});

test("sitemap y robots solo contienen el host de getSiteUrl()", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]!);
  expect(locs.length).toBe(allRoutes.length);
  for (const loc of locs) expect(new URL(loc).host).toBe(siteHost);

  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain(`Sitemap: ${siteUrl}/sitemap.xml`);
});

test("getSiteUrl(): orden de resolución", () => {
  const saved = { ...process.env };
  try {
    process.env.NEXT_PUBLIC_SITE_URL = "https://drvillasenor.mx/";
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "proyecto.vercel.app";
    expect(getSiteUrl()).toBe("https://drvillasenor.mx");
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(getSiteUrl()).toBe("https://proyecto.vercel.app");
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
    expect(getSiteUrl()).toBe("http://localhost:3000");
  } finally {
    process.env = saved;
  }
});

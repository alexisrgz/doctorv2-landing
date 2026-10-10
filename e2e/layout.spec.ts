import { expect, test } from "@playwright/test";
import { allRoutes, gotoReady, isMobileProject } from "./helpers";

// 2. Sin overflow horizontal a 360, 390, 768 y 1280.
test("sin overflow horizontal en ningún ancho", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Recorre los cuatro anchos desde un solo proyecto");
  test.setTimeout(180_000);
  const failures: string[] = [];
  for (const width of [360, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    for (const route of allRoutes) {
      await gotoReady(page, route);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      if (scrollWidth > clientWidth) failures.push(`${width}px ${route}: ${scrollWidth} > ${clientWidth}`);
    }
  }
  expect(failures).toEqual([]);
});

// 3. Ningún texto visible menor a 12px (excluye solo lectores de pantalla).
test("ningún texto visible menor a 12px", async ({ page }) => {
  const failures: string[] = [];
  for (const route of allRoutes) {
    await gotoReady(page, route);
    const small = await page.evaluate(() => {
      const isScreenReaderOnly = (element: Element) =>
        element.closest(".sr-only") !== null ||
        (() => {
          const rect = element.getBoundingClientRect();
          return rect.width <= 1 && rect.height <= 1;
        })();
      const out: string[] = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const element = node.parentElement;
        if (!element || !node.textContent?.trim()) continue;
        if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(element.tagName)) continue;
        if (!element.checkVisibility({ visibilityProperty: true, opacityProperty: false })) continue;
        if (isScreenReaderOnly(element)) continue;
        const size = parseFloat(getComputedStyle(element).fontSize);
        if (size < 12) out.push(`${size}px "${node.textContent.trim().slice(0, 40)}"`);
      }
      return out;
    });
    failures.push(...small.map((item) => `${route}: ${item}`));
  }
  expect(failures).toEqual([]);
});

// 4. En móvil, botones y enlaces con área táctil ≥ 48×48 (excepto enlaces dentro de párrafos).
test("áreas táctiles de al menos 48×48 en móvil", async ({ page }, testInfo) => {
  test.skip(!isMobileProject(testInfo.project.name), "Solo en móvil");
  const failures: string[] = [];
  for (const route of allRoutes) {
    await gotoReady(page, route);
    const small = await page.evaluate(() => {
      const out: string[] = [];
      const targets = document.querySelectorAll<HTMLElement>("a[href], button, summary, label:has(> input)");
      for (const element of targets) {
        if (!element.checkVisibility({ visibilityProperty: true })) continue;
        if (element.closest("p, .sr-only")) continue;
        const rect = element.getBoundingClientRect();
        if (rect.width <= 1 && rect.height <= 1) continue;
        if (rect.width < 47.5 || rect.height < 47.5) {
          out.push(`${Math.round(rect.width)}×${Math.round(rect.height)} "${(element.innerText || element.getAttribute("aria-label") || "").trim().slice(0, 40)}"`);
        }
      }
      return out;
    });
    failures.push(...small.map((item) => `${route}: ${item}`));
  }
  expect(failures).toEqual([]);
});

// 5. Hero: CTAs completos dentro del viewport sin scroll (390×664 y 360×600).
test("CTAs del hero visibles sin scroll", async ({ page }, testInfo) => {
  test.skip(!isMobileProject(testInfo.project.name), "Criterio de móvil");
  await gotoReady(page, "/");
  const viewport = page.viewportSize();
  if (!viewport) throw new Error("Sin viewport");
  for (const id of ["hero-book", "hero-call"]) {
    const box = await page.getByTestId(id).boundingBox();
    expect(box, id).not.toBeNull();
    if (!box) continue;
    expect(box.x, id).toBeGreaterThanOrEqual(0);
    expect(box.y, id).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width, id).toBeLessThanOrEqual(viewport.width);
    expect(box.y + box.height, id).toBeLessThanOrEqual(viewport.height);
  }
});

test.describe("con movimiento activo", () => {
  test.use({ contextOptions: { reducedMotion: "no-preference" } });

  test("el escalonado del hero no oculta los CTAs más de 300ms", async ({ page }) => {
    await page.goto("/");
    const timing = await page.getByTestId("hero-ctas").evaluate((element) =>
      element.getAnimations().map((animation) => {
        const t = animation.effect?.getTiming();
        return { delay: Number(t?.delay ?? 0) };
      }),
    );
    for (const { delay } of timing) expect(delay).toBeLessThanOrEqual(250);
    await page.waitForTimeout(600);
    const opacity = await page.getByTestId("hero-ctas").evaluate((element) => Number(getComputedStyle(element).opacity));
    expect(opacity).toBe(1);
  });
});

// 6. Barra inferior: oculta al cargar, aparece tras el hero, no existe en ≥1024px.
test("barra inferior entra después del hero", async ({ page }, testInfo) => {
  await gotoReady(page, "/");
  const bar = page.getByTestId("mobile-bar");
  if (!isMobileProject(testInfo.project.name)) {
    await expect(bar).toBeHidden();
    expect(await bar.evaluate((element) => getComputedStyle(element).display)).toBe("none");
    return;
  }
  await expect(bar).toBeHidden();
  await expect(bar).toHaveAttribute("data-visible", "false");
  const heroBottom = await page.locator("[data-hero]").evaluate((element) => element.getBoundingClientRect().bottom + window.scrollY);
  await page.evaluate((y) => window.scrollTo(0, y + 40), heroBottom);
  await expect(bar).toHaveAttribute("data-visible", "true");
  await expect(bar).toBeVisible();
  await expect(bar.getByRole("link", { name: /Agendar cita/ })).toBeVisible();

  // Al llegar al final, el footer no queda tapado por la barra.
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  const notice = page.locator("footer").getByText("Sitio de demostración");
  const noticeBox = await notice.boundingBox();
  const barBox = await bar.boundingBox();
  expect(noticeBox && barBox && noticeBox.y + noticeBox.height <= barBox.y).toBe(true);
});

// 10. Forma firma: máximo una por pantalla.
test("nunca dos imágenes con forma firma visibles a la vez", async ({ page }) => {
  for (const route of allRoutes) {
    await gotoReady(page, route);
    const result = await page.evaluate(() => {
      const rects = [...document.querySelectorAll('[data-shape="signature"]')]
        .filter((element) => element.checkVisibility())
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return { top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY };
        })
        .sort((a, b) => a.top - b.top);
      const pairs: string[] = [];
      for (let i = 0; i < rects.length; i++) {
        for (let j = i + 1; j < rects.length; j++) {
          const first = rects[i]!;
          const second = rects[j]!;
          if (second.bottom - first.top <= window.innerHeight) pairs.push(`${i}-${j}`);
        }
      }
      return { count: rects.length, pairs };
    });
    expect(result.count, `${route}: más de una forma firma`).toBeLessThanOrEqual(1);
    expect(result.pairs, route).toEqual([]);
  }
});

// 11. Sin fotos duplicadas dentro de una misma página.
test("sin fotos duplicadas en una página", async ({ page }) => {
  for (const route of allRoutes) {
    await gotoReady(page, route);
    const names = await page.locator("[data-photo]").evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("data-photo")),
    );
    const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
    expect(duplicates, route).toEqual([]);
  }
});

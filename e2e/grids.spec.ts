import { expect, test, type Locator, type Page } from "@playwright/test";
import { columnsFor } from "../src/components/card-grid";
import { gotoReady } from "./helpers";

test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Rejillas de escritorio");
});

type CardBox = { top: number; height: number; meta: string };

async function cardBoxes(grid: Locator): Promise<CardBox[]> {
  return grid.locator('[data-testid="service-card"]').evaluateAll((cards) =>
    cards.map((card) => {
      const rect = card.getBoundingClientRect();
      const meta = card.querySelector('[data-testid="service-card-meta"]');
      return {
        top: Math.round(rect.top + window.scrollY),
        height: Math.round(rect.height),
        meta: meta ? getComputedStyle(meta).flexDirection : "",
      };
    }),
  );
}

function rows(boxes: CardBox[]): CardBox[][] {
  const byTop = new Map<number, CardBox[]>();
  for (const box of boxes) byTop.set(box.top, [...(byTop.get(box.top) ?? []), box]);
  return [...byTop.values()];
}

async function expectUniformGrid(page: Page, grid: Locator, label: string) {
  const boxes = await cardBoxes(grid);
  const gridRows = rows(boxes);
  const perRow = gridRows.map((row) => row.length);
  // Filas completas: todas con el mismo número de tarjetas, y nunca una sola si hay más de una.
  expect(new Set(perRow).size, `${label}: filas ${perRow.join(", ")}`).toBe(1);
  if (boxes.length > 1) expect(perRow[0], label).toBeGreaterThan(1);
  // Mismo formato de duración/precio en toda la rejilla: apilado solo con 4 columnas.
  const expected = perRow[0] === 4 ? "column" : "row";
  expect(new Set(boxes.map((box) => box.meta)), label).toEqual(new Set([expected]));
  // Alturas alineadas por fila.
  for (const row of gridRows) expect(new Set(row.map((box) => box.height)).size, `${label}: alturas`).toBe(1);
  return perRow[0];
}

for (const width of [1280, 1568]) {
  test(`/servicios a ${width}px: cada grupo en filas completas y con formato uniforme`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await gotoReady(page, "/servicios");
    const grids = page.getByTestId("service-grid");
    const count = await grids.count();
    expect(count).toBe(2);
    for (let index = 0; index < count; index++) {
      const grid = grids.nth(index);
      const cards = await grid.locator('[data-testid="service-card"]').count();
      const perRow = await expectUniformGrid(page, grid, `grupo ${index + 1}`);
      expect(perRow).toBe(columnsFor(cards));
    }
  });

  test(`inicio a ${width}px: servicios destacados con formato uniforme`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await gotoReady(page, "/");
    const grid = page.getByRole("list", { name: "Servicios más solicitados" });
    expect(await expectUniformGrid(page, grid, "destacados")).toBe(4);
  });
}

test("inicio: cédula y años comparten fila; enfoque ocupa su propia fila", async ({ page }) => {
  await gotoReady(page, "/");
  const facts = await page.getByTestId("doctor-fact").evaluateAll((items) =>
    items.map((item) => {
      const rect = item.getBoundingClientRect();
      const dd = item.querySelector("dd");
      const lines = dd ? Math.round(dd.getBoundingClientRect().height / parseFloat(getComputedStyle(dd).lineHeight)) : 0;
      return { top: Math.round(rect.top), width: Math.round(rect.width), lines };
    }),
  );
  const listWidth = await page.getByTestId("doctor-facts").evaluate((element) => Math.round(element.getBoundingClientRect().width));
  const [license, years, focus] = facts;
  expect(license?.top).toBe(years?.top);
  expect(focus!.top).toBeGreaterThan(license!.top);
  expect(focus!.width).toBe(listWidth);
  for (const fact of facts) expect(fact.lines).toBeLessThanOrEqual(2);
});

test("columnsFor: nunca deja una tarjeta sola en la última fila", () => {
  expect([1, 2, 3, 4, 5, 6, 7, 8, 9].map(columnsFor)).toEqual([1, 2, 3, 4, 3, 3, 4, 4, 3]);
  for (let count = 2; count <= 12; count++) expect(count % columnsFor(count), `count ${count}`).not.toBe(1);
});

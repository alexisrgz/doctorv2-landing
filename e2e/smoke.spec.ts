import { expect, test } from "@playwright/test";

test("la página de inicio responde", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1);
});

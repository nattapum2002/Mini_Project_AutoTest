const { test, expect } = require("@playwright/test");

test("ViewTheSlide", async ({ page }) => {
  await page.goto("http://tms.free.nf/");
  await page.waitForLoadState("networkidle");

  await page.getByLabel("Slide 2").click();
  await page.waitForTimeout(2000);

  await expect(page.locator(".slide2")).toBeVisible();

  await page.getByLabel("Slide 3").click();
  await page.waitForTimeout(2000);

  await expect(page.locator(".slide3")).toBeVisible();

  await page.getByLabel("Slide 1").click();
  await page.waitForTimeout(2000);

  await expect(page.locator(".slide1")).toBeVisible();
});

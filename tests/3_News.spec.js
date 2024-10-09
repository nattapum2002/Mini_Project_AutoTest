const { test, expect } = require("@playwright/test");

test("SearchForNews", async ({ page }) => {
  await page.goto("http://tms.free.nf/News");
  await page.waitForLoadState("networkidle");

  await page.getByPlaceholder("ค้นหาข่าว").fill("Merry Christmas");
  await page.waitForTimeout(2000);
  await expect(page.locator("#menu-news")).toBeVisible();
});

test("FilterTheLatestNews", async ({ page }) => {
  await page.goto("http://tms.free.nf/News");
  await page.waitForLoadState("networkidle");

  await page.getByRole("combobox").first().selectOption("asc");
  await page.waitForTimeout(2000);

  await page.getByRole("combobox").first().selectOption("desc");
  await page.waitForTimeout(2000);
  await expect(page.locator("#menu-news")).toBeVisible();
});

test("FilterTheOldestNews", async ({ page }) => {
  await page.goto("http://tms.free.nf/News");
  await page.waitForLoadState("networkidle");

  await page.getByRole("combobox").first().selectOption("asc");
  await page.waitForTimeout(2000);
  await expect(page.locator("#menu-news")).toBeVisible();
});

test("FilterTheNewsTypes", async ({ page }) => {
  await page.goto("http://tms.free.nf/News");
  await page.waitForLoadState("networkidle");

  await page.getByRole("combobox").nth(1).selectOption("ชื่อหัวข้อ");
  await page.waitForTimeout(2000);
  await expect(page.locator("#menu-news")).toBeVisible();

  await page.getByRole("combobox").nth(1).selectOption("ข่าวทั่วไป");
  await page.waitForTimeout(2000);
  await expect(page.locator("#menu-news")).toBeVisible();
});

test("ViewTheNews", async ({ page }) => {
  await page.goto("http://tms.free.nf/News");
  await page.waitForLoadState("networkidle");

  await page.getByRole("link", { name: "ข่าวทั่วไป Merry Christmas" }).click();
  await page.waitForLoadState("networkidle");

  await expect(page.locator("#detail-news")).toBeVisible();
});

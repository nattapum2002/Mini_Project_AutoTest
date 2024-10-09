const { test, expect } = require("@playwright/test");

test("SearchForArticles", async ({ page }) => {
  await page.goto("http://tms.free.nf/Thesis");
  await page.waitForLoadState("networkidle");

  await page.getByPlaceholder("ค้นหาบทความ").fill("โปรแกรม");
  await page.waitForTimeout(2000);

  await expect(
    page.getByRole("link", { name: "test โปรแกรม วันที่ 30" })
  ).toBeVisible();
});

test("FilterTheLatestArticles", async ({ page }) => {
  await page.goto("http://tms.free.nf/Thesis");
  await page.waitForLoadState("networkidle");

  await page.getByRole("combobox").first().selectOption("asc");
  await page.waitForTimeout(2000);
  await expect(page.locator("#menu-thesis")).toBeVisible();

  await page.getByRole("combobox").first().selectOption("desc");
  await page.waitForTimeout(2000);
  await expect(page.locator("#menu-thesis")).toBeVisible();
});

test("FilterTheOldestArticles", async ({ page }) => {
  await page.goto("http://tms.free.nf/Thesis");
  await page.waitForLoadState("networkidle");

  await page.getByRole("combobox").first().selectOption("asc");
  await page.waitForTimeout(2000);
  await expect(page.locator("#menu-thesis")).toBeVisible();
});

test("FilterTheArticleTypes", async ({ page }) => {
  await page.goto("http://tms.free.nf/Thesis");
  await page.waitForLoadState("networkidle");

  await page.getByRole("combobox").nth(1).selectOption("ระบบ");
  await page.waitForTimeout(2000);
  await expect(page.locator("#menu-thesis")).toBeVisible();
});

test("ViewTheThesisArticles", async ({ page }) => {
  await page.goto("http://tms.free.nf/Thesis");
  await page.waitForLoadState("networkidle");

  await page
    .getByRole("link", {
      name: "ระบบ ระบบจัดการปริญญานิพนธ์สอบจบ วันที่ 8 ตุลาคม พ.ศ.2567",
    })
    .click();
  await page.waitForTimeout(2000);
  await expect(page.locator("#detail-thesis")).toBeVisible();
});

test("DownloadThePDF", async ({ page }) => {
  await page.goto("http://tms.free.nf/Thesis");
  await page.waitForLoadState("networkidle");

  await page
    .getByRole("link", {
      name: "ระบบ ระบบจัดการปริญญานิพนธ์สอบจบ วันที่ 8 ตุลาคม พ.ศ.2567",
    })
    .click();
  await page.waitForLoadState("networkidle");

  await page.getByRole("link", { name: "PDF" }).click();
  await page.waitForTimeout(2000);
});

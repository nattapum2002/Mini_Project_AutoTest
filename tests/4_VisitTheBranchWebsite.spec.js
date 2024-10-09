const { test, expect } = require("@playwright/test");

test("VisitTheBranchWebsite", async ({ page }) => {
  await page.goto("http://tms.free.nf/");
  await page.waitForLoadState("networkidle");

  const pagePromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "เกี่ยวกับสาขา" }).click();
  const page = await pagePromise;
  await expect(page.locator("body")).toBeVisible();
});

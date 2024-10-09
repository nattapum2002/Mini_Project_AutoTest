const { test, expect } = require("@playwright/test");

test("VisitBranchWebsite", async ({ page }) => {
  await page.goto("http://tms.free.nf/");
  await page.waitForLoadState("networkidle");

  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "เกี่ยวกับสาขา" }).click();
  const page1 = await page1Promise;

  await expect(page1.locator("body")).toBeVisible();
  await page1.waitForLoadState("networkidle");
});

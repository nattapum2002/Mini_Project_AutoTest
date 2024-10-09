const { test, expect } = require("@playwright/test");

test("LoginPass", async ({ page }) => {
  await page.goto("http://tms.free.nf/Login/Member");
  await page.waitForLoadState("networkidle");

  await page.getByLabel("ชื่อผู้ใช้").fill("nattapum");
  await page.getByLabel("รหัสผ่าน").fill("password");

  await page
    .locator("#login-member")
    .getByRole("button", { name: "เข้าสู่ระบบ" })
    .click();
  await page.waitForLoadState("networkidle");

  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});

test("LoginFailUsername", async ({ page }) => {
  await page.goto("http://tms.free.nf/Login/Member");
  await page.waitForLoadState("networkidle");

  await page.getByLabel("ชื่อผู้ใช้").fill("nattapums");
  await page.getByLabel("รหัสผ่าน").fill("password");

  await page
    .locator("#login-member")
    .getByRole("button", { name: "เข้าสู่ระบบ" })
    .click();
  await page.waitForTimeout(2000);

  await expect(
    page.getByText("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
  ).toBeVisible();
});

test("LoginFailPassword", async ({ page }) => {
  await page.goto("http://tms.free.nf/Login/Member");
  await page.waitForLoadState("networkidle");

  await page.getByLabel("ชื่อผู้ใช้").fill("nattapum");
  await page.getByLabel("รหัสผ่าน").fill("passwords");

  await page
    .locator("#login-member")
    .getByRole("button", { name: "เข้าสู่ระบบ" })
    .click();
  await page.waitForTimeout(2000);

  await expect(
    page.getByText("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
  ).toBeVisible();
});

test("LoginFailUsernameAndPassword", async ({ page }) => {
  await page.goto("http://tms.free.nf/Login/Member");
  await page.waitForLoadState("networkidle");

  await page.getByLabel("ชื่อผู้ใช้").fill("nattapums");
  await page.getByLabel("รหัสผ่าน").fill("passwords");

  await page
    .locator("#login-member")
    .getByRole("button", { name: "เข้าสู่ระบบ" })
    .click();
  await page.waitForTimeout(2000);

  await expect(
    page.getByText("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
  ).toBeVisible();
});

const { test, expect } = require("@playwright/test");

test("Register", async ({ page }) => {
  await page.goto("http://tms.free.nf/Register");
  await page.waitForLoadState("networkidle");

  await page.getByLabel("คำนำหน้าชื่อ").selectOption("นาย");
  await page.getByPlaceholder("กรุณากรอกชื่อ").fill("Auto");
  await page.getByPlaceholder("นามสกุล").fill("test");
  await page.getByRole("combobox").nth(1).selectOption("3");
  await page.getByLabel("ระดับ").selectOption("2");
  await page.getByPlaceholder("*ไม่จำเป็นต้องใส่ขีด").fill("642221101003"); //รหัสนักศึกษาต้องไม่ซ้ำกัน
  await page.getByPlaceholder("เบอร์โทรศัพท์").fill("0985457850");
  await page.getByPlaceholder("*อีเมลมหาลัย").fill("Aut@rmuti.ac.th"); //อีเมลต้องไม่ซ้ำกัน
  await page.getByPlaceholder("ชื่อผู้ใช้").fill("Auto"); //ชื่อผู้ใช้ต้องไม่ซ้ำกัน
  await page.getByPlaceholder("รหัสผ่าน", { exact: true }).fill("password");
  await page.getByPlaceholder("ยืนยันรหัสผ่าน").fill("password");
  await page.getByRole("button", { name: "ยืนยัน" }).click();
  await page.waitForLoadState("networkidle");

  await expect(page.getByText("สมัครสมาชิกสำเร็จ!")).toBeVisible();
});

test("RegisterFailNotSelectingTitle", async ({ page }) => {
  await page.goto("http://tms.free.nf/Register");
  await page.waitForLoadState("networkidle");

  await page.getByPlaceholder("กรุณากรอกชื่อ").fill("Auto");
  await page.getByPlaceholder("นามสกุล").fill("test");
  await page.getByRole("combobox").nth(1).selectOption("3");
  await page.getByLabel("ระดับ").selectOption("2");
  await page.getByPlaceholder("*ไม่จำเป็นต้องใส่ขีด").fill("642221101005");
  await page.getByPlaceholder("เบอร์โทรศัพท์").fill("0985457852");
  await page.getByPlaceholder("*อีเมลมหาลัย").fill("Auto5@rmuti.ac.th");
  await page.getByPlaceholder("ชื่อผู้ใช้").fill("Auto5");
  await page.getByPlaceholder("รหัสผ่าน", { exact: true }).fill("password");
  await page.getByPlaceholder("ยืนยันรหัสผ่าน").fill("password");
  await page.getByRole("button", { name: "ยืนยัน" }).click();
  await page.waitForTimeout(2000);

  await expect(page.getByText("กรุณาเลือกคํานําหน้า")).toBeVisible();
});

test("RegisterFailNotFillingName", async ({ page }) => {
  await page.goto("http://tms.free.nf/Register");
  await page.waitForLoadState("networkidle");

  await page.getByLabel("คำนำหน้าชื่อ").selectOption("นาย");

  await page.getByPlaceholder("นามสกุล").fill("test");
  await page.getByRole("combobox").nth(1).selectOption("3");
  await page.getByLabel("ระดับ").selectOption("2");
  await page.getByPlaceholder("*ไม่จำเป็นต้องใส่ขีด").fill("642221101005");
  await page.getByPlaceholder("เบอร์โทรศัพท์").fill("0985457852");
  await page.getByPlaceholder("*อีเมลมหาลัย").fill("Auto5@rmuti.ac.th");
  await page.getByPlaceholder("ชื่อผู้ใช้").fill("Auto5");
  await page.getByPlaceholder("รหัสผ่าน", { exact: true }).fill("password");
  await page.getByPlaceholder("ยืนยันรหัสผ่าน").fill("password");
  await page.getByRole("button", { name: "ยืนยัน" }).click();
  await page.waitForTimeout(2000);

  await expect(page.getByText("กรุณากรอกชื่อ", { exact: true })).toBeVisible();
});

test("RegisterFailNotFillingSurname", async ({ page }) => {
  await page.goto("http://tms.free.nf/Register");
  await page.waitForLoadState("networkidle");

  await page.getByLabel("คำนำหน้าชื่อ").selectOption("นาย");
  await page.getByPlaceholder("กรุณากรอกชื่อ").fill("Auto");

  await page.getByRole("combobox").nth(1).selectOption("3");
  await page.getByLabel("ระดับ").selectOption("2");
  await page.getByPlaceholder("*ไม่จำเป็นต้องใส่ขีด").fill("642221101005");
  await page.getByPlaceholder("เบอร์โทรศัพท์").fill("0985457852");
  await page.getByPlaceholder("*อีเมลมหาลัย").fill("Auto5@rmuti.ac.th");
  await page.getByPlaceholder("ชื่อผู้ใช้").fill("Auto5");
  await page.getByPlaceholder("รหัสผ่าน", { exact: true }).fill("password");
  await page.getByPlaceholder("ยืนยันรหัสผ่าน").fill("password");
  await page.getByRole("button", { name: "ยืนยัน" }).click();
  await page.waitForTimeout(2000);

  await expect(page.getByText("กรุณากรอกนามสกุล")).toBeVisible();
});

test("RegisterFailFillingIDRepeatedly", async ({ page }) => {
  await page.goto("http://tms.free.nf/Register");
  await page.waitForLoadState("networkidle");

  await page.getByLabel("คำนำหน้าชื่อ").selectOption("นาย");
  await page.getByPlaceholder("กรุณากรอกชื่อ").fill("Auto");
  await page.getByPlaceholder("นามสกุล").fill("test");
  await page.getByRole("combobox").nth(1).selectOption("3");
  await page.getByLabel("ระดับ").selectOption("2");
  await page.getByPlaceholder("*ไม่จำเป็นต้องใส่ขีด").fill("642221101000");
  await page.getByPlaceholder("เบอร์โทรศัพท์").fill("0985457852");
  await page.getByPlaceholder("*อีเมลมหาลัย").fill("Auto5@rmuti.ac.th");
  await page.getByPlaceholder("ชื่อผู้ใช้").fill("Auto5");
  await page.getByPlaceholder("รหัสผ่าน", { exact: true }).fill("password");
  await page.getByPlaceholder("ยืนยันรหัสผ่าน").fill("password");
  await page.getByRole("button", { name: "ยืนยัน" }).click();
  await page.waitForTimeout(2000);

  await expect(page.getByText("รหัสนักศึกษาซ้ํา")).toBeVisible();
});

test("RegisterFailNotFillingPhone", async ({ page }) => {
  await page.goto("http://tms.free.nf/Register");
  await page.waitForLoadState("networkidle");

  await page.getByLabel("คำนำหน้าชื่อ").selectOption("นาย");
  await page.getByPlaceholder("กรุณากรอกชื่อ").fill("Auto");
  await page.getByPlaceholder("นามสกุล").fill("test");
  await page.getByRole("combobox").nth(1).selectOption("3");
  await page.getByLabel("ระดับ").selectOption("2");
  await page.getByPlaceholder("*ไม่จำเป็นต้องใส่ขีด").fill("642221101005");

  await page.getByPlaceholder("*อีเมลมหาลัย").fill("Auto5@rmuti.ac.th");
  await page.getByPlaceholder("ชื่อผู้ใช้").fill("Auto5");
  await page.getByPlaceholder("รหัสผ่าน", { exact: true }).fill("password");
  await page.getByPlaceholder("ยืนยันรหัสผ่าน").fill("password");
  await page.getByRole("button", { name: "ยืนยัน" }).click();
  await page.waitForTimeout(2000);

  await expect(page.getByText("กรุณากรอกเบอร์โทรศัพท์")).toBeVisible();
});

test("RegisterFailFillingEmailRepeatedly", async ({ page }) => {
  await page.goto("http://tms.free.nf/Register");
  await page.waitForLoadState("networkidle");

  await page.getByLabel("คำนำหน้าชื่อ").selectOption("นาย");
  await page.getByPlaceholder("กรุณากรอกชื่อ").fill("Auto");
  await page.getByPlaceholder("นามสกุล").fill("test");
  await page.getByRole("combobox").nth(1).selectOption("3");
  await page.getByLabel("ระดับ").selectOption("2");
  await page.getByPlaceholder("*ไม่จำเป็นต้องใส่ขีด").fill("642221101005");
  await page.getByPlaceholder("เบอร์โทรศัพท์").fill("0985457852");
  await page.getByPlaceholder("*อีเมลมหาลัย").fill("Auto@rmuti.ac.th");
  await page.getByPlaceholder("ชื่อผู้ใช้").fill("Auto5");
  await page.getByPlaceholder("รหัสผ่าน", { exact: true }).fill("password");
  await page.getByPlaceholder("ยืนยันรหัสผ่าน").fill("password");
  await page.getByRole("button", { name: "ยืนยัน" }).click();
  await page.waitForTimeout(2000);

  await expect(page.getByText("อีเมลซ้ํา")).toBeVisible();
});

test("RegisterFailFillingUsernameRepeatedly", async ({ page }) => {
  await page.goto("http://tms.free.nf/Register");
  await page.waitForLoadState("networkidle");

  await page.getByLabel("คำนำหน้าชื่อ").selectOption("นาย");
  await page.getByPlaceholder("กรุณากรอกชื่อ").fill("Auto");
  await page.getByPlaceholder("นามสกุล").fill("test");
  await page.getByRole("combobox").nth(1).selectOption("3");
  await page.getByLabel("ระดับ").selectOption("2");
  await page.getByPlaceholder("*ไม่จำเป็นต้องใส่ขีด").fill("642221101005");
  await page.getByPlaceholder("เบอร์โทรศัพท์").fill("0985457852");
  await page.getByPlaceholder("*อีเมลมหาลัย").fill("Auto5@rmuti.ac.th");
  await page.getByPlaceholder("ชื่อผู้ใช้").fill("Auto");
  await page.getByPlaceholder("รหัสผ่าน", { exact: true }).fill("password");
  await page.getByPlaceholder("ยืนยันรหัสผ่าน").fill("password");
  await page.getByRole("button", { name: "ยืนยัน" }).click();
  await page.waitForTimeout(2000);

  await expect(page.getByText("ชื่อผู้ใช้งานซ้ํา")).toBeVisible();
});

test("RegisterFailNotFillingPassword", async ({ page }) => {
  await page.goto("http://tms.free.nf/Register");
  await page.waitForLoadState("networkidle");

  await page.getByLabel("คำนำหน้าชื่อ").selectOption("นาย");
  await page.getByPlaceholder("กรุณากรอกชื่อ").fill("Auto");
  await page.getByPlaceholder("นามสกุล").fill("test");
  await page.getByRole("combobox").nth(1).selectOption("3");
  await page.getByLabel("ระดับ").selectOption("2");
  await page.getByPlaceholder("*ไม่จำเป็นต้องใส่ขีด").fill("642221101005");
  await page.getByPlaceholder("เบอร์โทรศัพท์").fill("0985457852");
  await page.getByPlaceholder("*อีเมลมหาลัย").fill("Auto5@rmuti.ac.th");
  await page.getByPlaceholder("ชื่อผู้ใช้").fill("Auto5");

  await page.getByRole("button", { name: "ยืนยัน" }).click();
  await page.waitForTimeout(2000);

  await expect(page.getByText("กรุณากรอกรหัสผ่าน")).toBeVisible();
});

test("RegisterFailFillingMismatchedPassword", async ({ page }) => {
  await page.goto("http://tms.free.nf/Register");
  await page.waitForLoadState("networkidle");

  await page.getByLabel("คำนำหน้าชื่อ").selectOption("นาย");
  await page.getByPlaceholder("กรุณากรอกชื่อ").fill("Auto");
  await page.getByPlaceholder("นามสกุล").fill("test");
  await page.getByRole("combobox").nth(1).selectOption("3");
  await page.getByLabel("ระดับ").selectOption("2");
  await page.getByPlaceholder("*ไม่จำเป็นต้องใส่ขีด").fill("642221101005");
  await page.getByPlaceholder("เบอร์โทรศัพท์").fill("0985457852");
  await page.getByPlaceholder("*อีเมลมหาลัย").fill("Auto5@rmuti.ac.th");
  await page.getByPlaceholder("ชื่อผู้ใช้").fill("Auto5");
  await page.getByPlaceholder("รหัสผ่าน", { exact: true }).fill("password");
  await page.getByPlaceholder("ยืนยันรหัสผ่าน").fill("passwords");
  await page.getByRole("button", { name: "ยืนยัน" }).click();
  await page.waitForTimeout(2000);

  await expect(page.getByText("รหัสผ่านไม่ตรงกัน")).toBeVisible();
});

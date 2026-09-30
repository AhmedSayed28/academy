import { expect, test, type Page } from "@playwright/test";

async function completeForm(page: Page) {
  await page.getByLabel("Full name").fill("Test Learner");
  await page.getByLabel("Email address").fill("learner@example.com");
  await page.getByLabel("Phone number").fill("+20 100 000 0000");
  await page.getByLabel("What would you like to learn?").fill("Practical engineering skills");
}

test("validates fields in the browser without sending invalid data", async ({ page }) => {
  let requestCount = 0;
  await page.route("**/api/leads", async (route) => {
    requestCount += 1;
    await route.abort();
  });
  await page.goto("/en/register-interest");

  await page.getByRole("button", { name: "Register interest" }).click();

  await expect(page.getByText("Enter your full name.")).toBeVisible();
  await expect(page.getByText("Enter your email address.")).toBeVisible();
  expect(requestCount).toBe(0);
});

test("stores one submission when the form is accidentally submitted twice", async ({ page }) => {
  let requestCount = 0;
  let submittedBody: Record<string, unknown> | undefined;
  await page.route("**/api/leads", async (route) => {
    requestCount += 1;
    submittedBody = route.request().postDataJSON() as Record<string, unknown>;
    await new Promise((resolve) => setTimeout(resolve, 100));
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: { submitted: true } }),
    });
  });
  await page.goto("/en/register-interest");
  await completeForm(page);

  await page.locator("form").evaluate((form) => {
    (form as HTMLFormElement).requestSubmit();
    (form as HTMLFormElement).requestSubmit();
  });

  await expect(page.getByRole("status")).toContainText("interest has been registered");
  expect(requestCount).toBe(1);
  expect(submittedBody).toMatchObject({
    fullName: "Test Learner",
    email: "learner@example.com",
    phone: "+20 100 000 0000",
    message: "Practical engineering skills",
  });
  expect(submittedBody?.submissionId).toMatch(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  );
  await expect(page.getByLabel("Full name")).toHaveValue("");
});

test("keeps entered details and shows safe feedback after persistence failure", async ({ page }) => {
  await page.route("**/api/leads", async (route) => {
    await route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({
        success: false,
        error: { code: "PERSISTENCE_ERROR", message: "Safe server message" },
      }),
    });
  });
  await page.goto("/en/register-interest");
  await completeForm(page);

  await page.getByRole("button", { name: "Register interest" }).click();

  await expect(
    page.getByRole("alert").filter({ hasText: "couldn't save your interest" }),
  ).toBeVisible();
  await expect(page.getByLabel("Full name")).toHaveValue("Test Learner");
  await expect(page.getByText("Safe server message")).toHaveCount(0);
});

test("an edited retry persists the latest payload instead of accepting stale data", async ({
  page,
}) => {
  const storedLeads = new Map<string, Record<string, unknown>>();
  const submissionIds: string[] = [];
  let requestCount = 0;

  await page.route("**/api/leads", async (route) => {
    requestCount += 1;
    const payload = route.request().postDataJSON() as Record<string, unknown>;
    const id = String(payload.submissionId);
    submissionIds.push(id);
    storedLeads.set(id, payload);

    if (requestCount === 1) {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          error: { code: "PERSISTENCE_ERROR", message: "Uncertain test response" },
        }),
      });
      return;
    }

    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: { submitted: true } }),
    });
  });

  await page.goto("/en/register-interest");
  await completeForm(page);
  await page.getByRole("button", { name: "Register interest" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "couldn't save your interest" }),
  ).toBeVisible();

  await page
    .getByLabel("What would you like to learn?")
    .fill("Edited practical engineering interest");
  await page.getByRole("button", { name: "Register interest" }).click();

  await expect(page.getByRole("status")).toContainText("interest has been registered");
  expect(submissionIds[1]).toBe(submissionIds[0]);
  expect(storedLeads.size).toBe(1);
  expect(storedLeads.get(submissionIds[0])).toMatchObject({
    message: "Edited practical engineering interest",
  });
});

test("Arabic interest flow localizes validation, success, and safe failure feedback", async ({
  page,
}) => {
  let requestCount = 0;
  await page.route("**/api/leads", async (route) => {
    requestCount += 1;
    if (requestCount === 1) {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          error: { code: "PERSISTENCE_ERROR", message: "Raw persistence detail" },
        }),
      });
      return;
    }
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: { submitted: true } }),
    });
  });
  await page.goto("/ar/register-interest");

  await page.getByRole("button", { name: "سجّل اهتمامك" }).click();
  await expect(page.getByText("اكتب اسمك بالكامل.")).toBeVisible();
  await expect(page.getByText("اكتب بريدك الإلكتروني.")).toBeVisible();
  expect(requestCount).toBe(0);

  await page.getByLabel("الاسم بالكامل").fill("متعلم تجريبي");
  await page.getByLabel("البريد الإلكتروني").fill("learner@example.com");
  await page.getByLabel("حابب تتعلم إيه؟").fill("مهارات Software Testing عملية");
  await page.getByRole("button", { name: "سجّل اهتمامك" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "مقدرناش نحفظ بياناتك دلوقتي" }),
  ).toBeVisible();
  await expect(page.getByText("Raw persistence detail")).toHaveCount(0);

  await page.getByRole("button", { name: "سجّل اهتمامك" }).click();
  await expect(page.getByRole("status")).toContainText(
    "سجّلنا اهتمامك بنجاح. هنتواصل معاك لما التفاصيل تتحدد.",
  );
});

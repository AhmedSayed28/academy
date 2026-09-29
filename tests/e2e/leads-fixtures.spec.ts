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
  await page.goto("/register-interest");

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
  await page.goto("/register-interest");
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
  await page.goto("/register-interest");
  await completeForm(page);

  await page.getByRole("button", { name: "Register interest" }).click();

  await expect(
    page.getByRole("alert").filter({ hasText: "couldn't register your interest" }),
  ).toBeVisible();
  await expect(page.getByLabel("Full name")).toHaveValue("Test Learner");
  await expect(page.getByText("Safe server message")).toHaveCount(0);
});

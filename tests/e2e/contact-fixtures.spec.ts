import { expect, test, type Page } from "@playwright/test";

async function completeForm(page: Page) {
  await page.getByLabel("Full name").fill("Synthetic Visitor");
  await page.getByLabel("Email address").fill("visitor@example.com");
  await page.getByLabel("Phone number").fill("+20 100 000 0000");
  await page.getByLabel("Subject").fill("Course question");
  await page.getByRole("textbox", { name: /^Message/ }).fill("Please share more about the Academy learning approach.");
}

test("validates required contact fields without sending invalid data", async ({ page }) => {
  let requestCount = 0;
  await page.route("**/api/contact", async (route) => {
    requestCount += 1;
    await route.abort();
  });
  await page.goto("/contact");

  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByText("Enter your full name.")).toBeVisible();
  await expect(page.getByText("Enter your email address.")).toBeVisible();
  await expect(page.getByText("Enter a subject.")).toBeVisible();
  await expect(page.getByText("Enter a message of at least 10 characters.")).toBeVisible();
  expect(requestCount).toBe(0);
});

test("submits once, shows loading feedback, and resets after confirmed success", async ({ page }) => {
  let requestCount = 0;
  let submittedBody: Record<string, unknown> | undefined;
  let releaseResponse!: () => void;
  const responseGate = new Promise<void>((resolve) => {
    releaseResponse = resolve;
  });
  await page.route("**/api/contact", async (route) => {
    requestCount += 1;
    submittedBody = route.request().postDataJSON() as Record<string, unknown>;
    await responseGate;
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: { submitted: true } }),
    });
  });
  await page.goto("/contact");
  await completeForm(page);

  await page.locator("form").evaluate((form) => {
    (form as HTMLFormElement).requestSubmit();
    (form as HTMLFormElement).requestSubmit();
  });

  await expect(page.getByRole("button", { name: "Sending message…" })).toBeDisabled();
  releaseResponse();
  await expect(page.getByRole("status")).toContainText("message has been sent");
  expect(requestCount).toBe(1);
  expect(submittedBody).toMatchObject({
    fullName: "Synthetic Visitor",
    email: "visitor@example.com",
    phone: "+20 100 000 0000",
    subject: "Course question",
    message: "Please share more about the Academy learning approach.",
  });
  expect(submittedBody?.submissionId).toMatch(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  );
  await expect(page.getByLabel("Full name")).toHaveValue("");
});

test("preserves values after failure and an edited retry replaces the uncertain payload", async ({ page }) => {
  const storedMessages = new Map<string, Record<string, unknown>>();
  const submissionIds: string[] = [];
  let requestCount = 0;

  await page.route("**/api/contact", async (route) => {
    requestCount += 1;
    const payload = route.request().postDataJSON() as Record<string, unknown>;
    const id = String(payload.submissionId);
    submissionIds.push(id);
    storedMessages.set(id, payload);

    if (requestCount === 1) {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          error: { code: "PERSISTENCE_ERROR", message: "Internal fixture detail" },
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

  await page.goto("/contact");
  await completeForm(page);
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(
    page.getByRole("region", { name: "Send a message" }).getByRole("alert"),
  ).toContainText("Your details are still here");
  await expect(page.getByLabel("Full name")).toHaveValue("Synthetic Visitor");
  await expect(page.getByText("Internal fixture detail")).toHaveCount(0);

  await page.getByLabel("Subject").fill("Edited course question");
  await page.getByRole("textbox", { name: /^Message/ }).fill("This edited message is the payload that should be stored.");
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByRole("status")).toContainText("message has been sent");
  expect(submissionIds[1]).toBe(submissionIds[0]);
  expect(storedMessages.size).toBe(1);
  expect(storedMessages.get(submissionIds[0])).toMatchObject({
    subject: "Edited course question",
    message: "This edited message is the payload that should be stored.",
  });
});

test("contact form remains usable without horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contact");

  await expect(page.getByRole("heading", { name: "How can we help?" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: /^Message/ })).toBeVisible();
  const submitButton = page.getByRole("button", { name: "Send message" });
  const size = await submitButton.evaluate((element) => {
    const { width, height } = element.getBoundingClientRect();
    return { width, height };
  });
  expect(size.height).toBeGreaterThanOrEqual(44);
  expect(size.width).toBeGreaterThanOrEqual(44);
  expect(await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )).toBe(false);
});

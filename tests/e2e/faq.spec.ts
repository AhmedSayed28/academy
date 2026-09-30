import { expect, test } from "@playwright/test";

test("FAQ page presents approved answers with one primary heading", async ({ page }) => {
  await page.goto("/en/faq");

  await expect(page).toHaveTitle("Frequently Asked Questions | Academy");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1, name: "Answers for your next step." })).toBeVisible();
  await expect(page.locator("details")).toHaveCount(7);

  const enrollmentQuestion = page.locator("details").filter({
    has: page.getByText("Does registering interest confirm enrollment or reserve a place?"),
  });
  await enrollmentQuestion.locator("summary").click();
  await expect(enrollmentQuestion).toHaveAttribute("open", "");
  await expect(enrollmentQuestion).toContainText("is not enrollment");
  await expect(enrollmentQuestion).toContainText("does not reserve a place");
});

test("FAQ accordion supports keyboard interaction and correct expanded states", async ({ page }) => {
  await page.goto("/en/faq");

  const questions = page.locator("details");
  const firstQuestion = questions.nth(0);
  const secondQuestion = questions.nth(1);
  const firstSummary = firstQuestion.locator("summary");
  const secondSummary = secondQuestion.locator("summary");

  await firstSummary.focus();
  await expect(firstSummary).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(firstQuestion).toHaveAttribute("open", "");

  await secondSummary.focus();
  await page.keyboard.press("Space");
  await expect(secondQuestion).toHaveAttribute("open", "");
  await expect(firstQuestion).not.toHaveAttribute("open", "");

  await page.keyboard.press("Space");
  await expect(secondQuestion).not.toHaveAttribute("open", "");
});

test("homepage preview, footer link, and unanswered-question CTA navigate correctly", async ({ page }) => {
  await page.goto("/en");

  const preview = page.locator('section[aria-labelledby="faq-preview-title"]');
  await expect(preview.locator("details")).toHaveCount(4);
  await expect(preview.getByRole("link", { name: "View all questions" })).toHaveAttribute(
    "href",
    "/en/faq",
  );
  await expect(
    page.getByRole("navigation", { name: "Footer navigation" }).getByRole("link", { name: "FAQ" }),
  ).toHaveAttribute("href", "/en/faq");

  await preview.getByRole("link", { name: "View all questions" }).click();
  await expect(page).toHaveURL(/\/faq$/);
  await expect(page.getByRole("link", { name: "Contact Academy", exact: true })).toHaveAttribute(
    "href",
    "/en/contact",
  );
});

test("FAQ page remains usable without horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/faq");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.locator("details summary").first().click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

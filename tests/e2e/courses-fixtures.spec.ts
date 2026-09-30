import { expect, test } from "@playwright/test";

test("listing exposes published fixtures and filters the unpublished fixture", async ({ page }) => {
  await page.goto("/en/courses");

  await expect(page.getByRole("main").locator("article")).toHaveCount(2);
  await expect(page.getByRole("heading", { name: "Synthetic Open Course" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Synthetic Closed Course" })).toBeVisible();
  await expect(page.getByText("Synthetic Unpublished Course")).toHaveCount(0);
});

test("a published slug renders server content, optional sections, and metadata", async ({ page }) => {
  const response = await page.goto("/en/courses/synthetic-open-course");

  expect(response?.status()).toBe(200);
  expect(await response?.text()).toContain("Synthetic Open Course");
  await expect(page).toHaveTitle("Synthetic Open Course | Academy");
  await expect(page.getByRole("heading", { level: 1, name: "Synthetic Open Course" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What you will learn" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Curriculum" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Instructor" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Register for this course" })).toHaveAttribute(
    "href",
    "https://example.test/register",
  );
});

test("a closed course is honest and omits unavailable optional sections", async ({ page }) => {
  await page.goto("/en/courses/synthetic-closed-course");

  await expect(page.getByText("Registration for this course is closed.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Register for this course" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Curriculum" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Instructor" })).toHaveCount(0);
});

test("an unpublished slug returns 404 even when its record exists", async ({ page }) => {
  const response = await page.goto("/en/courses/synthetic-unpublished-course");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  await expect(page.getByText("Synthetic Unpublished Course")).toHaveCount(0);
});

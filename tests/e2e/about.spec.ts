import { expect, test } from "@playwright/test";

test("about page presents the approved Academy purpose with a clear heading structure", async ({ page }) => {
  await page.goto("/en/about");

  await expect(page).toHaveTitle("About Academy | Academy");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Technology learning built for confident application.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Our mission" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Our vision" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Understand, practice, then connect." })).toBeVisible();
  await expect(page.getByText("Academy provides learning direction and practical development.")).toBeVisible();
  await expect(page.getByText(/employment, certification, or a specific career outcome/)).toBeVisible();
});

test("about navigation and calls to action lead to implemented routes", async ({ page }) => {
  await page.goto("/en/about");

  const primaryNavigation = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(primaryNavigation.getByRole("link", { name: "About" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(
    page.getByRole("navigation", { name: "Footer navigation" }).getByRole("link", { name: "About" }),
  ).toHaveAttribute("href", "/en/about");

  await expect(page.getByRole("main").getByRole("link", { name: "Browse courses" }).first()).toHaveAttribute(
    "href",
    "/en/courses",
  );
  await expect(page.getByRole("link", { name: "Register general interest" }).first()).toHaveAttribute(
    "href",
    "/en/register-interest",
  );
});

test("about page remains readable without horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/about");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: "Browse courses" }).first()).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

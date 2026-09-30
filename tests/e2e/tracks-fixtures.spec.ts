import { expect, test } from "@playwright/test";

test("listing exposes published fixtures and filters unpublished track records", async ({ page }) => {
  await page.goto("/en/tracks");

  await expect(
    page.locator('section[aria-labelledby="published-tracks-title"]').locator("article"),
  ).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Software Testing" })).toBeVisible();
  await expect(page.getByRole("link", { name: "View learning track" })).toHaveAttribute(
    "href",
    "/en/tracks/synthetic-software-testing-track",
  );
  await expect(page.getByText("A synthetic unpublished record")).toHaveCount(0);
});

test("a published track renders server content, metadata, and approved relationships", async ({ page }) => {
  const response = await page.goto("/en/tracks/synthetic-software-testing-track");

  expect(response?.status()).toBe(200);
  expect(await response?.text()).toContain("Synthetic first step");
  await expect(page).toHaveTitle("Software Testing Learning Track | Academy");
  await expect(page.getByRole("heading", { level: 1, name: "Software Testing" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Career goal" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Skills you will build" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Learning journey" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tools and technologies" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Related courses" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Synthetic Open Course" })).toBeVisible();
  await expect(page.getByText("Synthetic Unpublished Course")).toHaveCount(0);
});

test("an unpublished track slug returns 404 even when its record exists", async ({ page }) => {
  const response = await page.goto("/en/tracks/synthetic-backend-track");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  await expect(page.getByText("A synthetic unpublished record")).toHaveCount(0);
});

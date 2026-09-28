import { expect, test } from "@playwright/test";

test("listing exposes published fixtures and filters unpublished instructor records", async ({ page }) => {
  await page.goto("/instructors");

  const profiles = page.getByRole("main").locator("article");
  await expect(profiles).toHaveCount(2);
  await expect(page.getByRole("heading", { name: "Synthetic Published Instructor" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Synthetic Minimal Instructor" })).toBeVisible();
  await expect(page.getByText("Synthetic Unpublished Instructor")).toHaveCount(0);
});

test("optional profile fields render accessibly without empty controls", async ({ page }) => {
  await page.goto("/instructors");

  const linkedProfile = page.getByRole("article").filter({ hasText: "Synthetic Published Instructor" });
  await expect(linkedProfile.getByText("Profile image not available")).toBeVisible();
  await expect(
    linkedProfile.getByRole("link", {
      name: "Synthetic profile for Synthetic Published Instructor (opens in a new tab)",
    }),
  ).toHaveAttribute("target", "_blank");

  const minimalProfile = page.getByRole("article").filter({ hasText: "Synthetic Minimal Instructor" });
  await expect(minimalProfile.getByText("Profile image not available")).toBeVisible();
  await expect(minimalProfile.getByRole("link")).toHaveCount(0);
  await expect(minimalProfile.getByRole("list", { name: "Synthetic Minimal Instructor expertise" })).toBeVisible();
});

import { expect, test } from "@playwright/test";

test("course listing provides an honest empty state and meaningful metadata", async ({ page }) => {
  const response = await page.goto("/courses");

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Technology Courses | Academy");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Build practical skills");
  await expect(page.getByRole("heading", { name: "No courses are published yet" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore learning tracks" })).toHaveAttribute(
    "href",
    "/#learning-tracks",
  );
  await expect(page.locator('a[href^="/courses/"]')).toHaveCount(0);
});

test("unknown course slugs return the shared not-found experience with a real 404", async ({
  page,
}) => {
  const response = await page.goto("/courses/not-an-approved-course");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Browse courses" })).toHaveAttribute(
    "href",
    "/courses",
  );
});

for (const width of [390, 768, 1280]) {
  test(`course listing and navigation remain usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/courses");

    if (width < 1024) {
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
      await expect(navigation.getByRole("link", { name: "Courses" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    } else {
      await expect(
        page
          .getByRole("navigation", { name: "Primary navigation" })
          .getByRole("link", { name: "Courses" }),
      ).toHaveAttribute("aria-current", "page");
    }

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
}

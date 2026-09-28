import { expect, test } from "@playwright/test";

test("instructor listing provides an honest empty state without invented profiles", async ({ page }) => {
  const response = await page.goto("/instructors");

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Technology Instructors | Academy");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Instructor profiles are being prepared." })).toBeVisible();
  await expect(page.getByRole("main").locator("article")).toHaveCount(0);
  await expect(page.getByRole("main").getByRole("link", { name: "Browse courses" })).toHaveAttribute("href", "/courses");
  await expect(page.getByRole("main").getByRole("link", { name: "Explore learning tracks" })).toHaveAttribute("href", "/tracks");
});

test("the homepage defers its instructor preview while no profiles are approved", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("main").getByText("Synthetic Published Instructor")).toHaveCount(0);
  await expect(page.getByRole("main").getByRole("heading", { name: /instructors/i })).toHaveCount(0);
});

for (const width of [390, 768, 1280]) {
  test(`instructor listing and navigation remain usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/instructors");

    if (width < 1024) {
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
      await expect(navigation.getByRole("link", { name: "Instructors" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    } else {
      await expect(
        page
          .getByRole("navigation", { name: "Primary navigation" })
          .getByRole("link", { name: "Instructors" }),
      ).toHaveAttribute("aria-current", "page");
    }

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
}

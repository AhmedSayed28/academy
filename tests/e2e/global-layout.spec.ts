import { expect, test } from "@playwright/test";

test("desktop layout exposes global navigation and footer without broken future links", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/en");

  const primaryNavigation = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(primaryNavigation.getByRole("link", { name: "Home" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(primaryNavigation.getByRole("link", { name: "Courses" })).toHaveAttribute(
    "href",
    "/en/courses",
  );
  await expect(primaryNavigation.getByRole("link", { name: "Tracks", exact: true })).toHaveAttribute(
    "href",
    "/en/tracks",
  );
  await expect(primaryNavigation.getByRole("link", { name: "Instructors" })).toHaveAttribute(
    "href",
    "/en/instructors",
  );
  await expect(primaryNavigation.getByRole("link", { name: "About" })).toHaveAttribute(
    "href",
    "/en/about",
  );
  await expect(
    primaryNavigation.getByRole("link", { name: "Register Interest" }),
  ).toHaveAttribute("href", "/en/register-interest");
  await expect(page.getByRole("contentinfo")).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test("mobile menu supports disclosure, focus, escape, and touch-sized controls", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");

  const menuButton = page.getByRole("button", { name: "Open navigation menu" });
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await menuButton.click();

  const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(mobileNavigation).toBeVisible();
  await expect(
    mobileNavigation.getByRole("link", { name: "عرض الموقع بالعربية" }),
  ).toHaveAttribute("href", "/ar");
  await expect(page.getByRole("button", { name: "Close navigation menu" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await expect(mobileNavigation.getByRole("link", { name: "Home" })).toBeFocused();

  const buttonSize = await page
    .getByRole("button", { name: "Close navigation menu" })
    .evaluate((element) => {
      const { width, height } = element.getBoundingClientRect();
      return { width, height };
    });
  expect(buttonSize.width).toBeGreaterThanOrEqual(44);
  expect(buttonSize.height).toBeGreaterThanOrEqual(44);

  await page.keyboard.press("Escape");
  await expect(mobileNavigation).toBeHidden();
  const reopenedMenuButton = page.getByRole("button", { name: "Open navigation menu" });
  await expect(reopenedMenuButton).toBeFocused();

  await reopenedMenuButton.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Register Interest" })
    .click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
  await expect(page).toHaveURL(/\/register-interest$/);

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

for (const width of [390, 768, 1280]) {
  test(`global layout has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/en");

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
}

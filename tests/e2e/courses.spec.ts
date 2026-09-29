import { expect, test } from "@playwright/test";

test("visitors can discover the approved course with truthful published facts", async ({ page }) => {
  const response = await page.goto("/courses");

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Technology Courses | Academy");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Build practical skills");
  await expect(page.getByRole("heading", { name: "Software Testing Fundamentals" })).toBeVisible();
  await expect(page.getByText("7,500 EGP")).toBeVisible();
  await expect(page.getByText("To be announced")).toBeVisible();
  await expect(page.getByText("Delivery", { exact: true })).toHaveCount(0);
});

test("course details connect the approved track, instructor, and interest flow", async ({ page }) => {
  await page.goto("/courses");
  await page.getByRole("link", { name: "Software Testing Fundamentals" }).click();

  await expect(page).toHaveURL(/\/courses\/software-testing-fundamentals$/);
  await expect(page).toHaveTitle("Software Testing Fundamentals | Academy");
  await expect(page.getByRole("heading", { name: "Module 1 — Manual Testing" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Module 4 — UI Automation Testing" })).toBeVisible();
  await expect(page.getByText("Start date:", { exact: true })).toBeVisible();
  await expect(page.getByText("To be announced", { exact: true })).toBeVisible();
  await expect(page.getByText("Price", { exact: true })).toBeVisible();
  await expect(page.getByText("7,500 EGP", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "Software Testing", exact: true }).click();
  await expect(page).toHaveURL(/\/tracks\/software-testing$/);
  await expect(page.getByRole("heading", { level: 1, name: "Software Testing" })).toBeVisible();

  await page.goto("/courses/software-testing-fundamentals");
  await page.getByRole("link", { name: "Ahmed Sayed Ahmed" }).click();
  await expect(page).toHaveURL(/\/instructors#ahmed-sayed-ahmed$/);
  await expect(page.getByRole("heading", { name: "Ahmed Sayed Ahmed" })).toBeVisible();

  await page.goto("/courses/software-testing-fundamentals");
  await page.getByRole("main").getByRole("link", { name: "Register Interest" }).click();
  await expect(page).toHaveURL(/\/register-interest$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Tell us where you want to grow");
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

    await page.goto("/courses/software-testing-fundamentals");
    await expect(
      page.getByRole("main").getByRole("link", { name: "Register Interest" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      ),
    ).toBe(false);
  });
}

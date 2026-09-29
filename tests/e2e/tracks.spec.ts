import { expect, test } from "@playwright/test";

const documentedTrackNames = [
  "Software Testing",
  "Frontend Development",
  "Backend Development",
  "Artificial Intelligence",
  "DevOps",
  "Data Engineering",
  "Cybersecurity",
  "Mobile Development",
];

test("track listing publishes Software Testing and keeps seven directions planned", async ({ page }) => {
  const response = await page.goto("/tracks");

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Technology Learning Tracks | Academy");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Choose a technology direction");
  await expect(page.getByRole("heading", { name: "Published learning tracks" })).toBeVisible();
  await expect(page.getByRole("link", { name: "View learning track" })).toHaveAttribute(
    "href",
    "/tracks/software-testing",
  );

  const plannedSection = page.locator('section[aria-labelledby="planned-tracks-title"]');
  await expect(plannedSection.getByRole("listitem")).toHaveCount(7);
  for (const name of documentedTrackNames.filter((name) => name !== "Software Testing")) {
    await expect(plannedSection.getByRole("heading", { name })).toBeVisible();
  }
  await expect(plannedSection.getByRole("heading", { name: "Software Testing" })).toHaveCount(0);
});

test("unknown track slugs return a real 404", async ({ page }) => {
  const response = await page.goto("/tracks/not-an-approved-track");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore learning tracks" })).toHaveAttribute(
    "href",
    "/tracks",
  );
});

for (const width of [390, 768, 1280]) {
  test(`track listing and navigation remain usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/tracks");

    if (width < 1024) {
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
      await expect(navigation.getByRole("link", { name: "Tracks", exact: true })).toHaveAttribute(
        "aria-current",
        "page",
      );
    } else {
      await expect(
        page
          .getByRole("navigation", { name: "Primary navigation" })
          .getByRole("link", { name: "Tracks", exact: true }),
      ).toHaveAttribute("aria-current", "page");
    }

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);

    await page.goto("/tracks/software-testing");
    await expect(page.getByRole("heading", { level: 1, name: "Software Testing" })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      ),
    ).toBe(false);
  });
}

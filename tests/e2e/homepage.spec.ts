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

test("homepage communicates its purpose with one primary heading and functional actions", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Build technology skills",
  );
  await expect(page.getByText(/students, graduates, career switchers/i)).toBeVisible();

  const primaryAction = page
    .getByRole("main")
    .getByRole("link", { name: "Explore learning tracks" })
    .first();
  await expect(primaryAction).toHaveAttribute("href", "#learning-tracks");
  await primaryAction.click();
  await expect(page).toHaveURL(/#learning-tracks$/);
  await expect(
    page.getByRole("heading", { name: "Choose a direction, then build step by step." }),
  ).toBeVisible();
});

test("homepage presents documented tracks and the approved featured course", async ({
  page,
}) => {
  await page.goto("/");

  const tracksSection = page.locator('section[aria-labelledby="learning-tracks-title"]');
  await expect(tracksSection.getByRole("listitem")).toHaveCount(8);

  for (const trackName of documentedTrackNames) {
    await expect(tracksSection.getByRole("heading", { name: trackName })).toBeVisible();
  }
  await expect(tracksSection.getByRole("link", { name: "View all learning tracks" })).toHaveAttribute(
    "href",
    "/tracks",
  );

  await expect(page.getByRole("heading", { name: "Software Testing Fundamentals" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Software Testing", exact: true })).toHaveAttribute(
    "href",
    "/tracks/software-testing",
  );
});

test("homepage preserves section hierarchy and readable layouts across common widths", async ({
  page,
}) => {
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    expect(await page.getByRole("main").getByRole("heading", { level: 2 }).count()).toBeGreaterThanOrEqual(6);
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  }
});

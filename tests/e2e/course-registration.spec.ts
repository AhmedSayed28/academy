import { expect, test } from "@playwright/test";

test("catalog shows four standalone courses and two combined paths", async ({ page }) => {
  await page.goto("/en/courses");
  for (const title of ["ISTQB Foundation Level", "Software Testing Practical", "Front End Development", "Back End Development", "Software Testing Track", "Full Stack Development"]) await expect(page.getByRole("heading", { name: title })).toBeVisible();
  await expect(page.getByText("Software Testing Fundamentals")).toHaveCount(0);
});

test("course CTA preselects an editable approved option", async ({ page }) => {
  await page.goto("/en/courses/istqb-foundation-level");
  await page.getByRole("link", { name: "Register Now" }).click();
  await expect(page.getByLabel("Course or registration path")).toHaveValue("istqb-foundation-level");
  await page.getByLabel("Course or registration path").selectOption("full-stack-development");
  await expect(page.getByLabel("Course or registration path")).toHaveValue("full-stack-development");
});

test("registration requires selection and supports both directions", async ({ page }) => {
  await page.goto("/en/course-registration");
  await page.getByLabel("Full name").fill("Synthetic Learner"); await page.getByLabel("Email address").fill("synthetic@example.com"); await page.getByLabel("Phone number").fill("+201000000000");
  await page.getByRole("button", { name: "Register Now" }).click();
  await expect(page.getByText("Select a course or registration path.")).toBeVisible();
  await page.goto("/ar/course-registration");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("button", { name: "سجّل الآن" })).toBeVisible();
});

test("language switching retains the selected registration option", async ({ page }) => {
  await page.goto("/en/course-registration?course=software-testing-track");
  await page.getByRole("link", { name: "عرض الموقع بالعربية" }).click();
  await expect(page).toHaveURL(/\/ar\/course-registration\?course=software-testing-track$/);
  await expect(page.getByLabel("الكورس أو مسار التسجيل")).toHaveValue("software-testing-track");
});

test("instructors are hidden and 390px catalog does not overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto("/en/courses");
  await expect(page.getByRole("link", { name: "Instructors" })).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
  await page.goto("/en/instructors"); await expect(page).toHaveURL(/\/en\/courses$/);
});

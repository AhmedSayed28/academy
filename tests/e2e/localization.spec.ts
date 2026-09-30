import { expect, test } from "@playwright/test";

test("root and legacy public routes redirect permanently to Arabic equivalents", async ({
  request,
}) => {
  const root = await request.get("/", { maxRedirects: 0 });
  expect(root.status()).toBe(308);
  expect(root.headers().location).toBe("/ar");

  const legacyCourse = await request.get("/courses/software-testing-fundamentals", {
    maxRedirects: 0,
  });
  expect(legacyCourse.status()).toBe(308);
  expect(legacyCourse.headers().location).toBe(
    "/ar/courses/software-testing-fundamentals",
  );

  const legacyContact = await request.get("/contact", { maxRedirects: 0 });
  expect(legacyContact.status()).toBe(308);
  expect(legacyContact.headers().location).toBe("/ar/contact");
});

test("language switcher retains the equivalent course detail page", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/ar/courses/software-testing-fundamentals");

  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.getByRole("link", { name: "View the website in English" }).click();
  await expect(page).toHaveURL(/\/en\/courses\/software-testing-fundamentals$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(
    page.getByRole("heading", { level: 1, name: "Software Testing Fundamentals" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "عرض الموقع بالعربية" }).click();
  await expect(page).toHaveURL(/\/ar\/courses\/software-testing-fundamentals$/);
});

test("Arabic course preserves approved facts and mixed-direction technology content", async ({
  page,
}) => {
  await page.goto("/ar/courses/software-testing-fundamentals");

  await expect(page.getByText("4 شهور", { exact: true })).toBeVisible();
  await expect(page.getByText("7,500 جنيه مصري", { exact: true })).toBeVisible();
  await expect(page.getByText("هيتحدد قريب", { exact: true })).toBeVisible();
  await expect(page.getByText(/أكتر من خمس سنين/)).toHaveCount(0);
  await expect(page.getByText(/Postman Assertions/)).toBeVisible();
  await expect(page.getByText("طريقة التقديم", { exact: true })).toHaveCount(0);

  await page.getByRole("link", { name: "Ahmed Sayed Ahmed" }).click();
  await expect(page).toHaveURL(/\/ar\/instructors#ahmed-sayed-ahmed$/);
  await expect(page.getByText(/أكتر من خمس سنين/)).toBeVisible();
  await expect(page.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/ahmed-sayed-a2039821a/",
  );
});

test("Arabic FAQ supports keyboard interaction", async ({ page }) => {
  await page.goto("/ar/faq");
  const question = page.locator("details").first().locator("summary");
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText(/Academy منصة لتعليم التكنولوجيا/)).toBeVisible();
});

test("invalid locale and unknown localized content return real 404 responses", async ({ page }) => {
  const invalidLocale = await page.goto("/fr/about");
  expect(invalidLocale?.status()).toBe(404);

  const unknownArabicPage = await page.goto("/ar/not-a-real-page");
  expect(unknownArabicPage?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "الصفحة مش موجودة" })).toBeVisible();
});

for (const locale of ["ar", "en"] as const) {
  for (const width of [390, 768, 1280]) {
    test(`${locale} layouts remain directional and overflow-free at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });

      for (const path of [
        `/${locale}`,
        `/${locale}/courses/software-testing-fundamentals`,
        `/${locale}/contact`,
      ]) {
        await page.goto(path);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.locator("html")).toHaveAttribute(
          "dir",
          locale === "ar" ? "rtl" : "ltr",
        );
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
          ),
          `${path} overflowed at ${width}px`,
        ).toBe(false);
      }

      if (locale === "ar") {
        const emailDirection = await page
          .getByLabel("البريد الإلكتروني")
          .evaluate((element) => getComputedStyle(element).direction);
        expect(emailDirection).toBe("ltr");
      }
    });
  }
}

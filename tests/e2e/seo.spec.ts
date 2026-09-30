import { expect, test } from "@playwright/test";

const productionUrl = "https://e2eacademy.vercel.app";

test("renders canonical and approved social metadata", async ({ page }) => {
  await page.goto("/en/about");

  await expect(page).toHaveTitle("About Academy | Academy");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${productionUrl}/en/about`,
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    `${productionUrl}/en/about`,
  );
  await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveAttribute(
    "href",
    `${productionUrl}/ar/about`,
  );
  await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
    "href",
    `${productionUrl}/ar/about`,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary",
  );
});

test("serves production robots policy", async ({ request }) => {
  const response = await request.get("/robots.txt");
  const body = await response.text();

  expect(response.ok()).toBe(true);
  expect(body).toContain("User-Agent: *");
  expect(body).toContain("Allow: /");
  expect(body).toContain("Disallow: /api/");
  expect(body).toContain(`Sitemap: ${productionUrl}/sitemap.xml`);
  expect(body).toContain(`Host: ${productionUrl}`);
});

test("serves static routes and approved published detail routes in the sitemap", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  const body = await response.text();

  expect(response.ok()).toBe(true);
  for (const path of [
    "/courses",
    "/tracks",
    "/instructors",
    "/about",
    "/contact",
    "/faq",
    "/register-interest",
    "/courses/software-testing-fundamentals",
    "/tracks/software-testing",
  ]) {
    expect(body).toContain(`<loc>${productionUrl}/ar${path === "/" ? "" : path}</loc>`);
    expect(body).toContain(`<loc>${productionUrl}/en${path === "/" ? "" : path}</loc>`);
  }
  expect(body).not.toContain(`<loc>${productionUrl}/courses</loc>`);
  expect(body).toContain('hreflang="x-default"');
  expect(body).not.toContain("<lastmod>");
  expect(body).not.toContain("/api/");
});

import { expect, test } from "@playwright/test";

const productionUrl = "https://e2eacademy.vercel.app";

test("renders canonical and approved social metadata", async ({ page }) => {
  await page.goto("/about");

  await expect(page).toHaveTitle("About Academy | Academy");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${productionUrl}/about`,
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    `${productionUrl}/about`,
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

test("serves only implemented static routes in the approved empty-data sitemap", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  const body = await response.text();

  expect(response.ok()).toBe(true);
  for (const path of [
    "/",
    "/courses",
    "/tracks",
    "/instructors",
    "/about",
    "/contact",
    "/faq",
    "/register-interest",
  ]) {
    expect(body).toContain(`<loc>${productionUrl}${path}</loc>`);
  }
  expect(body).not.toContain("<lastmod>");
  expect(body).not.toContain("/api/");
});

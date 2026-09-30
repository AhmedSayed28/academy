import { expect, test } from "@playwright/test";

const reviewRoutes = [
  "/",
  "/courses/software-testing-fundamentals",
  "/tracks/software-testing",
  "/instructors",
  "/contact",
  "/register-interest",
  "/faq",
  "/about",
  "/phase-13-visual-review-not-found",
] as const;

function parseRgb(value: string) {
  const channels = value.match(/[\d.]+/g)?.slice(0, 3).map(Number);
  if (!channels || channels.length !== 3) throw new Error(`Could not parse color: ${value}`);
  return channels;
}

function relativeLuminance(color: number[]) {
  const channels = color.map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(first: string, second: string) {
  const firstLuminance = relativeLuminance(parseRgb(first));
  const secondLuminance = relativeLuminance(parseRgb(second));
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

test("uses a permanent dark presentation with readable body and primary-action contrast", async ({
  page,
}) => {
  await page.goto("/");

  const colors = await page.evaluate(() => {
    const bodyStyle = getComputedStyle(document.body);
    const primaryAction = document.querySelector<HTMLElement>('a[href="#learning-tracks"]');
    if (!primaryAction) throw new Error("Primary action was not found");
    const primaryStyle = getComputedStyle(primaryAction);

    return {
      colorScheme: getComputedStyle(document.documentElement).colorScheme,
      bodyBackground: bodyStyle.backgroundColor,
      bodyForeground: bodyStyle.color,
      primaryBackground: primaryStyle.backgroundColor,
      primaryForeground: primaryStyle.color,
    };
  });

  expect(colors.colorScheme).toBe("dark");
  expect(relativeLuminance(parseRgb(colors.bodyBackground))).toBeLessThan(0.02);
  expect(contrastRatio(colors.bodyForeground, colors.bodyBackground)).toBeGreaterThanOrEqual(7);
  expect(contrastRatio(colors.primaryForeground, colors.primaryBackground)).toBeGreaterThanOrEqual(
    4.5,
  );
  await expect(page.getByRole("button", { name: /theme|light mode|dark mode/i })).toHaveCount(0);

  await page.goto("/contact");
  const inputPresentation = await page.getByLabel("Full name").evaluate((element) => {
    const style = getComputedStyle(element);
    return { background: style.backgroundColor, colorScheme: style.colorScheme };
  });
  expect(inputPresentation.colorScheme).toBe("dark");
  expect(relativeLuminance(parseRgb(inputPresentation.background))).toBeLessThan(0.03);
});

test("shows a visible keyboard focus indicator", async ({ page }) => {
  await page.goto("/");

  const primaryAction = page.getByRole("link", { name: "Explore learning tracks" }).first();
  await primaryAction.focus();
  await expect(primaryAction).toBeFocused();

  const focusStyle = await primaryAction.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      color: style.outlineColor,
      style: style.outlineStyle,
      width: Number.parseFloat(style.outlineWidth),
    };
  });

  expect(focusStyle.style).not.toBe("none");
  expect(focusStyle.width).toBeGreaterThanOrEqual(2);
  expect(focusStyle.color).not.toBe("transparent");
});

test("keeps content visible and effectively still when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const hero = page.getByRole("heading", {
    name: "Build technology skills you can put into practice.",
  });
  await expect(hero).toBeVisible();

  const motion = await hero.evaluate((element) => {
    const animatedContainer = element.closest(".reveal");
    if (!animatedContainer) throw new Error("Hero reveal container was not found");
    const style = getComputedStyle(animatedContainer);
    return {
      animationDuration: style.animationDuration,
      opacity: style.opacity,
      transform: style.transform,
    };
  });

  expect(Number.parseFloat(motion.animationDuration)).toBeLessThanOrEqual(0.00001);
  expect(motion.opacity).toBe("1");
  expect(["none", "matrix(1, 0, 0, 1, 0, 0)"]).toContain(motion.transform);
});

test("renders essential hero content without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Build technology skills you can put into practice." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore learning tracks" }).first()).toBeVisible();

  await context.close();
});

for (const width of [390, 768, 1280]) {
  test(`representative pages avoid horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });

    for (const route of reviewRoutes) {
      await page.goto(route);
      const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(hasHorizontalOverflow, `${route} overflowed at ${width}px`).toBe(false);
    }
  });
}

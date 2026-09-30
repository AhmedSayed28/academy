import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

import { chromium } from "@playwright/test";

const outputDirectory = resolve("docs/screenshots/phase-14");
const captures = [
  ["ar-home-390.png", "/ar", 390, 844],
  ["en-home-390.png", "/en", 390, 844],
  ["ar-course-1280.png", "/ar/courses/software-testing-fundamentals", 1280, 900],
  ["en-course-1280.png", "/en/courses/software-testing-fundamentals", 1280, 900],
  ["ar-track-1280.png", "/ar/tracks/software-testing", 1280, 900],
  ["en-instructors-1280.png", "/en/instructors", 1280, 900],
  ["ar-contact-768.png", "/ar/contact", 768, 1024],
  ["en-interest-768.png", "/en/register-interest", 768, 1024],
  ["ar-faq-390.png", "/ar/faq", 390, 844],
  ["en-about-768.png", "/en/about", 768, 1024],
  ["ar-404-390.png", "/ar/not-a-real-page", 390, 844],
  ["en-404-390.png", "/en/not-a-real-page", 390, 844],
];

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  baseURL: process.env.PHASE14_BASE_URL ?? "http://localhost:3000",
  colorScheme: "dark",
  reducedMotion: "reduce",
});

for (const [filename, path, width, height] of captures) {
  const page = await context.newPage();
  await page.setViewportSize({ width, height });
  await page.goto(path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: resolve(outputDirectory, filename), fullPage: true });
  await page.close();
}

await browser.close();

import { describe, expect, it } from "vitest";

import { createCourseMetadata } from "../../src/app/courses/[slug]/page";
import { createRobots } from "../../src/app/robots";
import { createSitemap } from "../../src/app/sitemap";
import { createTrackMetadata } from "../../src/app/tracks/[slug]/page";
import { parseAppUrl } from "../../src/config/site";
import { createCourseRepository } from "../../src/features/courses/repositories/course.repository";
import { createCourseService } from "../../src/features/courses/services/course.service";
import { createTrackRepository } from "../../src/features/tracks/repositories/track.repository";
import { createTrackService } from "../../src/features/tracks/services/track.service";
import { createPageMetadata } from "../../src/lib/metadata";
import { syntheticCourseRecords } from "../fixtures/course-records";
import { syntheticTrackRecords } from "../fixtures/track-records";

const productionUrl = "https://e2eacademy.vercel.app";

describe("site URL configuration", () => {
  it("accepts and normalizes the configured production origin", () => {
    expect(parseAppUrl(`${productionUrl}/`).toString()).toBe(`${productionUrl}/`);
  });

  it.each([
    undefined,
    "/relative",
    `${productionUrl}/about`,
    `${productionUrl}?preview=true`,
    `${productionUrl}#content`,
    "ftp://e2eacademy.vercel.app",
    "https://user:password@e2eacademy.vercel.app",
  ])("rejects an unsafe or non-origin value: %s", (value) => {
    expect(() => parseAppUrl(value)).toThrow();
  });
});

describe("metadata", () => {
  const courses = createCourseService(createCourseRepository(syntheticCourseRecords));
  const tracks = createTrackService(
    createTrackRepository(syntheticTrackRecords),
    courses,
  );

  it("creates consistent canonical and social metadata", () => {
    const metadata = createPageMetadata({
      title: "About",
      description: "Approved description.",
      path: "/about",
    });

    expect(metadata.alternates).toEqual({ canonical: "/about" });
    expect(metadata.openGraph).toMatchObject({
      title: "About | Academy",
      url: "/about",
      siteName: "Academy",
    });
    expect(metadata.twitter).toMatchObject({ card: "summary", title: "About | Academy" });
  });

  it("publishes course metadata only for a published record", async () => {
    await expect(createCourseMetadata("synthetic-open-course", courses)).resolves.toMatchObject({
      title: "Synthetic Open Course",
      alternates: { canonical: "/courses/synthetic-open-course" },
    });
    await expect(
      createCourseMetadata("synthetic-unpublished-course", courses),
    ).resolves.toMatchObject({ robots: { index: false, follow: false } });
  });

  it("publishes track metadata only for a published record", async () => {
    await expect(
      createTrackMetadata("synthetic-software-testing-track", tracks),
    ).resolves.toMatchObject({
      title: "Software Testing Learning Track",
      alternates: { canonical: "/tracks/synthetic-software-testing-track" },
    });
    await expect(createTrackMetadata("synthetic-backend-track", tracks)).resolves.toMatchObject({
      robots: { index: false, follow: false },
    });
  });
});

describe("sitemap and robots", () => {
  it("includes public routes and only published course and track details", async () => {
    const courses = createCourseService(createCourseRepository(syntheticCourseRecords));
    const tracks = createTrackService(
      createTrackRepository(syntheticTrackRecords),
      courses,
    );
    const entries = await createSitemap({ courses, tracks });
    const urls = entries.map(({ url }) => url);

    expect(urls).toEqual([
      `${productionUrl}/`,
      `${productionUrl}/courses`,
      `${productionUrl}/tracks`,
      `${productionUrl}/instructors`,
      `${productionUrl}/about`,
      `${productionUrl}/contact`,
      `${productionUrl}/faq`,
      `${productionUrl}/register-interest`,
      `${productionUrl}/courses/synthetic-open-course`,
      `${productionUrl}/courses/synthetic-closed-course`,
      `${productionUrl}/tracks/synthetic-software-testing-track`,
    ]);
    expect(urls.join("\n")).not.toContain("unpublished");
    expect(entries.every((entry) => entry.lastModified === undefined)).toBe(true);
  });

  it("blocks preview crawling and exposes production discovery endpoints", () => {
    expect(createRobots({ VERCEL_ENV: "preview" })).toEqual({
      rules: { userAgent: "*", disallow: "/" },
    });
    expect(createRobots({ VERCEL_ENV: "production" })).toEqual({
      rules: { userAgent: "*", allow: "/", disallow: "/api/" },
      sitemap: `${productionUrl}/sitemap.xml`,
      host: productionUrl,
    });
  });
});

import { describe, expect, it } from "vitest";

import { courseService } from "../../src/features/courses/services/course.service";
import { formatCoursePrice } from "../../src/features/courses/utils/format-course-price";
import { localizeCourse, localizeInstructor, localizeTrack } from "../../src/i18n/content";
import { localizePath, replacePathLocale } from "../../src/i18n/config";
import { getDictionary } from "../../src/i18n/translations";
import { instructorService } from "../../src/features/instructors/services/instructor.service";
import { trackService } from "../../src/features/tracks/services/track.service";

function collectKeys(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null) return [];

  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return [path, ...collectKeys(child, path)];
  });
}

describe("localization", () => {
  it("keeps Arabic and English dictionaries structurally aligned", () => {
    expect(collectKeys(getDictionary("ar"))).toEqual(collectKeys(getDictionary("en")));
  });

  it("builds localized and equivalent paths without changing slugs", () => {
    expect(localizePath("ar", "/courses/software-testing-fundamentals")).toBe(
      "/ar/courses/software-testing-fundamentals",
    );
    expect(
      replacePathLocale("/ar/tracks/software-testing", "en"),
    ).toBe("/en/tracks/software-testing");
  });

  it("localizes approved copy while preserving stable facts and destinations", async () => {
    const course = await courseService.getPublishedCourseBySlug(
      "software-testing-fundamentals",
    );
    const track = await trackService.getPublishedTrackBySlug("software-testing");
    const instructor = (await instructorService.getPublishedInstructors())[0];

    expect(course).toBeDefined();
    expect(track).toBeDefined();
    expect(instructor).toBeDefined();

    const arabicCourse = localizeCourse(course!, "ar");
    const arabicTrack = localizeTrack(track!, "ar");
    const arabicInstructor = localizeInstructor(instructor!, "ar");

    expect(arabicCourse).toMatchObject({
      slug: "software-testing-fundamentals",
      duration: "4 months",
      startDate: "To be announced",
      price: { amount: 7500, currency: "EGP" },
      registrationUrl: "/register-interest",
    });
    expect(arabicCourse.description).toContain("دبلومة Software Testing");
    expect(arabicTrack.slug).toBe("software-testing");
    expect(arabicInstructor.biography).toContain("أكتر من خمس سنين");
    expect(arabicInstructor.professionalLinks?.[0]?.url).toBe(
      "https://www.linkedin.com/in/ahmed-sayed-a2039821a/",
    );
  });

  it("formats the approved price clearly for each locale", () => {
    const price = { amount: 7500, currency: "EGP" } as const;
    expect(formatCoursePrice(price, "en")).toBe("7,500 EGP");
    expect(formatCoursePrice(price, "ar")).toBe("7,500 جنيه مصري");
  });
});

import { describe, expect, it } from "vitest";

import { createCourseRepository } from "../../src/features/courses/repositories/course.repository";
import { courseSchema } from "../../src/features/courses/schemas/course.schema";
import { createCourseService } from "../../src/features/courses/services/course.service";
import type { Course } from "../../src/features/courses/types/course.types";

const publishedFixture = {
  id: "test-course-published",
  slug: "synthetic-published-course",
  title: "Synthetic Published Course",
  shortDescription: "Test-only summary used to verify public course behavior.",
  description: "Test-only description used to verify the course service.",
  track: "Synthetic Track",
  level: "Beginner",
  duration: "Test duration",
  deliveryType: "Live Online",
  availability: "Open",
  learningOutcomes: ["Verify the published-course path"],
  featured: false,
  published: true,
} satisfies Course;

const unpublishedFixture = {
  ...publishedFixture,
  id: "test-course-unpublished",
  slug: "synthetic-unpublished-course",
  title: "Synthetic Unpublished Course",
  published: false,
} satisfies Course;

describe("course service", () => {
  const service = createCourseService(
    createCourseRepository([publishedFixture, unpublishedFixture]),
  );

  it("returns published courses without exposing unpublished records", async () => {
    await expect(service.getPublishedCourses()).resolves.toEqual([publishedFixture]);
  });

  it("resolves only an exact published slug", async () => {
    await expect(service.getPublishedCourseBySlug(publishedFixture.slug)).resolves.toEqual(
      publishedFixture,
    );
    await expect(service.getPublishedCourseBySlug(unpublishedFixture.slug)).resolves.toBeNull();
    await expect(service.getPublishedCourseBySlug("unknown-course")).resolves.toBeNull();
  });

  it("supports an empty approved dataset", async () => {
    const emptyService = createCourseService(createCourseRepository([]));
    await expect(emptyService.getPublishedCourses()).resolves.toEqual([]);
  });
});

describe("course data validation", () => {
  it.each([
    ["unsupported level", { ...publishedFixture, level: "Expert" }],
    ["unsupported delivery type", { ...publishedFixture, deliveryType: "Self paced" }],
    ["unsupported availability", { ...publishedFixture, availability: "Waitlist" }],
    ["invalid slug", { ...publishedFixture, slug: "Not a semantic slug" }],
  ])("rejects %s", (_caseName, record) => {
    expect(() => courseSchema.parse(record)).toThrow();
  });
});

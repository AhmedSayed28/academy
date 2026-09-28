import { describe, expect, it } from "vitest";

import { createCourseRepository } from "../../src/features/courses/repositories/course.repository";
import { createCourseService } from "../../src/features/courses/services/course.service";
import { createTrackRepository } from "../../src/features/tracks/repositories/track.repository";
import { trackSchema } from "../../src/features/tracks/schemas/track.schema";
import { createTrackService } from "../../src/features/tracks/services/track.service";
import type { Track } from "../../src/features/tracks/types/track.types";
import { syntheticCourseRecords } from "../fixtures/course-records";

const publishedFixture = {
  id: "unit-published-track",
  slug: "synthetic-software-testing-track",
  name: "Software Testing",
  shortDescription: "Test-only summary used to verify published track behavior.",
  description: "Test-only description used to verify the track service.",
  courseSlugs: ["synthetic-open-course", "synthetic-unpublished-course", "missing-course"],
  published: true,
} satisfies Track;

const unpublishedFixture = {
  ...publishedFixture,
  id: "unit-unpublished-track",
  slug: "synthetic-backend-track",
  name: "Backend Development",
  published: false,
} satisfies Track;

describe("track service", () => {
  const service = createTrackService(
    createTrackRepository([publishedFixture, unpublishedFixture]),
    createCourseService(createCourseRepository(syntheticCourseRecords)),
  );

  it("returns published tracks without exposing unpublished records", async () => {
    await expect(service.getPublishedTracks()).resolves.toEqual([publishedFixture]);
  });

  it("resolves only an exact published slug", async () => {
    await expect(service.getPublishedTrackBySlug(publishedFixture.slug)).resolves.toEqual(
      publishedFixture,
    );
    await expect(service.getPublishedTrackBySlug(unpublishedFixture.slug)).resolves.toBeNull();
    await expect(service.getPublishedTrackBySlug("unknown-track")).resolves.toBeNull();
  });

  it("returns only explicitly related published courses", async () => {
    const result = await service.getPublishedTrackDetail(publishedFixture.slug);

    expect(result?.relatedCourses.map(({ slug }) => slug)).toEqual(["synthetic-open-course"]);
  });

  it("supports an empty approved dataset", async () => {
    const emptyService = createTrackService(
      createTrackRepository([]),
      createCourseService(createCourseRepository([])),
    );
    await expect(emptyService.getPublishedTracks()).resolves.toEqual([]);
  });
});

describe("track data validation", () => {
  it.each([
    ["an undocumented track name", { ...publishedFixture, name: "Synthetic Track" }],
    ["an invalid slug", { ...publishedFixture, slug: "Not a semantic slug" }],
    ["an unknown field", { ...publishedFixture, inventedField: "not allowed" }],
  ])("rejects %s", (_caseName, record) => {
    expect(() => trackSchema.parse(record)).toThrow();
  });
});

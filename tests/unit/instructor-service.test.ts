import { describe, expect, it } from "vitest";

import { createInstructorRepository } from "../../src/features/instructors/repositories/instructor.repository";
import { instructorSchema } from "../../src/features/instructors/schemas/instructor.schema";
import { createInstructorService } from "../../src/features/instructors/services/instructor.service";
import type { Instructor } from "../../src/features/instructors/types/instructor.types";

const publishedFixture = {
  id: "unit-published-instructor",
  slug: "synthetic-published-instructor",
  name: "Synthetic Published Instructor",
  role: "Synthetic Test Role",
  biography: "Test-only biography for instructor service verification.",
  expertise: ["Synthetic expertise"],
  image: { src: "/test-only-instructor.jpg", alt: "Synthetic test portrait" },
  professionalLinks: [
    { label: "Synthetic profile", url: "https://example.test/profile" },
  ],
  published: true,
} satisfies Instructor;

const unpublishedFixture = {
  ...publishedFixture,
  id: "unit-unpublished-instructor",
  slug: "synthetic-unpublished-instructor",
  name: "Synthetic Unpublished Instructor",
  published: false,
} satisfies Instructor;

describe("instructor service", () => {
  it("returns published profiles without exposing unpublished records", async () => {
    const service = createInstructorService(
      createInstructorRepository([publishedFixture, unpublishedFixture]),
    );

    await expect(service.getPublishedInstructors()).resolves.toEqual([publishedFixture]);
  });

  it("supports an empty approved dataset", async () => {
    const service = createInstructorService(createInstructorRepository([]));

    await expect(service.getPublishedInstructors()).resolves.toEqual([]);
  });
});

describe("instructor data validation", () => {
  it("accepts profiles without optional images or professional links", () => {
    const minimalProfile = {
      id: publishedFixture.id,
      slug: publishedFixture.slug,
      name: publishedFixture.name,
      role: publishedFixture.role,
      biography: publishedFixture.biography,
      expertise: publishedFixture.expertise,
      published: publishedFixture.published,
    };

    expect(instructorSchema.parse(minimalProfile)).toEqual(minimalProfile);
  });

  it.each([
    ["an invalid slug", { ...publishedFixture, slug: "Not a semantic slug" }],
    ["empty expertise", { ...publishedFixture, expertise: [] }],
    ["a remote image", { ...publishedFixture, image: { src: "https://example.test/a.jpg", alt: "Portrait" } }],
    ["an unsafe professional link", { ...publishedFixture, professionalLinks: [{ label: "Profile", url: "javascript:alert(1)" }] }],
    ["an unknown field", { ...publishedFixture, employer: "Invented employer" }],
  ])("rejects %s", (_caseName, record) => {
    expect(() => instructorSchema.parse(record)).toThrow();
  });
});

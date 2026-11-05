import { describe, expect, it } from "vitest";

import { courseService } from "../../src/features/courses/services/course.service";
import { instructorService } from "../../src/features/instructors/services/instructor.service";
import { trackService } from "../../src/features/tracks/services/track.service";

describe("approved public content", () => {
  it("publishes exactly the four approved standalone courses without invented details", async () => {
    const courses = await courseService.getPublishedCourses();

    expect(courses.map(({ slug }) => slug)).toEqual(["istqb-foundation-level", "software-testing-practical", "front-end-development", "back-end-development"]);
    expect(courses.every((course) => course.featured && course.published)).toBe(true);
    expect(courses.every((course) => !course.price && !course.duration && !course.instructor && !course.curriculum)).toBe(true);
  });

  it("publishes the approved track with a valid course relationship", async () => {
    const detail = await trackService.getPublishedTrackDetail("software-testing");

    expect(detail?.track).toMatchObject({
      name: "Software Testing",
      courseSlugs: ["istqb-foundation-level", "software-testing-practical"],
      published: true,
    });
    expect(detail?.relatedCourses.map(({ slug }) => slug)).toEqual(["istqb-foundation-level", "software-testing-practical"]);
  });

  it("publishes only the approved image-free instructor profile", async () => {
    const instructors = await instructorService.getPublishedInstructors();

    expect(instructors).toHaveLength(1);
    expect(instructors[0]).toMatchObject({
      slug: "ahmed-sayed-ahmed",
      name: "Ahmed Sayed Ahmed",
      role: "Software Testing Lead",
      expertise: [
        "Manual Testing",
        "API Testing",
        "UI Automation Testing",
        "Test Planning",
        "QA Leadership",
      ],
      published: true,
    });
    expect(instructors[0]?.image).toBeUndefined();
  });
});

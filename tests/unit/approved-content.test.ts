import { describe, expect, it } from "vitest";

import { courseService } from "../../src/features/courses/services/course.service";
import { instructorService } from "../../src/features/instructors/services/instructor.service";
import { trackService } from "../../src/features/tracks/services/track.service";

describe("approved public content", () => {
  it("publishes the approved course as one featured four-module diploma", async () => {
    const courses = await courseService.getPublishedCourses();

    expect(courses).toHaveLength(1);
    expect(courses[0]).toMatchObject({
      slug: "software-testing-fundamentals",
      title: "Software Testing Fundamentals",
      track: "Software Testing",
      trackSlug: "software-testing",
      level: "Beginner",
      duration: "4 months",
      availability: "Upcoming",
      startDate: "To be announced",
      price: { amount: 7500, currency: "EGP" },
      registrationUrl: "/register-interest",
      featured: true,
      published: true,
    });
    expect(courses[0]?.deliveryType).toBeUndefined();
    expect(courses[0]?.curriculum).toHaveLength(4);
    expect(courses[0]?.curriculum?.map(({ title }) => title)).toEqual([
      "Module 1 — Manual Testing",
      "Module 2 — API Testing",
      "Module 3 — Database Testing",
      "Module 4 — UI Automation Testing",
    ]);
  });

  it("publishes the approved track with a valid course relationship", async () => {
    const detail = await trackService.getPublishedTrackDetail("software-testing");

    expect(detail?.track).toMatchObject({
      name: "Software Testing",
      courseSlugs: ["software-testing-fundamentals"],
      published: true,
    });
    expect(detail?.relatedCourses.map(({ slug }) => slug)).toEqual([
      "software-testing-fundamentals",
    ]);
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

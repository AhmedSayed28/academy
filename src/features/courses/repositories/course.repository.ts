import { courseCollectionSchema } from "@/features/courses/schemas/course.schema";
import type { Course } from "@/features/courses/types/course.types";

export interface CourseRepository {
  list(): Promise<readonly Course[]>;
}

export function createCourseRepository(sourceRecords: readonly unknown[]): CourseRepository {
  return {
    async list() {
      return courseCollectionSchema.parse(sourceRecords);
    },
  };
}

// Public course content must be approved before it is added here. Test records belong in tests.
const approvedCourseRecords: readonly unknown[] = [
  {
    id: "istqb-foundation-level",
    slug: "istqb-foundation-level",
    title: "ISTQB Foundation Level",
    shortDescription: "A standalone Software Testing course and part of the Software Testing Track.",
    description: "ISTQB Foundation Level is available as a standalone course. It can also be selected together with Software Testing Practical through the Software Testing Track registration path.",
    track: "Software Testing",
    trackSlug: "software-testing",
    availability: "Upcoming",
    registrationUrl: "/course-registration?course=istqb-foundation-level",
    featured: true,
    published: true,
  },
  { id: "software-testing-practical", slug: "software-testing-practical", title: "Software Testing Practical", shortDescription: "A standalone Software Testing course and part of the Software Testing Track.", description: "Software Testing Practical is available as a standalone course. It can also be selected together with ISTQB Foundation Level through the Software Testing Track registration path.", track: "Software Testing", trackSlug: "software-testing", availability: "Upcoming", registrationUrl: "/course-registration?course=software-testing-practical", featured: true, published: true },
  { id: "front-end-development", slug: "front-end-development", title: "Front End Development", shortDescription: "A standalone development course and part of the Full Stack Development path.", description: "Front End Development is available as a standalone course. It can also be selected together with Back End Development through the Full Stack Development registration path.", track: "Front End Development", trackSlug: "frontend-development", availability: "Upcoming", registrationUrl: "/course-registration?course=front-end-development", featured: true, published: true },
  { id: "back-end-development", slug: "back-end-development", title: "Back End Development", shortDescription: "A standalone development course and part of the Full Stack Development path.", description: "Back End Development is available as a standalone course. It can also be selected together with Front End Development through the Full Stack Development registration path.", track: "Back End Development", trackSlug: "backend-development", availability: "Upcoming", registrationUrl: "/course-registration?course=back-end-development", featured: true, published: true },
];

function getSourceRecords(): readonly unknown[] {
  const testRecords = process.env.ACADEMY_TEST_COURSE_RECORDS;

  if (process.env.NODE_ENV !== "production" && testRecords) {
    const parsed: unknown = JSON.parse(testRecords);
    return courseCollectionSchema.parse(parsed);
  }

  return approvedCourseRecords;
}

export const courseRepository = createCourseRepository(getSourceRecords());

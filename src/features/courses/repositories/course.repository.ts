import { courseCollectionSchema } from "@/features/courses/schemas/course.schema";
import type { Course } from "@/features/courses/types/course.types";
import { getDictionary } from "@/i18n/translations";

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
const courseCopy = getDictionary("en").courseContent;

const approvedCourseRecords: readonly unknown[] = [
  {
    id: "software-testing-fundamentals",
    slug: "software-testing-fundamentals",
    title: courseCopy.title,
    shortDescription: courseCopy.shortDescription,
    description: courseCopy.description,
    track: courseCopy.track,
    trackSlug: "software-testing",
    level: "Beginner",
    duration: "4 months",
    availability: "Upcoming",
    startDate: "To be announced",
    price: { amount: 7500, currency: "EGP" },
    instructor: {
      name: "Ahmed Sayed Ahmed",
      slug: "ahmed-sayed-ahmed",
      title: courseCopy.instructorTitle,
    },
    learningOutcomes: courseCopy.learningOutcomes,
    targetAudience: courseCopy.targetAudience,
    prerequisites: courseCopy.prerequisites,
    curriculum: courseCopy.curriculum,
    registrationUrl: "/register-interest",
    featured: true,
    published: true,
  },
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

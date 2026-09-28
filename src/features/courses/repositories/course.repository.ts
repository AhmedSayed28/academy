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
const approvedCourseRecords: readonly unknown[] = [];

function getSourceRecords(): readonly unknown[] {
  const testRecords = process.env.ACADEMY_TEST_COURSE_RECORDS;

  if (process.env.NODE_ENV !== "production" && testRecords) {
    const parsed: unknown = JSON.parse(testRecords);
    return courseCollectionSchema.parse(parsed);
  }

  return approvedCourseRecords;
}

export const courseRepository = createCourseRepository(getSourceRecords());

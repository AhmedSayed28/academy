import { instructorCollectionSchema } from "@/features/instructors/schemas/instructor.schema";
import type { Instructor } from "@/features/instructors/types/instructor.types";

export interface InstructorRepository {
  list(): Promise<readonly Instructor[]>;
}

export function createInstructorRepository(
  sourceRecords: readonly unknown[],
): InstructorRepository {
  return {
    async list() {
      return instructorCollectionSchema.parse(sourceRecords);
    },
  };
}

// Public profiles stay empty until real instructor content and assets are approved.
const approvedInstructorRecords: readonly unknown[] = [];

function getSourceRecords(): readonly unknown[] {
  const testRecords = process.env.ACADEMY_TEST_INSTRUCTOR_RECORDS;

  if (process.env.NODE_ENV !== "production" && testRecords) {
    const parsed: unknown = JSON.parse(testRecords);
    return instructorCollectionSchema.parse(parsed);
  }

  return approvedInstructorRecords;
}

export const instructorRepository = createInstructorRepository(getSourceRecords());

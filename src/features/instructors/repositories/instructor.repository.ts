import { instructorCollectionSchema } from "@/features/instructors/schemas/instructor.schema";
import type { Instructor } from "@/features/instructors/types/instructor.types";
import { getDictionary } from "@/i18n/translations";

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

// Public profiles contain approved information only. Test records belong in tests.
const instructorCopy = getDictionary("en").instructorContent;

const approvedInstructorRecords: readonly unknown[] = [
  {
    id: "ahmed-sayed-ahmed",
    slug: "ahmed-sayed-ahmed",
    name: "Ahmed Sayed Ahmed",
    role: instructorCopy.role,
    biography: instructorCopy.biography,
    expertise: instructorCopy.expertise,
    professionalLinks: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/ahmed-sayed-a2039821a/",
      },
    ],
    published: true,
  },
];

function getSourceRecords(): readonly unknown[] {
  const testRecords = process.env.ACADEMY_TEST_INSTRUCTOR_RECORDS;

  if (process.env.NODE_ENV !== "production" && testRecords) {
    const parsed: unknown = JSON.parse(testRecords);
    return instructorCollectionSchema.parse(parsed);
  }

  return approvedInstructorRecords;
}

export const instructorRepository = createInstructorRepository(getSourceRecords());

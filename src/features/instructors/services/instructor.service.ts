import {
  instructorRepository,
  type InstructorRepository,
} from "@/features/instructors/repositories/instructor.repository";
import type { Instructor } from "@/features/instructors/types/instructor.types";

export interface InstructorService {
  getPublishedInstructors(): Promise<readonly Instructor[]>;
}

export function createInstructorService(repository: InstructorRepository): InstructorService {
  return {
    async getPublishedInstructors() {
      const instructors = await repository.list();
      return instructors.filter((instructor) => instructor.published);
    },
  };
}

export const instructorService = createInstructorService(instructorRepository);

import type { z } from "zod";

import type {
  instructorImageSchema,
  instructorSchema,
  professionalLinkSchema,
} from "@/features/instructors/schemas/instructor.schema";

export type InstructorImage = z.infer<typeof instructorImageSchema>;
export type ProfessionalLink = z.infer<typeof professionalLinkSchema>;
export type Instructor = z.infer<typeof instructorSchema>;

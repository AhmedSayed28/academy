import type { z } from "zod";

import type {
  courseAvailabilitySchema,
  courseDeliveryTypeSchema,
  courseLevelSchema,
  coursePriceSchema,
  courseSchema,
} from "@/features/courses/schemas/course.schema";

export type Course = z.infer<typeof courseSchema>;
export type CourseLevel = z.infer<typeof courseLevelSchema>;
export type CourseDeliveryType = z.infer<typeof courseDeliveryTypeSchema>;
export type CourseAvailability = z.infer<typeof courseAvailabilitySchema>;
export type CoursePrice = z.infer<typeof coursePriceSchema>;

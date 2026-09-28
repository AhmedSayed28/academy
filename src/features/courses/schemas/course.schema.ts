import { z } from "zod";

export const courseLevelSchema = z.enum(["Beginner", "Intermediate", "Advanced"]);

export const courseDeliveryTypeSchema = z.enum([
  "Online",
  "Offline",
  "Hybrid",
  "Live Online",
]);

export const courseAvailabilitySchema = z.enum(["Open", "Upcoming", "Closed"]);

const instructorSchema = z.object({
  name: z.string().trim().min(1),
  title: z.string().trim().min(1).optional(),
});

const curriculumSectionSchema = z.object({
  title: z.string().trim().min(1),
  topics: z.array(z.string().trim().min(1)).optional(),
});

export const courseSchema = z.object({
  id: z.string().trim().min(1),
  slug: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Course slugs must use lowercase kebab-case"),
  title: z.string().trim().min(1),
  shortDescription: z.string().trim().min(1),
  description: z.string().trim().min(1),
  track: z.string().trim().min(1),
  level: courseLevelSchema,
  duration: z.string().trim().min(1),
  deliveryType: courseDeliveryTypeSchema,
  availability: courseAvailabilitySchema,
  instructor: instructorSchema.optional(),
  learningOutcomes: z.array(z.string().trim().min(1)).optional(),
  targetAudience: z.array(z.string().trim().min(1)).optional(),
  prerequisites: z.array(z.string().trim().min(1)).optional(),
  curriculum: z.array(curriculumSectionSchema).optional(),
  registrationUrl: z.string().trim().url().optional(),
  featured: z.boolean(),
  published: z.boolean(),
});

export const courseCollectionSchema = z.array(courseSchema);

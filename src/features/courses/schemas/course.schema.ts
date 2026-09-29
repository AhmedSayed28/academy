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
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Instructor slugs must use lowercase kebab-case")
    .optional(),
  title: z.string().trim().min(1).optional(),
});

const curriculumSectionSchema = z.object({
  title: z.string().trim().min(1),
  topics: z.array(z.string().trim().min(1)).optional(),
});

const isoCurrencyCodes = new Set(Intl.supportedValuesOf("currency"));

const isoCurrencySchema = z
  .string()
  .regex(/^[A-Z]{3}$/, "Currencies must use a three-letter ISO 4217 code")
  .refine((currency) => isoCurrencyCodes.has(currency), {
    message: "Currencies must use a supported ISO 4217 code",
  });

export const coursePriceSchema = z
  .object({
    amount: z.number().finite().nonnegative(),
    currency: isoCurrencySchema,
  })
  .strict();

const registrationUrlSchema = z.string().trim().refine(
  (value) => {
    if (value.startsWith("/") && !value.startsWith("//")) return true;

    try {
      return ["http:", "https:"].includes(new URL(value).protocol);
    } catch {
      return false;
    }
  },
  { message: "Registration URLs must use a local path, HTTP, or HTTPS" },
);

export const courseSchema = z
  .object({
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
    trackSlug: z
      .string()
      .trim()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Track slugs must use lowercase kebab-case"),
    level: courseLevelSchema,
    duration: z.string().trim().min(1),
    deliveryType: courseDeliveryTypeSchema.optional(),
    availability: courseAvailabilitySchema,
    startDate: z.union([z.iso.date(), z.literal("To be announced")]).optional(),
    price: coursePriceSchema.optional(),
    instructor: instructorSchema.optional(),
    learningOutcomes: z.array(z.string().trim().min(1)).optional(),
    targetAudience: z.array(z.string().trim().min(1)).optional(),
    prerequisites: z.array(z.string().trim().min(1)).optional(),
    curriculum: z.array(curriculumSectionSchema).optional(),
    registrationUrl: registrationUrlSchema.optional(),
    featured: z.boolean(),
    published: z.boolean(),
  })
  .strict();

export const courseCollectionSchema = z.array(courseSchema);

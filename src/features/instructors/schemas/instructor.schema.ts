import { z } from "zod";

const slugSchema = z
  .string()
  .trim()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Instructor slugs must use lowercase kebab-case");

const safeUrlSchema = z
  .url()
  .refine((value) => ["http:", "https:"].includes(new URL(value).protocol), {
    message: "Professional links must use HTTP or HTTPS",
  });

export const instructorImageSchema = z
  .object({
    src: z.string().trim().startsWith("/", "Instructor images must use an approved local path"),
    alt: z.string().trim().min(1),
  })
  .strict();

export const professionalLinkSchema = z
  .object({
    label: z.string().trim().min(1),
    url: safeUrlSchema,
  })
  .strict();

export const instructorSchema = z
  .object({
    id: z.string().trim().min(1),
    slug: slugSchema,
    name: z.string().trim().min(1),
    role: z.string().trim().min(1),
    biography: z.string().trim().min(1),
    expertise: z.array(z.string().trim().min(1)).min(1),
    image: instructorImageSchema.optional(),
    professionalLinks: z.array(professionalLinkSchema).min(1).optional(),
    published: z.boolean(),
  })
  .strict();

export const instructorCollectionSchema = z.array(instructorSchema);

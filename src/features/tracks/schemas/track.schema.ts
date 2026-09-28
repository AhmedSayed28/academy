import { z } from "zod";

import { documentedTrackNames } from "@/config/learning-tracks";

export const documentedTrackNameSchema = z.enum(documentedTrackNames);

export const trackSchema = z
  .object({
    id: z.string().trim().min(1),
    slug: z
      .string()
      .trim()
      .min(1)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Track slugs must use lowercase kebab-case"),
    name: documentedTrackNameSchema,
    shortDescription: z.string().trim().min(1),
    description: z.string().trim().min(1),
    careerGoal: z.string().trim().min(1).optional(),
    skills: z.array(z.string().trim().min(1)).optional(),
    learningJourney: z.array(z.string().trim().min(1)).optional(),
    tools: z.array(z.string().trim().min(1)).optional(),
    courseSlugs: z.array(z.string().trim().min(1)).optional(),
    published: z.boolean(),
  })
  .strict();

export const trackCollectionSchema = z.array(trackSchema);

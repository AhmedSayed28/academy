import { z } from "zod";

const phonePattern = /^[+()\d\s.-]+$/;

export const leadFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(100, "Full name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .max(254, "Email address must be 254 characters or fewer.")
    .email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number must be 30 characters or fewer.")
    .refine((value) => value.length === 0 || phonePattern.test(value), {
      message: "Enter a valid phone number.",
    }),
  message: z
    .string()
    .trim()
    .max(1000, "Message must be 1,000 characters or fewer."),
});

export const leadRequestSchema = leadFormSchema
  .extend({ submissionId: z.string().uuid("Invalid submission identifier.") })
  .transform((value) => ({
    ...value,
    email: value.email.toLowerCase(),
    phone: value.phone || null,
    message: value.message || null,
  }));

export type LeadFormValues = z.input<typeof leadFormSchema>;
export type LeadSubmission = z.output<typeof leadRequestSchema>;

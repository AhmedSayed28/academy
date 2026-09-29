import { z } from "zod";

const phonePattern = /^[+()\d\s.-]+$/;

export const contactFormSchema = z.object({
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
  subject: z
    .string()
    .trim()
    .min(2, "Enter a subject.")
    .max(150, "Subject must be 150 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(10, "Enter a message of at least 10 characters.")
    .max(2000, "Message must be 2,000 characters or fewer."),
});

export const contactRequestSchema = contactFormSchema
  .extend({ submissionId: z.string().uuid("Invalid submission identifier.") })
  .transform((value) => ({
    ...value,
    email: value.email.toLowerCase(),
    phone: value.phone || null,
  }));

export type ContactFormValues = z.input<typeof contactFormSchema>;
export type ContactSubmission = z.output<typeof contactRequestSchema>;

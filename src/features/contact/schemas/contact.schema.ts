import { z } from "zod";

const phonePattern = /^[+()\d\s.-]+$/;

export interface ContactValidationMessages {
  fullNameMin: string;
  fullNameMax: string;
  emailRequired: string;
  emailMax: string;
  emailInvalid: string;
  phoneMax: string;
  phoneInvalid: string;
  subjectMin: string;
  subjectMax: string;
  messageMin: string;
  messageMax: string;
}

const englishMessages: ContactValidationMessages = {
  fullNameMin: "Enter your full name.",
  fullNameMax: "Full name must be 100 characters or fewer.",
  emailRequired: "Enter your email address.",
  emailMax: "Email address must be 254 characters or fewer.",
  emailInvalid: "Enter a valid email address.",
  phoneMax: "Phone number must be 30 characters or fewer.",
  phoneInvalid: "Enter a valid phone number.",
  subjectMin: "Enter a subject.",
  subjectMax: "Subject must be 150 characters or fewer.",
  messageMin: "Enter a message of at least 10 characters.",
  messageMax: "Message must be 2,000 characters or fewer.",
};

export function createContactFormSchema(messages: ContactValidationMessages) {
  return z.object({
  fullName: z
    .string()
    .trim()
    .min(2, messages.fullNameMin)
    .max(100, messages.fullNameMax),
  email: z
    .string()
    .trim()
    .min(1, messages.emailRequired)
    .max(254, messages.emailMax)
    .email(messages.emailInvalid),
  phone: z
    .string()
    .trim()
    .max(30, messages.phoneMax)
    .refine((value) => value.length === 0 || phonePattern.test(value), {
      message: messages.phoneInvalid,
    }),
  subject: z
    .string()
    .trim()
    .min(2, messages.subjectMin)
    .max(150, messages.subjectMax),
  message: z
    .string()
    .trim()
    .min(10, messages.messageMin)
    .max(2000, messages.messageMax),
  });
}

export const contactFormSchema = createContactFormSchema(englishMessages);

export const contactRequestSchema = contactFormSchema
  .extend({ submissionId: z.string().uuid("Invalid submission identifier.") })
  .transform((value) => ({
    ...value,
    email: value.email.toLowerCase(),
    phone: value.phone || null,
  }));

export type ContactFormValues = z.input<typeof contactFormSchema>;
export type ContactSubmission = z.output<typeof contactRequestSchema>;

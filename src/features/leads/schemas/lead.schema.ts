import { z } from "zod";
import { registrationOptions } from "@/features/leads/registration-options";

const phonePattern = /^[+()\d\s.-]+$/;

export interface LeadValidationMessages {
  fullNameMin: string;
  fullNameMax: string;
  emailRequired: string;
  emailMax: string;
  emailInvalid: string;
  phoneMax: string;
  phoneInvalid: string;
  phoneRequired: string;
  selectionRequired: string;
  selectionInvalid: string;
}

const englishMessages: LeadValidationMessages = {
  fullNameMin: "Enter your full name.",
  fullNameMax: "Full name must be 100 characters or fewer.",
  emailRequired: "Enter your email address.",
  emailMax: "Email address must be 254 characters or fewer.",
  emailInvalid: "Enter a valid email address.",
  phoneMax: "Phone number must be 30 characters or fewer.",
  phoneInvalid: "Enter a valid phone number.",
  phoneRequired: "Enter your phone number.",
  selectionRequired: "Select a course or registration path.",
  selectionInvalid: "Select an available course or registration path.",
};

export function createLeadFormSchema(messages: LeadValidationMessages) {
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
    .min(1, messages.phoneRequired)
    .max(30, messages.phoneMax)
    .refine((value) => phonePattern.test(value), {
      message: messages.phoneInvalid,
    }),
  selectedCourseSlug: z.string().trim().min(1, messages.selectionRequired).refine(
    (value) => registrationOptions.some((option) => option.slug === value),
    messages.selectionInvalid,
  ),
  });
}

export const leadFormSchema = createLeadFormSchema(englishMessages);

export const leadRequestSchema = leadFormSchema
  .extend({ submissionId: z.string().uuid("Invalid submission identifier.") })
  .transform((value) => ({
    ...value,
    email: value.email.toLowerCase(),
    phone: value.phone,
  }));

export type LeadFormValues = z.input<typeof leadFormSchema>;
export type LeadSubmission = z.output<typeof leadRequestSchema>;

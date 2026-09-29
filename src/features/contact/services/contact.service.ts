import { contactRepository } from "@/features/contact/repositories/contact.repository";
import type { ContactSubmission } from "@/features/contact/schemas/contact.schema";
import type { ContactRepository } from "@/features/contact/types/contact.types";

export interface ContactService {
  submit(message: ContactSubmission): Promise<{ submitted: true }>;
}

export function createContactService(repository: ContactRepository): ContactService {
  return {
    async submit(message) {
      await repository.create(message);
      return { submitted: true };
    },
  };
}

export const contactService = createContactService(contactRepository);

import { leadRepository } from "@/features/leads/repositories/lead.repository";
import type { LeadSubmission } from "@/features/leads/schemas/lead.schema";
import type { LeadRepository } from "@/features/leads/types/lead.types";

export interface LeadService {
  submit(lead: LeadSubmission): Promise<{ submitted: true }>;
}

export function createLeadService(repository: LeadRepository): LeadService {
  return {
    async submit(lead) {
      await repository.create(lead);
      return { submitted: true };
    },
  };
}

export const leadService = createLeadService(leadRepository);

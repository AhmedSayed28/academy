import { z } from "zod";

import type { LeadRepository } from "@/features/leads/types/lead.types";

const supabaseEnvironmentSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_SECRET_KEY: z.string().min(1),
});

type FetchImplementation = typeof fetch;

function getSupabaseConfiguration(environment: Readonly<Record<string, string | undefined>>) {
  const result = supabaseEnvironmentSchema.safeParse(environment);

  if (!result.success) {
    throw new Error("Lead persistence is not configured.");
  }

  return result.data;
}

export function createSupabaseLeadRepository(
  environment: Readonly<Record<string, string | undefined>> = process.env,
  fetchImplementation: FetchImplementation = fetch,
): LeadRepository {
  return {
    async create(lead) {
      const configuration = getSupabaseConfiguration(environment);
      const endpoint = new URL("/rest/v1/leads", configuration.SUPABASE_URL);
      endpoint.searchParams.set("on_conflict", "submission_id");

      const response = await fetchImplementation(endpoint, {
        method: "POST",
        headers: {
          apikey: configuration.SUPABASE_SECRET_KEY,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify({
          submission_id: lead.submissionId,
          full_name: lead.fullName,
          email: lead.email,
          phone: lead.phone,
          message: lead.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Lead persistence failed.");
      }
    },
  };
}

export const leadRepository = createSupabaseLeadRepository();

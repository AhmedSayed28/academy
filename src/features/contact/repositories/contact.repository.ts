import { z } from "zod";

import type { ContactRepository } from "@/features/contact/types/contact.types";

const supabaseEnvironmentSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_SECRET_KEY: z.string().min(1),
});

type FetchImplementation = typeof fetch;

function getSupabaseConfiguration(environment: Readonly<Record<string, string | undefined>>) {
  const result = supabaseEnvironmentSchema.safeParse(environment);

  if (!result.success) {
    throw new Error("Contact persistence is not configured.");
  }

  return result.data;
}

export function createSupabaseContactRepository(
  environment: Readonly<Record<string, string | undefined>> = process.env,
  fetchImplementation: FetchImplementation = fetch,
): ContactRepository {
  return {
    async create(message) {
      const configuration = getSupabaseConfiguration(environment);
      const endpoint = new URL("/rest/v1/contact_messages", configuration.SUPABASE_URL);
      endpoint.searchParams.set("on_conflict", "submission_id");

      const response = await fetchImplementation(endpoint, {
        method: "POST",
        headers: {
          apikey: configuration.SUPABASE_SECRET_KEY,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify({
          submission_id: message.submissionId,
          full_name: message.fullName,
          email: message.email,
          phone: message.phone,
          subject: message.subject,
          message: message.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Contact persistence failed.");
      }
    },
  };
}

export const contactRepository = createSupabaseContactRepository();

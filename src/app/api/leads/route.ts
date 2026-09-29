import { leadRequestSchema } from "@/features/leads/schemas/lead.schema";
import { leadService, type LeadService } from "@/features/leads/services/lead.service";
import type { LeadApiError, LeadApiResponse } from "@/features/leads/types/lead.types";

const validationError: LeadApiError = {
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid request data",
  },
};

const persistenceError: LeadApiError = {
  success: false,
  error: {
    code: "PERSISTENCE_ERROR",
    message: "We couldn't save your interest right now. Please try again.",
  },
};

export function createLeadPostHandler(service: LeadService) {
  return async function POST(request: Request): Promise<Response> {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return Response.json(validationError, { status: 400 });
    }

    const result = leadRequestSchema.safeParse(body);

    if (!result.success) {
      return Response.json(validationError, { status: 400 });
    }

    try {
      const data = await service.submit(result.data);
      const response: LeadApiResponse = { success: true, data };
      return Response.json(response, { status: 201 });
    } catch {
      return Response.json(persistenceError, { status: 503 });
    }
  };
}

export const POST = createLeadPostHandler(leadService);

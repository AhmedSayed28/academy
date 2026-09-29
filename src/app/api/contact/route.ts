import { contactRequestSchema } from "@/features/contact/schemas/contact.schema";
import {
  contactService,
  type ContactService,
} from "@/features/contact/services/contact.service";
import type {
  ContactApiError,
  ContactApiResponse,
} from "@/features/contact/types/contact.types";

const validationError: ContactApiError = {
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid request data",
  },
};

const persistenceError: ContactApiError = {
  success: false,
  error: {
    code: "PERSISTENCE_ERROR",
    message: "We couldn't send your message right now. Please try again.",
  },
};

export function createContactPostHandler(service: ContactService) {
  return async function POST(request: Request): Promise<Response> {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return Response.json(validationError, { status: 400 });
    }

    const result = contactRequestSchema.safeParse(body);

    if (!result.success) {
      return Response.json(validationError, { status: 400 });
    }

    try {
      const data = await service.submit(result.data);
      const response: ContactApiResponse = { success: true, data };
      return Response.json(response, { status: 201 });
    } catch {
      return Response.json(persistenceError, { status: 503 });
    }
  };
}

export const POST = createContactPostHandler(contactService);

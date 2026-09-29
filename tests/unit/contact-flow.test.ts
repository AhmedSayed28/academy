import { describe, expect, it, vi } from "vitest";

import { createContactPostHandler } from "../../src/app/api/contact/route";
import { createSupabaseContactRepository } from "../../src/features/contact/repositories/contact.repository";
import { contactFormSchema } from "../../src/features/contact/schemas/contact.schema";
import { createContactService } from "../../src/features/contact/services/contact.service";
import type { ContactRecord, ContactRepository } from "../../src/features/contact/types/contact.types";

const validRequest = {
  submissionId: "3c83336e-7d8b-4db3-aeb1-f6c245b82b14",
  fullName: "  Synthetic Visitor  ",
  email: "  VISITOR@example.com ",
  phone: "",
  subject: "  Course question  ",
  message: "  Please share more information about the learning approach.  ",
};

function request(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("contact form validation", () => {
  it("accepts all required contact details with an optional phone", () => {
    expect(
      contactFormSchema.parse({
        fullName: "Synthetic Visitor",
        email: "visitor@example.com",
        phone: "",
        subject: "Course question",
        message: "Please share more information.",
      }),
    ).toEqual({
      fullName: "Synthetic Visitor",
      email: "visitor@example.com",
      phone: "",
      subject: "Course question",
      message: "Please share more information.",
    });
  });

  it.each([
    ["missing name", { ...validRequest, fullName: "" }],
    ["invalid email", { ...validRequest, email: "not-email" }],
    ["invalid phone", { ...validRequest, phone: "call me" }],
    ["missing subject", { ...validRequest, subject: "" }],
    ["short message", { ...validRequest, message: "Too short" }],
  ])("rejects %s", (_name, input) => {
    expect(contactFormSchema.safeParse(input).success).toBe(false);
  });
});

describe("POST /api/contact", () => {
  it("normalizes and persists a valid message before reporting success", async () => {
    const stored: ContactRecord[] = [];
    const repository: ContactRepository = {
      async create(message) {
        stored.push(message);
      },
    };
    const handler = createContactPostHandler(createContactService(repository));

    const response = await handler(request(validRequest));

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({ success: true, data: { submitted: true } });
    expect(stored).toEqual([{
      submissionId: validRequest.submissionId,
      fullName: "Synthetic Visitor",
      email: "visitor@example.com",
      phone: null,
      subject: "Course question",
      message: "Please share more information about the learning approach.",
    }]);
  });

  it("rejects invalid input without calling persistence", async () => {
    const create = vi.fn<ContactRepository["create"]>();
    const handler = createContactPostHandler(createContactService({ create }));
    const response = await handler(request({ ...validRequest, subject: "" }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: { code: "VALIDATION_ERROR", message: "Invalid request data" },
    });
    expect(create).not.toHaveBeenCalled();
  });

  it("returns a safe error and no success when persistence fails", async () => {
    const handler = createContactPostHandler(createContactService({
      async create() {
        throw new Error("relation missing; secret=database-key");
      },
    }));
    const response = await handler(request(validRequest));
    const body = await response.text();

    expect(response.status).toBe(503);
    expect(JSON.parse(body)).toEqual({
      success: false,
      error: {
        code: "PERSISTENCE_ERROR",
        message: "We couldn't send your message right now. Please try again.",
      },
    });
    expect(body).not.toContain("relation missing");
    expect(body).not.toContain("database-key");
  });
});

describe("Supabase contact repository", () => {
  it("fails clearly when server-only Supabase configuration is missing", async () => {
    const fetchImplementation = vi.fn<typeof fetch>();
    const repository = createSupabaseContactRepository({}, fetchImplementation);

    await expect(repository.create({
      submissionId: validRequest.submissionId,
      fullName: "Synthetic Visitor",
      email: "visitor@example.com",
      phone: null,
      subject: "Course question",
      message: "Please share more information.",
    })).rejects.toThrow("Contact persistence is not configured.");
    expect(fetchImplementation).not.toHaveBeenCalled();
  });

  it("upserts the normalized record and sends the secret key only as apikey", async () => {
    const fetchImplementation = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 201 }));
    const repository = createSupabaseContactRepository({
      SUPABASE_URL: "https://test-project.supabase.co",
      SUPABASE_SECRET_KEY: "sb_secret_test-only-key",
    }, fetchImplementation);
    const message: ContactRecord = {
      submissionId: validRequest.submissionId,
      fullName: "Synthetic Visitor",
      email: "visitor@example.com",
      phone: null,
      subject: "Course question",
      message: "Please share more information.",
    };

    await repository.create(message);

    expect(fetchImplementation).toHaveBeenCalledOnce();
    const [url, options] = fetchImplementation.mock.calls[0];
    expect(url.toString()).toBe("https://test-project.supabase.co/rest/v1/contact_messages?on_conflict=submission_id");
    expect(options?.headers).toMatchObject({
      apikey: "sb_secret_test-only-key",
      Prefer: "resolution=merge-duplicates,return=minimal",
    });
    expect(options?.headers).not.toHaveProperty("Authorization");
    expect(JSON.parse(String(options?.body))).toEqual({
      submission_id: message.submissionId,
      full_name: message.fullName,
      email: message.email,
      phone: null,
      subject: message.subject,
      message: message.message,
    });
  });
});

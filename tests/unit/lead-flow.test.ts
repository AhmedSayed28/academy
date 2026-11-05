import { describe, expect, it, vi } from "vitest";

import { createLeadPostHandler } from "../../src/app/api/leads/route";
import { createSupabaseLeadRepository } from "../../src/features/leads/repositories/lead.repository";
import { leadFormSchema } from "../../src/features/leads/schemas/lead.schema";
import { createLeadService } from "../../src/features/leads/services/lead.service";
import type { LeadRecord, LeadRepository } from "../../src/features/leads/types/lead.types";

const validRequest = {
  submissionId: "ebad4e3d-d9b7-4fd8-8e9d-a56c5c26866c",
  fullName: "  Test Learner  ",
  email: "  LEARNER@example.com ",
  phone: "+20 100 000 0000",
  selectedCourseSlug: "istqb-foundation-level",
};

function request(body: unknown) {
  return new Request("http://localhost/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("lead form validation", () => {
  it("accepts all required details with an approved course", () => {
    expect(
      leadFormSchema.parse({
        fullName: "Test Learner",
        email: "learner@example.com",
        phone: "+20 100 000 0000",
        selectedCourseSlug: "istqb-foundation-level",
      }),
    ).toEqual({
      fullName: "Test Learner",
      email: "learner@example.com",
      phone: "+20 100 000 0000",
      selectedCourseSlug: "istqb-foundation-level",
    });
  });

  it.each([
    ["missing name", { fullName: "", email: "learner@example.com", phone: "+20100", selectedCourseSlug: "istqb-foundation-level" }],
    ["invalid email", { fullName: "Test Learner", email: "not-email", phone: "+20100", selectedCourseSlug: "istqb-foundation-level" }],
    ["invalid phone", { fullName: "Test Learner", email: "learner@example.com", phone: "call me", selectedCourseSlug: "istqb-foundation-level" }],
    ["obsolete selection", { fullName: "Test Learner", email: "learner@example.com", phone: "+20100", selectedCourseSlug: "software-testing-fundamentals" }],
  ])("rejects %s", (_name, input) => {
    expect(leadFormSchema.safeParse(input).success).toBe(false);
  });
});

describe("POST /api/leads", () => {
  it("normalizes and persists a valid submission before reporting success", async () => {
    const stored: LeadRecord[] = [];
    const repository: LeadRepository = {
      async create(lead) {
        stored.push(lead);
      },
    };
    const handler = createLeadPostHandler(createLeadService(repository));

    const response = await handler(request(validRequest));

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({
      success: true,
      data: { submitted: true },
    });
    expect(stored).toEqual([
      {
        submissionId: validRequest.submissionId,
        fullName: "Test Learner",
        email: "learner@example.com",
        phone: "+20 100 000 0000",
        selectedCourseSlug: "istqb-foundation-level",
      },
    ]);
  });

  it("rejects invalid input without calling persistence", async () => {
    const create = vi.fn<LeadRepository["create"]>();
    const handler = createLeadPostHandler(createLeadService({ create }));

    const response = await handler(request({ ...validRequest, email: "invalid" }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: { code: "VALIDATION_ERROR", message: "Invalid request data" },
    });
    expect(create).not.toHaveBeenCalled();
  });

  it("returns a safe error and no success when persistence fails", async () => {
    const handler = createLeadPostHandler(
      createLeadService({
        async create() {
          throw new Error("relation public.leads does not exist; secret=database-key");
        },
      }),
    );

    const response = await handler(request(validRequest));
    const body = await response.text();

    expect(response.status).toBe(503);
    expect(JSON.parse(body)).toEqual({
      success: false,
      error: {
        code: "PERSISTENCE_ERROR",
        message: "We couldn't save your interest right now. Please try again.",
      },
    });
    expect(body).not.toContain("relation public.leads");
    expect(body).not.toContain("database-key");
  });
});

describe("Supabase lead repository", () => {
  it("fails clearly when server-only Supabase configuration is missing", async () => {
    const fetchImplementation = vi.fn<typeof fetch>();
    const repository = createSupabaseLeadRepository({}, fetchImplementation);

    await expect(
      repository.create({
        submissionId: validRequest.submissionId,
        fullName: "Test Learner",
        email: "learner@example.com",
        phone: null,
        selectedCourseSlug: "full-stack-development",
      }),
    ).rejects.toThrow("Lead persistence is not configured.");
    expect(fetchImplementation).not.toHaveBeenCalled();
  });

  it("upserts the normalized record and sends the secret key only as apikey", async () => {
    const fetchImplementation = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(null, { status: 201 }));
    const repository = createSupabaseLeadRepository(
      {
        SUPABASE_URL: "https://test-project.supabase.co",
        SUPABASE_SECRET_KEY: "sb_secret_test-only-key",
      },
      fetchImplementation,
    );
    const lead: LeadRecord = {
      submissionId: validRequest.submissionId,
      fullName: "Test Learner",
      email: "learner@example.com",
      phone: "+20100",
      selectedCourseSlug: "software-testing-track",
    };

    await repository.create(lead);

    expect(fetchImplementation).toHaveBeenCalledOnce();
    const [url, options] = fetchImplementation.mock.calls[0];
    expect(url.toString()).toBe(
      "https://test-project.supabase.co/rest/v1/leads?on_conflict=submission_id",
    );
    expect(options?.headers).toMatchObject({
      apikey: "sb_secret_test-only-key",
      Prefer: "resolution=merge-duplicates,return=minimal",
    });
    expect(options?.headers).not.toHaveProperty("Authorization");
    expect(JSON.parse(String(options?.body))).toEqual({
      submission_id: lead.submissionId,
      full_name: lead.fullName,
      email: lead.email,
      phone: "+20100",
      selected_course_slug: lead.selectedCourseSlug,
    });
  });
});

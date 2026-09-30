"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  createContactFormSchema,
  type ContactFormValues,
} from "@/features/contact/schemas/contact.schema";
import type { Dictionary } from "@/i18n/translations";

type SubmissionFeedback =
  | { state: "idle" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

const inputClassName =
  "mt-2 min-h-11 w-full rounded-lg border border-input bg-surface px-3 py-2 text-base text-foreground shadow-sm placeholder:text-muted-foreground/70 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground";

function isSuccessfulResponse(value: unknown): value is {
  success: true;
  data: { submitted: true };
} {
  if (typeof value !== "object" || value === null) return false;

  const response = value as { success?: unknown; data?: unknown };
  if (response.success !== true || typeof response.data !== "object" || response.data === null) {
    return false;
  }

  return (response.data as { submitted?: unknown }).submitted === true;
}

function getApiErrorCode(value: unknown): string | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const error = (value as { error?: unknown }).error;
  if (typeof error !== "object" || error === null) return undefined;
  const code = (error as { code?: unknown }).code;
  return typeof code === "string" ? code : undefined;
}

export function ContactForm({ copy }: { copy: Dictionary["contact"]["form"] }) {
  const [feedback, setFeedback] = useState<SubmissionFeedback>({ state: "idle" });
  const [isSending, setIsSending] = useState(false);
  const submissionLock = useRef(false);
  const submissionId = useRef<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(createContactFormSchema(copy.validation)),
    defaultValues: { fullName: "", email: "", phone: "", subject: "", message: "" },
  });

  async function handleValidSubmit(values: ContactFormValues) {
    if (submissionLock.current) return;

    submissionLock.current = true;
    setIsSending(true);
    setFeedback({ state: "idle" });
    submissionId.current ??= crypto.randomUUID();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, submissionId: submissionId.current }),
      });
      const body: unknown = await response.json();

      if (!response.ok || !isSuccessfulResponse(body)) {
        throw new Error(getApiErrorCode(body) ?? "SUBMISSION_FAILED");
      }

      reset();
      submissionId.current = null;
      setFeedback({
        state: "success",
        message: copy.success,
      });
    } catch (error) {
      setFeedback({
        state: "error",
        message:
          error instanceof Error && error.message === "VALIDATION_ERROR"
            ? copy.validationFailure
            : copy.failure,
      });
    } finally {
      submissionLock.current = false;
      setIsSending(false);
    }
  }

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    void handleSubmit(handleValidSubmit)(event);
  }

  const disabled = isSubmitting || isSending;

  return (
    <form noValidate onSubmit={submitMessage} className="space-y-6" aria-busy={disabled}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="text-sm font-semibold text-foreground">
            {copy.fullName} <span aria-hidden="true" className="text-destructive">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            disabled={disabled}
            aria-invalid={errors.fullName ? "true" : "false"}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={inputClassName}
            {...register("fullName")}
          />
          {errors.fullName ? (
            <p id="fullName-error" className="mt-2 text-sm text-destructive">
              {errors.fullName.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-semibold text-foreground">
            {copy.email} <span aria-hidden="true" className="text-destructive">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            disabled={disabled}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClassName}
            {...register("email")}
          />
          {errors.email ? (
            <p id="email-error" className="mt-2 text-sm text-destructive">
              {errors.email.message}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-semibold text-foreground">
          {copy.phone} <span className="font-normal text-muted-foreground">({copy.optional})</span>
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          disabled={disabled}
          aria-invalid={errors.phone ? "true" : "false"}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className={inputClassName}
          {...register("phone")}
        />
        {errors.phone ? (
          <p id="phone-error" className="mt-2 text-sm text-destructive">
            {errors.phone.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="subject" className="text-sm font-semibold text-foreground">
          {copy.subject} <span aria-hidden="true" className="text-destructive">*</span>
        </label>
        <input
          id="subject"
          type="text"
          disabled={disabled}
          aria-invalid={errors.subject ? "true" : "false"}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={inputClassName}
          {...register("subject")}
        />
        {errors.subject ? (
          <p id="subject-error" className="mt-2 text-sm text-destructive">
            {errors.subject.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-semibold text-foreground">
          {copy.message} <span aria-hidden="true" className="text-destructive">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          disabled={disabled}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : "message-help"}
          className={inputClassName}
          {...register("message")}
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-sm text-destructive">
            {errors.message.message}
          </p>
        ) : (
          <p id="message-help" className="mt-2 text-sm text-muted-foreground">
            {copy.messageHelp}
          </p>
        )}
      </div>

      <p className="text-sm leading-6 text-muted-foreground">
        {copy.requiredHelp}
      </p>

      {feedback.state !== "idle" ? (
        <div
          role={feedback.state === "error" ? "alert" : "status"}
          className={
            feedback.state === "error"
              ? "flex gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
              : "flex gap-3 rounded-lg border border-success/30 bg-success/5 p-4 text-sm text-foreground"
          }
        >
          {feedback.state === "error" ? (
            <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          ) : (
            <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" />
          )}
          <span>{feedback.message}</span>
        </div>
      ) : null}

      <Button type="submit" size="large" disabled={disabled} className="w-full sm:w-auto">
        {isSending ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
            {copy.submitting}
          </>
        ) : (
          copy.submit
        )}
      </Button>
    </form>
  );
}

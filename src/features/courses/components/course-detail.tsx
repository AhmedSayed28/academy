import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { AvailabilityBadge } from "@/features/courses/components/availability-badge";
import { CourseFacts } from "@/features/courses/components/course-facts";
import type { Course } from "@/features/courses/types/course.types";
import { cn } from "@/lib/utils";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/translations";

function ListSection({ id, title, items }: { id: string; title: string; items?: string[] }) {
  if (!items?.length) return null;

  return (
    <section aria-labelledby={id} className="card-interactive rounded-xl border border-border bg-card p-5 sm:p-7">
      <h2 id={id} className="text-2xl font-bold tracking-tight">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-7 text-muted-foreground">
            <CheckCircle2 aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function RegistrationPanel({ course, locale, copy }: { course: Course; locale: Locale; copy: Dictionary["courses"]["detail"] }) {
  const registrationUrl =
    course.availability !== "Closed" ? course.registrationUrl : undefined;
  const isInterestRegistration = course.availability === "Upcoming";
  const message =
    course.availability === "Closed"
      ? copy.closedMessage
      : course.availability === "Upcoming"
        ? copy.upcomingMessage
        : copy.preparingMessage;

  return (
    <aside className="rounded-xl border border-primary/25 bg-surface p-6 text-dark-foreground shadow-[0_1.5rem_4rem_rgb(0_0_0_/_0.24)] sm:p-8" aria-labelledby="registration-title">
      <AvailabilityBadge availability={course.availability} locale={locale} />
      <h2 id="registration-title" className="mt-4 text-2xl font-bold tracking-tight">
        {copy.registration}
      </h2>
      {registrationUrl ? (
        <>
          <p className="mt-3 leading-7 text-dark-muted">
            {isInterestRegistration
              ? message
              : copy.openMessage}
          </p>
          <Link
            href={registrationUrl.startsWith("/") ? localizePath(locale, registrationUrl) : registrationUrl}
            className={cn(buttonVariants({ variant: "primary", size: "large" }), "mt-6 w-full")}
          >
            {isInterestRegistration ? copy.registerInterest : copy.registerCourse}
          </Link>
        </>
      ) : (
        <>
          <p className="mt-3 leading-7 text-dark-muted">{message}</p>
          <Link
            href={localizePath(locale, "/courses")}
            className={cn(buttonVariants({ variant: "secondary" }), "mt-6 w-full border-dark-border bg-transparent text-dark-foreground hover:bg-dark-border")}
          >
            {copy.browseCourses}
          </Link>
        </>
      )}
    </aside>
  );
}

export function CourseDetail({ course, locale, copy }: { course: Course; locale: Locale; copy: Dictionary["courses"]["detail"] }) {
  return (
    <>
      <section className="hero-grid border-b border-border bg-surface py-10 sm:py-14 lg:py-20">
        <Container className="reveal">
          <Link
            href={localizePath(locale, "/courses")}
            className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-primary hover:text-primary/80"
          >
            <ArrowLeft aria-hidden="true" className="directional-icon size-4" />
            {copy.allCourses}
          </Link>
          <div className="mt-5 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={localizePath(locale, `/tracks/${course.trackSlug}`)}
                className="rounded-sm font-semibold text-primary hover:text-primary/80"
              >
                {course.track}
              </Link>
              <AvailabilityBadge availability={course.availability} locale={locale} />
            </div>
            <h1 className="mt-5 text-heading-1 font-bold tracking-tight text-foreground">{course.title}</h1>
            <p className="mt-5 max-w-3xl text-body-lg text-muted-foreground">{course.shortDescription}</p>
          </div>
          <div className="mt-8 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <CourseFacts course={course} locale={locale} />
          </div>
        </Container>
      </section>

      <Container className="py-section">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(17rem,1fr)] lg:items-start">
          <div className="space-y-6">
            <section aria-labelledby="course-overview-title" className="card-interactive rounded-xl border border-border bg-card p-5 sm:p-7">
              <h2 id="course-overview-title" className="text-2xl font-bold tracking-tight">
                {copy.overview}
              </h2>
              <p className="mt-4 whitespace-pre-line leading-8 text-muted-foreground">{course.description}</p>
            </section>
            <ListSection id="learning-outcomes-title" title={copy.learningOutcomes} items={course.learningOutcomes} />
            <ListSection id="target-audience-title" title={copy.audience} items={course.targetAudience} />
            <ListSection id="prerequisites-title" title={copy.prerequisites} items={course.prerequisites} />
            {course.curriculum?.length ? (
              <section aria-labelledby="curriculum-title" className="card-interactive rounded-xl border border-border bg-card p-5 sm:p-7">
                <h2 id="curriculum-title" className="text-2xl font-bold tracking-tight">
                  {copy.curriculum}
                </h2>
                <ol className="mt-5 space-y-4">
                  {course.curriculum.map((section) => (
                    <li key={section.title} className="rounded-lg bg-muted p-4 sm:p-5">
                      <h3 className="font-bold text-foreground">{section.title}</h3>
                      {section.topics?.length ? (
                        <ul className="mt-3 list-disc space-y-1 ps-9 text-sm leading-6 text-muted-foreground">
                          {section.topics.map((topic) => <li key={topic}>{topic}</li>)}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
            {course.instructor ? (
              <section aria-labelledby="instructor-title" className="card-interactive rounded-xl border border-border bg-card p-5 sm:p-7">
                <h2 id="instructor-title" className="text-2xl font-bold tracking-tight">{copy.instructor}</h2>
                <p className="mt-4 font-bold text-foreground">
                  {course.instructor.slug ? (
                    <Link
                      href={`${localizePath(locale, "/instructors")}#${course.instructor.slug}`}
                      className="rounded-sm hover:text-primary"
                    >
                      {course.instructor.name}
                    </Link>
                  ) : (
                    course.instructor.name
                  )}
                </p>
                {course.instructor.title ? <p className="mt-1 text-muted-foreground">{course.instructor.title}</p> : null}
              </section>
            ) : null}
          </div>
          <div className="lg:sticky lg:top-24">
            <RegistrationPanel course={course} locale={locale} copy={copy} />
          </div>
        </div>
      </Container>
    </>
  );
}

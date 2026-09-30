import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { AvailabilityBadge } from "@/features/courses/components/availability-badge";
import { CourseFacts } from "@/features/courses/components/course-facts";
import type { Course } from "@/features/courses/types/course.types";
import { localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/translations";

export function CourseCard({ course, locale }: { course: Course; locale: Locale }) {
  const copy = getDictionary(locale).courses.card;
  return (
    <article className="card-interactive flex h-full flex-col rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-semibold text-primary">{course.track}</p>
        <AvailabilityBadge availability={course.availability} locale={locale} />
      </div>
      <h2 className="mt-4 text-xl font-bold tracking-tight text-card-foreground">
        <Link href={localizePath(locale, `/courses/${course.slug}`)} className="rounded-sm hover:text-primary">
          {course.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 leading-7 text-muted-foreground">{course.shortDescription}</p>
      <div className="mt-6 border-t border-border pt-5">
        <CourseFacts course={course} locale={locale} compact />
      </div>
      {course.instructor ? (
        <p className="mt-5 text-sm text-muted-foreground">
          {copy.instructor}:{" "}
          {course.instructor.slug ? (
            <Link
              href={`${localizePath(locale, "/instructors")}#${course.instructor.slug}`}
              className="font-semibold text-foreground hover:text-primary"
            >
              {course.instructor.name}
            </Link>
          ) : (
            <span className="font-semibold text-foreground">{course.instructor.name}</span>
          )}
        </p>
      ) : null}
      <Link
        href={localizePath(locale, `/courses/${course.slug}`)}
        className="mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-md font-semibold text-primary hover:text-primary/80"
      >
        {copy.viewDetails}
        <ArrowRight aria-hidden="true" className="directional-icon size-4" />
      </Link>
    </article>
  );
}

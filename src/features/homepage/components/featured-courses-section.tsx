import { BookOpen, Compass } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { CourseCard } from "@/features/courses/components/course-card";
import { courseService } from "@/features/courses/services/course.service";
import { localizeCourse } from "@/i18n/content";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/translations";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./section-heading";

export async function FeaturedCoursesSection({ locale, copy }: { locale: Locale; copy: Dictionary["home"]["featured"] }) {
  const courses = (await courseService.getFeaturedCourses()).map((course) => localizeCourse(course, locale));

  return (
    <section aria-labelledby="featured-courses-title" className="py-section">
      <Container>
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={courses.length ? copy.titlePublished : copy.titleEmpty}
          description={
            courses.length
              ? copy.descriptionPublished
              : copy.descriptionEmpty
          }
          titleId="featured-courses-title"
        />

        {courses.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-dashed border-primary/30 bg-primary/5 px-5 py-10 text-center sm:px-8 sm:py-12">
            <span className="mx-auto grid size-12 place-items-center rounded-lg bg-surface text-primary shadow-sm">
              <BookOpen aria-hidden="true" className="size-6" />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-foreground">
              {copy.emptyTitle}
            </h3>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">
              {copy.emptyDescription}
            </p>
            <Link
              href={localizePath(locale, "/courses")}
              className={cn(buttonVariants({ variant: "secondary" }), "mt-6")}
            >
              <Compass aria-hidden="true" className="size-4" />
              {copy.emptyCta}
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}

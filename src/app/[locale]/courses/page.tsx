import { Container } from "@/components/layout/container";
import { CourseCard } from "@/features/courses/components/course-card";
import { CoursesEmptyState } from "@/features/courses/components/courses-empty-state";
import { courseService } from "@/features/courses/services/course.service";
import { localizeCourse } from "@/i18n/content";
import { resolveDictionary } from "@/i18n/server";
import { createPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dictionary } = await resolveDictionary(params);
  return createPageMetadata({ ...dictionary.metadata.courses, path: "/courses", locale });
}

export default async function CoursesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dictionary } = await resolveDictionary(params);
  const courses = (await courseService.getPublishedCourses()).map((course) => localizeCourse(course, locale));
  const copy = dictionary.courses;

  return (
    <>
      <section className="hero-grid border-b border-border bg-surface py-12 sm:py-16 lg:py-20">
        <Container className="reveal">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">{copy.listing.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-heading-1 font-bold tracking-tight text-foreground">
            {copy.listing.title}
          </h1>
          <p className="mt-5 max-w-3xl text-body-lg text-muted-foreground">
            {copy.listing.description}
          </p>
        </Container>
      </section>

      <Container className="py-section">
        {courses.length ? (
          <section aria-labelledby="published-courses-title">
            <h2 id="published-courses-title" className="sr-only">{copy.listing.publishedHeading}</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => <CourseCard key={course.id} course={course} locale={locale} />)}
            </div>
          </section>
        ) : (
          <CoursesEmptyState locale={locale} copy={copy.empty} />
        )}
      </Container>
    </>
  );
}

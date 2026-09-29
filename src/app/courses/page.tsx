import { Container } from "@/components/layout/container";
import { CourseCard } from "@/features/courses/components/course-card";
import { CoursesEmptyState } from "@/features/courses/components/courses-empty-state";
import { courseService } from "@/features/courses/services/course.service";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Technology Courses",
  description:
    "Browse Academy's published technology courses, including level, delivery format, duration, and availability.",
  path: "/courses",
});

export default async function CoursesPage() {
  const courses = await courseService.getPublishedCourses();

  return (
    <>
      <section className="border-b border-border bg-surface py-12 sm:py-16 lg:py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Course catalog</p>
          <h1 className="mt-3 max-w-4xl text-heading-1 font-bold tracking-tight text-dark">
            Build practical skills, one focused course at a time.
          </h1>
          <p className="mt-5 max-w-3xl text-body-lg text-muted-foreground">
            Explore published Academy courses with clear information about level, format,
            duration, and current availability.
          </p>
        </Container>
      </section>

      <Container className="py-section">
        {courses.length ? (
          <section aria-labelledby="published-courses-title">
            <h2 id="published-courses-title" className="sr-only">Published courses</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => <CourseCard key={course.id} course={course} />)}
            </div>
          </section>
        ) : (
          <CoursesEmptyState />
        )}
      </Container>
    </>
  );
}

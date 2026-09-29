import { BookOpen, Compass } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { CourseCard } from "@/features/courses/components/course-card";
import { courseService } from "@/features/courses/services/course.service";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./section-heading";

export async function FeaturedCoursesSection() {
  const courses = await courseService.getFeaturedCourses();

  return (
    <section aria-labelledby="featured-courses-title" className="py-section">
      <Container>
        <SectionHeading
          eyebrow="Featured courses"
          title={courses.length ? "Start with an approved practical program." : "Course details are being prepared."}
          description={
            courses.length
              ? "Explore featured Academy courses with published curriculum, instructor, pricing, and availability details."
              : "Academy will feature approved courses here when titles, curricula, instructors, and availability are ready to publish."
          }
          titleId="featured-courses-title"
        />

        {courses.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-dashed border-primary/30 bg-primary/5 px-5 py-10 text-center sm:px-8 sm:py-12">
            <span className="mx-auto grid size-12 place-items-center rounded-lg bg-surface text-primary shadow-sm">
              <BookOpen aria-hidden="true" className="size-6" />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-foreground">
              No featured courses are published yet
            </h3>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">
              Start with the documented learning tracks while the course catalog is finalized.
            </p>
            <Link
              href="/courses"
              className={cn(buttonVariants({ variant: "secondary" }), "mt-6")}
            >
              <Compass aria-hidden="true" className="size-4" />
              View course catalog
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}

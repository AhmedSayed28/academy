import { Container } from "@/components/layout/container";
import { CourseCard } from "@/features/courses/components/course-card";
import { CoursesEmptyState } from "@/features/courses/components/courses-empty-state";
import { courseService } from "@/features/courses/services/course.service";
import { localizeCourse } from "@/i18n/content";
import { resolveDictionary } from "@/i18n/server";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { localizePath } from "@/i18n/config";

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
        <section aria-labelledby="registration-paths" className="mt-14 border-t border-border pt-12">
          <h2 id="registration-paths" className="text-heading-2 font-bold">{locale === "ar" ? "مسارات التسجيل المجمّعة" : "Combined registration paths"}</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">{locale === "ar" ? "كل مسار بيجمع كورسين موجودين في الدليل، ومش منهج منفصل." : "Each path combines two catalog courses; it is a registration option, not a separate curriculum."}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {[{ slug: "software-testing-track", title: "Software Testing Track", includes: "ISTQB Foundation Level + Software Testing Practical" }, { slug: "full-stack-development", title: "Full Stack Development", includes: "Front End Development + Back End Development" }].map((path) => <article key={path.slug} className="rounded-xl border border-border bg-card p-6"><h3 className="text-xl font-bold">{path.title}</h3><p className="mt-3 text-muted-foreground">{locale === "ar" ? "بيضم: " : "Includes: "}{path.includes}</p><Link className="mt-5 inline-flex min-h-11 items-center font-semibold text-primary" href={`${localizePath(locale, "/course-registration")}?course=${path.slug}`}>{locale === "ar" ? "سجّل الآن" : "Register Now"}</Link></article>)}
          </div>
        </section>
      </Container>
    </>
  );
}

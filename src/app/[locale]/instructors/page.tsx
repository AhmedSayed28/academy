import { Container } from "@/components/layout/container";
import { InstructorCard } from "@/features/instructors/components/instructor-card";
import { InstructorsEmptyState } from "@/features/instructors/components/instructors-empty-state";
import { instructorService } from "@/features/instructors/services/instructor.service";
import { localizeInstructor } from "@/i18n/content";
import { resolveDictionary } from "@/i18n/server";
import { createPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dictionary } = await resolveDictionary(params);
  return createPageMetadata({ ...dictionary.metadata.instructors, path: "/instructors", locale });
}

export default async function InstructorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dictionary } = await resolveDictionary(params);
  const instructors = (await instructorService.getPublishedInstructors()).map((instructor) => localizeInstructor(instructor, locale));
  const copy = dictionary.instructors;

  return (
    <>
      <section className="hero-grid border-b border-border bg-surface py-12 sm:py-16 lg:py-20">
        <Container className="reveal">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl text-heading-1 font-bold tracking-tight text-foreground">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-3xl text-body-lg text-muted-foreground">
            {copy.description}
          </p>
        </Container>
      </section>

      <Container className="py-section">
        {instructors.length ? (
          <section aria-labelledby="published-instructors-title">
            <h2 id="published-instructors-title" className="sr-only">
              {copy.publishedHeading}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {instructors.map((instructor) => (
                <InstructorCard key={instructor.id} instructor={instructor} locale={locale} />
              ))}
            </div>
          </section>
        ) : (
          <InstructorsEmptyState locale={locale} copy={copy} />
        )}
      </Container>
    </>
  );
}

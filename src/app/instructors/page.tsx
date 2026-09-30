import { Container } from "@/components/layout/container";
import { InstructorCard } from "@/features/instructors/components/instructor-card";
import { InstructorsEmptyState } from "@/features/instructors/components/instructors-empty-state";
import { instructorService } from "@/features/instructors/services/instructor.service";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Technology Instructors",
  description:
    "Meet Academy's published technology instructors and explore their approved expertise and professional backgrounds.",
  path: "/instructors",
});

export default async function InstructorsPage() {
  const instructors = await instructorService.getPublishedInstructors();

  return (
    <>
      <section className="hero-grid border-b border-border bg-surface py-12 sm:py-16 lg:py-20">
        <Container className="reveal">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Academy instructors
          </p>
          <h1 className="mt-3 max-w-4xl text-heading-1 font-bold tracking-tight text-foreground">
            Learn from experienced technology practitioners.
          </h1>
          <p className="mt-5 max-w-3xl text-body-lg text-muted-foreground">
            Published profiles introduce the people behind Academy learning experiences, using
            only reviewed professional information.
          </p>
        </Container>
      </section>

      <Container className="py-section">
        {instructors.length ? (
          <section aria-labelledby="published-instructors-title">
            <h2 id="published-instructors-title" className="sr-only">
              Published instructors
            </h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {instructors.map((instructor) => (
                <InstructorCard key={instructor.id} instructor={instructor} />
              ))}
            </div>
          </section>
        ) : (
          <InstructorsEmptyState />
        )}
      </Container>
    </>
  );
}

import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { LearningTrackIcon } from "@/components/learning-track-icon";
import { buttonVariants } from "@/components/ui/button";
import { documentedLearningTracks } from "@/config/learning-tracks";
import { CourseCard } from "@/features/courses/components/course-card";
import type { Course } from "@/features/courses/types/course.types";
import type { Track } from "@/features/tracks/types/track.types";
import { cn } from "@/lib/utils";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/translations";

function ListSection({ id, title, items }: { id: string; title: string; items?: string[] }) {
  if (!items?.length) return null;

  return (
    <section aria-labelledby={id} className="card-interactive rounded-xl border border-border bg-card p-5 sm:p-7">
      <h2 id={id} className="text-2xl font-bold tracking-tight">{title}</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
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

export function TrackDetail({ track, relatedCourses, locale, copy }: { track: Track; relatedCourses: readonly Course[]; locale: Locale; copy: Dictionary["tracks"]["detail"] }) {
  const documentedTrack = documentedLearningTracks.find(({ name }) => name === track.name);

  return (
    <>
      <section className="hero-grid border-b border-border bg-surface py-10 sm:py-14 lg:py-20">
        <Container className="reveal">
          <Link
            href={localizePath(locale, "/tracks")}
            className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-primary hover:text-primary/80"
          >
            <ArrowLeft aria-hidden="true" className="directional-icon size-4" />
            {copy.allTracks}
          </Link>
          <div className="mt-6 flex max-w-4xl flex-col gap-5 sm:flex-row sm:items-start">
            {documentedTrack ? (
              <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <LearningTrackIcon name={documentedTrack.icon} className="size-7" />
              </span>
            ) : null}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">{copy.eyebrow}</p>
              <h1 className="mt-3 text-heading-1 font-bold tracking-tight text-foreground">{track.name}</h1>
              <p className="mt-5 max-w-3xl text-body-lg text-muted-foreground">{track.shortDescription}</p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-section">
        <div className="space-y-6">
          <section aria-labelledby="track-overview-title" className="card-interactive rounded-xl border border-border bg-card p-5 sm:p-7">
            <h2 id="track-overview-title" className="text-2xl font-bold tracking-tight">{copy.overview}</h2>
            <p className="mt-4 whitespace-pre-line leading-8 text-muted-foreground">{track.description}</p>
          </section>

          {track.careerGoal ? (
            <section aria-labelledby="career-goal-title" className="rounded-xl border border-secondary/25 bg-surface p-6 text-dark-foreground sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">{copy.careerDirection}</p>
              <h2 id="career-goal-title" className="mt-3 text-2xl font-bold tracking-tight">{copy.careerGoal}</h2>
              <p className="mt-4 max-w-3xl leading-8 text-dark-muted">{track.careerGoal}</p>
            </section>
          ) : null}

          <ListSection id="track-skills-title" title={copy.skills} items={track.skills} />

          {track.learningJourney?.length ? (
            <section aria-labelledby="track-journey-title" className="card-interactive rounded-xl border border-border bg-card p-5 sm:p-7">
              <h2 id="track-journey-title" className="text-2xl font-bold tracking-tight">{copy.journey}</h2>
              <ol className="mt-6 grid gap-4 md:grid-cols-2">
                {track.learningJourney.map((step, index) => (
                  <li key={step} className="flex gap-4 rounded-lg bg-muted p-4 sm:p-5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <p className="pt-1 font-semibold leading-7">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <ListSection id="track-tools-title" title={copy.tools} items={track.tools} />

          {relatedCourses.length ? (
            <section aria-labelledby="related-courses-title" className="pt-6">
              <h2 id="related-courses-title" className="text-heading-2 font-bold tracking-tight">{copy.relatedCourses}</h2>
              <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                {copy.relatedDescription}
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {relatedCourses.map((course) => <CourseCard key={course.id} course={course} locale={locale} />)}
              </div>
            </section>
          ) : null}

          <section aria-labelledby="track-next-step-title" className="rounded-xl bg-primary/10 p-6 sm:p-8">
            <h2 id="track-next-step-title" className="text-2xl font-bold tracking-tight">{copy.nextTitle}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              {copy.nextDescription}
            </p>
            <Link href={localizePath(locale, "/courses")} className={cn(buttonVariants({ size: "large" }), "mt-6")}>
              {copy.browseCourses}
              <ArrowRight aria-hidden="true" className="directional-icon size-4" />
            </Link>
          </section>
        </div>
      </Container>
    </>
  );
}

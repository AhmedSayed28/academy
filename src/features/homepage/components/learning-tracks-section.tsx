import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { LearningTrackIcon } from "@/components/learning-track-icon";
import { buttonVariants } from "@/components/ui/button";
import { documentedLearningTracks } from "@/config/learning-tracks";
import { trackService } from "@/features/tracks/services/track.service";
import { localizeTrack } from "@/i18n/content";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/translations";

import { SectionHeading } from "./section-heading";

export async function LearningTracksSection({ locale, copy }: { locale: Locale; copy: Dictionary["home"]["tracks"] }) {
  const publishedTracks = (await trackService.getPublishedTracks()).map((track) => localizeTrack(track, locale));
  const publishedSlugs = new Set(publishedTracks.map((track) => track.slug));

  return (
    <section
      id="learning-tracks"
      aria-labelledby="learning-tracks-title"
      className="scroll-mt-20 bg-surface py-section"
    >
      <Container>
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          titleId="learning-tracks-title"
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {documentedLearningTracks.map((track, index) => {
            const isPublished = publishedSlugs.has(track.slug);
            return (
              <li key={track.name}>
                <article className="card-interactive group flex h-full min-h-44 flex-col rounded-xl border border-border bg-background p-5 motion-reduce:transition-none">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transition-none">
                      <LearningTrackIcon name={track.icon} className="size-5" />
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-auto pt-8 text-xl font-semibold tracking-tight text-foreground">
                    {isPublished ? (
                      <Link href={localizePath(locale, `/tracks/${track.slug}`)} className="rounded-sm hover:text-primary">
                        {track.name}
                      </Link>
                    ) : (
                      track.name
                    )}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {isPublished ? copy.publishedTrack : copy.plannedTrack}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
        <Link href={localizePath(locale, "/tracks")} className={`${buttonVariants({ variant: "secondary" })} mt-8`}>
          {copy.viewAll}
          <ArrowRight aria-hidden="true" className="directional-icon size-4" />
        </Link>
      </Container>
    </section>
  );
}

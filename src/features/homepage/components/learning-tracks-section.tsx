import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { LearningTrackIcon } from "@/components/learning-track-icon";
import { buttonVariants } from "@/components/ui/button";
import { documentedLearningTracks } from "@/config/learning-tracks";

import { SectionHeading } from "./section-heading";

export function LearningTracksSection() {
  return (
    <section
      id="learning-tracks"
      aria-labelledby="learning-tracks-title"
      className="scroll-mt-20 bg-surface py-section"
    >
      <Container>
        <SectionHeading
          eyebrow="Learning tracks"
          title="Choose a direction, then build step by step."
          description="Explore the technology fields planned for Academy's structured, career-oriented learning paths. Detailed journeys will be published as each track is approved."
          titleId="learning-tracks-title"
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {documentedLearningTracks.map((track, index) => {
            return (
              <li key={track.name}>
                <article className="group flex h-full min-h-44 flex-col rounded-xl border border-border bg-background p-5 transition-colors hover:border-primary/40 motion-reduce:transition-none">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transition-none">
                      <LearningTrackIcon name={track.icon} className="size-5" />
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-auto pt-8 text-xl font-semibold tracking-tight text-foreground">
                    {track.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">Planned learning track</p>
                </article>
              </li>
            );
          })}
        </ul>
        <Link href="/tracks" className={`${buttonVariants({ variant: "secondary" })} mt-8`}>
          View all learning tracks
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </Container>
    </section>
  );
}

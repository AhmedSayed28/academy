import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { LearningTrackIcon } from "@/components/learning-track-icon";
import { documentedLearningTracks } from "@/config/learning-tracks";
import type { Track } from "@/features/tracks/types/track.types";
import { localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/translations";

export function TrackCard({ track, locale }: { track: Track; locale: Locale }) {
  const copy = getDictionary(locale).tracks.card;
  const documentedTrack = documentedLearningTracks.find(({ name }) => name === track.name);

  return (
    <article className="card-interactive flex h-full flex-col rounded-xl border border-border bg-card p-5 sm:p-6">
      <span className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary">
        {documentedTrack ? <LearningTrackIcon name={documentedTrack.icon} className="size-6" /> : null}
      </span>
      <h2 className="mt-6 text-2xl font-bold tracking-tight">
        <Link href={localizePath(locale, `/tracks/${track.slug}`)} className="rounded-sm hover:text-primary">
          {track.name}
        </Link>
      </h2>
      <p className="mt-3 flex-1 leading-7 text-muted-foreground">{track.shortDescription}</p>
      <Link
        href={localizePath(locale, `/tracks/${track.slug}`)}
        className="mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-md font-semibold text-primary hover:text-primary/80"
      >
        {copy.viewTrack}
        <ArrowRight aria-hidden="true" className="directional-icon size-4" />
      </Link>
    </article>
  );
}

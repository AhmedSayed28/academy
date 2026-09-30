import { Container } from "@/components/layout/container";
import { PlannedTracksState } from "@/features/tracks/components/planned-tracks-state";
import { TrackCard } from "@/features/tracks/components/track-card";
import { trackService } from "@/features/tracks/services/track.service";
import { localizeTrack } from "@/i18n/content";
import { resolveDictionary } from "@/i18n/server";
import { createPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dictionary } = await resolveDictionary(params);
  return createPageMetadata({ ...dictionary.metadata.tracks, path: "/tracks", locale });
}

export default async function TracksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dictionary } = await resolveDictionary(params);
  const tracks = (await trackService.getPublishedTracks()).map((track) => localizeTrack(track, locale));
  const copy = dictionary.tracks;

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
        <div className="space-y-16">
          {tracks.length ? (
            <section aria-labelledby="published-tracks-title">
              <h2 id="published-tracks-title" className="text-heading-2 font-bold tracking-tight">
                {copy.listing.publishedHeading}
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {tracks.map((track) => <TrackCard key={track.id} track={track} locale={locale} />)}
              </div>
            </section>
          ) : null}
          <PlannedTracksState publishedTrackNames={tracks.map((track) => track.name)} copy={{ ...copy.planned, plannedTrack: dictionary.common.plannedTrack }} />
        </div>
      </Container>
    </>
  );
}

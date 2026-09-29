import { Container } from "@/components/layout/container";
import { PlannedTracksState } from "@/features/tracks/components/planned-tracks-state";
import { TrackCard } from "@/features/tracks/components/track-card";
import { trackService } from "@/features/tracks/services/track.service";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Technology Learning Tracks",
  description:
    "Explore Academy's documented technology learning directions and published structured learning tracks.",
  path: "/tracks",
});

export default async function TracksPage() {
  const tracks = await trackService.getPublishedTracks();

  return (
    <>
      <section className="border-b border-border bg-surface py-12 sm:py-16 lg:py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Learning tracks</p>
          <h1 className="mt-3 max-w-4xl text-heading-1 font-bold tracking-tight text-dark">
            Choose a technology direction and follow a structured path.
          </h1>
          <p className="mt-5 max-w-3xl text-body-lg text-muted-foreground">
            Explore published learning tracks and the additional technology directions Academy
            is planning for future development.
          </p>
        </Container>
      </section>

      <Container className="py-section">
        <div className="space-y-16">
          {tracks.length ? (
            <section aria-labelledby="published-tracks-title">
              <h2 id="published-tracks-title" className="text-heading-2 font-bold tracking-tight">
                Published learning tracks
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {tracks.map((track) => <TrackCard key={track.id} track={track} />)}
              </div>
            </section>
          ) : null}
          <PlannedTracksState publishedTrackNames={tracks.map((track) => track.name)} />
        </div>
      </Container>
    </>
  );
}

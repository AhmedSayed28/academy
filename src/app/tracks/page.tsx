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
            Academy is planning career-oriented learning tracks that connect focused study,
            practical application, and approved courses.
          </p>
        </Container>
      </section>

      <Container className="py-section">
        {tracks.length ? (
          <section aria-labelledby="published-tracks-title">
            <h2 id="published-tracks-title" className="sr-only">Published learning tracks</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {tracks.map((track) => <TrackCard key={track.id} track={track} />)}
            </div>
          </section>
        ) : (
          <PlannedTracksState />
        )}
      </Container>
    </>
  );
}

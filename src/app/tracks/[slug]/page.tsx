import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TrackDetail } from "@/features/tracks/components/track-detail";
import { trackService, type TrackService } from "@/features/tracks/services/track.service";
import { createPageMetadata } from "@/lib/metadata";

type TrackPageProps = {
  params: Promise<{ slug: string }>;
};

export async function createTrackMetadata(
  slug: string,
  tracks: Pick<TrackService, "getPublishedTrackBySlug"> = trackService,
): Promise<Metadata> {
  const track = await tracks.getPublishedTrackBySlug(slug);

  if (!track) {
    return { title: "Learning track not found", robots: { index: false, follow: false } };
  }

  return createPageMetadata({
    title: `${track.name} Learning Track`,
    description: track.shortDescription,
    path: `/tracks/${track.slug}`,
  });
}

export async function generateMetadata({ params }: TrackPageProps): Promise<Metadata> {
  const { slug } = await params;
  return createTrackMetadata(slug);
}

export default async function TrackPage({ params }: TrackPageProps) {
  const { slug } = await params;
  const result = await trackService.getPublishedTrackDetail(slug);

  if (!result) notFound();

  return <TrackDetail track={result.track} relatedCourses={result.relatedCourses} />;
}

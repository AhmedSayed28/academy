import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TrackDetail } from "@/features/tracks/components/track-detail";
import { trackService } from "@/features/tracks/services/track.service";

type TrackPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: TrackPageProps): Promise<Metadata> {
  const { slug } = await params;
  const track = await trackService.getPublishedTrackBySlug(slug);

  if (!track) {
    return { title: "Learning track not found", robots: { index: false, follow: false } };
  }

  return {
    title: `${track.name} Learning Track`,
    description: track.shortDescription,
    openGraph: {
      title: `${track.name} Learning Track | Academy`,
      description: track.shortDescription,
      type: "website",
    },
  };
}

export default async function TrackPage({ params }: TrackPageProps) {
  const { slug } = await params;
  const result = await trackService.getPublishedTrackDetail(slug);

  if (!result) notFound();

  return <TrackDetail track={result.track} relatedCourses={result.relatedCourses} />;
}

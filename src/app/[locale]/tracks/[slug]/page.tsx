import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TrackDetail } from "@/features/tracks/components/track-detail";
import { trackService, type TrackService } from "@/features/tracks/services/track.service";
import { createPageMetadata } from "@/lib/metadata";
import { localizeCourse, localizeTrack } from "@/i18n/content";
import type { Locale } from "@/i18n/config";
import { resolveDictionary, resolveLocale } from "@/i18n/server";

type TrackPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function createTrackMetadata(
  slug: string,
  locale: Locale = "en",
  tracks: Pick<TrackService, "getPublishedTrackBySlug"> = trackService,
): Promise<Metadata> {
  const track = await tracks.getPublishedTrackBySlug(slug);

  if (!track) {
    return { title: "Learning track not found", robots: { index: false, follow: false } };
  }

  const localizedTrack = localizeTrack(track, locale);
  const title = locale === "ar" ? `مسار ${localizedTrack.name}` : `${localizedTrack.name} Learning Track`;
  return createPageMetadata({
    title,
    description: localizedTrack.shortDescription,
    path: `/tracks/${track.slug}`,
    locale,
  });
}

export async function generateMetadata({ params }: TrackPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  return createTrackMetadata(slug, locale);
}

export default async function TrackPage({ params }: TrackPageProps) {
  const { slug } = await params;
  const { locale, dictionary } = await resolveDictionary(params);
  const result = await trackService.getPublishedTrackDetail(slug);

  if (!result) notFound();

  return <TrackDetail track={localizeTrack(result.track, locale)} relatedCourses={result.relatedCourses.map((course) => localizeCourse(course, locale))} locale={locale} copy={dictionary.tracks.detail} />;
}

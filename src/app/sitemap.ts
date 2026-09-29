import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { courseService, type CourseService } from "@/features/courses/services/course.service";
import { trackService, type TrackService } from "@/features/tracks/services/track.service";

const staticPaths = [
  "/",
  "/courses",
  "/tracks",
  "/instructors",
  "/about",
  "/contact",
  "/faq",
  "/register-interest",
] as const;

interface SitemapSources {
  courses: Pick<CourseService, "getPublishedCourses">;
  tracks: Pick<TrackService, "getPublishedTracks">;
}

function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export async function createSitemap(
  sources: SitemapSources = { courses: courseService, tracks: trackService },
): Promise<MetadataRoute.Sitemap> {
  const [courses, tracks] = await Promise.all([
    sources.courses.getPublishedCourses(),
    sources.tracks.getPublishedTracks(),
  ]);

  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path) })),
    ...courses.map((course) => ({ url: absoluteUrl(`/courses/${course.slug}`) })),
    ...tracks.map((track) => ({ url: absoluteUrl(`/tracks/${track.slug}`) })),
  ];
}

export default function sitemap(): Promise<MetadataRoute.Sitemap> {
  return createSitemap();
}

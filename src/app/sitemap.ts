import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { courseService, type CourseService } from "@/features/courses/services/course.service";
import { trackService, type TrackService } from "@/features/tracks/services/track.service";
import { locales, localizePath } from "@/i18n/config";

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

function localizedEntry(path: string): MetadataRoute.Sitemap[number][] {
  const languages = {
    ar: absoluteUrl(localizePath("ar", path)),
    en: absoluteUrl(localizePath("en", path)),
    "x-default": absoluteUrl(localizePath("ar", path)),
  };

  return locales.map((locale) => ({
    url: absoluteUrl(localizePath(locale, path)),
    alternates: { languages },
  }));
}

export async function createSitemap(
  sources: SitemapSources = { courses: courseService, tracks: trackService },
): Promise<MetadataRoute.Sitemap> {
  const [courses, tracks] = await Promise.all([
    sources.courses.getPublishedCourses(),
    sources.tracks.getPublishedTracks(),
  ]);

  return [
    ...staticPaths.flatMap((path) => localizedEntry(path)),
    ...courses.flatMap((course) => localizedEntry(`/courses/${course.slug}`)),
    ...tracks.flatMap((track) => localizedEntry(`/tracks/${track.slug}`)),
  ];
}

export default function sitemap(): Promise<MetadataRoute.Sitemap> {
  return createSitemap();
}

import { courseService, type CourseService } from "@/features/courses/services/course.service";
import type { Course } from "@/features/courses/types/course.types";
import {
  trackRepository,
  type TrackRepository,
} from "@/features/tracks/repositories/track.repository";
import type { Track } from "@/features/tracks/types/track.types";

export interface TrackDetailResult {
  track: Track;
  relatedCourses: readonly Course[];
}

export interface TrackService {
  getPublishedTracks(): Promise<readonly Track[]>;
  getPublishedTrackBySlug(slug: string): Promise<Track | null>;
  getPublishedTrackDetail(slug: string): Promise<TrackDetailResult | null>;
}

export function createTrackService(
  repository: TrackRepository,
  courses: CourseService,
): TrackService {
  async function getPublishedTrackBySlug(slug: string) {
    const tracks = await repository.list();
    return tracks.find((track) => track.published && track.slug === slug) ?? null;
  }

  return {
    async getPublishedTracks() {
      const tracks = await repository.list();
      return tracks.filter((track) => track.published);
    },
    getPublishedTrackBySlug,
    async getPublishedTrackDetail(slug) {
      const track = await getPublishedTrackBySlug(slug);
      if (!track) return null;

      const relatedSlugs = track.courseSlugs ?? [];
      if (!relatedSlugs.length) return { track, relatedCourses: [] };

      const publishedCourses = await courses.getPublishedCourses();
      const coursesBySlug = new Map(publishedCourses.map((course) => [course.slug, course]));
      const relatedCourses = relatedSlugs.flatMap((courseSlug) => {
        const course = coursesBySlug.get(courseSlug);
        return course?.trackSlug === track.slug ? [course] : [];
      });

      return { track, relatedCourses };
    },
  };
}

export const trackService = createTrackService(trackRepository, courseService);

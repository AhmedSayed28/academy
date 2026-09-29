import {
  courseRepository,
  type CourseRepository,
} from "@/features/courses/repositories/course.repository";
import type { Course } from "@/features/courses/types/course.types";

export interface CourseService {
  getPublishedCourses(): Promise<readonly Course[]>;
  getFeaturedCourses(): Promise<readonly Course[]>;
  getPublishedCourseBySlug(slug: string): Promise<Course | null>;
}

export function createCourseService(repository: CourseRepository): CourseService {
  return {
    async getPublishedCourses() {
      const courses = await repository.list();
      return courses.filter((course) => course.published);
    },
    async getFeaturedCourses() {
      const courses = await repository.list();
      return courses.filter((course) => course.published && course.featured);
    },
    async getPublishedCourseBySlug(slug) {
      const courses = await repository.list();
      return courses.find((course) => course.published && course.slug === slug) ?? null;
    },
  };
}

export const courseService = createCourseService(courseRepository);

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseDetail } from "@/features/courses/components/course-detail";
import {
  courseService,
  type CourseService,
} from "@/features/courses/services/course.service";
import { createPageMetadata } from "@/lib/metadata";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export async function createCourseMetadata(
  slug: string,
  courses: Pick<CourseService, "getPublishedCourseBySlug"> = courseService,
): Promise<Metadata> {
  const course = await courses.getPublishedCourseBySlug(slug);

  if (!course) {
    return { title: "Course not found", robots: { index: false, follow: false } };
  }

  return createPageMetadata({
    title: course.title,
    description: course.shortDescription,
    path: `/courses/${course.slug}`,
  });
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  return createCourseMetadata(slug);
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await courseService.getPublishedCourseBySlug(slug);

  if (!course) notFound();

  return <CourseDetail course={course} />;
}

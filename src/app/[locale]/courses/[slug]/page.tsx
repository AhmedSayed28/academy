import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseDetail } from "@/features/courses/components/course-detail";
import {
  courseService,
  type CourseService,
} from "@/features/courses/services/course.service";
import { createPageMetadata } from "@/lib/metadata";
import { localizeCourse } from "@/i18n/content";
import type { Locale } from "@/i18n/config";
import { resolveDictionary, resolveLocale } from "@/i18n/server";

type CoursePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function createCourseMetadata(
  slug: string,
  locale: Locale = "en",
  courses: Pick<CourseService, "getPublishedCourseBySlug"> = courseService,
): Promise<Metadata> {
  const course = await courses.getPublishedCourseBySlug(slug);

  if (!course) {
    return { title: "Course not found", robots: { index: false, follow: false } };
  }

  const localizedCourse = localizeCourse(course, locale);
  return createPageMetadata({
    title: localizedCourse.title,
    description: localizedCourse.shortDescription,
    path: `/courses/${course.slug}`,
    locale,
  });
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  return createCourseMetadata(slug, locale);
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const { locale, dictionary } = await resolveDictionary(params);
  const course = await courseService.getPublishedCourseBySlug(slug);

  if (!course) notFound();

  return <CourseDetail course={localizeCourse(course, locale)} locale={locale} copy={dictionary.courses.detail} />;
}

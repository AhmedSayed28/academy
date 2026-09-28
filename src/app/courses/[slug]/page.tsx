import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseDetail } from "@/features/courses/components/course-detail";
import { courseService } from "@/features/courses/services/course.service";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await courseService.getPublishedCourseBySlug(slug);

  if (!course) {
    return { title: "Course not found", robots: { index: false, follow: false } };
  }

  return {
    title: course.title,
    description: course.shortDescription,
    openGraph: {
      title: `${course.title} | Academy`,
      description: course.shortDescription,
      type: "website",
    },
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await courseService.getPublishedCourseBySlug(slug);

  if (!course) notFound();

  return <CourseDetail course={course} />;
}

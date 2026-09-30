import type { Course } from "@/features/courses/types/course.types";
import type { Instructor } from "@/features/instructors/types/instructor.types";
import type { Track } from "@/features/tracks/types/track.types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/translations";

export function localizeCourse(course: Course, locale: Locale): Course {
  if (course.slug !== "software-testing-fundamentals") return course;

  const copy = getDictionary(locale).courseContent;
  return {
    ...course,
    title: copy.title,
    shortDescription: copy.shortDescription,
    description: copy.description,
    instructor: course.instructor
      ? { ...course.instructor, title: copy.instructorTitle }
      : undefined,
    learningOutcomes: [...copy.learningOutcomes],
    targetAudience: [...copy.targetAudience],
    prerequisites: [...copy.prerequisites],
    curriculum: copy.curriculum.map((section) => ({
      title: section.title,
      topics: [...section.topics],
    })),
  };
}

export function localizeTrack(track: Track, locale: Locale): Track {
  if (track.slug !== "software-testing") return track;

  const copy = getDictionary(locale).trackContent;
  return {
    ...track,
    shortDescription: copy.shortDescription,
    description: copy.description,
    careerGoal: copy.careerGoal,
    skills: [...copy.skills],
    learningJourney: [...copy.learningJourney],
  };
}

export function localizeInstructor(instructor: Instructor, locale: Locale): Instructor {
  if (instructor.slug !== "ahmed-sayed-ahmed") return instructor;

  const copy = getDictionary(locale).instructorContent;
  return {
    ...instructor,
    role: copy.role,
    biography: copy.biography,
    expertise: [...copy.expertise],
  };
}

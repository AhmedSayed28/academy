import type { Course } from "@/features/courses/types/course.types";
import type { Instructor } from "@/features/instructors/types/instructor.types";
import type { Track } from "@/features/tracks/types/track.types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/translations";

export function localizeCourse(course: Course, locale: Locale): Course {
  if (locale === "en") return course;
  const arabic: Record<string, { shortDescription: string; description: string; track: string }> = {
    "istqb-foundation-level": { shortDescription: "كورس ISTQB مستقل وجزء من مسار Software Testing.", description: "كورس ISTQB Foundation Level متاح لوحده، وممكن تسجّل فيه مع Software Testing Practical من خلال مسار Software Testing.", track: "Software Testing" },
    "software-testing-practical": { shortDescription: "كورس Software Testing عملي مستقل وجزء من مسار Software Testing.", description: "كورس Software Testing Practical متاح لوحده، وممكن تسجّل فيه مع ISTQB Foundation Level من خلال مسار Software Testing.", track: "Software Testing" },
    "front-end-development": { shortDescription: "كورس Front End مستقل وجزء من مسار Full Stack Development.", description: "كورس Front End Development متاح لوحده، وممكن تسجّل فيه مع Back End Development من خلال مسار Full Stack Development.", track: "Front End Development" },
    "back-end-development": { shortDescription: "كورس Back End مستقل وجزء من مسار Full Stack Development.", description: "كورس Back End Development متاح لوحده، وممكن تسجّل فيه مع Front End Development من خلال مسار Full Stack Development.", track: "Back End Development" },
  };
  return arabic[course.slug] ? { ...course, ...arabic[course.slug] } : course;
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

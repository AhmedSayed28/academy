import { Banknote, CalendarDays, Clock, Gauge, Laptop, Layers3 } from "lucide-react";

import type { Course } from "@/features/courses/types/course.types";
import { formatCoursePrice } from "@/features/courses/utils/format-course-price";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/translations";

interface CourseFactsProps {
  course: Pick<
    Course,
    "track" | "level" | "duration" | "deliveryType" | "startDate" | "price"
  >;
  compact?: boolean;
  locale: Locale;
}

export function CourseFacts({ course, compact = false, locale }: CourseFactsProps) {
  const copy = getDictionary(locale).courses.facts;
  const level = locale === "ar" && course.level === "Beginner" ? "مبتدئ" : course.level;
  const duration = locale === "ar" && course.duration === "4 months" ? "4 شهور" : course.duration;
  const startDate = locale === "ar" && course.startDate === "To be announced" ? "هيتحدد قريب" : course.startDate;
  const facts = [
    { label: copy.track, value: course.track, icon: Layers3 },
    { label: copy.level, value: level, icon: Gauge },
    { label: copy.duration, value: duration, icon: Clock },
    ...(course.startDate
      ? [{ label: copy.startDate, value: startDate, icon: CalendarDays }]
      : []),
    ...(course.price
      ? [{ label: copy.price, value: formatCoursePrice(course.price, locale), icon: Banknote }]
      : []),
    ...(course.deliveryType
      ? [{ label: copy.delivery, value: course.deliveryType, icon: Laptop }]
      : []),
  ];

  return (
    <dl className={compact ? "grid grid-cols-2 gap-4" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"}>
      {facts.map(({ label, value, icon: Icon }) => (
        <div key={label} className="min-w-0">
          <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Icon aria-hidden="true" className="size-4 shrink-0 text-primary" />
            {label}
          </dt>
          <dd className="mt-1 break-words text-sm font-semibold text-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

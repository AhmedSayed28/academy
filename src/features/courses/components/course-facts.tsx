import { Banknote, CalendarDays, Clock, Gauge, Laptop, Layers3 } from "lucide-react";

import type { Course } from "@/features/courses/types/course.types";
import { formatCoursePrice } from "@/features/courses/utils/format-course-price";

interface CourseFactsProps {
  course: Pick<
    Course,
    "track" | "level" | "duration" | "deliveryType" | "startDate" | "price"
  >;
  compact?: boolean;
}

export function CourseFacts({ course, compact = false }: CourseFactsProps) {
  const facts = [
    { label: "Track", value: course.track, icon: Layers3 },
    { label: "Level", value: course.level, icon: Gauge },
    { label: "Duration", value: course.duration, icon: Clock },
    ...(course.startDate
      ? [{ label: "Start date:", value: course.startDate, icon: CalendarDays }]
      : []),
    ...(course.price
      ? [{ label: "Price", value: formatCoursePrice(course.price), icon: Banknote }]
      : []),
    ...(course.deliveryType
      ? [{ label: "Delivery", value: course.deliveryType, icon: Laptop }]
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

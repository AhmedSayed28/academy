import type { CourseAvailability } from "@/features/courses/types/course.types";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/translations";

const availabilityStyles: Record<CourseAvailability, string> = {
  Open: "bg-success/10 text-success",
  Upcoming: "bg-warning/15 text-foreground",
  Closed: "bg-muted text-muted-foreground",
};

export function AvailabilityBadge({ availability, locale }: { availability: CourseAvailability; locale: Locale }) {
  const copy = getDictionary(locale).common;
  const labels: Record<CourseAvailability, string> = {
    Open: copy.open,
    Upcoming: copy.upcoming,
    Closed: copy.closed,
  };
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
        availabilityStyles[availability],
      )}
    >
      {labels[availability]}
    </span>
  );
}

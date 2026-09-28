import type { CourseAvailability } from "@/features/courses/types/course.types";
import { cn } from "@/lib/utils";

const availabilityStyles: Record<CourseAvailability, string> = {
  Open: "bg-success/10 text-success",
  Upcoming: "bg-warning/15 text-foreground",
  Closed: "bg-muted text-muted-foreground",
};

export function AvailabilityBadge({ availability }: { availability: CourseAvailability }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
        availabilityStyles[availability],
      )}
    >
      {availability}
    </span>
  );
}

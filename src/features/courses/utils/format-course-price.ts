import type { CoursePrice } from "@/features/courses/types/course.types";

const numberFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatCoursePrice(price: CoursePrice): string {
  return `${numberFormatter.format(price.amount)} ${price.currency}`;
}

import type { CoursePrice } from "@/features/courses/types/course.types";
import type { Locale } from "@/i18n/config";

export function formatCoursePrice(price: CoursePrice, locale: Locale = "en"): string {
  const number = new Intl.NumberFormat(locale === "ar" ? "en-US" : "en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price.amount);

  if (locale === "ar" && price.currency === "EGP") return `${number} جنيه مصري`;
  return `${number} ${price.currency}`;
}

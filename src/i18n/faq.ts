import type { FaqItem } from "@/features/faq/content";
import { localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/translations";

const actionPaths = ["/about", undefined, "/courses", "/register-interest", undefined, "/contact", "/contact"] as const;

export function getLocalizedFaqItems(locale: Locale): readonly FaqItem[] {
  return getDictionary(locale).faq.items.map((item, index) => {
    const path = actionPaths[index];
    return {
      question: item.question,
      answer: item.answer,
      ...(path && item.action
        ? { action: { label: item.action, href: localizePath(locale, path) } }
        : {}),
    };
  });
}

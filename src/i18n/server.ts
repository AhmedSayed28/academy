import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/translations";

export async function resolveLocale(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

export async function resolveDictionary(params: Promise<{ locale: string }>) {
  const locale = await resolveLocale(params);
  return { locale, dictionary: getDictionary(locale) };
}

export const locales = ["ar", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDirection(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

export function localizePath(locale: Locale, path: string): `/${string}` {
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalizedPath}`;
}

export function replacePathLocale(pathname: string, locale: Locale) {
  const segments = pathname.split("/");

  if (segments.length > 1 && isLocale(segments[1])) {
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }

  return localizePath(locale, pathname);
}

export function getOpenGraphLocale(locale: Locale) {
  return locale === "ar" ? "ar_EG" : "en_US";
}

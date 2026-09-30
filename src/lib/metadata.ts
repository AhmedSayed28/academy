import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { getOpenGraphLocale, localizePath, type Locale } from "@/i18n/config";

interface PageMetadataInput {
  title: string;
  description: string;
  path: `/${string}` | "/";
  locale: Locale;
}

export function createPageMetadata({ title, description, path, locale }: PageMetadataInput): Metadata {
  const socialTitle = `${title} | ${siteConfig.name}`;
  const localizedPath = localizePath(locale, path);
  const englishPath = localizePath("en", path);
  const arabicPath = localizePath("ar", path);

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath,
      languages: { ar: arabicPath, en: englishPath, "x-default": arabicPath },
    },
    openGraph: {
      title: socialTitle,
      description,
      url: localizedPath,
      siteName: siteConfig.name,
      type: "website",
      locale: getOpenGraphLocale(locale),
      alternateLocale: [getOpenGraphLocale(locale === "ar" ? "en" : "ar")],
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description,
    },
  };
}

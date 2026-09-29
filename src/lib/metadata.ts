import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

interface PageMetadataInput {
  title: string;
  description: string;
  path: `/${string}` | "/";
}

export function createPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const socialTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description,
    },
  };
}

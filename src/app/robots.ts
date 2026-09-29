import type { MetadataRoute } from "next";

import { isPreviewDeployment, siteConfig } from "@/config/site";

export function createRobots(
  environment: Readonly<Record<string, string | undefined>> = process.env,
): MetadataRoute.Robots {
  if (isPreviewDeployment(environment)) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
    host: siteConfig.url.origin,
  };
}

export default function robots(): MetadataRoute.Robots {
  return createRobots();
}

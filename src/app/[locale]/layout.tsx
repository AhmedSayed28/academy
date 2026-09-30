import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { isPreviewDeployment, siteConfig } from "@/config/site";
import { getDirection, locales } from "@/i18n/config";
import { resolveDictionary } from "@/i18n/server";
import { createPageMetadata } from "@/lib/metadata";

import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-latin", display: "swap" });
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale, dictionary } = await resolveDictionary(params);
  const localized = createPageMetadata({
    ...dictionary.metadata.home,
    path: "/",
    locale,
  });

  return {
    ...localized,
    metadataBase: siteConfig.url,
    title: {
      default: dictionary.site.defaultTitle,
      template: `%s | ${siteConfig.name}`,
    },
    robots: isPreviewDeployment()
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale, dictionary } = await resolveDictionary(params);

  return (
    <html lang={locale} dir={getDirection(locale)} className="dark" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${notoSansArabic.variable}`}>
        <a
          href="#main-content"
          className="fixed start-4 top-4 z-50 -translate-y-24 rounded-md bg-primary px-4 py-3 font-semibold text-primary-foreground shadow-sm transition-transform focus:translate-y-0 motion-reduce:transition-none"
        >
          {dictionary.site.navigation.skipToContent}
        </a>
        <div className="flex min-h-screen flex-col">
          <SiteHeader locale={locale} copy={dictionary.site.navigation} />
          <main id="main-content" className="min-w-0 flex-1" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter locale={locale} copy={dictionary.site} />
        </div>
      </body>
    </html>
  );
}

import Image from "next/image";
import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/translations";

export function SiteFooter({ locale, copy }: { locale: Locale; copy: Dictionary["site"] }) {
  const availableNavigation = [
    ...siteConfig.navigation.filter((item) => item.available),
    ...siteConfig.footerNavigation.filter((item) => item.available),
  ];

  return (
    <footer className="overflow-hidden border-t border-dark-border bg-dark text-dark-foreground">
      <Container className="pt-8 md:pt-10">
        <div className="relative aspect-[16/7] overflow-hidden rounded-2xl border border-dark-border bg-raised shadow-2xl shadow-black/20 sm:aspect-[3/1]">
          <Image
            src={siteConfig.assets.footerCover}
            alt="Ernst — اتعلم. طبق. اتقدم. إيرنست هتجهزك للشغل"
            fill
            sizes="(max-width: 639px) 150vw, (min-width: 1280px) 1152px, calc(100vw - 3rem)"
            className="object-cover object-center"
          />
        </div>
      </Container>

      <Container className="py-10 md:py-12">
        <div className="grid gap-8 border-b border-dark-border pb-8 sm:grid-cols-[minmax(0,2fr)_minmax(10rem,1fr)]">
          <div className="max-w-xl">
            <Link
              href={localizePath(locale, "/")}
              aria-label={copy.navigation.homeLabel}
              className="inline-flex min-h-11 items-center rounded-lg focus-visible:outline-offset-4"
            >
              <BrandLogo placement="footer" />
            </Link>
            <p className="mt-2 text-sm leading-6 text-dark-muted">{copy.description}</p>
          </div>

          <nav aria-label={copy.navigation.footerNavigation}>
            <h2 className="text-sm font-semibold text-dark-foreground">{copy.navigation.navigation}</h2>
            <ul className="mt-3 space-y-1">
              {availableNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localizePath(locale, item.href)}
                    className="inline-flex min-h-11 items-center rounded-md text-sm text-dark-muted transition-colors hover:text-dark-foreground motion-reduce:transition-none"
                  >
                    {copy.navigation[item.id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="pt-6 text-sm text-dark-muted">
          &copy; {new Date().getFullYear()} {copy.footerCopyright}
        </p>
      </Container>
    </footer>
  );
}

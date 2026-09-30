import Link from "next/link";

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
    <footer className="bg-dark text-dark-foreground">
      <Container className="py-10 md:py-12">
        <div className="grid gap-8 border-b border-dark-border pb-8 sm:grid-cols-[minmax(0,2fr)_minmax(10rem,1fr)]">
          <div className="max-w-xl">
            <Link
              href={localizePath(locale, "/")}
              className="inline-flex min-h-11 items-center rounded-md text-xl font-bold tracking-tight"
            >
              {siteConfig.name}
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

"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/container";
import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig, type NavigationItem } from "@/config/site";
import { localizePath, replacePathLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/translations";
import { cn } from "@/lib/utils";

function NavigationEntry({
  item,
  locale,
  copy,
  pathname,
  onNavigate,
  mobile = false,
  linkRef,
}: {
  item: NavigationItem;
  locale: Locale;
  copy: Dictionary["site"]["navigation"];
  pathname: string;
  onNavigate?: () => void;
  mobile?: boolean;
  linkRef?: React.Ref<HTMLAnchorElement>;
}) {
  const className = cn(
    "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium motion-reduce:transition-none",
    mobile && "w-full justify-between px-4",
  );

  if (!item.available) {
    return (
      <span
        className={cn(className, "cursor-not-allowed text-muted-foreground")}
        aria-disabled="true"
        title={copy.pageSoon}
      >
        {copy[item.id]}
        <span className="ms-2 text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
          {copy.soon}
        </span>
      </span>
    );
  }

  const href = localizePath(locale, item.href);
  const isCurrent = pathname === href || (item.href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      ref={linkRef}
      href={href}
      aria-current={isCurrent ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        className,
        isCurrent
          ? "bg-primary/10 text-primary"
          : "text-foreground hover:bg-muted hover:text-primary",
      )}
    >
      {copy[item.id]}
    </Link>
  );
}

function PrimaryAction({
  locale,
  copy,
  mobile = false,
  onNavigate,
}: {
  locale: Locale;
  copy: Dictionary["site"]["navigation"];
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const action = siteConfig.primaryAction;

  if (!action.available) {
    return (
      <span
        aria-disabled="true"
        title={copy.pageSoon}
        className={cn(
          buttonVariants({ variant: "primary", size: mobile ? "large" : "default" }),
          "cursor-not-allowed bg-primary/80",
          mobile && "w-full",
        )}
      >
        {copy.registerInterest}
        <span className="rounded bg-primary-foreground/20 px-1.5 py-0.5 text-[0.625rem] uppercase tracking-wider">
          {copy.soon}
        </span>
      </span>
    );
  }

  return (
    <Link
      href={localizePath(locale, action.href)}
      onClick={onNavigate}
      className={cn(
        buttonVariants({ variant: "primary", size: mobile ? "large" : "default" }),
        mobile && "w-full",
      )}
    >
      {copy.registerInterest}
    </Link>
  );
}

export function SiteHeader({
  locale,
  copy,
}: {
  locale: Locale;
  copy: Dictionary["site"]["navigation"];
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    firstMobileLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const alternateLocale: Locale = locale === "ar" ? "en" : "ar";
  const alternateHref = replacePathLocale(pathname, alternateLocale);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <Container className="flex min-h-16 items-center justify-between gap-4">
        <Link
          href={localizePath(locale, "/")}
          aria-label={copy.homeLabel}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md font-bold tracking-tight text-foreground hover:text-primary"
          onClick={closeMenu}
        >
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-lg bg-primary text-sm text-primary-foreground shadow-sm"
          >
            A
          </span>
          <span>{siteConfig.name}</span>
        </Link>

        <nav aria-label={copy.primaryNavigation} className="hidden items-center gap-1 lg:flex">
          <ul className="flex items-center gap-1">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <NavigationEntry item={item} locale={locale} copy={copy} pathname={pathname} />
              </li>
            ))}
          </ul>
          <div className="ms-2 flex items-center gap-1">
            <Link
              href={alternateHref}
              hrefLang={alternateLocale}
              lang={alternateLocale}
              aria-label={copy.switchLanguageLabel}
              className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-secondary hover:bg-muted"
            >
              {copy.switchLanguage}
            </Link>
            <PrimaryAction locale={locale} copy={copy} />
          </div>
        </nav>

        <Button
          ref={menuButtonRef}
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? copy.closeMenu : copy.openMenu}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </Container>

      {isMenuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label={copy.mobileNavigation}
          className="border-t border-border bg-background lg:hidden"
        >
          <Container className="py-4">
            <ul className="flex flex-col gap-1">
              {siteConfig.navigation.map((item, index) => (
                <li key={item.href}>
                  <NavigationEntry
                    item={item}
                    locale={locale}
                    copy={copy}
                    pathname={pathname}
                    onNavigate={closeMenu}
                    mobile
                    linkRef={index === 0 ? firstMobileLinkRef : undefined}
                  />
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-border pt-4">
              <Link
                href={alternateHref}
                hrefLang={alternateLocale}
                lang={alternateLocale}
                aria-label={copy.switchLanguageLabel}
                onClick={closeMenu}
                className="mb-3 inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-border bg-card px-4 font-semibold text-secondary hover:border-secondary/50 hover:bg-raised"
              >
                {copy.switchLanguage}
              </Link>
              <PrimaryAction locale={locale} copy={copy} mobile onNavigate={closeMenu} />
            </div>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}

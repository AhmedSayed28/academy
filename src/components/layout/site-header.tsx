"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/container";
import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig, type NavigationItem } from "@/config/site";
import { cn } from "@/lib/utils";

const unavailableLabel = "Page coming in a later phase";

function NavigationEntry({
  item,
  pathname,
  onNavigate,
  mobile = false,
  linkRef,
}: {
  item: NavigationItem;
  pathname: string;
  onNavigate?: () => void;
  mobile?: boolean;
  linkRef?: React.Ref<HTMLAnchorElement>;
}) {
  const className = cn(
    "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium transition-colors motion-reduce:transition-none",
    mobile && "w-full justify-between px-4",
  );

  if (!item.available) {
    return (
      <span
        className={cn(className, "cursor-not-allowed text-muted-foreground")}
        aria-disabled="true"
        title={unavailableLabel}
      >
        {item.label}
        <span className="ms-2 text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
          Soon
        </span>
      </span>
    );
  }

  const isCurrent = pathname === item.href;

  return (
    <Link
      ref={linkRef}
      href={item.href}
      aria-current={isCurrent ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        className,
        isCurrent
          ? "bg-primary/10 text-primary"
          : "text-foreground hover:bg-muted hover:text-primary",
      )}
    >
      {item.label}
    </Link>
  );
}

function PrimaryAction({ mobile = false }: { mobile?: boolean }) {
  const action = siteConfig.primaryAction;

  if (!action.available) {
    return (
      <span
        aria-disabled="true"
        title={unavailableLabel}
        className={cn(
          buttonVariants({ variant: "primary", size: mobile ? "large" : "default" }),
          "cursor-not-allowed bg-primary/80",
          mobile && "w-full",
        )}
      >
        {action.label}
        <span className="rounded bg-primary-foreground/20 px-1.5 py-0.5 text-[0.625rem] uppercase tracking-wider">
          Soon
        </span>
      </span>
    );
  }

  return (
    <Link
      href={action.href}
      className={cn(
        buttonVariants({ variant: "primary", size: mobile ? "large" : "default" }),
        mobile && "w-full",
      )}
    >
      {action.label}
    </Link>
  );
}

export function SiteHeader() {
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

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85">
      <Container className="flex min-h-16 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`${siteConfig.name} home`}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md font-bold tracking-tight text-dark"
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

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          <ul className="flex items-center gap-1">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <NavigationEntry item={item} pathname={pathname} />
              </li>
            ))}
          </ul>
          <div className="ms-2">
            <PrimaryAction />
          </div>
        </nav>

        <Button
          ref={menuButtonRef}
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </Container>

      {isMenuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-border bg-surface lg:hidden"
        >
          <Container className="py-4">
            <ul className="flex flex-col gap-1">
              {siteConfig.navigation.map((item, index) => (
                <li key={item.href}>
                  <NavigationEntry
                    item={item}
                    pathname={pathname}
                    onNavigate={closeMenu}
                    mobile
                    linkRef={index === 0 ? firstMobileLinkRef : undefined}
                  />
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-border pt-4">
              <PrimaryAction mobile />
            </div>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}

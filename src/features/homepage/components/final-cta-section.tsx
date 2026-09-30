import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/translations";

export function FinalCtaSection({ locale, copy }: { locale: Locale; copy: Dictionary["home"]["finalCta"] }) {
  return (
    <section aria-labelledby="final-cta-title" className="bg-surface py-section">
      <Container>
        <div className="relative overflow-hidden rounded-xl border border-border bg-card px-5 py-12 text-center text-dark-foreground shadow-[0_1.5rem_4rem_rgb(0_0_0_/_0.2)] sm:px-10 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute -end-20 -top-20 size-64 rounded-full bg-secondary/25 blur-3xl"
          />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              {copy.eyebrow}
            </p>
            <h2 id="final-cta-title" className="mt-3 text-heading-2 font-bold tracking-tight">
              {copy.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-dark-muted">
              {copy.description}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={localizePath(locale, "/tracks")}
                className={buttonVariants({ variant: "primary", size: "large" })}
              >
                {copy.primary}
                <ArrowRight aria-hidden="true" className="directional-icon size-4" />
              </Link>
              <Link
                href={localizePath(locale, "/register-interest")}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "large" }),
                  "border-dark-border bg-dark-foreground/5 text-dark-foreground hover:border-accent/50 hover:bg-dark-foreground/10",
                )}
              >
                {copy.secondary}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

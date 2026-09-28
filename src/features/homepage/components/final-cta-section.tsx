import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCtaSection() {
  return (
    <section aria-labelledby="final-cta-title" className="bg-surface py-section">
      <Container>
        <div className="relative overflow-hidden rounded-xl bg-dark px-5 py-12 text-center text-dark-foreground sm:px-10 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute -end-20 -top-20 size-64 rounded-full bg-secondary/25 blur-3xl"
          />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Find your direction
            </p>
            <h2 id="final-cta-title" className="mt-3 text-heading-2 font-bold tracking-tight">
              Start with the technology path you want to grow into.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-dark-muted">
              Review the planned learning tracks and see how Academy connects knowledge,
              practice, and project-based development.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/tracks"
                className={buttonVariants({ variant: "primary", size: "large" })}
              >
                Explore learning tracks
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="#learning-journey"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "large" }),
                  "border-dark-border bg-dark-foreground/5 text-dark-foreground hover:border-accent/50 hover:bg-dark-foreground/10",
                )}
              >
                View the learning journey
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

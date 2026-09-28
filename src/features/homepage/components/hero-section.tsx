import { ArrowDown, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const visualSteps = ["Learn fundamentals", "Practice skills", "Build projects"];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-dark text-dark-foreground">
      <div
        aria-hidden="true"
        className="absolute -start-24 top-16 size-64 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -end-24 bottom-0 size-72 rounded-full bg-accent/10 blur-3xl"
      />

      <Container className="relative grid min-h-[calc(100svh-4rem)] items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(24rem,0.9fr)] lg:gap-16 lg:py-20">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-dark-border bg-dark-foreground/5 px-3 py-1.5 text-sm font-medium text-accent">
            Practical, career-oriented technology learning
          </p>
          <h1 className="max-w-3xl text-display font-bold tracking-tight text-dark-foreground">
            Build technology skills you can put into practice.
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-dark-muted">
            Academy helps students, graduates, career switchers, junior engineers, and
            technology professionals follow structured paths, apply what they learn, and grow
            toward real professional work.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#learning-tracks"
              className={buttonVariants({ variant: "primary", size: "large" })}
            >
              Explore learning tracks
              <ArrowDown aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href="#learning-journey"
              className={cn(
                buttonVariants({ variant: "secondary", size: "large" }),
                "border-dark-border bg-dark-foreground/5 text-dark-foreground hover:border-accent/50 hover:bg-dark-foreground/10",
              )}
            >
              See how learning works
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative mx-auto w-full max-w-lg rounded-xl border border-dark-border bg-dark-foreground/5 p-4 shadow-2xl shadow-primary/10 sm:p-6"
        >
          <div className="flex items-center gap-2 border-b border-dark-border pb-4">
            <span className="size-2.5 rounded-full bg-destructive" />
            <span className="size-2.5 rounded-full bg-warning" />
            <span className="size-2.5 rounded-full bg-success" />
            <span className="ms-2 text-xs text-dark-muted">academy / learning-path</span>
          </div>
          <div className="py-6 sm:py-8">
            <p className="text-sm font-medium text-accent">Structured learning journey</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-dark-foreground">
              From concepts to practical application
            </p>
            <div className="mt-6 space-y-3">
              {visualSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-lg border border-dark-border bg-dark/60 p-4"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-md bg-primary/20 text-sm font-semibold text-accent">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium text-dark-foreground">{step}</span>
                  <Check className="size-4 text-success" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

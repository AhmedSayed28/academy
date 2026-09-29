import { ArrowRight, BookOpenCheck, BriefcaseBusiness, Layers3, Target } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import {
  aboutIntroduction,
  aboutPurpose,
  careerApproach,
  teachingPrinciples,
} from "@/features/about/content";
import { cn } from "@/lib/utils";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About Academy",
  description:
    "Learn how Academy connects technology fundamentals, practical experience, real-world projects, and career-oriented learning paths.",
  path: "/about",
});

const purposeIcons = [Target, BriefcaseBusiness] as const;
const principleIcons = [BookOpenCheck, Layers3, BriefcaseBusiness] as const;

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-dark py-section text-dark-foreground">
        <div
          aria-hidden="true"
          className="absolute -end-24 -top-24 size-80 rounded-full bg-secondary/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -start-20 size-72 rounded-full bg-accent/10 blur-3xl"
        />
        <Container className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.8fr)] lg:gap-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              {aboutIntroduction.eyebrow}
            </p>
            <h1 className="mt-3 text-heading-1 font-bold tracking-tight">
              {aboutIntroduction.title}
            </h1>
            <p className="mt-5 max-w-2xl text-body-lg text-dark-muted">
              {aboutIntroduction.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/courses" className={buttonVariants({ size: "large" })}>
                Explore courses
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="/register-interest"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "large" }),
                  "border-dark-border bg-dark-foreground/5 text-dark-foreground hover:border-accent/50 hover:bg-dark-foreground/10",
                )}
              >
                Register interest
              </Link>
            </div>
          </div>

          <aside className="rounded-xl border border-dark-border bg-dark-foreground/5 p-6 sm:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
              The learning approach
            </h2>
            <ol className="mt-6 space-y-5">
              {teachingPrinciples.map((principle, index) => (
                <li key={principle.title} className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark-foreground">{principle.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-dark-muted">
                      {principle.summary}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="purpose-heading" className="bg-surface py-section">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Purpose
            </p>
            <h2 id="purpose-heading" className="mt-3 text-heading-2 font-bold tracking-tight text-dark">
              A clear purpose for practical technology education.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {aboutPurpose.map((item, index) => {
              const Icon = purposeIcons[index];

              return (
                <article key={item.title} className="rounded-xl border border-border bg-background p-6 sm:p-8">
                  <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-5 text-heading-3 font-bold tracking-tight text-dark">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{item.description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section aria-labelledby="philosophy-heading" className="bg-background py-section">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Teaching philosophy
            </p>
            <h2 id="philosophy-heading" className="mt-3 text-heading-2 font-bold tracking-tight text-dark">
              Understand, practice, then connect.
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Academy treats learning as a progression. Each stage gives the next one meaning,
              helping learners move beyond memorizing concepts toward using them thoughtfully.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {teachingPrinciples.map((principle, index) => {
              const Icon = principleIcons[index];

              return (
                <article key={principle.title} className="rounded-xl border border-border bg-surface p-6">
                  <span className="grid size-11 place-items-center rounded-lg bg-secondary/10 text-secondary">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">{principle.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{principle.description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section aria-labelledby="career-heading" className="bg-surface py-section">
        <Container>
          <div className="grid items-center gap-8 rounded-xl border border-border bg-muted p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.7fr)] lg:gap-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Career-oriented learning
              </p>
              <h2 id="career-heading" className="mt-3 text-heading-2 font-bold tracking-tight text-dark">
                {careerApproach.title}
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">{careerApproach.description}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-semibold text-foreground">What career-oriented means here</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Learning choices are connected to a technology direction and the skills used in
                that field. The focus remains education and practical development.
              </p>
              <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-muted-foreground">
                {careerApproach.note}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="about-cta-heading" className="bg-background py-section">
        <Container className="text-center">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Explore Academy
            </p>
            <h2 id="about-cta-heading" className="mt-3 text-heading-2 font-bold tracking-tight text-dark">
              See where practical learning can begin.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-muted-foreground">
              Browse the available course information or share the technology direction you are
              interested in exploring.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/courses" className={buttonVariants({ size: "large" })}>
                Browse courses
              </Link>
              <Link
                href="/register-interest"
                className={buttonVariants({ variant: "secondary", size: "large" })}
              >
                Register general interest
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

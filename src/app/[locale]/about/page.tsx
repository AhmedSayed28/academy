import { ArrowRight, BookOpenCheck, BriefcaseBusiness, Layers3, Target } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { localizePath } from "@/i18n/config";
import { resolveDictionary } from "@/i18n/server";
import { cn } from "@/lib/utils";
import { createPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dictionary } = await resolveDictionary(params);
  return createPageMetadata({ ...dictionary.metadata.about, path: "/about", locale });
}

const purposeIcons = [Target, BriefcaseBusiness] as const;
const principleIcons = [BookOpenCheck, Layers3, BriefcaseBusiness] as const;

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dictionary } = await resolveDictionary(params);
  const copy = dictionary.about;
  return (
    <>
      <section className="hero-grid bg-dark py-section text-dark-foreground">
        <div
          aria-hidden="true"
          className="absolute -end-24 -top-24 size-80 rounded-full bg-secondary/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -start-20 size-72 rounded-full bg-accent/10 blur-3xl"
        />
        <Container className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.8fr)] lg:gap-16">
          <div className="reveal max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              {copy.introduction.eyebrow}
            </p>
            <h1 className="mt-3 text-heading-1 font-bold tracking-tight">
              {copy.introduction.title}
            </h1>
            <p className="mt-5 max-w-2xl text-body-lg text-dark-muted">
              {copy.introduction.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={localizePath(locale, "/courses")} className={buttonVariants({ size: "large" })}>
                {copy.browseCourses}
                <ArrowRight aria-hidden="true" className="directional-icon size-4" />
              </Link>
              <Link
                href={localizePath(locale, "/register-interest")}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "large" }),
                  "border-dark-border bg-dark-foreground/5 text-dark-foreground hover:border-accent/50 hover:bg-dark-foreground/10",
                )}
              >
                {copy.registerInterest}
              </Link>
            </div>
          </div>

          <aside className="reveal reveal-delay-1 rounded-xl border border-dark-border bg-card/80 p-6 shadow-[0_1.5rem_4rem_rgb(0_0_0_/_0.2)] sm:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
              {copy.approachLabel}
            </h2>
            <ol className="mt-6 space-y-5">
              {copy.principles.map((principle, index) => (
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
              {copy.purposeEyebrow}
            </p>
            <h2 id="purpose-heading" className="mt-3 text-heading-2 font-bold tracking-tight text-foreground">
              {copy.purposeTitle}
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {copy.purposes.map((item, index) => {
              const Icon = purposeIcons[index];

              return (
                <article key={item.title} className="rounded-xl border border-border bg-background p-6 sm:p-8">
                  <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-5 text-heading-3 font-bold tracking-tight text-foreground">
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
              {copy.philosophyEyebrow}
            </p>
            <h2 id="philosophy-heading" className="mt-3 text-heading-2 font-bold tracking-tight text-foreground">
              {copy.philosophyTitle}
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {copy.philosophyDescription}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {copy.principles.map((principle, index) => {
              const Icon = principleIcons[index];

              return (
                <article key={principle.title} className="card-interactive rounded-xl border border-border bg-card p-6">
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
                {copy.careerEyebrow}
              </p>
              <h2 id="career-heading" className="mt-3 text-heading-2 font-bold tracking-tight text-foreground">
                {copy.careerTitle}
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">{copy.careerDescription}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-semibold text-foreground">{copy.careerMeaning}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {copy.careerMeaningDescription}
              </p>
              <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-muted-foreground">
                {copy.careerNote}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="about-cta-heading" className="bg-background py-section">
        <Container className="text-center">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              {copy.ctaEyebrow}
            </p>
            <h2 id="about-cta-heading" className="mt-3 text-heading-2 font-bold tracking-tight text-foreground">
              {copy.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-muted-foreground">
              {copy.ctaDescription}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={localizePath(locale, "/courses")} className={buttonVariants({ size: "large" })}>
                {copy.browseCourses}
              </Link>
              <Link
                href={localizePath(locale, "/register-interest")}
                className={buttonVariants({ variant: "secondary", size: "large" })}
              >
                {copy.registerInterest}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

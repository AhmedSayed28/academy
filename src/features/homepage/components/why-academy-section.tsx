import { BriefcaseBusiness, Route, Wrench } from "lucide-react";

import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/i18n/translations";

import { SectionHeading } from "./section-heading";

const differentiatorIcons = [Wrench, Route, BriefcaseBusiness] as const;

export function WhyAcademySection({ copy }: { copy: Dictionary["home"]["why"] }) {
  return (
    <section aria-labelledby="why-academy-title" className="bg-surface py-section">
      <Container>
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          titleId="why-academy-title"
          centered
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {copy.items.map((item, index) => {
            const Icon = differentiatorIcons[index];

            return (
              <article key={item.title} className="rounded-xl border border-border bg-background p-6">
                <span className="grid size-11 place-items-center rounded-lg bg-secondary/10 text-secondary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{item.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

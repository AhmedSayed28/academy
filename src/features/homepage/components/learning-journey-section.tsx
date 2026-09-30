import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/i18n/translations";

import { SectionHeading } from "./section-heading";

export function LearningJourneySection({ copy }: { copy: Dictionary["home"]["journey"] }) {
  return (
    <section
      id="learning-journey"
      aria-labelledby="learning-journey-title"
      className="scroll-mt-20 py-section"
    >
      <Container>
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          titleId="learning-journey-title"
        />

        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {copy.items.map((step, index) => (
            <li key={step.title} className="relative rounded-xl border border-border bg-surface p-5">
              <span className="text-sm font-bold text-primary">
                {copy.step} {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

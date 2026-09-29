import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { FaqList } from "@/features/faq/components/faq-list";
import { faqItems } from "@/features/faq/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Find answers about Academy, its practical learning approach, course and track discovery, registering interest, and contacting the team.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <section className="bg-dark py-section text-dark-foreground">
        <Container className="max-w-5xl text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <MessageCircleQuestion aria-hidden="true" className="size-6" />
          </span>
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-accent">
            Academy FAQ
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl text-heading-1 font-bold tracking-tight">
            Answers for your next step.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-dark-muted">
            Learn how Academy approaches technology education, how to explore what is published,
            and how to ask for more information.
          </p>
        </Container>
      </section>

      <section aria-labelledby="faq-list-heading" className="bg-background py-section">
        <Container className="max-w-5xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Common questions
            </p>
            <h2 id="faq-list-heading" className="mt-3 text-heading-2 font-bold tracking-tight text-dark">
              What would you like to know?
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Select a question to read its answer. Only confirmed Academy information is included.
            </p>
          </div>

          <div className="mt-10">
            <FaqList items={faqItems} groupName="academy-faq" />
          </div>
        </Container>
      </section>

      <section aria-labelledby="faq-contact-heading" className="bg-surface py-section">
        <Container>
          <div className="mx-auto max-w-4xl rounded-xl bg-dark px-5 py-12 text-center text-dark-foreground sm:px-10 sm:py-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Still have a question?
            </p>
            <h2 id="faq-contact-heading" className="mt-3 text-heading-2 font-bold tracking-tight">
              Ask Academy directly.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-dark-muted">
              Use the contact form when the answer depends on information that has not been
              published or when you need to explain your question in more detail.
            </p>
            <Link href="/contact" className={`${buttonVariants({ size: "large" })} mt-8`}>
              Contact Academy
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

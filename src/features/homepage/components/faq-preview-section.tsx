import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { FaqList } from "@/features/faq/components/faq-list";
import { homepageFaqItems } from "@/features/faq/content";

import { SectionHeading } from "./section-heading";

export function FaqPreviewSection() {
  return (
    <section aria-labelledby="faq-preview-title" className="bg-background py-section">
      <Container className="max-w-5xl">
        <SectionHeading
          eyebrow="Frequently asked questions"
          title="Start with the essentials."
          description="Find clear answers about Academy, its learning approach, and how to express interest."
          titleId="faq-preview-title"
        />

        <div className="mt-10">
          <FaqList items={homepageFaqItems} groupName="homepage-faq" />
        </div>

        <div className="mt-8">
          <Link href="/faq" className={buttonVariants({ variant: "secondary", size: "large" })}>
            View all questions
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

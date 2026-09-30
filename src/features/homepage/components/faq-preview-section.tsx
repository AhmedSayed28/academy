import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { FaqList } from "@/features/faq/components/faq-list";
import { localizePath, type Locale } from "@/i18n/config";
import { getLocalizedFaqItems } from "@/i18n/faq";
import type { Dictionary } from "@/i18n/translations";

import { SectionHeading } from "./section-heading";

export function FaqPreviewSection({ locale, copy }: { locale: Locale; copy: Dictionary["home"]["faq"] }) {
  const homepageFaqItems = getLocalizedFaqItems(locale).slice(0, 4);
  return (
    <section aria-labelledby="faq-preview-title" className="bg-background py-section">
      <Container className="max-w-5xl">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          titleId="faq-preview-title"
        />

        <div className="mt-10">
          <FaqList items={homepageFaqItems} groupName="homepage-faq" />
        </div>

        <div className="mt-8">
          <Link href={localizePath(locale, "/faq")} className={buttonVariants({ variant: "secondary", size: "large" })}>
            {copy.viewAll}
            <ArrowRight aria-hidden="true" className="directional-icon size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

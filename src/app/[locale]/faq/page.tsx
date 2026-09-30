import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { FaqList } from "@/features/faq/components/faq-list";
import { getLocalizedFaqItems } from "@/i18n/faq";
import { localizePath } from "@/i18n/config";
import { resolveDictionary } from "@/i18n/server";
import { createPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dictionary } = await resolveDictionary(params);
  return createPageMetadata({ ...dictionary.metadata.faq, path: "/faq", locale });
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dictionary } = await resolveDictionary(params);
  const copy = dictionary.faq;
  const faqItems = getLocalizedFaqItems(locale);
  return (
    <>
      <section className="hero-grid bg-dark py-section text-dark-foreground">
        <Container className="reveal max-w-5xl text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <MessageCircleQuestion aria-hidden="true" className="size-6" />
          </span>
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-accent">
            {copy.heroEyebrow}
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl text-heading-1 font-bold tracking-tight">
            {copy.heroTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-dark-muted">
            {copy.heroDescription}
          </p>
        </Container>
      </section>

      <section aria-labelledby="faq-list-heading" className="bg-background py-section">
        <Container className="max-w-5xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              {copy.listEyebrow}
            </p>
            <h2 id="faq-list-heading" className="mt-3 text-heading-2 font-bold tracking-tight text-foreground">
              {copy.listTitle}
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {copy.listDescription}
            </p>
          </div>

          <div className="mt-10">
            <FaqList items={faqItems} groupName="academy-faq" />
          </div>
        </Container>
      </section>

      <section aria-labelledby="faq-contact-heading" className="bg-surface py-section">
        <Container>
          <div className="mx-auto max-w-4xl rounded-xl border border-border bg-card px-5 py-12 text-center text-dark-foreground shadow-[0_1.5rem_4rem_rgb(0_0_0_/_0.2)] sm:px-10 sm:py-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              {copy.contactEyebrow}
            </p>
            <h2 id="faq-contact-heading" className="mt-3 text-heading-2 font-bold tracking-tight">
              {copy.contactTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-dark-muted">
              {copy.contactDescription}
            </p>
            <Link href={localizePath(locale, "/contact")} className={`${buttonVariants({ size: "large" })} mt-8`}>
              {copy.contactCta}
              <ArrowRight aria-hidden="true" className="directional-icon size-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

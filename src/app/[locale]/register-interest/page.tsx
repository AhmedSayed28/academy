import { Container } from "@/components/layout/container";
import { RegisterInterestForm } from "@/features/leads/components/register-interest-form";
import { createPageMetadata } from "@/lib/metadata";
import { resolveDictionary } from "@/i18n/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dictionary } = await resolveDictionary(params);
  return createPageMetadata({ ...dictionary.metadata.interest, path: "/register-interest", locale });
}

export default async function RegisterInterestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { dictionary } = await resolveDictionary(params);
  const copy = dictionary.interest;
  return (
    <section className="bg-background py-section">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(30rem,1.2fr)] lg:gap-16">
        <div className="reveal max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 text-heading-1 font-bold tracking-tight text-foreground">
            {copy.title}
          </h1>
          <p className="mt-5 text-body-lg text-muted-foreground">
            {copy.description}
          </p>
          <div className="mt-8 rounded-xl border border-border bg-muted p-5">
            <h2 className="font-semibold text-foreground">{copy.explainerTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {copy.explainerDescription}
            </p>
          </div>
        </div>

        <div className="reveal reveal-delay-1 rounded-xl border border-border bg-card p-5 shadow-[0_1.5rem_4rem_rgb(0_0_0_/_0.2)] sm:p-8">
          <h2 className="text-heading-3 font-bold tracking-tight text-foreground">
            {copy.formTitle}
          </h2>
          <p className="mt-2 mb-8 text-muted-foreground">
            {copy.formDescription}
          </p>
          <RegisterInterestForm copy={copy.form} />
        </div>
      </Container>
    </section>
  );
}

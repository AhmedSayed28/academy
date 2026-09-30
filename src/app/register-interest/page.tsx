import { Container } from "@/components/layout/container";
import { RegisterInterestForm } from "@/features/leads/components/register-interest-form";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Register Interest",
  description:
    "Tell Academy what you would like to learn so the team can follow up when relevant opportunities are available.",
  path: "/register-interest",
});

export default function RegisterInterestPage() {
  return (
    <section className="bg-background py-section">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(30rem,1.2fr)] lg:gap-16">
        <div className="reveal max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            General interest
          </p>
          <h1 className="mt-3 text-heading-1 font-bold tracking-tight text-foreground">
            Tell us where you want to grow.
          </h1>
          <p className="mt-5 text-body-lg text-muted-foreground">
            Share your contact details and the technology area you are interested in. We will
            follow up when there is a relevant, confirmed opportunity.
          </p>
          <div className="mt-8 rounded-xl border border-border bg-muted p-5">
            <h2 className="font-semibold text-foreground">What this form does</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              It registers general interest only. It is not enrollment and does not reserve a
              place, confirm a course, or promise dates or pricing.
            </p>
          </div>
        </div>

        <div className="reveal reveal-delay-1 rounded-xl border border-border bg-card p-5 shadow-[0_1.5rem_4rem_rgb(0_0_0_/_0.2)] sm:p-8">
          <h2 className="text-heading-3 font-bold tracking-tight text-foreground">
            Register your interest
          </h2>
          <p className="mt-2 mb-8 text-muted-foreground">
            We only ask for the information needed to follow up.
          </p>
          <RegisterInterestForm />
        </div>
      </Container>
    </section>
  );
}

import { Mail, MessageCircle } from "lucide-react";

import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/features/contact/components/contact-form";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact Academy",
  description:
    "Send Academy a question about practical, career-oriented technology education.",
  path: "/contact",
});

function ContactMethods() {
  const hasContactMethods =
    Boolean(siteConfig.contact.email) ||
    Boolean(siteConfig.contact.whatsappNumber) ||
    siteConfig.socialLinks.length > 0;

  if (!hasContactMethods) return null;

  return (
    <section aria-labelledby="direct-contact-heading" className="mt-10">
      <h2 id="direct-contact-heading" className="text-heading-3 font-bold tracking-tight text-foreground">
        Other ways to contact us
      </h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {siteConfig.contact.email ? (
          <li>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex min-h-11 items-center gap-3 rounded-xl border border-border bg-surface p-4 font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary motion-reduce:transition-none"
            >
              <Mail aria-hidden="true" className="size-5 text-primary" />
              Email Academy
            </a>
          </li>
        ) : null}
        {siteConfig.contact.whatsappNumber ? (
          <li>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
              className="flex min-h-11 items-center gap-3 rounded-xl border border-border bg-surface p-4 font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary motion-reduce:transition-none"
            >
              <MessageCircle aria-hidden="true" className="size-5 text-primary" />
              WhatsApp Academy
            </a>
          </li>
        ) : null}
        {siteConfig.socialLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="flex min-h-11 items-center rounded-xl border border-border bg-surface p-4 font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary motion-reduce:transition-none"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ContactPage() {
  return (
    <section className="bg-background py-section">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(30rem,1.2fr)] lg:gap-16">
        <div className="reveal max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Contact Academy
          </p>
          <h1 className="mt-3 text-heading-1 font-bold tracking-tight text-foreground">
            How can we help?
          </h1>
          <p className="mt-5 text-body-lg text-muted-foreground">
            Ask us about Academy, its learning approach, or the technology education you are
            looking for. Share enough detail for us to understand your question.
          </p>
          <ContactMethods />
        </div>

        <section
          aria-labelledby="contact-form-heading"
          className="reveal reveal-delay-1 rounded-xl border border-border bg-card p-5 shadow-[0_1.5rem_4rem_rgb(0_0_0_/_0.2)] sm:p-8"
        >
          <h2 id="contact-form-heading" className="text-heading-3 font-bold tracking-tight text-foreground">
            Send a message
          </h2>
          <p className="mt-2 mb-8 text-muted-foreground">
            Complete the form to send your question to Academy.
          </p>
          <ContactForm />
        </section>
      </Container>
    </section>
  );
}

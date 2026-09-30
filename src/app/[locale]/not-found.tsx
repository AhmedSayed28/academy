import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { locale as localeParam } from "next/root-params";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { defaultLocale, isLocale, localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/translations";

export default async function NotFound() {
  const localeValue = await localeParam();
  const locale = isLocale(localeValue) ? localeValue : defaultLocale;
  const copy = getDictionary(locale).notFound;
  return (
    <Container className="grid min-h-[60vh] place-items-center py-section text-center">
      <div className="reveal max-w-xl rounded-xl border border-border bg-card p-7 shadow-[0_1.5rem_4rem_rgb(0_0_0_/_0.2)] sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-xl bg-primary/10 text-primary">
          <BookOpen aria-hidden="true" className="size-7" />
        </span>
        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-primary">{copy.eyebrow}</p>
        <h1 className="mt-3 text-heading-1 font-bold tracking-tight text-foreground">{copy.title}</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          {copy.description}
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={localizePath(locale, "/courses")} className={buttonVariants({ size: "large" })}>
            <ArrowLeft aria-hidden="true" className="directional-icon size-4" />
            {copy.coursesCta}
          </Link>
          <Link href={localizePath(locale, "/tracks")} className={cn(buttonVariants({ variant: "secondary", size: "large" }))}>
            {copy.tracksCta}
          </Link>
        </div>
      </div>
    </Container>
  );
}

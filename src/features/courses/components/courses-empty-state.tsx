import { BookOpen, Compass } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/translations";

export function CoursesEmptyState({ locale, copy }: { locale: Locale; copy: Dictionary["courses"]["empty"] }) {
  return (
    <section
      aria-labelledby="courses-empty-title"
      className="rounded-xl border border-dashed border-primary/30 bg-primary/5 px-5 py-10 text-center sm:px-8 sm:py-14"
    >
      <span className="mx-auto grid size-12 place-items-center rounded-lg bg-surface text-primary shadow-sm">
        <BookOpen aria-hidden="true" className="size-6" />
      </span>
      <h2 id="courses-empty-title" className="mt-5 text-2xl font-bold tracking-tight">
        {copy.title}
      </h2>
      <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">
        {copy.description}
      </p>
      <Link
        href={`${localizePath(locale, "/")}#learning-tracks`}
        className={cn(buttonVariants({ variant: "secondary" }), "mt-6")}
      >
        <Compass aria-hidden="true" className="size-4" />
        {copy.cta}
      </Link>
    </section>
  );
}

import { ExternalLink, UserRound } from "lucide-react";
import Image from "next/image";

import type { Instructor } from "@/features/instructors/types/instructor.types";

export function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <article
      id={instructor.slug}
      className="card-interactive flex h-full scroll-mt-24 flex-col overflow-hidden rounded-xl border border-border bg-card"
    >
      <div className="relative aspect-[4/3] bg-primary/5">
        {instructor.image ? (
          <Image
            src={instructor.image.src}
            alt={instructor.image.alt}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="grid size-full place-items-center text-primary">
            <div className="text-center">
              <UserRound aria-hidden="true" className="mx-auto size-14" strokeWidth={1.5} />
              <p className="mt-3 text-sm font-medium text-muted-foreground">
                Profile image not available
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="text-2xl font-bold tracking-tight text-card-foreground">
          {instructor.name}
        </h2>
        <p className="mt-1 font-semibold text-primary">{instructor.role}</p>
        <p className="mt-4 leading-7 text-muted-foreground">{instructor.biography}</p>

        <div className="mt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Expertise
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${instructor.name} expertise`}>
            {instructor.expertise.map((item) => (
              <li key={item} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {instructor.professionalLinks ? (
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-5">
            {instructor.professionalLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${link.label} for ${instructor.name} (opens in a new tab)`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md font-semibold text-primary hover:text-primary/80"
                >
                  {link.label}
                  <ExternalLink aria-hidden="true" className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

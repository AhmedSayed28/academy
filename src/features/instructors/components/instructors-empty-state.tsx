import { BookOpen, Route, UsersRound } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export function InstructorsEmptyState() {
  return (
    <section
      aria-labelledby="instructors-empty-title"
      className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 px-5 py-12 text-center sm:px-8 sm:py-16"
    >
      <span className="mx-auto grid size-14 place-items-center rounded-xl bg-surface text-primary shadow-sm">
        <UsersRound aria-hidden="true" className="size-7" />
      </span>
      <h2 id="instructors-empty-title" className="mt-6 text-heading-2 font-bold tracking-tight">
        Instructor profiles are being prepared.
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
        Academy will introduce instructors here after their biographies, expertise, images, and
        professional details have been reviewed and approved.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/courses" className={buttonVariants({ variant: "primary", size: "large" })}>
          <BookOpen aria-hidden="true" className="size-5" />
          Browse courses
        </Link>
        <Link href="/tracks" className={buttonVariants({ variant: "secondary", size: "large" })}>
          <Route aria-hidden="true" className="size-5" />
          Explore learning tracks
        </Link>
      </div>
    </section>
  );
}

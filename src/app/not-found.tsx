import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <Container className="grid min-h-[60vh] place-items-center py-section text-center">
      <div className="max-w-xl">
        <span className="mx-auto grid size-14 place-items-center rounded-xl bg-primary/10 text-primary">
          <BookOpen aria-hidden="true" className="size-7" />
        </span>
        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-primary">404</p>
        <h1 className="mt-3 text-heading-1 font-bold tracking-tight text-dark">Page not found</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          The page may not exist, or the course may not be available for public viewing.
        </p>
        <Link href="/courses" className={cn(buttonVariants({ size: "large" }), "mt-7")}>
          <ArrowLeft aria-hidden="true" className="size-4" />
          Browse courses
        </Link>
      </div>
    </Container>
  );
}

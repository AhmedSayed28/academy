import { BookOpen, Compass } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./section-heading";

export function FeaturedCoursesSection() {
  return (
    <section aria-labelledby="featured-courses-title" className="py-section">
      <Container>
        <SectionHeading
          eyebrow="Featured courses"
          title="Course details are being prepared."
          description="Academy will feature approved courses here when titles, curricula, instructors, and availability are ready to publish."
          titleId="featured-courses-title"
        />

        <div className="mt-10 rounded-xl border border-dashed border-primary/30 bg-primary/5 px-5 py-10 text-center sm:px-8 sm:py-12">
          <span className="mx-auto grid size-12 place-items-center rounded-lg bg-surface text-primary shadow-sm">
            <BookOpen aria-hidden="true" className="size-6" />
          </span>
          <h3 className="mt-5 text-xl font-semibold text-foreground">
            No featured courses are published yet
          </h3>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">
            Start with the documented learning tracks while the course catalog is finalized.
          </p>
          <Link
            href="#learning-tracks"
            className={cn(buttonVariants({ variant: "secondary" }), "mt-6")}
          >
            <Compass aria-hidden="true" className="size-4" />
            Explore learning tracks
          </Link>
        </div>
      </Container>
    </section>
  );
}

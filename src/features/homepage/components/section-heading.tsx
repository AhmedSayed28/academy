import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description: string;
  titleId: string;
  centered?: boolean;
  inverse?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  titleId,
  centered = false,
  inverse = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-sm font-semibold uppercase tracking-widest",
            inverse ? "text-accent" : "text-primary",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={titleId}
        className={cn(
          "text-heading-2 font-bold tracking-tight",
          inverse ? "text-dark-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mt-4 text-base leading-7 sm:text-lg",
          inverse ? "text-dark-muted" : "text-muted-foreground",
        )}
      >
        {description}
      </p>
    </div>
  );
}

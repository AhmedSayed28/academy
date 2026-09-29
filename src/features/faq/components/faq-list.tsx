import { ChevronDown } from "lucide-react";
import Link from "next/link";

import type { FaqItem } from "@/features/faq/content";

interface FaqListProps {
  items: readonly FaqItem[];
  groupName: string;
}

export function FaqList({ items, groupName }: FaqListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          name={groupName}
          className="group rounded-xl border border-border bg-surface shadow-sm open:border-primary/30"
        >
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 font-semibold text-foreground transition-colors hover:text-primary motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <ChevronDown
              aria-hidden="true"
              className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
            />
          </summary>
          <div className="border-t border-border px-5 py-5">
            <p className="leading-7 text-muted-foreground">{item.answer}</p>
            {item.action ? (
              <Link
                href={item.action.href}
                className="mt-4 inline-flex min-h-11 items-center rounded-md font-semibold text-primary hover:text-primary/80"
              >
                {item.action.label}
              </Link>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}

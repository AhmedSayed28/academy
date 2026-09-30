import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold shadow-sm transition-[color,background-color,border-color,box-shadow,transform] hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 motion-reduce:transform-none motion-reduce:transition-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0.75rem_2rem_rgb(74_222_165_/_0.16)] focus-visible:outline-primary",
        secondary:
          "border border-border bg-card text-foreground hover:border-primary/50 hover:bg-raised",
        ghost: "text-foreground hover:bg-muted hover:text-primary",
      },
      size: {
        default: "h-11",
        large: "h-12 px-5 text-base",
        icon: "size-11 px-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = ComponentPropsWithRef<"button"> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

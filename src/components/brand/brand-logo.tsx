import Image from "next/image";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function BrandLogo({
  placement = "header",
  className,
}: {
  placement?: "header" | "footer";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center",
        placement === "header" ? "w-[7.5rem] sm:w-[8.5rem]" : "w-[9.5rem]",
        className,
      )}
    >
      <Image
        src={siteConfig.assets.logo}
        alt={siteConfig.name}
        width={430}
        height={160}
        sizes={placement === "header" ? "(min-width: 640px) 136px, 120px" : "152px"}
        className="h-auto w-full brightness-0 invert"
        loading="eager"
        unoptimized
      />
    </span>
  );
}

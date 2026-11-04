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
        "inline-flex shrink-0 items-center justify-center rounded-lg bg-white",
        placement === "header" ? "w-[9.25rem] px-1.5 py-1" : "w-[11.25rem] px-2 py-1.5",
        className,
      )}
    >
      <Image
        src={siteConfig.assets.logo}
        alt={siteConfig.name}
        width={900}
        height={240}
        sizes={placement === "header" ? "148px" : "180px"}
        className="h-auto w-full"
        loading="eager"
        unoptimized
      />
    </span>
  );
}

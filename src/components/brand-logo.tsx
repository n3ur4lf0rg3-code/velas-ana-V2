import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  decorative = false,
}: {
  className?: string;
  decorative?: boolean;
}) {
  return (
    <img
      src="/logo.png"
      alt={decorative ? "" : "Velas Ana"}
      width={771}
      height={1107}
      className={cn("h-20 w-auto md:h-24", className)}
      decoding="async"
    />
  );
}

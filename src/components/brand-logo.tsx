import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  decorative = false,
}: {
  className?: string;
  decorative?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-[#fbf6f0] px-2 py-1.5 shadow-sm ring-1 ring-black/5",
        className,
      )}
    >
      <img
        src="/logo.png"
        alt={decorative ? "" : "Velas Ana"}
        width={771}
        height={1107}
        className="h-16 w-auto md:h-20"
        decoding="async"
      />
    </span>
  );
}
